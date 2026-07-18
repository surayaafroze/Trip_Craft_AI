import { useState } from "react";
import { uploadImageToImgBB } from "@/lib/imgbb";
import { UploadCloud, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void;
}

export default function ImageUploader({ onImageUploaded }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const url = await uploadImageToImgBB(file);
      onImageUploaded(url);
    } catch (err) {
      console.error(err);
      setError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-gray-50 transition-colors relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
      />
      <div className="flex flex-col items-center justify-center space-y-2">
        {isUploading ? (
          <>
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="text-sm text-gray-500">Uploading image...</p>
          </>
        ) : (
          <>
            <UploadCloud className="w-10 h-10 text-gray-400" />
            <p className="text-sm text-gray-600 font-medium">Click or drag image to upload</p>
            <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
          </>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
