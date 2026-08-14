import { useEffect, useState } from "react";
import { Button } from "../../../components/Buttons/SubmitBtn";
import { useUploadTrainingPlanMutation } from "../../../services/traininigPlan/uploadFiles";
import { toast } from "react-toastify";
export const AddFiles = () => {
  const [image, setImage] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
const [uploadTrainingPlan, { isLoading, isSuccess, isError, data, error }] =
  useUploadTrainingPlanMutation();
  const [progress, setProgress] = useState(0);
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setImage(selectedFile);

    setImagePreview(
      URL.createObjectURL(selectedFile)
    );
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
  };

 const handleUpload = async () => {
  if (!image || !file) {
    toast.error("Please select image and file");
    return;
  }

  const formData = new FormData();
  formData.append("image", image);
  formData.append("file", file);

  setProgress(10);

  try {
    setProgress(40);

    const result = await uploadTrainingPlan(formData);

    setProgress(100);

    if ("data" in result) {
      toast.success("Uploaded successfully");
    } 

    setImage(null);
    setFile(null);
    setImagePreview("");
    setProgress(0);

  } catch (err) {
    console.log(err);

    setProgress(0);
    toast.error("Unexpected error");
  }
};

  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-white p-8 shadow-lg">

      <h1 className="mb-8 text-center text-2xl font-bold">
        Upload Training Plan
      </h1>

      {/* Image Preview */}
      <div className="mb-8 flex justify-center">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="h-56 w-56 rounded-xl border object-cover"
          />
        ) : (
          <div
            className="
              flex h-56 w-56 items-center justify-center
              rounded-xl border-2 border-dashed
              border-gray-300
              text-gray-400
            "
          >
            No Image Selected
          </div>
        )}
      </div>

      {/* Image Section */}
      <div className="mb-8">

        <label className="mb-2 block font-medium">
          Image
        </label>

        <input
          id="image-upload"
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />

        <label
          htmlFor="image-upload"
          className="
            inline-flex cursor-pointer
            rounded-md bg-[#4B5945]
            px-4 py-2
            text-white
            transition
            hover:opacity-90
          "
        >
          Upload Image
        </label>

        {image && (
          <p className="mt-3 text-sm text-gray-500">
            {image.name}
          </p>
        )}
      </div>

      {/* File Section */}
      <div className="mb-8">

        <label className="mb-2 block font-medium">
          Document
        </label>

        <input
          id="file-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          hidden
          onChange={handleFileChange}
        />

        <label
          htmlFor="file-upload"
          className="
            inline-flex cursor-pointer
            rounded-md bg-[#4B5945]
            px-4 py-2
            text-white
            transition
            hover:opacity-90
          "
        >
          Upload File
        </label>

        {file && (
          <p className="mt-3 text-sm text-gray-500">
            {file.name}
          </p>
        )}
      </div>
      {progress > 0 && (
  <div className="w-full bg-gray-200 h-2 rounded m-4">
    <div
      className="h-2 bg-(--main-color) rounded transition-all duration-300"
      style={{ width: `${progress}%` }}
    />
  </div>
)}
      {/* Submit Button */}
      <div className="flex justify-center">
        <div className="w-48">
          <Button
            name={isLoading? "Uploading..." : "Upload"}
            onClick={handleUpload}
          />
        </div>
      </div>

    </div>
  );
};