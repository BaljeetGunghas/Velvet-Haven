import Link from "next/link";
import Image from "next/image";
import pageNotFound from "@/asset/404.svg";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col gap-10 h-screen items-center justify-center">
      <Image
        src={pageNotFound}
        alt="Page Not Found"
        className="h-auto"
      />
      <div className="flex justify-center flex-col text-center lg:text-left ">
        <h1 className="text-4xl flex flex-col gap-3 text-center text-black dark:text-white">
          Ooops! <br /> Page Not Found
        </h1>
        <p className="mt-2 text-sm text-center text-[#B0B0B0] dark:text-gray-300">
          This page doesn’t exist or was removed!
          <br />
          We suggest you back to home
        </p>
        <Link
          href="/"
          className="bg-primaryblue dark:bg-foreground text-white text-center w-fit mx-auto px-4 py-2 mt-3 rounded-lg hover:bg-blue-700 transition "
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
