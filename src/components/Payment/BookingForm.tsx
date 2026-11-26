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
            <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8 p-4 sm:p-6 md:p-8 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl md:rounded-3xl mt-10 mx-auto max-w-7xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Left Side: Booking Inputs */}
                <div className="w-full md:flex-1">
                    <h2 className="text-2xl md:text-3xl font-playfair font-bold text-primary-green dark:text-white mb-6">Book Your Stay</h2>

                    {/* Check-in / Check-out */}
                    <label className="block text-xs uppercase tracking-widest font-semibold text-gray-600 dark:text-gray-400 mb-3">Check-in / Check-out</label>
                    <div className="flex items-center">
                        <DatePickerWithRange dateRange={date} setDate={setDate} />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-2 block">
                        Check in: {room.check_in_time} | Check out: {room.check_out_time}
                    </span>

                    {/* Number of Guests */}
                    <label className="block text-xs uppercase tracking-widest font-semibold text-gray-600 dark:text-gray-400 mb-3 mt-6">Number of Guests</label>
                    <input
                        type="number"
                        min={1}
                        max={room.max_occupancy}
                        className="w-full px-4 py-2 sm:py-3 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/20 transition-all"
                        value={`${guests}`}
                        placeholder="Number of guests"
                        onChange={(e) => setGuests(Math.min(Math.max(parseInt(e.target.value) || 1, 1), room.max_occupancy))}
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-2 block">
                        Maximum {room.max_occupancy} guest{room.max_occupancy !== 1 ? 's' : ''}
                    </span>
                </div>

                {/* Divider - Responsive */}
                <div className="block md:hidden w-full h-px bg-gradient-to-r from-accent-gold/0 via-accent-gold/30 to-accent-gold/0 my-2"></div>
                <div className="hidden md:block w-px bg-gradient-to-b from-accent-gold/0 via-accent-gold/30 to-accent-gold/0"></div>

                {/* Right Side: Pricing Summary */}
                <div className="w-full md:flex-1 bg-gradient-to-br from-accent-gold/5 to-accent-gold/0 dark:from-slate-700/40 dark:to-slate-700/20 p-4 sm:p-6 rounded-2xl border border-accent-gold/20 dark:border-slate-600/50">
                    <h3 className="text-lg md:text-2xl font-playfair font-bold text-primary-green dark:text-white mb-4">
                        {room.hotel_name}
                        <span className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-normal block">Room {room.room_number}</span>
                    </h3>

                    <div className="space-y-3 text-gray-700 dark:text-gray-300">
                        {/* Price Breakdown */}
                        <div className="flex justify-between items-center text-sm md:text-base">
                            <p className="text-gray-600 dark:text-gray-400">Price per night:</p>
                            <span className="font-semibold text-gray-900 dark:text-white">₹{roomPrice?.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm md:text-base">
                            <p className="text-gray-600 dark:text-gray-400">Number of nights:</p>
                            <span className="font-semibold text-gray-900 dark:text-white">{nights}</span>
                        </div>

                        {/* Horizontal Line */}
                        <div className="h-px bg-gradient-to-r from-accent-gold/20 to-accent-gold/0 my-3"></div>

                        {/* Subtotal */}
                        <div className="flex justify-between items-center text-sm md:text-base">
                            <p className="text-gray-600 dark:text-gray-400">Subtotal:</p>
                            <span className="font-semibold text-gray-900 dark:text-white">₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>

                        {/* GST */}
                        <div className="flex justify-between items-center text-sm md:text-base">
                            <p className="text-gray-600 dark:text-gray-400">GST (18%):</p>
                            <span className="font-semibold text-accent-gold">₹{gst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>

                        {/* Horizontal Line */}
                        <div className="h-px bg-gradient-to-r from-accent-gold/20 to-accent-gold/0 my-3"></div>

                        {/* Total */}
                        <div className="flex justify-between items-center text-base md:text-xl font-playfair">
                            <p className="text-primary-green dark:text-white font-semibold">Total Amount:</p>
                            <span className="text-accent-gold font-bold">₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                    </div>

                    {/* Book Now Button - Mobile Optimized */}
                    <div className="mt-6 pt-4">
                        <Button
                            onClick={handlePayment}
                            disabled={!date.startDate || !date.endDate || guests <= 0 || paymentLoading}
                            className="w-full bg-gradient-to-r from-accent-gold to-accent-gold/90 text-white py-3 sm:py-4 px-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent-gold/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px]">
                            {paymentLoading ? (
                                <>
                                    <ButtonLoading />
                                    Processing...
                                </>
                            ) : (
                                "Proceed to Payment"
                            )}
                        </Button>
                    </div>
                </div>

            </div>
            <ModalLayout
                isOpen={isRegistrationModelOpen && !user?.id}
                onClose={setIsRegistrationModelOpen}
            >
                <LoginRegistrationModel onClose={() => setIsRegistrationModelOpen(false)} />
            </ModalLayout>
        </>
    );
};

export default BookingForm;
