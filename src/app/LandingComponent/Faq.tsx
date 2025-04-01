import React from "react";
import { motion } from "framer-motion";
import { AccordionComponent } from "@/components/Accordion/Accordion";

const Faq = () => {
  const hotelFAQs = [
    { id: 1, question: "What is the check-in and check-out time?", answer: "Check-in time is from 3:00 PM onwards, and check-out time is until 11:00 AM. Early check-in or late check-out can be arranged on request, subject to availability." },
    { id: 2, question: "How can I modify or cancel my booking?", answer: "You can modify or cancel your booking by visiting the 'My Bookings' section of our website or contacting our customer support team. Cancellation policies may apply." },
    { id: 3, question: "What is the cancellation policy?", answer: "Cancellation policies vary by room type and rate plan. Please check the booking confirmation email or the room details before confirming your booking." },
    { id: 4, question: "Are pets allowed in the hotel?", answer: "Pets are allowed in select rooms at our hotel. Please contact us directly to ensure availability and understand the pet policy." },
    { id: 5, question: "Is breakfast included in the room rate?", answer: "Breakfast inclusion depends on the rate plan you select. Some packages include breakfast, while others may not. This information is displayed during booking." },
    { id: 6, question: "Do you provide airport shuttle services?", answer: "Yes, we provide airport shuttle services at an additional charge. Please contact our front desk to arrange for pick-up or drop-off." },
    { id: 7, question: "Is parking available at the hotel?", answer: "Yes, we provide complimentary parking for our guests. Valet parking services are also available upon request." },
    { id: 8, question: "Do you offer free Wi-Fi?", answer: "Yes, we offer complimentary high-speed Wi-Fi access in all rooms and public areas of the hotel." },
    { id: 9, question: "Are there any additional charges or taxes?", answer: "Yes, local taxes and service charges may apply. These will be clearly mentioned during the booking process." },
    { id: 10, question: "What safety measures are in place at the hotel?", answer: "We prioritize guest safety with 24/7 security, CCTV surveillance, and sanitized accommodations. For more details, visit our 'Health and Safety' section." },
  ];

  return (
    <motion.div
      className="relative p-mainPading pt-2 max-sm:h-full max-sm:p-5 max-sm:gap-5"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false }}
    >
      <motion.h2
        className="text-xl font-medium text-secondrybackground"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        FAQ
      </motion.h2>
      <motion.h3
        className="text-4xl my-2 font-semibold"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        Frequently Asked Questions
      </motion.h3>
      <br />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        <AccordionComponent faqData={hotelFAQs} />
      </motion.div>
    </motion.div>
  );
};

export default Faq;
