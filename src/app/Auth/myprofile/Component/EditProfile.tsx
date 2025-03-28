"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import userImage from "@/asset/dummy/user1.jpg";
import { Input } from "@/components/ui/input";
import { SingleSelect } from "@/components/Select/SingleSelect";
import { UserRoleIF, UserStatusIF } from "@/Types/enums";
import { Button } from "@/components/ui/button";
import { CalendarComponent } from "@/components/Calendar/Calendar";
import { useFormik } from "formik";
import * as Yup from "yup";
import Error from "@/components/Error/Error";
import { LockIcon } from "lucide-react";
import axios from "axios";
import { authHeader } from "../../AuthHeader/authHeader";
import ButtonLoading from "@/components/Loading/ButtonLoading";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "@/app/store/store";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "@/app/store/Profile/userProfileSlice";

interface ComponentProps {
  setState: (val: boolean) => void;
}

const EditProfile = ({ setState }: ComponentProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { userDetails } = useSelector((state: RootState) => state.userProfile);
  const [image, setImage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [userRole, setUserRole] = useState<string>("");
  const [userStatus, setUserStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userDetails) {
      setUserRole(userDetails.role);
      setUserStatus(userDetails.status);
      if (userDetails.date_of_birth)
        setDate(new Date(userDetails.date_of_birth));
      if (userDetails.profile_picture) setImage(`${process.env.NEXT_PUBLIC_IMAGE_URL}/${userDetails.profile_picture}`);
      if (userDetails.name) formik.setFieldValue("name", userDetails.name);
      if (userDetails.phone_number)
        formik.setFieldValue("mobile", userDetails.phone_number);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setImage(URL.createObjectURL(selectedFile));
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      date_of_birth: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3).required("Name is required"),
      mobile: Yup.string().length(10).required("Mobile is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const formattedDate = date ? date.toISOString().split("T")[0] : null; 
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone_number", values.mobile);
      if (formattedDate) formData.append("date_of_birth", formattedDate?.toString());
      formData.append("role", userRole);
      formData.append("status", userStatus);
      if (file) formData.append("image", file);

      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/profile/update`,
          formData,
          {
            headers: {
              ...authHeader(),
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const responseData = response.data;
        if (responseData.output === 1) {
          if (user?.id) {
            dispatch(userProfile({ _id: user.id }));
          }
          setState(false);
          toast.success(responseData.message);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="h-full w-full ">
        <div className="h-32  p-2 w-full sm:w-5/6 mx-auto flex gap-3 items-center ">
          <Image
            src={image || userImage}
            alt="user"
            className="h-full w-28 rounded-full object-cover"
            loading="lazy"
            width={200}
            height={200}
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="image" className=" text-sm font-semibold">
              {" "}
              Upload Image
            </label>
            <div className="flex gap-2 sm:gap-0 flex-col sm:flex-row">
              <div className=" p-2 sm:p-3 text-gray-600 text-xs sm:text-sm bg-gray-100 w-60 rounded-md rounded-r-none">
                {fileName && fileName.length > 20
                  ? fileName.slice(0, 20).concat("...")
                  : fileName ?? "No file chosen"}
              </div>
              <div className="flex gap-5 items-center">
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="imageUpload"
                  className="px-4 py-2 sm:py-3 rounded-l-none bg-primaryblue text-white text-xs sm:text-sm rounded-md cursor-pointer m-0 hover:bg-blue-700 transition"
                >
                  Choose file
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 px-0 sm:px-16 my-6 gap-5">
          <div className="flex gap-1 flex-col ">
            <label className=" text-sm font-semibold text-black dark:text-white ">
              Name{" "}
            </label>
            <Input
              type="text"
              className="text-sm text-gray-900 bg-gray-100 rounded-md p-3"
              placeholder="Enter Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
            />
            {formik.errors.name && formik.touched.name && (
              <Error error={formik.errors.name} />
            )}
          </div>
          <div className="flex gap-1 flex-col relative ">
            <label className=" text-sm font-semibold text-black dark:text-white ">
              Email{" "}
            </label>
            <Input
              type="email"
              className="text-sm text-gray-900 dark:text-foreground bg-gray-100 dark:bg-gray-100 rounded-md p-3 disabled:opacity-100"
              value={userDetails?.email}
              disabled
            />
            <div className="text-xs text-white dark:text-white absolute top-8 right-3 rounded-full p-1 bg-gray-400 dark:bg-darkGray">
              <LockIcon className="h-4 w-4" />
            </div>
          </div>
          <div className="flex gap-1 flex-col ">
            <label className=" text-sm font-semibold text-black dark:text-white ">
              Mobile{" "}
            </label>
            <Input
              type="tel"
              className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3"
              placeholder="Enter Number"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="mobile"
            />
            {formik.errors.mobile && formik.touched.mobile && (
              <Error error={formik.errors.mobile} />
            )}
          </div>
          <div className="flex gap-1 flex-col ">
            <label className=" text-sm font-semibold text-black dark:text-white ">
              Date of birth{" "}
            </label>
            {/* <CalendarComponent date={date} setDate={setDate} /> */}
            <CalendarComponent date={date} setDate={setDate} />
          </div>
          <SingleSelect
            value={userRole}
            setValue={setUserRole}
            option={UserRoleIF}
            label="Role"
          />
          <SingleSelect
            value={userStatus}
            setValue={setUserStatus}
            option={UserStatusIF}
            label="Status"
          />
        </div>

        <div className=" pt-6 flex gap-5 justify-center items-center w-full">
          <Button
            onClick={() => setState(false)}
            className=" border border-primaryblue min-w-40 text-sm rounded-md text-primaryblue font-semibold dark:border-white dark:text-white"
          >
            Cancel
          </Button>
          <Button
            type={"submit"}
            className=" bg-primaryblue text-sm rounded-md min-w-40 text-white font-semibold"
            disabled={loading}
          >
            {loading ? <ButtonLoading /> : "Save"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
