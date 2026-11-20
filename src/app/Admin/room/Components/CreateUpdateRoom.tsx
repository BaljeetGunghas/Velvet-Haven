"use client";

import { authHeader } from "@/app/Auth/AuthHeader/authHeader";
import Error from "@/components/Error/Error";
import { useHandleLogout } from "@/Hooks/handleLogout";
import ButtonLoading from "@/components/Loading/ButtonLoading";
import { SingleSelect } from "@/components/Select/SingleSelect";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AmenitiesList,
  AvailabilityStatusIF,
  BedTypeIF,
  MaxOccupancyIF,
  RoomTypeIF,
} from "@/Types/enums";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ImageUploader from "../../../../components/UploadMultiImage/ImageUpload";
import { RoomIF } from "../../Components/Tabels/RoomTable";
import { useHandleGetHotelRoomDetails } from "@/Hooks/room";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MultiSelect } from "@/components/Select/MultiSelect";
import { motion } from "framer-motion";
import { X, DoorOpen, AlertCircle } from "lucide-react";

interface roomResponseDataIF {
  output: number;
  message: string;
  jsonResponse: RoomIF | null;
}

interface Props {
  onClose: () => void;
  handleRefress: () => void;
  selectedRoomId?: string;
}

const CreateUpdateRoom: React.FC<Props> = ({
  onClose,
  handleRefress,
  selectedRoomId,
}) => {
  const [isloading, setIsLoading] = useState<boolean>(false);
  const handleGetHotelRoomDetails = useHandleGetHotelRoomDetails;

  const [ErrorMessage, setErrorMessage] = useState<string>("");
  const handleLogout = useHandleLogout();
  const [hotelDetailsLoading, setHotelDetailsLoading] =
    useState<boolean>(false);
  const [roomImages, setRoomImages] = useState<string[] | null>(null);
  const [images, setImages] = useState<File[] | null>(null);

  const [hotelNameData, setHotelNameData] = useState<
    { value: string; label: string }[]
  >([]);

  const [hotel_id, setHotel_id] = useState<string>("");
  const [room_type, setRoom_Type] = useState<string>("");
  const [max_occupancy, setMax_occupancy] = useState<string>("");
  const [bed_type, setBed_type] = useState<string>("");
  const [availability_status, setavailability_status] = useState<string>("");
  const [amenities, setAmenities] = useState<(string | number)[]>([]);
  const [isFormSubmit, setIsFormSubmit] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      room_number: "",
      price_per_night: "",
      floor_number: "",
      description: "",
      check_in_time: "",
      check_out_time: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      setIsFormSubmit(true);
      const payload = {
        ...values,
        room_number: +values.room_number,
        price_per_night: +values.price_per_night,
        floor_number: +values.floor_number,
        hotel_id: hotel_id,
        room_type: room_type,
        max_occupancy: +max_occupancy,
        bed_type,
        availability_status: availability_status,
        amenities: JSON.stringify(amenities),
      };
      setTimeout(() => {
        setIsLoading(false);
      }, 15000);
      if (!selectedRoomId) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel-room/create-room`,
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
        formData.append("room_id", selectedRoomId);
        formData.append("room_number", values.room_number);
        formData.append("price_per_night", values.price_per_night);
        formData.append("description", values.description);
        formData.append("check_in_time", values.check_in_time);
        formData.append("check_out_time", values.check_out_time);
        formData.append("floor_number", values.floor_number);
        formData.append("hotel_id", hotel_id);
        formData.append("room_type", room_type);
        formData.append("max_occupancy", max_occupancy);
        formData.append("bed_type", bed_type);
        formData.append("availability_status", availability_status);
        amenities.forEach((a) => {
          formData.append("amenities[]", a.toString());
        });

        if (images) {
          images?.forEach((image) => {
            formData.append("images", image);
          });
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 15000);
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel-room/update-roomby-roomid`,
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

  const getHostHotelName = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/host/getHostHotelName`,
        {},
        {
          headers: authHeader(),
        }
      );

      const responseData = response.data;
      if (responseData.output === 1) {
        const formattedData = responseData.jsonResponse.map(
          (h: { _id: string; name: string }) => ({
            value: h._id,
            label: h.name,
          })
        );
        setHotelNameData(formattedData);
      } else {
        setHotelNameData([]);
      }
    } catch (error) {
      console.error("Error fetching hotel names:", error);
    }
  };

  useEffect(() => {
    const getHotelDetails = async () => {
      if (selectedRoomId) {
        setHotelDetailsLoading(true);
        const response: roomResponseDataIF = await handleGetHotelRoomDetails(
          selectedRoomId
        );
        if (response.output === 1) {
          setHotelDetailsLoading(false);
          formik.setValues({
            room_number: response.jsonResponse?.room_number + "" || "",
            price_per_night: response.jsonResponse?.price_per_night + "" || "",
            floor_number: response.jsonResponse?.floor_number + "" || "",
            description: response.jsonResponse?.description || "",
            check_in_time: response.jsonResponse?.check_in_time || "",
            check_out_time: response.jsonResponse?.check_out_time || "",
          });
          setHotel_id(response.jsonResponse?.hotel_id._id || "");
          setRoom_Type(response.jsonResponse?.room_type || "");
          setMax_occupancy(response.jsonResponse?.max_occupancy + "" || "");
          setBed_type(response.jsonResponse?.bed_type || "");
          setavailability_status(
            response.jsonResponse?.availability_status || ""
          );
          setAmenities(
            Array.isArray(response.jsonResponse?.amenities)
              ? response.jsonResponse.amenities
              : []
          );
          setRoomImages(response.jsonResponse?.room_images || null);
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
    if (hotelNameData.length === 0) {
      getHostHotelName();
      if (selectedRoomId) {
        getHotelDetails();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoomId]);

  const handleImageUpload = (uploadedFiles: File[]) => {
    setImages(uploadedFiles);
  };

  const handleDelteImage = async (imageId: string) => {
    if (selectedRoomId) {
      setHotelDetailsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/delete-image`,
        { public_id: imageId, _id: selectedRoomId, type: "room" },
        {
          headers: authHeader(),
        }
      );
      const responseData = response.data;
      if (responseData.output === 1) {
        toast.success(responseData.message);
        const newImages = roomImages?.filter((image) => image !== imageId);
        setRoomImages(newImages || null);
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex justify-center items-center bg-black/70 backdrop-blur-md z-50 p-4"
      onClick={() => onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 shadow-2xl rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Premium Header with Gradient */}
        <div className="bg-gradient-to-r from-primary-green via-primary-green/95 to-primary-green/90 dark:from-primary-green dark:via-primary-green/90 dark:to-primary-green/80 p-8 sticky top-0 z-10 flex items-center justify-between border-b-4 border-accent-gold/50">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="p-3 rounded-xl bg-accent-gold/25 backdrop-blur-sm flex-shrink-0">
              <DoorOpen className="w-8 h-8 text-accent-gold" />
            </div>
            <div className="min-w-0">
              <h2 className="text-3xl font-playfair font-bold text-white drop-shadow-lg truncate">
                {selectedRoomId ? "Update Room" : "Create Room"}
              </h2>
              <p className="text-sm text-white/90 mt-1">
                {selectedRoomId ? "Modify room details" : "Add a new room to your hotel"}
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onClose()}
            className="p-3 hover:bg-white/20 rounded-full transition-all backdrop-blur-sm flex-shrink-0"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        {hotelDetailsLoading ? (
          <div className="flex items-center justify-center flex-1">
            <ButtonLoading />
          </div>
        ) : (
          <form
            onSubmit={formik.handleSubmit}
            className="p-8 space-y-8 overflow-y-auto overflow-x-hidden flex-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
          >
            {/* Error Message */}
            {ErrorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-100/80 dark:bg-red-950/30 border-2 border-red-300/50 dark:border-red-800/50 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-red-700 dark:text-red-300">{ErrorMessage}</p>
              </motion.div>
            )}

            {/* Section 1: Hotel & Room Basic Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-playfair font-bold text-primary-green dark:text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-accent-gold rounded-full" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Hotel Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest block">
                    Hotel Name *
                  </label>
                  <div className="relative">
                    <SingleSelect
                      value={hotel_id}
                      setValue={setHotel_id}
                      option={hotelNameData}
                      label=""
                    />
                    {isFormSubmit && !hotel_id.length && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">Please select a hotel</p>
                    )}
                  </div>
                </div>

                {/* Room Type */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest block">
                    Room Type *
                  </label>
                  <div className="relative">
                    <SingleSelect
                      value={room_type}
                      setValue={setRoom_Type}
                      option={RoomTypeIF}
                      label=""
                    />
                    {isFormSubmit && !room_type.length && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">Please select a room type</p>
                    )}
                  </div>
                </div>

                {/* Room Number */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest block">
                    Room Number *
                  </label>
                  <Input
                    type="number"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-accent-gold transition-colors"
                    placeholder="Enter room number"
                    value={formik.values.room_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="room_number"
                    maxLength={5}
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Only numbers allowed</p>
                </div>

                {/* Floor Number */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest block">
                    Floor Number *
                  </label>
                  <Input
                    type="number"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-accent-gold transition-colors"
                    placeholder="Enter floor number"
                    value={formik.values.floor_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="floor_number"
                    maxLength={2}
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Only numbers allowed</p>
                </div>

                {/* Bed Type */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest block">
                    Bed Type *
                  </label>
                  <SingleSelect
                    value={bed_type}
                    setValue={setBed_type}
                    option={BedTypeIF}
                    label=""
                  />
                </div>

                {/* Max Occupancy */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest block">
                    Max Occupancy *
                  </label>
                  <SingleSelect
                    value={max_occupancy}
                    setValue={setMax_occupancy}
                    option={MaxOccupancyIF}
                    label=""
                  />
                </div>
              </div>
            </motion.div>

            {/* Section 2: Pricing & Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-playfair font-bold text-primary-green dark:text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-accent-gold rounded-full" />
                Pricing & Availability
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Price per Night */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest block">
                    Price per Night (Rs) *
                  </label>
                  <Input
                    type="number"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-accent-gold transition-colors"
                    placeholder="Enter price"
                    value={formik.values.price_per_night}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="price_per_night"
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Only numbers allowed</p>
                </div>

                {/* Availability Status */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest block">
                    Availability Status *
                  </label>
                  <SingleSelect
                    value={availability_status}
                    setValue={setavailability_status}
                    option={AvailabilityStatusIF}
                    label=""
                  />
                </div>

                {/* Check In Time */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest block">
                    Check In Time *
                  </label>
                  <DatePicker
                    selected={
                      formik.values.check_in_time
                        ? new Date(
                            new Date().setHours(
                              Number(formik.values.check_in_time.split(":")[0]) || 12,
                              Number(formik.values.check_in_time.split(":")[1]) || 0,
                              0,
                              0
                            )
                          )
                        : new Date(new Date().setHours(12, 0, 0, 0))
                    }
                    onChange={(date) => {
                      if (date) {
                        const hours = String(date.getHours()).padStart(2, "0");
                        const minutes = String(date.getMinutes()).padStart(2, "0");
                        formik.setFieldValue("check_in_time", `${hours}:${minutes}`);
                      }
                    }}
                    onBlur={formik.handleBlur}
                    name="check_in_time"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white focus:outline-none focus:border-accent-gold transition-colors"
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    dateFormat="h:mm aa"
                  />
                </div>

                {/* Check Out Time */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest block">
                    Check Out Time *
                  </label>
                  <DatePicker
                    selected={
                      formik.values.check_out_time
                        ? new Date(
                            new Date().setHours(
                              Number(formik.values.check_out_time.split(":")[0]) || 12,
                              Number(formik.values.check_out_time.split(":")[1]) || 0,
                              0,
                              0
                            )
                          )
                        : new Date(new Date().setHours(12, 0, 0, 0))
                    }
                    onChange={(date) => {
                      if (date) {
                        const hours = String(date.getHours()).padStart(2, "0");
                        const minutes = String(date.getMinutes()).padStart(2, "0");
                        formik.setFieldValue("check_out_time", `${hours}:${minutes}`);
                      }
                    }}
                    onBlur={formik.handleBlur}
                    name="check_out_time"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white focus:outline-none focus:border-accent-gold transition-colors"
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    dateFormat="h:mm aa"
                  />
                </div>
              </div>
            </motion.div>

            {/* Section 3: Amenities & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-playfair font-bold text-primary-green dark:text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-accent-gold rounded-full" />
                Details & Amenities
              </h3>
              <div className="space-y-5">
                {/* Amenities */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest block">
                    Amenities
                  </label>
                  <MultiSelect
                    value={amenities}
                    setValue={setAmenities}
                    option={AmenitiesList}
                    label=""
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest block">
                    Room Description *
                  </label>
                  <Textarea
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-accent-gold transition-colors resize-none"
                    placeholder="Describe your room..."
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="description"
                    maxLength={500}
                    required
                    rows={5}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formik.values.description.length}/500 characters
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Section 4: Room Images (only for edit) */}
            {selectedRoomId && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-playfair font-bold text-primary-green dark:text-white flex items-center gap-2">
                  <div className="w-1 h-6 bg-accent-gold rounded-full" />
                  Room Images
                </h3>
                <ImageUploader
                  existingImages={roomImages || []}
                  onUpload={handleImageUpload}
                  onDelete={handleDelteImage}
                  label=""
                />
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4 justify-end pt-6 border-t-2 border-slate-200 dark:border-slate-700/50 sticky bottom-0 bg-gradient-to-t from-white dark:from-slate-900 to-white/80 dark:to-slate-900/80 px-2 py-4 -mx-8"
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onClose()}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-slate-300 to-slate-200 dark:from-slate-600 dark:to-slate-700 hover:from-slate-400 hover:to-slate-300 dark:hover:from-slate-500 dark:hover:to-slate-600 text-gray-800 dark:text-gray-100 font-bold shadow-md hover:shadow-lg transition-all border-2 border-slate-400/50 dark:border-slate-600/50"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={isloading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-accent-gold to-accent-gold/80 hover:from-accent-gold hover:to-accent-gold/90 disabled:from-accent-gold/60 disabled:to-accent-gold/50 text-white font-bold shadow-lg hover:shadow-2xl hover:shadow-accent-gold/40 transition-all flex items-center gap-2 disabled:opacity-50 border-2 border-accent-gold/50"
              >
                {isloading ? (
                  <>
                    <ButtonLoading />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>{selectedRoomId ? "Update Room" : "Create Room"}</span>
                )}
              </motion.button>
            </motion.div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CreateUpdateRoom;
