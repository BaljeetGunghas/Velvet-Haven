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
    { id: 1, feedback: "The service was exceptional, and the staff were very accommodating.", name: "John Doe", image: img1 },
    { id: 2, feedback: "I had a wonderful experience. The rooms were clean and spacious.", name: "Jane Smith", image: img2 },
    { id: 3, feedback: "A perfect place for a family vacation. Highly recommended!", name: "Emily Johnson", image: img3 },
    { id: 4, feedback: "Affordable prices and great amenities. Loved every bit of my stay!", name: "Michael Brown", image: img4 },
    { id: 5, feedback: "Beautiful ambiance and excellent food. Will definitely return.", name: "Sarah Wilson", image: img5 },
    { id: 6, feedback: "The location is perfect, and the staff made us feel right at home.", name: "David Lee", image: img6 },
    { id: 7, feedback: "Beautiful ambiance and excellent food. Will definitely return.", name: "Sarah Wilson", image: img7 },
    { id: 8, feedback: "I had a wonderful experience. The rooms were clean and spacious.", name: "Jane Smith", image: img8 },
    { id: 9, feedback: "I had a wonderful experience. The rooms were clean and spacious.", name: "Jane Smith", image: img4 },
  ];

  return (
    <motion.div 
      className="relative p-mainPading pt-2 max-sm:h-full max-sm:p-5 max-sm:gap-5"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}
    >
      <motion.h2 
        className="text-xl font-medium text-secondrybackground"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        Testimonials
      </motion.h2>
      <motion.h3 
        className="text-4xl my-2 font-semibold"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        What Our Guests Say About Us
      </motion.h3>
      <br />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        <TestimonialCarousel testimonials={testimonials} />
      </motion.div>
    </motion.div>
  );
};

export default Testimonial;
