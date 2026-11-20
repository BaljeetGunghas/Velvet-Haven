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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CityOptions } from "@/components/Form/CityOptions";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";
import { X, Building2, Mail, Phone, MapPin, FileText, AlertCircle } from "lucide-react";

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
  const [selectedCity, setSelectedCity] = useState<string>("");
  const handleLogout = useHandleLogout();
  const [hotelDetailsLoading, setHotelDetailsLoading] = useState<boolean>(false);
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
        city: selectedCity,
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
        formData.append("city", selectedCity);
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
          setSelectedCity(response.jsonResponse?.city || "");
          setHotelDetailsLoading(false);
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
        { public_id: imageId, _id: selectedHotelId, type: "hotel" },
        {
          headers: authHeader(),
        }
      );
      const responseData = await response.data;

      if (responseData.output === 1) {
        toast.success(responseData.message);
        const newImages = hotelImages?.filter((image) => image !== imageId);
        setHotelImages(newImages || null);
        setHotelDetailsLoading(false);
      } else if (responseData.output === -401) {
        handleLogout();
        return;
      } else if (responseData.output === 0) {
        toast.error(responseData.message || "Something went wrong!");
        setHotelDetailsLoading(false);
        return null;
      }
      setHotelDetailsLoading(false);
    }
  };

  const errorCount = Object.keys(formik.errors).filter((key) => formik.errors[key as keyof typeof formik.errors]).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-50 p-4"
      onClick={() => onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white dark:bg-slate-800 shadow-2xl rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-green to-primary-green/90 dark:from-primary-green dark:to-primary-green/80 p-6 flex items-center justify-between border-b-2 border-accent-gold/20">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-accent-gold" />
            <div>
              <h2 className="text-2xl font-playfair font-bold text-white">
                {selectedHotelId ? "Update Hotel" : "Create New Hotel"}
              </h2>
              <p className="text-sm text-white/80">
                {selectedHotelId ? "Modify hotel details and information" : "Add a new property to your portfolio"}
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onClose()}
            className="p-2 hover:bg-white/20 rounded-full transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        {/* Error Badge */}
        {errorCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-6 mt-4 p-3 rounded-lg bg-red-50/80 dark:bg-red-950/40 border border-red-200/50 dark:border-red-800/50 flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <span className="text-sm font-semibold text-red-700 dark:text-red-300">
              {errorCount} field{errorCount !== 1 ? "s" : ""} require attention
            </span>
          </motion.div>
        )}

        {/* Content */}
        {hotelDetailsLoading ? (
          <div className="flex items-center justify-center h-96">
            <ButtonLoading />
          </div>
        ) : (
          <form
            onSubmit={formik.handleSubmit}
            className="overflow-y-auto max-h-[calc(90vh-140px)] p-8 space-y-6"
          >
            {/* Basic Information Section */}
            <div>
              <h3 className="text-lg font-bold text-primary-green dark:text-white mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-accent-gold" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hotel Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Hotel Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter hotel name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="name"
                    maxLength={50}
                    required
                    className="text-sm border-2 border-slate-200/50 dark:border-slate-700/50 rounded-lg focus:border-accent-gold"
                  />
                  {formik.errors.name && formik.touched.name && (
                    <Error error={formik.errors.name} />
                  )}
                </div>

                {/* Owner Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Owner Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter owner name"
                    value={formik.values.owner_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="owner_name"
                    maxLength={50}
                    required
                    className="text-sm border-2 border-slate-200/50 dark:border-slate-700/50 rounded-lg focus:border-accent-gold"
                  />
                  {formik.errors.owner_name && formik.touched.owner_name && (
                    <Error error={formik.errors.owner_name} />
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Hotel Email *
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="email"
                    required
                    className="text-sm border-2 border-slate-200/50 dark:border-slate-700/50 rounded-lg focus:border-accent-gold"
                  />
                  {formik.errors.email && formik.touched.email && (
                    <Error error={formik.errors.email} />
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Hotel Phone *
                  </label>
                  <Input
                    type="tel"
                    placeholder="Enter 10-digit phone number"
                    value={formik.values.contact_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="contact_number"
                    maxLength={10}
                    minLength={10}
                    required
                    className="text-sm border-2 border-slate-200/50 dark:border-slate-700/50 rounded-lg focus:border-accent-gold"
                  />
                  {formik.errors.contact_number && formik.touched.contact_number && (
                    <Error error={formik.errors.contact_number} />
                  )}
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    City *
                  </label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="text-sm border-2 border-slate-200/50 dark:border-slate-700/50 rounded-lg focus:border-accent-gold">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-800 z-50">
                      <SelectGroup>
                        <SelectLabel>Select City</SelectLabel>
                        {CityOptions().map((city, i) => (
                          <SelectItem key={city.value + i} value={city.value}>
                            <div className="flex gap-2 items-center">
                              <FaLocationDot className="text-primary-green h-4 w-4" />
                              {city.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Postal Code */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Postal Code
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter postal code"
                    value={formik.values.postal_code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="postal_code"
                    maxLength={6}
                    className="text-sm border-2 border-slate-200/50 dark:border-slate-700/50 rounded-lg focus:border-accent-gold"
                  />
                  {formik.errors.postal_code && formik.touched.postal_code && (
                    <Error error={formik.errors.postal_code} />
                  )}
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Status
                  </label>
                  <SingleSelect
                    value={status}
                    setValue={setStatus}
                    option={UserStatusIF}
                    label=""
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-lg font-bold text-primary-green dark:text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent-gold" />
                Location Details
              </h3>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  Hotel Address *
                </label>
                <Textarea
                  placeholder="Enter complete hotel address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="address"
                  maxLength={200}
                  rows={3}
                  required
                  className="text-sm border-2 border-slate-200/50 dark:border-slate-700/50 rounded-lg focus:border-accent-gold"
                />
                {formik.errors.address && formik.touched.address && (
                  <Error error={formik.errors.address} />
                )}
              </div>
            </div>

            {/* Description & Details */}
            <div>
              <h3 className="text-lg font-bold text-primary-green dark:text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent-gold" />
                Description & Policies
              </h3>
              <div className="space-y-6">
                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Hotel Description *
                  </label>
                  <Textarea
                    placeholder="Describe your hotel, amenities, and unique features"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="description"
                    maxLength={2000}
                    rows={4}
                    required
                    className="text-sm border-2 border-slate-200/50 dark:border-slate-700/50 rounded-lg focus:border-accent-gold"
                  />
                  {formik.values.description.length > 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
                      {formik.values.description.length} / 2000 characters
                    </p>
                  )}
                </div>

                {/* Policies */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Policies (One per line)
                  </label>
                  <Textarea
                    placeholder="Enter each policy on a new line&#10;Example:&#10;24-hour room service&#10;Free WiFi&#10;Pet friendly"
                    value={formik.values.policies}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="policies"
                    rows={3}
                    className="text-sm border-2 border-slate-200/50 dark:border-slate-700/50 rounded-lg focus:border-accent-gold"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Separate each policy with a new line
                  </p>
                </div>

                {/* Cancellation Policy */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Cancellation Policy (One per line)
                  </label>
                  <Textarea
                    placeholder="Enter cancellation terms, one per line&#10;Example:&#10;Free cancellation up to 7 days before&#10;50% refund for 3-7 days before&#10;No refund within 3 days"
                    value={formik.values.cancellation_policy}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="cancellation_policy"
                    rows={3}
                    className="text-sm border-2 border-slate-200/50 dark:border-slate-700/50 rounded-lg focus:border-accent-gold"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Separate each policy with a new line
                  </p>
                </div>
              </div>
            </div>

            {/* Images */}
            {selectedHotelId && (
              <div>
                <h3 className="text-lg font-bold text-primary-green dark:text-white mb-4">
                  Hotel Images
                </h3>
                <ImageUploader
                  existingImages={hotelImages || []}
                  onUpload={handleImageUpload}
                  onDelete={handleDelteImage}
                />
              </div>
            )}

            {/* Error Message */}
            {ErrorMessage && (
              <div className="p-4 rounded-lg bg-red-50/80 dark:bg-red-950/40 border border-red-200/50 dark:border-red-800/50">
                <Error error={ErrorMessage} />
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 justify-end pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onClose()}
                className="px-8 py-3 rounded-lg bg-slate-200/80 dark:bg-slate-700/80 hover:bg-slate-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 font-bold transition-all"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isloading || errorCount > 0}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-accent-gold/80 to-accent-gold/60 hover:from-accent-gold hover:to-accent-gold/80 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                {isloading ? (
                  <>
                    <ButtonLoading />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>
                    {selectedHotelId ? "Update Hotel" : "Create Hotel"}
                  </span>
                )}
              </motion.button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CreateUpdateHotel;
