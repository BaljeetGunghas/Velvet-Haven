import Link from "next/link";
import Image from "next/image";
import pageNotFound from "@/asset/pagenotfound.svg";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center h-screen px-6 bg-gray-100 dark:bg-gray-900">
      {/* Image Section */}
      <div className="w-full max-w-md lg:max-w-lg">
        <Image
          src={pageNotFound}
          alt="Page Not Found"
          className="w-full h-auto"
        />
      </div>

      {/* Text & Button Section */}
      <div className="text-center lg:text-left lg:ml-10">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Oops! Page Not Found
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
