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
        <h2 className="font-semibold text-2xl bg-slate-200 dark:bg-primaryblue w-full p-2 rounded-md">
          Create update Room
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
                <SingleSelect
                  value={hotel_id}
                  setValue={setHotel_id}
                  option={hotelNameData}
                  label=" Hotel Name"
                />
                {isFormSubmit && !hotel_id.length && (
                  <div className="flex justify-center">
                    <Error error={"Please select value !"} />
                  </div>
                )}
              </div>
              <div className="flex gap-1 flex-col ">
                <SingleSelect
                  value={room_type}
                  setValue={setRoom_Type}
                  option={RoomTypeIF}
                  label="Room Type"
                />
                {isFormSubmit && !room_type.length && (
                  <div className="flex justify-center">
                    <Error error={"Please select value !"} />
                  </div>
                )}
              </div>

              {/* <SingleSelect
                value={status}
                setValue={setStatus}
                option={UserStatusIF}
                label="Hotel Status"
                /> */}
              <div className="flex gap-1 flex-col ">
                <label className=" text-sm font-semibold text-black dark:text-white ">
                  Room Number{" "}
                </label>
                <Input
                  type="tel"
                  className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3"
                  placeholder="Enter Number"
                  value={formik.values.room_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="room_number"
                  maxLength={5}
                  pattern="[0-9]*"
                  required
                />
                <p className="text-xs my-0 text-gray-500">
                  only number allowed !
                </p>
              </div>
              <div className="flex gap-1 flex-col ">
                <label className=" text-sm font-semibold text-black dark:text-white ">
                  Floor Number{" "}
                </label>
                <Input
                  type="tel"
                  className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3"
                  placeholder="Enter Number"
                  value={formik.values.floor_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="floor_number"
                  maxLength={2}
                  required
                  pattern="[0-9]*"
                />
                <p className="text-xs my-0 text-gray-500">
                  only number allowed !
                </p>
              </div>
              <div className="flex gap-1 flex-col ">
                <SingleSelect
                  value={bed_type}
                  setValue={setBed_type}
                  option={BedTypeIF}
                  label="Room Type"
                />
                {isFormSubmit && !room_type.length && (
                  <div className="flex justify-center">
                    <Error error={"Please select value !"} />
                  </div>
                )}
              </div>
              <div className="flex gap-1 flex-col ">
                <SingleSelect
                  value={max_occupancy}
                  setValue={setMax_occupancy}
                  option={MaxOccupancyIF}
                  label="Max Occupancy"
                />
                {isFormSubmit && !room_type.length && (
                  <div className="flex justify-center">
                    <Error error={"Please select value !"} />
                  </div>
                )}
              </div>
              <div className="flex gap-1 flex-col ">
                <SingleSelect
                  value={availability_status}
                  setValue={setavailability_status}
                  option={AvailabilityStatusIF}
                  label="Availability Status"
                />
                {isFormSubmit && !room_type.length && (
                  <div className="flex justify-center">
                    <Error error={"Please select value !"} />
                  </div>
                )}
              </div>


              <div className="flex gap-1 flex-col ">
                <label className=" text-sm font-semibold text-black dark:text-white ">
                  Price per Night{" "}
                </label>
                <Input
                  type="tel"
                  className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3"
                  placeholder="Enter Price Rs"
                  value={formik.values.price_per_night}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="price_per_night"
                  maxLength={5}
                  required
                  pattern="[0-9]*"
                />
                <p className="text-xs my-0 text-gray-500">
                  only number allowed !
                </p>
              </div>

              <div className="flex gap-1 flex-col ">
                <label className=" text-sm font-semibold text-black dark:text-white ">
                  Check In Time
                </label>
                <DatePicker
                  selected={
                    formik.values.check_in_time
                      ? new Date(
                        new Date().setHours(
                          Number(formik.values.check_in_time.split(":")[0]) ||
                          12,
                          Number(formik.values.check_in_time.split(":")[1]) ||
                          0,
                          0,
                          0
                        )
                      )
                      : new Date(new Date().setHours(12, 0, 0, 0))
                  }
                  onChange={(date) => {
                    if (date) {
                      const hours = String(date.getHours()).padStart(2, "0");
                      const minutes = String(date.getMinutes()).padStart(
                        2,
                        "0"
                      );
                      formik.setFieldValue(
                        "check_in_time",
                        `${hours}:${minutes}`
                      );
                    }
                  }}
                  onBlur={formik.handleBlur}
                  name="check_in_time"
                  className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3 py-2 border outline-none border-slate-200 w-full"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  dateFormat="h:mm aa"
                />
              </div>
              <div className="flex gap-1 flex-col ">
                <label className=" text-sm font-semibold text-black dark:text-white ">
                  Check Out Time
                </label>
                <DatePicker
                  selected={
                    formik.values.check_out_time
                      ? new Date(
                        new Date().setHours(
                          Number(
                            formik.values.check_out_time.split(":")[0]
                          ) || 12,
                          Number(
                            formik.values.check_out_time.split(":")[1]
                          ) || 0,
                          0,
                          0
                        )
                      )
                      : new Date(new Date().setHours(12, 0, 0, 0))
                  }
                  onChange={(date) => {
                    if (date) {
                      const hours = String(date.getHours()).padStart(2, "0");
                      const minutes = String(date.getMinutes()).padStart(
                        2,
                        "0"
                      );
                      formik.setFieldValue(
                        "check_out_time",
                        `${hours}:${minutes}`
                      );
                    }
                  }}
                  onBlur={formik.handleBlur}
                  name="check_out_time"
                  className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3 py-2 border outline-none border-slate-200 w-full"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  dateFormat="h:mm aa"
                />
              </div>
              <div className="flex gap-1 flex-col ">
                <MultiSelect
                  value={amenities}
                  setValue={setAmenities}
                  option={AmenitiesList}
                  label="Amenities"
                />
                {isFormSubmit && !room_type.length && (
                  <div className="flex justify-center">
                    <Error error={"Please select value !"} />
                  </div>
                )}
              </div>
              <div className="flex gap-1 flex-col ">
                <label className=" text-sm font-semibold text-black dark:text-white ">
                  Room Description
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

              {selectedRoomId && (
                <div className="flex gap-1 flex-col ">
                  <ImageUploader
                    existingImages={roomImages || []}
                    onUpload={handleImageUpload}
                    onDelete={handleDelteImage}
                    label="Room Images"
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

export default CreateUpdateRoom;
