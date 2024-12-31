"use client";


import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "@/asset/logo.svg";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ModeToggle";
import ModalLayout from "../ModelLayout/Modellayout";
import LoginRegistrationModel from "../LoginRegModel/LoginRegistrationModel";

const Header = () => {
  const [isRegistrationModelOpen, setIsRegistrationModelOpen] =
    useState<boolean>(false);

  const headerLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/About" },
    { label: "Contact", href: "/Contact" },
    { label: "Location", href: "/Location" },
    { label: "Dining", href: "/Dining" },
  ];
  return (
    <>
      <header className="bg-primaryblue dark:bg-foreground fixed inset-0 z-40 h-16">
        <div className=" w-12/12 mx-auto p-3 px-mainPading max-sm:px-4 flex justify-between items-center">
          <div className="flex items-center gap-20 md:gap-10">
            <Link href={"/"}>
              {" "}
              <Image
                src={logo}
                alt="logo"
                width={40}
                height={40}
                className=" dark:filter"
              />{" "}
            </Link>
            <div className="flex items-center max-sm:hidden gap-10">
              {headerLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.label}
                  className=" text-base font-semibold text-white dark:text-slate-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />

            <Button className=" bg-white dark:text-black" onClick={()=>setIsRegistrationModelOpen(true)}>Sign in</Button>
          </div>
        </div>
      </header>

      <ModalLayout
        isOpen={isRegistrationModelOpen}
        onClose={setIsRegistrationModelOpen}
      >
       <LoginRegistrationModel />
      </ModalLayout>
    </>
  );
};

export default Header;
