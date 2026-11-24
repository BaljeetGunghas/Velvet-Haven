"use client";

import React from "react";
import { motion } from "framer-motion";
import { AccordionComponent } from "@/components/Accordion/Accordion";
import { HelpCircle } from "lucide-react";

const Faq = () => {
  const hotelFAQs = [
    {
      id: 1,
      question: "What is the check-in and check-out time?",
      answer: "Check-in time is from 3:00 PM onwards, and check-out time is until 11:00 AM. Early check-in or late check-out can be arranged on request, subject to availability. We recommend contacting our concierge in advance for special requests."
    },
    {
      id: 2,
      question: "How can I modify or cancel my booking?",
      answer: "You can modify or cancel your booking through the 'My Bookings' section on our website or app, or contact our dedicated customer support team at support@velvethhaven.com. Our team is available 24/7 to assist you."
    },
    {
      id: 3,
      question: "What is your cancellation policy?",
      answer: "Cancellation policies vary by room type and rate plan. Standard rates allow free cancellation up to 48 hours before arrival. Non-refundable rates are discounted but have stricter cancellation terms. Please review your booking confirmation for specific details."
    },
    {
      id: 4,
      question: "Are pets allowed at Velvet Haven?",
      answer: "Yes, we welcome well-behaved pets in select pet-friendly rooms. A non-refundable pet fee applies. Please inform us during booking or contact our team to arrange accommodations for your furry companion."
    },
    {
      id: 5,
      question: "Is breakfast included in the room rate?",
      answer: "Breakfast inclusion depends on your selected rate plan. Our premium packages include complimentary gourmet breakfast, while standard rates offer breakfast at special discounted rates. Check your booking details for specifics."
    },
    {
      id: 6,
      question: "Do you provide airport transfer services?",
      answer: "Yes, we offer premium airport shuttle and private car services at an additional charge. Luxury transfers can be pre-arranged through our concierge team. First-time guests receive a complimentary welcome transfer within 25km."
    },
    {
      id: 7,
      question: "Is complimentary parking available?",
      answer: "Yes, complimentary parking is included for all guests in our secure underground and outdoor lots. Valet parking services are available 24/7 for an additional fee. EV charging stations are also available."
    },
    {
      id: 8,
      question: "Do you offer complimentary high-speed internet?",
      answer: "Absolutely! We provide complimentary high-speed Wi-Fi throughout the property, including in all rooms, restaurants, and public areas. We also offer wired connections for high-bandwidth needs."
    },
    {
      id: 9,
      question: "What additional charges might apply?",
      answer: "All applicable taxes, service charges, and resort fees are clearly displayed during the booking process before payment. These are transparent with no hidden charges. City taxes and VAT will be included in your final invoice."
    },
    {
      id: 10,
      question: "What health and safety measures are in place?",
      answer: "We maintain the highest hygiene standards with 24/7 security, CCTV surveillance, regular sanitization, and trained staff. All rooms undergo deep cleaning between guests. We follow international health guidelines for your complete peace of mind."
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-16 xl:px-24 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-12 sm:mb-16 lg:mb-20 text-center">
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
            Help & Support
          </span>
          <div className="h-0.5 w-8 bg-gradient-to-l from-accent-gold/30 to-accent-gold"></div>
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-semibold text-primary-green dark:text-white mb-6 leading-tight"
        >
          Frequently Asked
          <span className="block text-accent-gold">Questions</span>
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto"
        >
          Find answers to common questions about bookings, amenities, policies, and our luxury services. Can't find what you're looking for? Contact our concierge team.
        </motion.p>
      </div>

      {/* FAQ Accordion */}
      <motion.div
        className="w-full max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={itemVariants}>
          <AccordionComponent faqData={hotelFAQs} />
        </motion.div>
      </motion.div>

      {/* Support CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-12 sm:mt-16 max-w-2xl mx-auto"
      >
        <div className="bg-gradient-to-br from-accent-gold/10 to-primary-green/10 dark:from-accent-gold/5 dark:to-primary-green/5 border border-accent-gold/20 dark:border-accent-gold/10 rounded-2xl p-6 sm:p-8 lg:p-10 text-center">
          <div className="flex justify-center mb-4">
            <HelpCircle className="w-10 h-10 sm:w-12 sm:h-12 text-accent-gold" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-primary-green dark:text-white mb-3">
            Still have questions?
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
            Our dedicated concierge team is available 24/7 to assist you with any inquiries or special requests.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="mailto:support@velvethaven.com"
              className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-accent-gold hover:bg-accent-gold/90 text-primary-green font-semibold rounded-lg transition-all duration-300 text-sm sm:text-base"
            >
              Email Us
            </a>
            <a
              href="tel:+1234567890"
              className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-primary-green dark:border-white text-primary-green dark:text-white hover:bg-primary-green/10 dark:hover:bg-white/10 font-semibold rounded-lg transition-all duration-300 text-sm sm:text-base"
            >
              Call Us
            </a>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Faq;
