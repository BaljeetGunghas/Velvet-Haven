"use client";

import { authHeader } from "@/app/Auth/AuthHeader/authHeader";
import Error from "@/components/Error/Error";
import { useHandleLogout } from "@/Hooks/handleLogout";
import ButtonLoading from "@/components/Loading/ButtonLoading";
import { SingleSelect } from "@/components/Select/SingleSelect";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserStatusIF } from "@/Types/enums";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HotelIF } from "../../Components/Tabels/HotelTabel";
import { useHandleGetHotelDetails } from "@/Hooks/hotel";
import ImageUploader from "../../../../components/UploadMultiImage/ImageUpload";

interface hotelResponseDataIF {
  output: number;
  message: string;
  jsonResponse: HotelIF | null;
}

interface Props {
  onClose: () => void;
  handleRefress: () => void;
  selectedHotelId?: string;
}
const CreateUpdateHotel: React.FC<Props> = ({
  onClose,
  handleRefress,
  selectedHotelId,
}) => {
  const [isloading, setIsLoading] = useState<boolean>(false);
  const handleGetHotelDetails = useHandleGetHotelDetails;

  const [ErrorMessage, setErrorMessage] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const handleLogout = useHandleLogout();
  const [hotelDetailsLoading, setHotelDetailsLoading] =
    useState<boolean>(false);
  //   const [hotelDetails, setHotelDetails] = useState<HotelIF | null>(null);
  const [hotelImages, setHotelImages] = useState<string[] | null>(null);
  const [images, setImages] = useState<File[] | null>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      owner_name: "",
      description: "",
      address: "",
      postal_code: "",
      policies: "",
      cancellation_policy: "",
      contact_number: "",
      email: "",
      status: "active",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      const payload = {
        ...values,
        status: status,
      };
      if (!selectedHotelId) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel/create-hotel`,
          payload,
          {
            headers: authHeader(),
          }
        );
        const responseData = response.data;
        if (responseData.output === 1) {
          toast.success(responseData.message);
          handleRefress();
          onClose();
          setIsLoading(false);
        } else if (responseData.output === -401) {
          handleLogout();
          return;
        } else {
          setErrorMessage(responseData.message);
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
          setIsLoading(false);
        }
      } else {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("owner_name", values.owner_name);
        formData.append("description", values.description);
        formData.append("address", values.address);
        formData.append("postal_code", values.postal_code);
        formData.append("policies", values.policies);
        formData.append("cancellation_policy", values.cancellation_policy);
        formData.append("contact_number", values.contact_number);
        formData.append("email", values.email);
        formData.append("status", status);
        formData.append("hotelId", selectedHotelId);
        if (images) {
          images?.forEach((image) => {
            formData.append("images", image);
          });
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 15000);
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel/update-hotel`,
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
          toast.success(responseData.message);
          handleRefress();
          onClose();
          setIsLoading(false);
        } else if (responseData.output === -401) {
          handleLogout();
          return;
        } else {
          setErrorMessage(responseData.message);
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
          setIsLoading(false);
        }
      }
      setIsLoading(false);
    },
  });

  useEffect(() => {
    const getHotelDetails = async () => {
      if (selectedHotelId) {
        setHotelDetailsLoading(true);
        const response: hotelResponseDataIF = await handleGetHotelDetails(
          selectedHotelId
        );
        if (response.output === 1) {
          formik.setValues({
            name: response.jsonResponse?.name || "",
            address: response.jsonResponse?.address || "",
            contact_number: String(response.jsonResponse?.contact_number) || "",
            email: response.jsonResponse?.email || "",
            owner_name: response.jsonResponse?.owner_name || "",
            postal_code: response.jsonResponse?.postal_code || "",
            description: response.jsonResponse?.description || "",
            policies: response.jsonResponse?.policies || "",
            cancellation_policy:
              response.jsonResponse?.cancellation_policy || "",
            status: response.jsonResponse?.status || "",
          });
          setStatus(response.jsonResponse?.status || "");
          setHotelDetailsLoading(false);
          //   setHotelDetails(response.jsonResponse);
          setHotelImages(response.jsonResponse?.hotel_image || null);
        } else if (response.output === -401) {
          handleLogout();
          return;
        } else {
          setHotelDetailsLoading(false);
          return null;
        }
        setHotelDetailsLoading(false);
      }
    };
    if (selectedHotelId) {
      getHotelDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHotelId]);

  const handleImageUpload = (uploadedFiles: File[]) => {
    setImages(uploadedFiles);
  };

  const handleDelteImage = async (imageId: string) => {
    if (selectedHotelId) {
      setHotelDetailsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/delete-image`,
        { public_id: imageId, hotelId: selectedHotelId, type: "hotel" },
        {
          headers: authHeader(),
        }
      );
      const responseData = response.data;
      if (responseData.output === 1) {
        toast.success(responseData.message);
        const newImages = hotelImages?.filter((image) => image !== imageId);
        setHotelImages(newImages || null);
        setHotelDetailsLoading(false);
      } else if (responseData.output === -401) {
        handleLogout();
        return;
      } else {
        setHotelDetailsLoading(false);
        return null;
      }
      setHotelDetailsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center bg-black bg-opacity-70 z-50 max-sm:items-center"
      onClick={() => onClose()}
    >
      <div
        className="relative bg-white dark:bg-gray-800  shadow-lg rounded-md max-sm:px-1 w-full max-w-5xl max-sm:w-11/12 h-4/5 top-8 max-sm:h-fit max-sm:top-0 md:h-fit"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          className="absolute top-2 right-2 rounded-full size-6 border-[1.5px] border-black dark:border-white dark:text-white max-sm:dark:text-black text-base p-0 m-0 text-gray-500 hover:text-gray-800 dark:hover:text-white max-sm:bg-white scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600"
          onClick={() => onClose()}
        >
          &times;
        </button>
        <h2 className="font-semibold text-2xl bg-slate-200 w-full p-2 rounded-md">
          Create update hotel
        </h2>
        {hotelDetailsLoading ? (
          <div className="bg-gray-100 dark:bg-gray-800 flex items-center justify-center h-[90vh]">
            <ButtonLoading />
          </div>
        ) : (
          <form
            onSubmit={formik.handleSubmit}
            className="p-4 bg-gray-100 dark:bg-gray-800 flex flex-col gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 max-h-[90vh]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-2 ">
              <div className="flex gap-1 flex-col ">
                <label className=" text-sm font-semibold text-black dark:text-white ">
                  Hotel Name{" "}
                </label>
                <Input
                  type="text"
                  className="text-sm text-gray-900 bg-gray-100 rounded-md p-3"
                  placeholder="Enter Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="name"
                  maxLength={50}
                  required
                />
                {formik.errors.name && formik.touched.name && (
                  <Error error={formik.errors.name} />
                )}
              </div>
              <div className="flex gap-1 flex-col ">
                <label className=" text-sm font-semibold text-black dark:text-white ">
                  Hotel Mobile{" "}
                </label>
                <Input
                  type="tel"
                  className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3"
                  placeholder="Enter Number"
                  value={formik.values.contact_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="contact_number"
                  maxLength={10}
                  minLength={10}
                  required
                />
                {formik.errors.contact_number &&
                  formik.touched.contact_number && (
                    <Error error={formik.errors.contact_number} />
                  )}
              </div>
              <div className="flex gap-1 flex-col ">
                <label className=" text-sm font-semibold text-black dark:text-white ">
                  Hotel Email{" "}
                </label>
                <Input
                  type="email"
                  className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3"
                  placeholder="Enter Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                  required
                />
                {formik.errors.email && formik.touched.email && (
                  <Error error={formik.errors.email} />
                )}
              </div>
              <div className="flex gap-1 flex-col ">
                <label className=" text-sm font-semibold text-black dark:text-white ">
                  Hotel Owner Name{" "}
                </label>
                <Input
                  type="text"
                  className="text-sm text-gray-900 bg-gray-100 rounded-md p-3"
                  placeholder="Enter Owner Name"
                  value={formik.values.owner_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="owner_name"
                  required
                  maxLength={50}
                />
                {formik.errors.owner_name && formik.touched.owner_name && (
                  <Error error={formik.errors.owner_name} />
                )}
              </div>
              <div className="flex gap-1 flex-col ">
                <label className=" text-sm font-semibold text-black dark:text-white ">
                  Postal code{" "}
                </label>
                <Input
                  type="tel"
                  className="text-sm text-gray-900 bg-gray-100 rounded-md p-3"
                  placeholder="Enter City"
                  value={formik.values.postal_code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="postal_code"
                  maxLength={6}
                />
                {formik.errors.postal_code && formik.touched.postal_code && (
                  <Error error={formik.errors.postal_code} />
                )}
              </div>
              <SingleSelect
                value={status}
                setValue={setStatus}
                option={UserStatusIF}
                label="Hotel Status"
              />
              <div className="flex gap-1 flex-col ">
                <label className=" text-sm font-semibold text-black dark:text-white ">
                  Hotel Address{" "}
                </label>
                <Textarea
                  className="text-sm text-gray-900 bg-gray-100 rounded-md p-3"
                  placeholder="Enter Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="address"
                  required
                  maxLength={100}
                  rows={5}
                />
                {formik.errors.address && formik.touched.address && (
                  <Error error={formik.errors.address} />
                )}
              </div>
              <div className="flex gap-1 flex-col ">
                <label className=" text-sm font-semibold text-black dark:text-white ">
                  Hotel Description
                </label>
                <Textarea
                  className="text-sm text-gray-900 bg-gray-100 rounded-md p-3"
                  placeholder="Enter Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="description"
                  maxLength={500}
                  required
                  rows={5}
                />
              </div>

              <div className="flex gap-1 flex-col ">
                <label className=" text-sm font-semibold text-black dark:text-white ">
                  Policies
                </label>
                <Textarea
                  className="text-sm text-gray-900 bg-gray-100 rounded-md p-3"
                  placeholder="Enter Policies"
                  value={formik.values.policies}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="policies"
                  rows={5}
                />
                <p className="text-xs my-1 text-gray-500">
                  Seprate your value with <span className="text-xs">new line</span>
                </p>
              </div>
              <div className="flex gap-1 flex-col ">
                <label className=" text-sm font-semibold text-black dark:text-white ">
                  Cancelation Policy
                </label>
                <Textarea
                  className="text-sm text-gray-900 bg-gray-100 rounded-md p-3"
                  placeholder="Enter Cancelation Policy"
                  value={formik.values.cancellation_policy}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="cancellation_policy"
                  rows={5}
                />
                <p className="text-xs my-1 text-gray-500">
                  Seprate your value with <span className="text-xs">new line</span>
                </p>
              </div>
              {selectedHotelId && (
                <div className="flex gap-1 flex-col ">
                  <ImageUploader
                    existingImages={hotelImages || []}
                    onUpload={handleImageUpload}
                    onDelete={handleDelteImage}
                  />
                </div>
              )}
            </div>
            {ErrorMessage && (
              <div className="flex justify-center">
                <Error error={ErrorMessage} />
              </div>
            )}
            <button
              type="submit"
              className="bg-primaryblue text-white p-2 rounded-md w-1/2 mx-auto text-center flex justify-center "
              disabled={isloading}
            >
              {isloading ? <ButtonLoading /> : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateUpdateHotel;
