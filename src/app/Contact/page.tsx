"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import contactusImage from "@/asset/Luxury Hotel Reception Welcome.png";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonLoading from "@/components/Loading/ButtonLoading";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (800) VELVET-99",
      description: "Available 24/7 for assistance",
      href: "tel:+18008358389",
    },
    {
      icon: Mail,
      label: "Email",
      value: "reservations@velvethaven.com",
      description: "Response within 2 hours",
      href: "mailto:reservations@velvethaven.com",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "123 Luxury Lane, Mumbai, India",
      description: "Our main office location",
      href: "#",
    },
    {
      icon: Clock,
      label: "Hours",
      value: "24/7 Service",
      description: "Always ready to help you",
      href: "#",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/contactus/create-contactus`,
        formData
      );
      const responseData = response.data;
      if (responseData.output > 0) {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setSubmitted(true);
        toast.success("Your message has been sent successfully");
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        toast.warning(responseData.message);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 pt-20 sm:pt-24 lg:pt-28">
      {/* Hero Section */}
      <section className="relative w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-primary-green/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="h-0.5 w-8 bg-gradient-to-r from-accent-gold/30 to-accent-gold"></div>
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[2.5px] text-accent-gold">
              Get In Touch
            </span>
            <div className="h-0.5 w-8 bg-gradient-to-l from-accent-gold/30 to-accent-gold"></div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-semibold text-center text-primary-green dark:text-white mb-6 leading-tight"
          >
            Contact{' '}
            <span className="text-accent-gold">Velvet Haven</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-3xl mx-auto"
          >
            Have questions or need assistance? Our dedicated team is ready to help you plan your perfect stay
          </motion.p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="relative w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  href={info.href}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-accent-gold/50 dark:hover:border-accent-gold/40 shadow-lg hover:shadow-2xl hover:shadow-accent-gold/20 transition-all duration-300 overflow-hidden"
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-primary-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="relative z-10 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-gold/30 to-accent-gold/10 flex items-center justify-center group-hover:from-accent-gold/50 group-hover:to-accent-gold/20 transition-all duration-300 border border-accent-gold/20 group-hover:border-accent-gold/40">
                      <Icon className="w-8 h-8 text-accent-gold group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-primary-green dark:text-white mb-1">
                        {info.label}
                      </h3>
                      <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white group-hover:text-accent-gold transition-colors">
                        {info.value}
                      </p>
                    </div>

                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-slate-700">
                      {info.description}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="relative w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            {/* Left Side - Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative h-80 sm:h-96 lg:h-full min-h-[480px] rounded-3xl overflow-hidden shadow-2xl group border-2 border-accent-gold/20 dark:border-accent-gold/10"
            >
              <Image
                src={contactusImage}
                alt="Contact Us - Luxury Hotel Service"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Premium Overlay Gradient - Optimized for both modes */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 dark:to-primary-green/50"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 dark:from-primary-green/60 via-black/5 dark:via-primary-green/20 to-transparent"></div>

              {/* Luxury Badge - Enhanced with light mode support */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute bottom-0 left-0 right-0 p-6 sm:p-8"
              >
                <div className="bg-gradient-to-r from-primary-green dark:from-primary-green/85 via-primary-green dark:via-primary-green/80 to-primary-green dark:to-primary-green/75 backdrop-blur-lg rounded-2xl p-6 sm:p-7 border border-white/50 dark:border-white/15 shadow-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent-gold dark:bg-accent-gold/40 flex items-center justify-center flex-shrink-0 border border-white/30 dark:border-accent-gold/60">
                      <span className="text-xl">✨</span>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-playfair font-semibold text-white mb-1">
                        Premium Support
                      </h3>
                      <p className="text-xs sm:text-sm text-white leading-relaxed">
                        Our dedicated concierge team is available 24/7 to provide personalized assistance
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-primary-green dark:text-white mb-4">
                  Send us a Message
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  We&apos;d love to hear from you. Fill out the form below and we&apos;ll respond within 2 hours.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-500 rounded-2xl p-8 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-primary-green dark:text-white">
                    Thank You!
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Your message has been sent successfully. Our team will get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-semibold text-primary-green dark:text-white mb-3">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all"
                    />
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-semibold text-primary-green dark:text-white mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all"
                    />
                  </motion.div>

                  {/* Subject Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-semibold text-primary-green dark:text-white mb-3">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all"
                    />
                  </motion.div>

                  {/* Message Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-semibold text-primary-green dark:text-white mb-3">
                      Message
                    </label>
                    <textarea
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      maxLength={500}
                      minLength={10}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all resize-none"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {formData.message.length}/500 characters
                    </p>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-8 py-4 bg-gradient-to-r from-primary-green to-primary-green/80 hover:from-primary-green/90 hover:to-primary-green/70 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isLoading ? (
                      <>
                        <ButtonLoading />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ/Additional Info Section */}
      <section className="relative w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-transparent via-accent-gold/2 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-primary-green dark:text-white mb-4">
              Response Times
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              We prioritize your inquiries and aim to respond promptly
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="text-center p-8 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-accent-gold/50 dark:hover:border-accent-gold/40 shadow-lg hover:shadow-2xl hover:shadow-accent-gold/20 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-gold/30 to-accent-gold/10 flex items-center justify-center mb-6 mx-auto border border-accent-gold/20 group-hover:border-accent-gold/40 group-hover:from-accent-gold/50 group-hover:to-accent-gold/20 transition-all duration-300">
                <Clock className="w-8 h-8 text-accent-gold group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-semibold text-primary-green dark:text-white mb-2">
                2 Hours
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                Standard response time for general inquiries
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="text-center p-8 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-accent-gold/50 dark:hover:border-accent-gold/40 shadow-lg hover:shadow-2xl hover:shadow-accent-gold/20 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-gold/30 to-accent-gold/10 flex items-center justify-center mb-6 mx-auto border border-accent-gold/20 group-hover:border-accent-gold/40 group-hover:from-accent-gold/50 group-hover:to-accent-gold/20 transition-all duration-300">
                <Phone className="w-8 h-8 text-accent-gold group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-semibold text-primary-green dark:text-white mb-2">
                30 Minutes
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                Priority response for booking-related calls
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="text-center p-8 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-accent-gold/50 dark:hover:border-accent-gold/40 shadow-lg hover:shadow-2xl hover:shadow-accent-gold/20 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-gold/30 to-accent-gold/10 flex items-center justify-center mb-6 mx-auto border border-accent-gold/20 group-hover:border-accent-gold/40 group-hover:from-accent-gold/50 group-hover:to-accent-gold/20 transition-all duration-300">
                <Mail className="w-8 h-8 text-accent-gold group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-semibold text-primary-green dark:text-white mb-2">
                24 Hours
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                Comprehensive response to detailed email inquiries
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
