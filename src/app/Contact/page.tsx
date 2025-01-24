"use client";

import React from "react";
import { Counter } from "./Counter";

const page = () => {
  return (
    <div className="container mx-auto flex h-72 bg-slate-300 justify-center items-center">
      <Counter />
    </div>
  );
};

export default page;
