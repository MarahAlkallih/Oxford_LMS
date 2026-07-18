import { useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { useEditRequestMutation } from "../../../services/request-courses/requests";
import { toast } from "react-toastify";
import { RequestStatuses } from "../../Const/RequestedCourse";
import { ErrorHandler } from "../../../utils/ErrorHandler";

interface EditReqModalProps {
  open: boolean;
  onClose: () => void;
  id: number;
}

export const EditReqModal = ({ open, onClose, id }: EditReqModalProps) => {
  // 1. تعريف حالات الـ State لكل حقل بشكل منفصل لتسهيل التحكم والتحقق
  const [status, setStatus] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [finalFee, setFinalFee] = useState<string>("");
  const [finalHours, setFinalHours] = useState<string>("");

  const [editStatus, { isLoading }] = useEditRequestMutation();

  const handelEditStatus = async () => {
    if (!status) {
      toast.error("Please select a status first");
      return;
    }

    // 2. بناء الـ Payload ديناميكياً بحسب الحالة المحددة
    const payload: any = { status };

    if (status === "APPROVED") {
      // التحقق من تعبئة كافة الحقول المطلوبة عند الموافقة لضمان سلامة البيانات
      if (!code.trim() || !finalFee || !finalHours) {
        toast.error("Please fill in all approval details (Code, Fee, and Hours)");
        return;
      }
      
      payload.code = code;
      payload.finalFee = Number(finalFee);   // تحويل القيمة إلى رقم كما يطلب السيرفر
      payload.finalHours = Number(finalHours); // تحويل القيمة إلى رقم كما يطلب السيرفر
    }

    try {
      await editStatus({
        id: id,
        data: payload,
      }).unwrap();
      
      toast.success("Request status updated successfully!");
      
      // إعادة تعيين الحقول (Reset) عند النجاح والإغلاق
      setCode("");
      setFinalFee("");
      setFinalHours("");
      onClose();
    } catch (err) {
      ErrorHandler.show(err);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-5 p-5 min-w-[380px] max-w-md animate-[fadeIn_0.2s_ease-out]">
        
        <h2 className="text-xl font-bold text-gray-900 text-center border-b pb-2">
          Edit Request Status
        </h2>
        
        {/* اختيار الحالة من الدروب داون */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Select Status</label>
          <RequestStatuses 
            onSelect={function (value: string): void {
              setStatus(value);
            }} 
          />
        </div>

        {/* 🌟 3. العرض الشرطي للحقول الثلاثة الإضافية عند اختيار APPROVED فقط وبأنيميشن ناعم */}
        {status === "APPROVED" && (
          <div className="flex flex-col gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-150 animate-[fadeIn_0.3s_ease-out]">
            <h3 className="text-xs font-extrabold text-(--color-watermelon) uppercase tracking-wider mb-1">
              Approval Requirements
            </h3>

            {/* حقل كود الكورس (Code) */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-650">Course Code <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g., C0-12"
                className="w-full px-4 py-2.5 border border-gray-250 rounded-xl text-sm font-semibold focus:outline-none focus:border-(--color-watermelon) transition-colors bg-white text-gray-800"
              />
            </div>

            {/* حقل التكلفة النهائية (Final Fee) */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-650">Final Fee (SYP) <span className="text-red-500">*</span></label>
              <input
                type="number"
                value={finalFee}
                onChange={(e) => setFinalFee(e.target.value)}
                placeholder="e.g., 200"
                min="0"
                className="w-full px-4 py-2.5 border border-gray-250 rounded-xl text-sm font-semibold focus:outline-none focus:border-(--color-watermelon) transition-colors bg-white text-gray-800"
              />
            </div>

            {/* حقل الساعات النهائية (Final Hours) */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-650">Final Hours <span className="text-red-500">*</span></label>
              <input
                type="number"
                value={finalHours}
                onChange={(e) => setFinalHours(e.target.value)}
                placeholder="e.g., 30"
                min="0"
                className="w-full px-4 py-2.5 border border-gray-250 rounded-xl text-sm font-semibold focus:outline-none focus:border-(--color-watermelon) transition-colors bg-white text-gray-800"
              />
            </div>
          </div>
        )}

        {/* أزرار التحكم في الأسفل */}
        <div className="flex gap-3 pt-2">
          <div className="flex-1">
            <Button
              name={isLoading ? "Editing..." : "Edit"}
              onClick={handelEditStatus}
            />
          </div>

          <div className="flex-1">
            <CancelBtn
              name="Cancel"
              onClick={onClose}
            />
          </div>
        </div>

      </div>
    </Modal>
  );
};