import { useState } from "react";
import { toast } from "react-toastify";

import { Button } from "../../../components/Buttons/SubmitBtn";
import { AddCategoryModal } from "../../../components/Categories/AddCatModal";
import { EditTitleModal } from "../../../components/Categories/EditTitle";
import { CategoryCard } from "../../../components/Categories/CatygoryCard";
import { ConfirmModal } from "../../../components/modals/ConfirmModal";

import {
  useGetCategoryQuery,
  useGetInActiveCategoryQuery,
} from "../../../services/courses/catygory/getCategories";

import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useInActiveCategoryMutation,
} from "../../../services/courses/catygory/catygoryMutations";

import type { Category } from "../../../types/Category";

export const CatygoriesPage = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditTitle, setOpenEditTitle] = useState(false);

  const [selectedCategoryId, setSelectedCategoryId] =
    useState<number | null>(null);

  const [selectedTitle, setSelectedTitle] =
    useState("");

  const [updatingImageId, setUpdatingImageId] =
    useState<number | null>(null);

  const [activatingId, setActivatingId] =
    useState<number | null>(null);

  const {
    data: activeCategories,
    isLoading,
  } = useGetCategoryQuery();

  const {
    data: inactiveCategories,
  } = useGetInActiveCategoryQuery();

  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const [updateCategory] =
    useUpdateCategoryMutation();

  const [activateCategory] =
    useInActiveCategoryMutation();

  // ================= DELETE =================

  const handleOpenDelete = (id: number) => {
    setSelectedCategoryId(id);
    setOpenDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedCategoryId) return;

    try {
      await deleteCategory({
        id: selectedCategoryId,
      }).unwrap();

      toast.success("Deleted Successfully");

      setOpenDeleteModal(false);
      setSelectedCategoryId(null);
    } catch {
      toast.error("Delete Failed");
    }
  };

  // ================= EDIT TITLE =================

  const handleEditTitle = (
    category: Category
  ) => {
    setSelectedCategoryId(category.id);
    setSelectedTitle(category.title);
    setOpenEditTitle(true);
  };

  // ================= EDIT IMAGE =================

  const handleEditImage = async (
    category: Category,
    file?: File
  ) => {
    if (!file) return;

    try {
      setUpdatingImageId(category.id);

      const formData = new FormData();

      formData.append("image", file);

      await updateCategory({
        id: category.id,
        formData,
      }).unwrap();

      toast.success(
        "Image updated successfully"
      );
    } catch {
      toast.error("Update failed");
    } finally {
      setUpdatingImageId(null);
    }
  };

  // ================= ACTIVATE =================

  const handleActivate = async (
    id: number
  ) => {
    try {
      setActivatingId(id);

      await activateCategory({
        id,
      }).unwrap();

      toast.success(
        "Category Activated Successfully"
      );
    } catch {
      toast.error(
        "Failed To Activate Category"
      );
    } finally {
      setActivatingId(null);
    }
  };

  return (
    <div>
      {/* Header */}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Categories
        </h1>
        <div>
          <Button
          name="Add Category"
          onClick={() => setIsOpenAdd(true)}
        />
        </div>
        
      </div>

      <div className="space-y-10">

        {/* Active */}

        <section>
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            Active Categories
          </h2>

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeCategories?.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onDelete={handleOpenDelete}
                  onEditTitle={handleEditTitle}
                  onEditImage={handleEditImage}
                  onToggleActive={handleActivate}
                  isUpdatingImage={
                    updatingImageId === category.id
                  }
                />
              ))}
            </div>
          )}
        </section>

        {/* Inactive */}

        <section>
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            Inactive Categories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inactiveCategories?.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onDelete={handleOpenDelete}
                onEditTitle={handleEditTitle}
                onEditImage={handleEditImage}
                onToggleActive={handleActivate}
                isUpdatingImage={
                  updatingImageId === category.id
                }
                isActivating={
                  activatingId === category.id
                }
                inactiveMode
              />
            ))}
          </div>
        </section>
      </div>

      <AddCategoryModal
        open={isOpenAdd}
        onClose={() => setIsOpenAdd(false)}
      />

      <EditTitleModal
        open={openEditTitle}
        onClose={() =>
          setOpenEditTitle(false)
        }
        cateId={selectedCategoryId}
        currentTitle={selectedTitle}
      />

      <ConfirmModal
        open={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false);
          setSelectedCategoryId(null);
        }}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
      />
    </div>
  );
};