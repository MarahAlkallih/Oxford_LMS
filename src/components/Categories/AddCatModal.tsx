import { useState } from "react";
import { Button } from "../Buttons/SubmitBtn";
import { InputField } from "../Fields/InputField";
import { Modal } from "../global/Modals";
import { CancelBtn } from "../Buttons/CancelBtn";
import { useAddCategoryMutation } from "../../services/courses/catygory/catygoryMutations";
import { toast } from "react-toastify";
interface AddCatModalProps {
    open: boolean;
    onClose: () => void;
}

export const AddCategoryModal = ({ open, onClose }: AddCatModalProps) => {
    const [category, setCategory] = useState({
        title: "",
        image: null as File | null,
    });
    const [imagePreview, setImagePreview] = useState("");
    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setCategory({
            ...category,
            image: file,
        });

        setImagePreview(URL.createObjectURL(file));
    };
    const [addCategory,{isLoading,isSuccess}]=useAddCategoryMutation()
const handleAddCategory = async () => {
  try {
    const formData = new FormData();

    formData.append("title", category.title);

    if (category.image) {
      formData.append("image", category.image);
    }

    const res = await addCategory(formData).unwrap();

    console.log(res);
   
    toast.success("Category Added Successfully")

    onClose();

    setCategory({
      title: "",
      image: null,
    });

    setImagePreview("");
  } catch (err) {
    console.log(err);
  }
};

     const handleClose = () => {
  setCategory({
    title: "",
    image: null,
  });

  setImagePreview("");

  onClose();
};

    return (
        <Modal open={open} onClose={handleClose}>
            <div className="flex flex-col gap-4 p-4 ">

                <h2 className="text-xl font-semibold text-center">
                    Add New Venue
                </h2>

                <InputField
                    label="Name"
                    value={category.title}
                    onChange={(e) =>
                        setCategory({ ...category, title: e.target.value })
                    }
                />
                {/* Image Upload */}

                <div className="flex flex-col items-center gap-3">

                    {/* Preview Frame */}
                    <div className="w-46 h-46 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center">

                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Venue"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-sm text-gray-400">
                                No Image
                            </span>
                        )}

                    </div>

                    {/* Upload Button */}
                    <label
                        htmlFor="venue-image"
                        className="
      cursor-pointer
      bg-[#4B5945]
      text-white
      px-4
      py-2
      rounded-md
      hover:opacity-90
    "
                    >
                        Upload Image
                    </label>

                    <input
                        id="venue-image"
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    {category.image && (
                        <p className="text-sm text-gray-500">
                            {category.image.name}
                        </p>
                    )}

                </div>


                <div className="flex">

                    <div className="flex-1">
                        <Button
                            name={isLoading ? "Adding ..." : "Add Category"}
                            onClick={handleAddCategory}
                        />
                    </div>

                    <div className="flex-1">
                        <CancelBtn
                            name="Cancel"
                            onClick={handleClose}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
}
