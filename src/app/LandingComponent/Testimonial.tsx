"use client";

import React from "react";
import { motion } from "framer-motion";
import TestimonialCarousel from "@/components/Carousel/Carousel";
import img1 from "@/asset/Testimonial/1.jpg";
import img2 from "@/asset/Testimonial/2.jpg";
import img3 from "@/asset/Testimonial/3.jpg";
import img4 from "@/asset/Testimonial/4.jpg";
import img5 from "@/asset/Testimonial/5.jpg";
import img6 from "@/asset/Testimonial/6.jpg";
import img7 from "@/asset/Testimonial/7.jpg";
import img8 from "@/asset/Testimonial/8.jpg";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      feedback: "An absolutely unforgettable experience that exceeded every expectation. The personalized service and meticulous attention to detail made our honeymoon truly magical. From the moment we arrived until departure, every staff member went above and beyond to ensure our comfort and happiness. The views were breathtaking, the food exceptional, and the ambiance perfectly romantic.",
      name: "John & Sarah Doe",
      title: "Honeymoon Guest",
      image: img1,
      rating: 5,
    },
    {
      id: 2,
      feedback: "The rooms were absolutely impeccable with stunning decorations and modern amenities. The spa services were world-class and incredibly relaxing. We felt pampered and cherished every single moment of our stay. The staff's professionalism combined with genuine warmth made us feel like royalty. We're already planning our next visit and recommending Velvet Haven to all our friends and family.",
      name: "Emily Johnson",
      title: "Luxury Traveler",
      image: img2,
      rating: 5,
    },
    {
      id: 3,
      feedback: "The perfect destination for our family vacation! The kids absolutely loved the exciting activities and entertainment options while we thoroughly enjoyed the peaceful atmosphere and world-class facilities. The hotel staff were incredibly accommodating with our children and made everyone feel welcome. The restaurants offered diverse cuisine options that satisfied everyone's tastes perfectly.",
      name: "Michael & Lisa Brown",
      title: "Family Travelers",
      image: img3,
      rating: 5,
    },
    {
      id: 4,
      feedback: "Exceptional value for money without ever compromising on luxury or quality. The restaurant's cuisine was absolutely outstanding with innovative dishes and impeccable presentation. The location is ideal for business travelers, with excellent connectivity and professional conference facilities. The complimentary breakfast buffet was comprehensive and delicious every single day.",
      name: "David Chen",
      title: "Business Traveler",
      image: img4,
      rating: 5,
    },
    {
      id: 5,
      feedback: "The sunset views from our suite were absolutely breathtaking and unforgettable. Every moment felt like a scene from a beautiful dream we never wanted to wake from. The attention to romantic details throughout the property shows their deep understanding of creating special moments. The candlelit dinner arranged by the hotel staff was the perfect highlight of our anniversary celebration.",
      name: "Victoria & Robert",
      title: "Anniversary Celebration",
      image: img5,
      rating: 5,
    },
    {
      id: 6,
      feedback: "Outstanding hospitality that sets a new standard in luxury travel! The staff consistently anticipated our every need before we even asked, demonstrating exceptional training and genuine care. The management team personally ensured our satisfaction, and their professionalism combined with warmth created an environment of pure excellence and comfort throughout our stay.",
      name: "James Wilson",
      title: "Frequent Guest",
      image: img6,
      rating: 5,
    },
    {
      id: 7,
      feedback: "Voted the best getaway experience of the year by our entire group! The wellness center facilities were state-of-the-art and impeccably maintained. The meditation sessions and yoga classes were incredibly rejuvenating and helped us completely disconnect from our busy lives. We left feeling refreshed, renewed, and genuinely transformed by this wellness retreat experience.",
      name: "Amanda Stevens",
      title: "Wellness Retreat",
      image: img7,
      rating: 5,
    },
    {
      id: 8,
      feedback: "A truly hidden gem featuring world-class amenities that rival any five-star property. The attention to detail in every aspect, from room design to customer service, is simply remarkable. We were already planning our next visit before we even left the property. The value proposition and overall experience make this our new favorite luxury destination.",
      name: "Thomas Martinez",
      title: "Repeat Guest",
      image: img8,
      rating: 5,
    },
  ];

  return (
    <motion.section
      className="relative w-full min-w-0 overflow-hidden py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-12 xl:px-20 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Section Header */}
      <div className="max-w-5xl mx-auto mb-8 sm:mb-10 lg:mb-12 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <div className="h-0.5 w-8 bg-gradient-to-r from-accent-gold/30 to-accent-gold"></div>
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[2.5px] text-accent-gold">
            Guest Stories
          </span>
          <div className="h-0.5 w-8 bg-gradient-to-l from-accent-gold/30 to-accent-gold"></div>
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-semibold text-primary-green dark:text-white mb-4 sm:mb-5 leading-tight"
        >
          What Our Guests
          <span className="block text-accent-gold">Say About Us</span>
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-3xl mx-auto"
        >
          Don't just take our word for it—hear directly from our satisfied guests who have experienced the unparalleled luxury and hospitality of Velvet Haven.
        </motion.p>
      </div>

      {/* Testimonial Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full max-w-6xl mx-auto min-w-0"
      >
        <TestimonialCarousel testimonials={testimonials} />
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 sm:mt-20 max-w-5xl mx-auto"
      >
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center p-4 sm:p-5 lg:p-6 rounded-xl bg-gradient-to-br from-accent-gold/10 to-primary-green/10 dark:from-accent-gold/5 dark:to-primary-green/5 border border-accent-gold/20 dark:border-accent-gold/10 hover:border-accent-gold/40 dark:hover:border-accent-gold/30 transition-all duration-300"
          >
            <div className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-accent-gold mb-2">
              98%
            </div>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium leading-tight">
              Guest Satisfaction
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            viewport={{ once: true }}
            className="text-center p-4 sm:p-5 lg:p-6 rounded-xl bg-gradient-to-br from-accent-gold/10 to-primary-green/10 dark:from-accent-gold/5 dark:to-primary-green/5 border border-accent-gold/20 dark:border-accent-gold/10 hover:border-accent-gold/40 dark:hover:border-accent-gold/30 transition-all duration-300"
          >
            <div className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-accent-gold mb-2">
              4.9/5
            </div>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium leading-tight">
              Average Rating
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center p-4 sm:p-5 lg:p-6 rounded-xl bg-gradient-to-br from-accent-gold/10 to-primary-green/10 dark:from-accent-gold/5 dark:to-primary-green/5 border border-accent-gold/20 dark:border-accent-gold/10 hover:border-accent-gold/40 dark:hover:border-accent-gold/30 transition-all duration-300"
          >
            <div className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-accent-gold mb-2">
              12K+
            </div>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium leading-tight">
              Happy Guests
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            viewport={{ once: true }}
            className="text-center p-4 sm:p-5 lg:p-6 rounded-xl bg-gradient-to-br from-accent-gold/10 to-primary-green/10 dark:from-accent-gold/5 dark:to-primary-green/5 border border-accent-gold/20 dark:border-accent-gold/10 hover:border-accent-gold/40 dark:hover:border-accent-gold/30 transition-all duration-300"
          >
            <div className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-accent-gold mb-2">
              1,200+
            </div>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium leading-tight">
              5-Star Reviews
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Testimonial;
