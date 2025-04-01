"use client";

import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiMongodb,
  SiExpress,
  SiJavascript,
  SiTypescript,
  SiRedux,
  SiMysql,
  SiHtml5,
  // SiFramer,
  SiTailwindcss,
  SiCss3,
  SiAdobe,
  SiMaterialdesign,
  SiFigma,
  SiFramer,
} from "react-icons/si";
import Image, { StaticImageData } from "next/image";
import { JSX } from "react";
import baljeetsingh from '@/asset/our-team/baljeetsingh.jpg';
import deepak from '@/asset/our-team/deepak.jpeg';
import { FaBootstrap, FaBriefcase, FaDownload } from "react-icons/fa6";
import { motion } from 'framer-motion';

interface TeamMember {
  name: string;
  contact: string;
  image: string | StaticImageData;
  github: string;
  portfolio?: string;
  linkedin: string;
  twitter?: string;
  role: string;
  position: string;
  experience: string;
  description: string;
  resume: string;
  skills: { name: string; icon: JSX.Element }[];
}

const teamMembers: TeamMember[] = [
  {
    name: "Baljeet Gunghas",
    contact: "+91-8685007017",
    image: baljeetsingh,
    github: "https://github.com/BaljeetGunghas",
    linkedin: " https://www.linkedin.com/in/baljeet-gunghas-b6698421b/",
    twitter: "https://twitter.com/johndoe",
    role: "MERN Stack Developer | React.js | Node.js | Building Scalable Web Apps | Open to Opportunities",
    position: "Senior Devloper",
    experience: "3.5 years of experience in web development.",
    resume: '/resume/Baljeetsingh1.pdf',
    description: `
      🚀 Experienced Full-Stack Developer (MERN) | React, Node.js, Express, MongoDB
      Passionate about building scalable and user-friendly web applications.
      3+ years of experience in developing & optimizing web solutions.
      Specialties: React.js, Redux, Next.js, TypeScript, Node.js, Express.js, MongoDB, Java, DSA, REST APIs.
      Looking for opportunities to contribute and grow in a dynamic team.
    `,
    skills: [
      { name: "React", icon: <FaReact size={20} className="text-blue-400" /> },
      { name: "Next.js", icon: <SiNextdotjs size={20} className="text-gray-900" /> },
      {
        name: "JavaScript",
        icon: <SiJavascript size={20} className="text-yellow-500" />,
      },
      {
        name: "Tailwind Css",
        icon: <SiTailwindcss size={20} className="text-blue-700" />,
      },
      {
        name: "TypeScript",
        icon: <SiTypescript size={20} className="text-blue-700" />,
      },
      {
        name: "Redux",
        icon: <SiRedux size={20} className="text-purple-600" />,
      },
      {
        name: "Node.js",
        icon: <FaNodeJs size={20} className="text-green-600" />,
      },
      {
        name: "Express.js",
        icon: <SiExpress size={20} className="text-green-600" />,
      },
      { name: "MySQL", icon: <SiMysql size={20} className="text-blue-500" /> },
      {
        name: "Mongodb",
        icon: <SiMongodb size={20} className="text-blue-500" />,
      },
      { name: "HTML", icon: <SiHtml5 size={20} className="text-orange-500" /> },
      { name: "CSS", icon: <SiCss3 size={20} className="text-blue-500" /> },
      { name: "Bootstrap", icon: <FaBootstrap size={20} className="text-indigo-600" /> },
      { name: "Material UI", icon: <SiMaterialdesign size={20} className="text-blue-400" /> },
      { name: "GitHub", icon: <FaGithub size={20} className="text-gray-800" /> },
    ],
  },
  {
    name: "Deepak Kewat",
    contact: "+91-8053612865",
    image: deepak,
    github: "https://github.com/BaljeetGunghas",
    linkedin: "https://www.linkedin.com/in/deepak-dnd ",
    portfolio: 'https://portfolio-two-blue-55.vercel.app/',
    role: "UI/UX Designer",
    position: "Designer and developer",
    experience:
      "2 years of experience in designing modern and user-friendly interfaces.",
    resume: '/resume/Deepak-d1.pdf',
    description:
      `🚀 Creative UX/UI Designer with two years of experience and a strong front-end development background (HTML, CSS,
JavaScript). Skilled in designing user-centered interfaces and bringing them to life with clean, efficient code. Proficient in
Figma, Adobe XD, and responsive design. Passionate about delivering seamless, engaging user experiences`,
    skills: [
      { name: "Framer Motion", icon: <SiFramer size={20} className="text-pink-400" /> },
      { name: "React", icon: <FaReact size={20} className="text-blue-400" /> },
      { name: "Next.js", icon: <SiNextdotjs size={20} className="text-gray-900" /> },
      { name: "HTML", icon: <SiHtml5 size={20} className="text-orange-500" /> },
      { name: "CSS", icon: <SiCss3 size={20} className="text-blue-500" /> },
      { name: "JavaScript", icon: <SiJavascript size={20} className="text-yellow-500" /> },
      { name: "Bootstrap", icon: <FaBootstrap size={20} className="text-indigo-600" /> },
      { name: "Tailwind Css", icon: <SiTailwindcss size={20} className="text-cyan-500" /> },
      { name: "Figma", icon: <SiFigma size={20} className="text-purple-500" /> },
      { name: "Adobe Creative Suite", icon: <SiAdobe size={20} className="text-red-500" /> },
      { name: "Material UI", icon: <SiMaterialdesign size={20} className="text-blue-400" /> },
      { name: "GitHub", icon: <FaGithub size={20} className="text-gray-800" /> },
    ],
  },
];

