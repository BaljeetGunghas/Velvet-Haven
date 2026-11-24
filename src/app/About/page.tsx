'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Award, Heart, Zap, Shield, Users, Globe } from 'lucide-react';

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

export default function About() {
  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering premium quality in every aspect of our service',
    },
    {
      icon: Heart,
      title: 'Guest Care',
      description: 'Your comfort and satisfaction are at the heart of everything we do',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Continuously improving our technology for seamless bookings',
    },
    {
      icon: Shield,
      title: 'Trust',
      description: 'Safe, secure, and transparent transactions you can rely on',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building meaningful connections between travelers and luxury stays',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connecting guests to extraordinary destinations worldwide',
    },
  ];

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
              Our Story
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
            About{' '}
            <span className="text-accent-gold">Velvet Haven</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Redefining luxury hotel booking with elegance, innovation, and uncompromising guest satisfaction since our inception
          </motion.p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20"
          >
            {/* Left Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-primary-green dark:text-white mb-4">
                  Premium Luxury Redefined
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  At Velvet Haven, we believe every journey deserves to be extraordinary. Our platform connects discerning travelers with the world's most exceptional hotels and resorts, carefully curated to exceed expectations.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-6 h-6 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-green dark:text-white mb-2">
                      Award-Winning Service
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Recognized globally for excellence in hospitality and guest experience
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-6 h-6 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-green dark:text-white mb-2">
                      Seamless Technology
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Cutting-edge platform designed for intuitive, stress-free bookings
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-6 h-6 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-green dark:text-white mb-2">
                      Secure & Transparent
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Protected transactions with guaranteed best prices and clear policies
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image/Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="rounded-2xl bg-gradient-to-br from-accent-gold/20 to-primary-green/20 dark:from-accent-gold/10 dark:to-primary-green/10 p-8 text-center border border-accent-gold/20 dark:border-accent-gold/10 hover:border-accent-gold/40 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-playfair font-bold text-accent-gold mb-2">10K+</div>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium">
                  Properties Worldwide
                </p>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-accent-gold/20 to-primary-green/20 dark:from-accent-gold/10 dark:to-primary-green/10 p-8 text-center border border-accent-gold/20 dark:border-accent-gold/10 hover:border-accent-gold/40 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-playfair font-bold text-accent-gold mb-2">50K+</div>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium">
                  Happy Guests
                </p>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-accent-gold/20 to-primary-green/20 dark:from-accent-gold/10 dark:to-primary-green/10 p-8 text-center border border-accent-gold/20 dark:border-accent-gold/10 hover:border-accent-gold/40 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-playfair font-bold text-accent-gold mb-2">24/7</div>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium">
                  Support Available
                </p>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-accent-gold/20 to-primary-green/20 dark:from-accent-gold/10 dark:to-primary-green/10 p-8 text-center border border-accent-gold/20 dark:border-accent-gold/10 hover:border-accent-gold/40 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-playfair font-bold text-accent-gold mb-2">98%</div>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium">
                  Satisfaction Rate
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-green/10 to-accent-gold/10 dark:from-primary-green/5 dark:to-accent-gold/5 rounded-3xl border border-accent-gold/20 dark:border-accent-gold/10 p-10 sm:p-12 lg:p-16 mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-primary-green dark:text-white mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto text-center">
              To revolutionize the luxury travel experience by providing seamless access to the world's most exclusive hotels and resorts. We empower travelers to discover, book, and experience extraordinary accommodations with confidence, while supporting our hotel partners through innovative technology and dedicated guest services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-transparent via-accent-gold/2 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16 sm:mb-20"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-semibold text-primary-green dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Guiding principles that define our commitment to excellence
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative p-8 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-accent-gold/50 dark:hover:border-accent-gold/40 shadow-lg hover:shadow-2xl hover:shadow-accent-gold/20 transition-all duration-300 overflow-hidden"
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-primary-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="relative z-10 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-accent-gold/20 flex items-center justify-center group-hover:bg-accent-gold/30 transition-all duration-300">
                      <Icon className="w-7 h-7 text-accent-gold" />
                    </div>

                    <h3 className="text-xl md:text-2xl font-semibold text-primary-green dark:text-white">
                      {value.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-semibold text-primary-green dark:text-white mb-4">
                Ready to Experience Luxury?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Start your extraordinary journey with Velvet Haven today
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 sm:px-12 py-4 bg-gradient-to-r from-primary-green to-primary-green/80 hover:from-primary-green/90 hover:to-primary-green/70 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Explore Hotels
                </motion.button>
              </Link>

              <Link href="/Contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 sm:px-12 py-4 border-2 border-accent-gold hover:bg-accent-gold/10 text-accent-gold font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
