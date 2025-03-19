"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const UserProfileSkeleton = () => {
  return (
    <div className="h-full w-full">
      {/* Profile Image Skeleton */}
      <div className="h-32 w-full items-center p-2">
        <Skeleton className="h-full mx-auto w-28 rounded-full bg-slate-200" />
      </div>

      {/* Name and Verification Skeleton */}
      <div className="text-center">
        <Skeleton className="h-5 w-40 mx-auto mb-2 bg-slate-200" />
        {/* <Skeleton className="h-5 w-5 mx-auto rounded-full bg-slate-200" /> */}
      </div>

      {/* Verification Banner Skeleton */}
        <Skeleton className="h-8 bg-slate-200 w-5/6 mx-auto"  />
      {/* <div className="w-full sm:w-10/12 mx-auto bg-yellow-200 py-2 mt-2 px-2 sm:px-6 flex items-center justify-center">
      </div> */}

      {/* Profile Details Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 px-0 sm:px-16 my-6 gap-5">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex gap-1 flex-col">
            <Skeleton className="h-5 w-32 bg-slate-200" />
            <Skeleton className="h-10 w-full rounded-md bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
