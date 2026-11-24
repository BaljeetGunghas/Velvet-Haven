"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import logo from "@/asset/logo.png";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ArrowRight,
  Github,
  Globe,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "Rooms & Suites", href: "/rooms" },
        { label: "Dining", href: "/Dining" },
        { label: "Facilities", href: "/facilities" },
        { label: "About Us", href: "/About" },
      ],
    },
    {
      title: "Guest Services",
      links: [
        { label: "Booking", href: "/booking" },
        { label: "Guest Reviews", href: "/reviews" },
        { label: "Special Offers", href: "/offers" },
        { label: "Gift Cards", href: "/gift-cards" },
        { label: "Loyalty Program", href: "/loyalty" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Contact Us", href: "/Contact" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
        { label: "Partners", href: "/partners" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Cancellation Policy", href: "/cancellation" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Accessibility", href: "/accessibility" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/BaljeetGunghas", label: "GitHub" },
    { icon: Globe, href: "https://baljeetgunghasportfolio.netlify.app/", label: "Portfolio" },
    { icon: Linkedin, href: "https://in.linkedin.com/in/baljeet-gunghas-b6698421b", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/baljeet_gunghas2/", label: "Instagram" },
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8685007017",
      href: "tel:+918685007017",
    },
    {
      icon: Mail,
      label: "Email",
      value: "baljeetgunghas5@gmail.com",
      href: "mailto:baljeetgunghas5@gmail.com",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "New Delhi, India",
      href: "#",
    },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-black border-t border-gray-200 dark:border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-16 py-16 sm:py-20 lg:py-24">
        {/* Top Section - Logo & Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 sm:mb-16 lg:mb-20"
        >
          {/* Brand Section */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <Image
                src={logo}
                alt="Velvet Haven"
                width={50}
                height={50}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-lg sm:text-xl font-playfair font-bold text-primary-green dark:text-white">
                  Velvet Haven
                </h3>
                <p className="text-xs text-accent-gold font-semibold tracking-wide">
                  LUXURY STAYS
                </p>
              </div>
            </Link>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-md">
              Experience unparalleled luxury and hospitality at Velvet Haven. Your escape to extraordinary elegance awaits.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-green to-primary-green/80 hover:from-accent-gold hover:to-accent-gold/80 text-white flex items-center justify-center transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-accent-gold/10 to-primary-green/10 dark:from-accent-gold/5 dark:to-primary-green/5 rounded-2xl border border-accent-gold/20 dark:border-accent-gold/10 p-6 sm:p-8"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-primary-green dark:text-white mb-3">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Get exclusive offers, travel tips, and updates delivered to your inbox.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all text-sm"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-accent-gold to-accent-gold/80 hover:from-accent-gold/90 hover:to-accent-gold/70 text-primary-green font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 text-sm"
              >
                Subscribe
                <ArrowRight size={16} />
              </button>
            </form>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent mb-12 sm:mb-16" />

        {/* Contact & Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-10 mb-12 sm:mb-16"
        >
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="text-base sm:text-lg font-semibold text-primary-green dark:text-white mb-6">
              Contact Us
            </h4>
            <div className="space-y-4">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={idx}
                    href={info.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 group"
                  >
                    <Icon className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        {info.label}
                      </p>
                      <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white group-hover:text-accent-gold transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, sectionIdx) => (
            <motion.div
              key={sectionIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (sectionIdx + 1) * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-base sm:text-lg font-semibold text-primary-green dark:text-white mb-5">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent-gold dark:hover:text-accent-gold transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowRight
                        size={14}
                        className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent mb-8 sm:mb-10" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs sm:text-sm"
        >
          <p className="text-gray-600 dark:text-gray-400 text-center sm:text-left">
            &copy; {currentYear} Velvet Haven. All rights reserved. Crafted with luxury in mind.
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-3">
            <span className="text-gray-600 dark:text-gray-400">We Accept:</span>
            <div className="flex items-center gap-2">
              {["visa", "mastercard", "amex", "discover"].map((method) => (
                <div
                  key={method}
                  className="w-8 h-5 rounded bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-gray-700 dark:text-gray-300"
                >
                  {method.toUpperCase().substring(0, 2)}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Top Footer Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-gold via-primary-green to-accent-gold opacity-30" />
    </footer>
  );
};

export default Footer;
