import { useParams, useNavigate } from "react-router-dom";
import { useGetOneRegistrationQuery } from "../../../../../services/courses/Admin-courses/course-registration/courseRegisterQuery";
import { RejectModal } from "../../../../../components/Course/Registration/RejectModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShieldMoonIcon from "@mui/icons-material/ShieldMoon";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // للقبول
import CancelIcon from "@mui/icons-material/Cancel"; // للرفض
import { useState } from "react";
import { ApproveModal } from "../../../../../components/Course/Registration/ApproveModal";

const formatDateTime = (dateString?: string | Date | null) => {
  if (!dateString) return "Not Recorded";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Not Recorded";
  
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDateOnly = (dateString?: string | Date | null) => {
  if (!dateString) return "Not Recorded";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Not Recorded";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

const InfoRow = ({ icon, label, value }: InfoRowProps) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/60 border border-gray-100/80 hover:bg-gray-50 transition-colors">
    <div className="text-gray-400 shrink-0 flex items-center">{icon}</div>
    <div className="overflow-hidden">
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{label}</p>
      <p className="text-sm text-gray-800 font-bold truncate capitalize">
        {value || <span className="text-gray-300 font-normal italic">None</span>}
      </p>
    </div>
  </div>
);

export const OneRegistrationDetails = () => {
  const { id } = useParams();
  const regId = Number(id);
  const navigate = useNavigate();
  const [isOpenReject,setIsOpenReject]=useState(false)
  const [selectedId,setSelectedId]=useState(0)
  const { data, isLoading, isError } = useGetOneRegistrationQuery({ id: regId });
  const [name,setName]=useState("")
  const [isOpenApprove,setIsOpenApprove]=useState(false)
  const regDetails = data; 
  const baseUrl = "http://153.92.210.41:3000";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--color-watermelon)"></div>
      </div>
    );
  }

  if (isError || !regDetails) {
    return (
      <div className="max-w-md mx-auto text-center py-24 space-y-4">
        <div className="text-red-500 font-bold text-xl font-sans">Registration Record Not Found</div>
        <p className="text-xs text-gray-400">The registration ID #{regId} is invalid or has been removed.</p>
        <button 
          onClick={() => navigate(-1)}
          className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition-colors"
        >
          Return to List
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 animate-[fadeIn_0.25s_ease-out]">
      
      {/* ─── الهيدر الرئيسي للملف والتصنيفات ─── */}
    <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
  <div className="flex items-start gap-3">
    <button 
      onClick={() => navigate(-1)} 
      className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors shrink-0 mt-1"
    >
      <ArrowBackIcon sx={{ fontSize: 18 }} />
    </button>
    <div className="space-y-0.5">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-bold text-gray-400">Registration ID: #{regDetails.id}</span>
        <span className={`px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
          regDetails.status === "APPROVED" ? "bg-green-50 text-green-700 border-green-200" :
          regDetails.status === "PENDING" ? "bg-amber-50 text-amber-700 border-amber-200" :
          "bg-red-50 text-red-700 border-red-200"
        }`}>
          {regDetails.status}
        </span>
      </div>
      <h1 className="text-2xl font-extrabold text-gray-950 capitalize">
        {regDetails.user?.firstName} {regDetails.user?.lastName}
      </h1>
      <p className="text-xs text-gray-400 font-medium">
        Applied on: {formatDateTime(regDetails.registrationDate)}
      </p>
    </div>
  </div>

  {/* ─── أزرار القبول والرفض (تظهر فقط في حالة الـ Pending) ─── */}
  {regDetails.status === "PENDING" && (
    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
      {/* زر الرفض */}
      <button
        onClick={() => {
       setIsOpenReject(true)
       setSelectedId(regDetails.id)

        }}
        className="flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs rounded-xl transition-all shadow-sm"
      >
        <CancelIcon sx={{ fontSize: 16 }} />
        Reject
      </button>

      {/* زر القبول */}
      <button
        onClick={() => {
         setIsOpenApprove(true)
         setSelectedId(regId)
         setName(regDetails.user.firstName)
        }}
        className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
      >
        <CheckCircleIcon sx={{ fontSize: 16 }} />
        Approve
      </button>
    </div>
  )}
</div>
      {/* ─── شبكة توزيع المحتوى (Main Dashboard Grid) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* البارت الأيسر: بيانات الطالب والمراجعة التدقيقية */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* صندوق بيانات الطالب */}
          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
              <PersonIcon sx={{ fontSize: 16 }} /> Student Profile
            </h3>
            <div className="flex flex-col gap-2">
              <InfoRow icon={<PersonIcon sx={{ fontSize: 18 }} />} label="Full Name" value={`${regDetails.user?.firstName} ${regDetails.user?.lastName}`} />
              <InfoRow icon={<EmailIcon sx={{ fontSize: 18 }} />} label="Email Address" value={regDetails.user?.email} />
              <InfoRow icon={<LocalPhoneIcon sx={{ fontSize: 18 }} />} label="Phone Number" value={regDetails.user?.phoneNumber} />
            </div>
          </div>

          {/* صندوق معلومات تدقيق المسؤول (Review Logs) */}
          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
              <ShieldMoonIcon sx={{ fontSize: 16 }} /> Review Audit
            </h3>
            <div className="space-y-3 text-xs font-semibold text-gray-650">
              <div className="flex justify-between items-center bg-gray-50/50 p-2 rounded-xl border border-gray-100">
                <span className="text-gray-400">Reviewed By ID:</span>
                <span className="text-gray-800 font-bold">#{regDetails.reviewedById || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50/50 p-2 rounded-xl border border-gray-100">
                <span className="text-gray-400">Review Date:</span>
                <span className="text-gray-800 font-bold">{formatDateTime(regDetails.dateReview)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* البارت الأيمن والأكبر: تفاصيل الكورس المستهدف والفواتير المرفقة */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* كرت الكورس وتفاصيله التفصيلية */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-5">
            <div>
              <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold float-right uppercase border ${
                regDetails.course?.status === "UPCOMING" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-gray-50 text-gray-600"
              }`}>
                {regDetails.course?.status}
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 capitalize flex items-center gap-2">
                <MenuBookIcon className="text-(--color-watermelon)" />
                {regDetails.course?.title}
              </h2>
              <p className="text-sm text-gray-400 font-medium mt-0.5">{regDetails.course?.subTitle}</p>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed bg-gray-50/40 p-3 rounded-2xl border border-gray-100">
              {regDetails.course?.description || <span className="text-gray-300 italic">No course blueprint described.</span>}
            </p>

            {/* محددات الكورس المالية والزمنية */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InfoRow icon={<MonetizationOnIcon />} label="Official Fees" value={`${regDetails.course?.fee?.toLocaleString()} SYP`} />
              <InfoRow icon={<AccessTimeIcon />} label="Course Duration" value={`${regDetails.course?.hours} Total Hours`} />
            </div>

            {/* المواعيد والـ Deadlines الحرجة للكورس */}
            <div className="border-t pt-4">
              <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <CalendarMonthIcon sx={{ fontSize: 16 }} /> Timeline & Deadlines
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-semibold text-gray-700">
                <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                  <div className="text-gray-400 text-[10px] uppercase font-bold">Study Period</div>
                  <div>{formatDateOnly(regDetails.course?.startDate)} ── {formatDateOnly(regDetails.course?.endDate)}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                  <div className="text-gray-400 text-[10px] uppercase font-bold">Registration Deadline</div>
                  <div className="text-red-600 font-bold">{formatDateTime(regDetails.course?.registrationDeadline)}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl space-y-1 md:col-span-2">
                  <div className="text-gray-400 text-[10px] uppercase font-bold">Payment Cutoff Deadline</div>
                  <div className="text-amber-600 font-bold">{formatDateTime(regDetails.course?.paymentDeadline)}</div>
                </div>
              </div>
            </div>
          </div>

          {/*قسم الفواتير وإيصالات التحويل البنكي (Invoices & Receipts) */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2 border-b pb-3">
              <ReceiptLongIcon className="text-(--color-watermelon)" />
              Financial Invoices & Payment Receipts ({regDetails.invoices?.length || 0})
            </h3>

            {!regDetails.invoices || regDetails.invoices.length === 0 ? (
              <p className="text-center py-6 text-sm text-gray-400 font-medium italic bg-gray-50/50 rounded-2xl border border-dashed">
                No invoices linked to this registration.
              </p>
            ) : (
              <div className="space-y-4">
                {regDetails.invoices.map((invoice: any) => (
                  <div key={invoice.id} className="p-4 rounded-2xl border border-gray-200 bg-gray-50/40 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    
                    {/* تفاصيل الفاتورة الفنية */}
                    <div className="md:col-span-2 space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-gray-800">Invoice #{invoice.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold border ${
                          invoice.paymentStatus === "COMPLETED" ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}>
                          {invoice.paymentStatus}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {invoice.paymentMethod?.replace("_", " ")}
                        </span>
                      </div>
                      
                      <div className="text-sm font-extrabold text-gray-900">
                        Amount Paid: <span className="text-(--color-watermelon)">{invoice.totalAmount?.toLocaleString()} SYP</span>
                      </div>

                      <div className="text-[11px] text-gray-400 font-semibold space-y-0.5">
                        <div>TXN Reference: {invoice.transactionId || <span className="italic font-normal">None Provided</span>}</div>
                        <div>Issued: {formatDateTime(invoice.createdAt)}</div>
                      </div>
                    </div>

                    {/* عرض أو تحميل إيصال الدفع المرفق */}
                    <div className="md:col-span-1 flex flex-col items-stretch md:items-end">
                      {invoice.receiptUrl ? (
                        <a
                          href={`${baseUrl}${invoice.receiptUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-bold text-xs rounded-xl transition-all shadow-sm group"
                        >
                          View Receipt
                          <OpenInNewIcon sx={{ fontSize: 13 }} className="text-gray-400 group-hover:text-gray-700" />
                        </a>
                      ) : (
                        <div className="text-center md:text-right text-xs text-gray-300 italic font-normal py-2">
                          No Receipt Image Uploaded
                        </div>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
<RejectModal
open={isOpenReject}
onClose={()=>setIsOpenReject(false)}
id={selectedId}
/>
<ApproveModal
              open={isOpenApprove}
              onClose={() => setIsOpenApprove(false)}
              id={selectedId}
               name={name}/>

    </div>
  );
};