const OurTeam = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-bannerbg flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-14 mb-10 text-center">
        Our Team
      </h1>
      <div className="flex flex-col space-y-6 w-full max-w-4xl">
        {teamMembers.map((member, index) => (
          <motion.div
            className="bg-white dark:bg-foreground overflow-hidden relative p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 transition-transform transform hover:scale-100 border border-gray-200"
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
          >

            <Image
              src={member.image}
              alt={member.name}
              width={120}
              height={120}
              className="rounded-full border-4 border-gray-300 shadow-md object-cover"
            />
            <div className="text-center md:text-left w-full">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {member.name}
              </h2>
              <p className="text-gray-600 dark:text-slate-200 font-medium text-sm md:text-base">
                {member.position} - {member.role}
              </p>
              <p className="text-gray-500 dark:text-slate-300 mt-2 text-sm md:text-base">
                {member.experience}
              </p>
              <p className="text-gray-700 dark:text-slate-300 mt-2 text-sm">{member.description}</p>
              <p className="text-gray-600 dark:text-slate-200 mt-2 text-sm font-medium">
                {member.contact}
              </p>
              <div className="flex justify-center md:justify-start space-x-4 mt-3">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-slate-200 hover:text-black"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-slate-200 hover:text-blue-700"
                >
                  <FaLinkedin size={24} />
                </a>
                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-slate-200 hover:text-blue-400"
                  >
                    <FaTwitter size={24} />
                  </a>
                )}
                {member.portfolio && (
                  <a
                    href={member.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-slate-200 hover:text-blue-400"
                  >
                    <FaBriefcase size={24} />
                  </a>
                )}
              </div>
              <div className="flex flex-wrap justify-center md:justify-start mt-4 gap-2">
                {member.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-lg text-sm font-medium shadow-sm"
                  >
                    {skill.icon} <span className="ml-2">{skill.name}</span>
                  </span>
                ))}
              </div>
            </div>
            <a
              href={member.resume}
              download
              className="absolute -top-9 md:-top-5 -right-5 h-16 w-16 p-4 flex justify-center items-center rounded-full 
             bg-gradient-to-r from-yellow-400 to-orange-500 shadow-2xl border-2 border-white/40 
             hover:scale-110 hover:shadow-yellow-500/60 transition-all duration-300 ease-in-out"
            >
              <FaDownload size={20} className="text-white drop-shadow-lg" />
            </a>

          </motion.div>

        ))}
      </div>
    </div >
  );
};

export default OurTeam;
