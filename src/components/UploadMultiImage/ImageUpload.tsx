"use client";

import Image from "next/image";
import React, { useState } from "react";

interface ImageUploadProps {
  existingImages?: string[] | null; // Already uploaded images
  onUpload: (files: File[]) => void; // Upload callback
  onDelete?: (imageUrl: string) => void; // Delete callback
}

const MAX_IMAGES = 5;

const ImageUploader: React.FC<ImageUploadProps> = ({
  existingImages = [],
  onUpload,
  onDelete,
}) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: FileList | File[]) => {
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    // Calculate remaining slots
    const remainingSlots =
      MAX_IMAGES - ((existingImages?.length || 0) + previewImages.length);
    if (remainingSlots <= 0) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    // Limit uploads based on remaining slots
    const validImages = imageFiles.slice(0, remainingSlots);
    const newPreviews = validImages.map((file) => URL.createObjectURL(file));

    setPreviewImages((prev) => [...prev, ...newPreviews]);
    onUpload(validImages);
  };

  // Delete Image Function
  const handleDeleteImage = (imageUrl: string, isPreview: boolean) => {
    if (isPreview) {
      setPreviewImages(previewImages.filter((img) => img !== imageUrl));
    } else if (onDelete) {
      onDelete(imageUrl);
    }
  };

  return (
    <>
      <label className="text-sm font-semibold text-black dark:text-white mb-0">
        Hotel Images
      </label>
      <div className="p-4 border rounded-lg w-full mx-auto bg-white shadow-lg">
        {/* Display Existing & Uploaded Images */}
        <div className="flex flex-wrap gap-4 mb-4">
          {/* Existing Images */}
          {existingImages?.map((src, index) => (
            <div key={index} className="relative">
              <Image
                width={80}
                height={80}
                src={
                  src.startsWith("http")
                    ? src
                    : `${process.env.NEXT_PUBLIC_IMAGE_URL}/${src}`
                }
                alt="Uploaded"
                className="w-24 h-24 object-cover rounded-md shadow"
              />
              {/* Delete Button */}
              <button
                onClick={() => handleDeleteImage(src, false)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
              >
                X
              </button>
            </div>
          ))}

          {/* Preview Images */}
          {previewImages.map((src, index) => (
            <div key={index} className="relative">
              <Image
                width={80}
                height={80}
                src={src}
                alt="Uploaded"
                className="w-24 h-24 object-cover rounded-md shadow"
              />
              {/* Delete Button */}
              <button
                onClick={() => handleDeleteImage(src, true)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
              >
                X
              </button>
            </div>
          ))}
        </div>

        {/* Show upload area only if slots are available */}
        {(existingImages?.length || 0) + previewImages.length < MAX_IMAGES && (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-400 p-6 text-center rounded-md cursor-pointer hover:border-blue-500"
          >
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              id="imageInput"
              onChange={(e) => handleFiles(e.target.files!)}
            />
            <label htmlFor="imageInput" className="block text-gray-600">
              Drag & Drop images here or{" "}
              <span className="text-blue-600 underline cursor-pointer">
                Browse
              </span>
            </label>
            <p className="text-sm text-gray-500">
              You can upload{" "}
              {MAX_IMAGES - ((existingImages?.length || 0) + previewImages.length)} more
              images.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageUploader;
