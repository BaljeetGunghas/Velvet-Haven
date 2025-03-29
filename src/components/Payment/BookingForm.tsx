"use client";

import { RoomDetails } from "@/app/Room-details/page";
import Image from "next/image";
import { useState } from "react";
// import { format } from "date-fns";
import calendar from "@/asset/icon/calendar.svg";
import DatePickerWithRange from "../Calendar/DatePicker";
import { Range } from "react-date-range";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { authHeader } from "@/app/Auth/AuthHeader/authHeader";
import ButtonLoading from "../Loading/ButtonLoading";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import ModalLayout from "../ModelLayout/Modellayout";
import LoginRegistrationModel from "../LoginRegModel/LoginRegistrationModel";

// Extend the Window interface to include Razorpay
declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Razorpay: new (options: any) => { open: () => void };
    }
}


// Define the CustomRange type to align with the Range interface
interface CustomRange {
    startDate?: Date;
    endDate?: Date;
    key: string;
}

const defaultDateRange: CustomRange = {
    startDate: undefined,
    endDate: undefined,
    key: "selection",
};


interface BookingFormProps {
    room: RoomDetails;
}

const BookingForm: React.FC<BookingFormProps> = ({ room }) => {
    const { user } = useSelector((state: RootState) => state.auth as { user: { id: string | null } });
    const [date, setDate] = useState<Range>(defaultDateRange);
    const [guests, setGuests] = useState<number>(1);
    const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
    const [isRegistrationModelOpen, setIsRegistrationModelOpen] =
        useState<boolean>(false);

    const roomPrice = room.price_per_night;
    const nights = date.startDate && date.endDate ? Math.max((new Date(date.endDate).getTime() - new Date(date.startDate).getTime()) / (1000 * 60 * 60 * 24), 1) : 1;
    const subtotal = roomPrice * nights;
    const gst = subtotal * 0.18;
    const totalAmount = subtotal + gst;


    const router = useRouter();

    const handlePayment = async () => {
        if (user?.id) {
            setPaymentLoading(true);
            try {
                // Step 1: Request payment order from backend
                const createPaymentData = {
                    room_id: room._id,
                    hotel_id: room.hotel_id,
                    check_in_date: date.startDate,
                    check_out_date: date.endDate,
                    total_guests: guests,
                };
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payment/create-payment`,
                    createPaymentData,
                    {
                        headers: authHeader(),
                    }
                );

                const { order_id, amount, currency, booking_id } = response.data.jsonResponse;

                // Step 2: Configure Razorpay options
                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Public Key
                    amount,
                    currency,
                    order_id,
                    name: "Hotel Booking",
                    description: "Complete your booking payment",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    handler: async (paymentResponse: any) => {
                        // Step 3: Send payment response to backend for verification
                        const verifyRes = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payment/verify-payment`, {
                            razorpay_order_id: paymentResponse.razorpay_order_id,
                            razorpay_payment_id: paymentResponse.razorpay_payment_id,
                            razorpay_signature: paymentResponse.razorpay_signature,
                            booking_id,
                        },
                            {
                                headers: authHeader(),
                            }
                        );

                        if (verifyRes.data.success) {
                            router.push(`/Payment-successfull?booking_id=${verifyRes.data.booking._id}`);
                        } else {
                            // ❌ Payment failed → Redirect to Failure Page
                            router.push("/Payment-failure");
                        }
                    },
                    modal: {
                        ondismiss: function () {
                            // ❌ User closed the payment modal
                            router.push("/Payment-failure");
                        }
                    }
                };

                // Step 4: Open Razorpay modal
                const razorpay = new window.Razorpay(options);
                razorpay.open();
                setPaymentLoading(false);
            } catch (error) {
                setPaymentLoading(false);
                console.error("Payment Error:", error);
                router.push("/Payment-failure"); // Redirect on error
            }
        } else {
            setIsRegistrationModelOpen(true);
        }
    };





    return (
        <>
            <div className="flex flex-col md:flex-row gap-6 p-6 bg-white dark:bg-bannerbg  border border-gray-200 rounded-lg mt-10 mx-auto">
                {/* Left Side: Booking Inputs */}
                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Book Your Stay</h2>

                    <label className="block text-sm font-semibold text-gray-600 dark:text-slate-200 my-2">Check-in / Check-out</label>
                    <div className="bg-white dark:bg-bannerbg flex items-center border rounded-md max-sm:w-full">
                        <Image src={calendar} alt="calendar icon" className="w-8 h-8 dark:rounded-full size-6 dark:filter dark:invert dark:brightness-0 dark:p-1" />
                        <DatePickerWithRange dateRange={date} setDate={setDate} />
                    </div>
                    <span className="text-xs text-gray-400 font-semibold ">Check in time: {room.check_in_time} - Check out time: {room.check_out_time}</span>
                    {/* Number of Guests */}
                    <label className="block text-sm font-semibold text-gray-600 dark:text-slate-200 my-2">Guests</label>
                    <input
                        type="number"
                        min={1}
                        className="w-full p-2 border rounded-md dark:text-slate-200 dark:bg-transparent "
                        value={`${guests}`}
                        placeholder="Number of guests"
                        max={room.max_occupancy}
                        onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                    />
                    <span className="text-xs text-gray-400 font-semibold ">Max Guests :{room.max_occupancy} </span>
                </div>
                {/* Divider */}
                <div className="hidden md:block w-px bg-gray-300 mx-4"></div>
                {/* Right Side: Pricing Summary */}
                <div className="flex-1  dark:bg-foreground  rounded-2xl">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-200">
                        {room.hotel_name} <span className="text-gray-500 dark:text-slate-200">({room.room_number})</span>
                    </h3>

                    <div className="mt-4 space-y-3 text-gray-600 dark:text-slate-200">
                        <div className="flex justify-between">
                            <p>Price per night:</p>
                            <span className="font-medium text-gray-900 dark:text-slate-200">₹{roomPrice}</span>
                        </div>
                        <div className="flex justify-between">
                            <p>Nights:</p>
                            <span className="font-medium">{nights}</span>
                        </div>
                        <div className="flex justify-between">
                            <p>Subtotal:</p>
                            <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <p>GST (18%):</p>
                            <span className="font-medium text-red-600">₹{gst.toFixed(2)}</span>
                        </div>
                        <hr className="my-3 border-gray-300" />
                        <div className="flex justify-between text-lg font-semibold">
                            <p>Total:</p>
                            <span className="text-blue-600">₹{totalAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Book Now Button */}

                    <div className="flex justify-center items-center mt-3 pt-4 w-full gap-2 border-t border-gray-300">
                        <Button
                            onClick={handlePayment}
                            disabled={!date.startDate || !date.endDate || guests <= 0 || paymentLoading}
                            className="bg-primaryblue text-white py-3 rounded-md text-sm transition active:scale-95 shadow-lg">
                            {paymentLoading ? <ButtonLoading /> : "Proced to Payment"}
                        </Button>
                    </div>
                </div>

            </div>
            <ModalLayout
                isOpen={isRegistrationModelOpen && !user?.id}
                onClose={setIsRegistrationModelOpen}
            >
                <LoginRegistrationModel />
            </ModalLayout>
        </>
    );
};

export default BookingForm;
