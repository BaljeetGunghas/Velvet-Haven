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

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
    .required("Full name is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
});

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

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  // Handle form submission
  async function handleSubmit(values: any) {
    setLoading(true);
    try {
      const formattedDate = date ? date.toISOString().split("T")[0] : null;
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone_number", values.mobile);
      if (formattedDate) formData.append("date_of_birth", formattedDate);
      formData.append("role", userRole);
      formData.append("status", userStatus);
      if (file) formData.append("image", file);

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

      if (response.data.output === 1) {
        if (user?.id) {
          dispatch(userProfile({ _id: user.id }));
        }
        setState(false);
        toast.success(response.data.message || "Profile updated successfully");
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  // Load user data when component mounts
  useEffect(() => {
    if (userDetails) {
      setUserRole(userDetails.role);
      setUserStatus(userDetails.status);
      if (userDetails.date_of_birth) {
        setDate(new Date(userDetails.date_of_birth));
      }
      if (userDetails.profile_picture) {
        setImage(`${process.env.NEXT_PUBLIC_IMAGE_URL}/${userDetails.profile_picture}`);
      }
      // Set form values
      formik.setFieldValue("name", userDetails.name || "");
      formik.setFieldValue("mobile", userDetails.phone_number || "");
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="w-full space-y-6">
        {/* Profile Picture Upload - Premium */}
        <div className="bg-gradient-to-br from-accent-gold/4 to-accent-gold/0 dark:from-accent-gold/8 dark:to-transparent rounded-2xl border border-accent-gold/15 dark:border-accent-gold/10 p-5 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {/* Avatar Preview */}
            <div className="relative group flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 to-primary-green/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Image
                src={image || userImage}
                alt="user"
                className="relative h-28 w-28 md:h-32 md:w-32 rounded-full object-cover shadow-lg border-4 border-accent-gold/30 group-hover:border-accent-gold/60 transition-all duration-300"
                loading="lazy"
                width={130}
                height={130}
              />
            </div>

            {/* Upload Section */}
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-lg font-playfair font-semibold text-primary-green dark:text-white mb-2">
                  Profile Picture
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Update your profile photo (JPG, PNG up to 5MB)
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <div className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {fileName && fileName.length > 25
                      ? fileName.slice(0, 25).concat("...")
                      : fileName ?? "No file chosen"}
                  </p>
                </div>

                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="imageUpload"
                  className="px-6 py-2.5 bg-gradient-to-r from-accent-gold to-accent-gold/90 hover:from-accent-gold/90 hover:to-accent-gold text-white font-semibold rounded-lg cursor-pointer hover:shadow-lg hover:shadow-accent-gold/30 transition-all duration-300 text-sm whitespace-nowrap"
                >
                  Choose File
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields Grid - Premium */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {/* Name */}
          <div className="group">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest block mb-2">
              👤 Full Name
            </label>
            <Input
              type="text"
              maxLength={50}
              className={`w-full px-3.5 md:px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white bg-gradient-to-br from-slate-50 to-slate-50/50 dark:from-slate-700/50 dark:to-slate-700/30 border rounded-xl transition-all duration-300 placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                formik.touched.name && formik.errors.name
                  ? "border-red-400 dark:border-red-600 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/50"
                  : "border-gray-200 dark:border-slate-600 group-hover:border-accent-gold/50 group-hover:shadow-sm group-hover:shadow-accent-gold/10 focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/20"
              }`}
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
            />
            <div className="flex justify-between items-start mt-2">
              {formik.errors.name && formik.touched.name && (
                <div className="flex-1 p-3 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700/50 rounded-lg flex items-start gap-3">
                  <span className="text-red-600 dark:text-red-400 text-lg flex-shrink-0">✕</span>
                  <div>
                    <p className="font-semibold text-sm text-red-800 dark:text-red-300">Error</p>
                    <p className="text-xs text-red-700 dark:text-red-400 mt-0.5">{formik.errors.name}</p>
                  </div>
                </div>
              )}
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                {formik.values.name.length}/50
              </span>
            </div>
          </div>

          {/* Email - Read Only */}
          <div className="group relative">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest block mb-2">
              📧 Email Address
            </label>
            <div className="relative">
              <Input
                type="email"
                className="w-full px-3.5 md:px-4 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gradient-to-br from-slate-50 to-slate-50/50 dark:from-slate-700/50 dark:to-slate-700/30 border border-gray-200 dark:border-slate-600 rounded-xl cursor-not-allowed opacity-70"
                value={userDetails?.email || "Not provided"}
                disabled
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                <LockIcon className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Email cannot be changed</p>
          </div>

          {/* Mobile */}
          <div className="group">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest block mb-2">
              📱 Mobile Number
            </label>
            <Input
              type="tel"
              maxLength={10}
              inputMode="numeric"
              className={`w-full px-3.5 md:px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white bg-gradient-to-br from-slate-50 to-slate-50/50 dark:from-slate-700/50 dark:to-slate-700/30 border rounded-xl transition-all duration-300 placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                formik.touched.mobile && formik.errors.mobile
                  ? "border-red-400 dark:border-red-600 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/50"
                  : "border-gray-200 dark:border-slate-600 group-hover:border-accent-gold/50 group-hover:shadow-sm group-hover:shadow-accent-gold/10 focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/20"
              }`}
              placeholder="10-digit number"
              value={formik.values.mobile}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
                formik.setFieldValue("mobile", value);
              }}
              onBlur={formik.handleBlur}
              name="mobile"
            />
            <div className="flex justify-between items-start mt-2">
              {formik.errors.mobile && formik.touched.mobile && (
                <div className="flex-1 p-3 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700/50 rounded-lg flex items-start gap-3">
                  <span className="text-red-600 dark:text-red-400 text-lg flex-shrink-0">✕</span>
                  <div>
                    <p className="font-semibold text-sm text-red-800 dark:text-red-300">Error</p>
                    <p className="text-xs text-red-700 dark:text-red-400 mt-0.5">{formik.errors.mobile}</p>
                  </div>
                </div>
              )}
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                {formik.values.mobile.length}/10
              </span>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="group">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest block mb-2">
              🎂 Date of Birth
            </label>
            <CalendarComponent date={date} setDate={setDate} />
          </div>

          {/* Role */}
          <SingleSelect
            value={userRole}
            setValue={setUserRole}
            option={UserRoleIF}
            label="Role"
          />

          {/* Status */}
          <SingleSelect
            value={userStatus}
            setValue={setUserStatus}
            option={UserStatusIF}
            label="Status"
          />
        </div>

        {/* Action Buttons - Premium */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6 border-t border-gray-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setState(false)}
            className="px-8 py-3 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 hover:border-accent-gold/50 transition-all duration-300 text-base min-w-[160px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-accent-gold to-accent-gold/90 hover:from-accent-gold/90 hover:to-accent-gold text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-accent-gold/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-base min-w-[160px] flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <ButtonLoading />
                <span>Saving...</span>
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
