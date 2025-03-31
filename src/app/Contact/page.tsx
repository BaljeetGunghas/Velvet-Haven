"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import contactusImage from "@/asset/contactus.jpg";
import formBackground from "@/asset/contact-us-bg.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonLoading from "@/components/Loading/ButtonLoading";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitted(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/contactus/create-contactus`, formData)
      const responseData = response.data;
      if (responseData.output > 0) {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",  
        });
        setSubmitted(false)
        toast.success("Your message has been sent successfully");
      } else {
        setSubmitted(false);
        return toast.warning(responseData.message);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative">
      <Image
        src={formBackground}
        alt="Background"
        layout="fill"
        objectFit="cover"
        loading="lazy"
        className="absolute inset-0 w-full h-full z-0"
      />
      <div className="relative flex flex-col md:flex-row mt-5 shadow-lg rounded-2xl overflow-hidden max-w-5xl w-full bg-white dark:bg-foreground z-10">
        <div className="w-full md:w-1/2 h-72 md:h-auto md:block relative">
          <Image src={contactusImage} alt="Contact" layout="fill" loading="lazy" objectFit="cover" className="object-left" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 p-8 text-center  md:h-[38rem]"
        >
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-sm md:text-lg mb-6">Have questions or need assistance? Reach out to us, and we&apos;ll get back to you as soon as possible.</p>
          {submitted ? (
            <p className="text-green-400 font-semibold">Thank you! Your message has been sent.</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="border p-3 py-2 md:p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 bg-white border-gray-300 text-gray-900"
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="border p-3 py-2 md:p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 bg-white border-gray-300 text-gray-900"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="border p-3 py-2 md:p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 bg-white border-gray-300 text-gray-900"
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 bg-white border-gray-300 text-gray-900"
                onChange={handleChange}
                required
                maxLength={500}
                minLength={10}
              ></textarea>
              <button
                type="submit"
                disabled={submitted}
                className="bg-primaryblue hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition"
              >
                {
                  submitted? <ButtonLoading /> : "Send Message"
                }
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
