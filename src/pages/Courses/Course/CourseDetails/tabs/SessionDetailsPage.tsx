import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GroupsIcon from "@mui/icons-material/Groups"; // 1. إضافة أيقونة المجموعات
import { toast } from "react-toastify";
import { useGetOneSessionQuery } from "../../../../../services/sessions/admin/sessionsQuery";
import { useCancelSessionMutation } from "../../../../../services/sessions/admin/sessionMutation";
import { ErrorHandler } from "../../../../../utils/ErrorHandler";

// Stored components imports
import { SessionGeneralInfo } from "./../tabs/session/SessionGeneralInfo";
import { SessionSupervisors } from "./../tabs/session/SessionSupervisors";
import { SessionFiles } from "../tabs/session/SessionFiles";
import { SessionExams } from "./../tabs/session/SessionExams";
import { SessionJoinRequests } from "./../tabs/session/SessionJoinRequests";
import { SessionOnsiteAttendance } from "./../tabs/session/SessionOnsiteAttendance";
import { useState } from "react";
import { GroupChat } from "./session/GroupChat";

export const SessionDetailsPage = () => {
  const { sId } = useParams();
  const navigate = useNavigate();
  const id1 = Number(sId);
  const { id } = useParams();
  const courseId = Number(id);
  const [isOpenGroupChat,setIsOpenGroupChat]=useState(false)
  const [cancelSession, { isLoading: isCancelling }] = useCancelSessionMutation();
  const { data: session, isLoading: isLoadSession } = useGetOneSessionQuery(
    { id: id1 },
    { skip: !id1 }
  );

  const handleCancel = async () => {
    try {
      await cancelSession({ id: id1 }).unwrap();
      toast.success("Session Canceled Successfully");
    } catch (err) {
      ErrorHandler.show(err);
    }
  };

  // 2. دالة لإنشاء المحادثة الجماعية (يمكنك ربطها مع Mutation الـ API الخاص بك)
  const handleCreateGroupChat = async () => {
    try {
     setIsOpenGroupChat(true)

     
    } catch (err) {
      ErrorHandler.show(err);
    }
  };

  if (isLoadSession) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded-xl w-1/3"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-gray-100 rounded-3xl"></div>
          <div className="h-96 bg-gray-100 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-6 text-center text-gray-500 font-semibold">
        Session not found.
      </div>
    );
  }

  const role = localStorage.getItem("role");

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-[fadeIn_0.3s_ease-out]">
      {/* Top Header */}
      <div className="flex justify-between items-center gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-all cursor-pointer shadow-xs"
            title="Go Back"
          >
            <ArrowBackIcon fontSize="small" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{session.title}</h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {session.status}
            </span>
          </div>
        </div>

        {/* 3. الأزرار في أعلى الواجهة */}
        <div className="flex items-center gap-2">
          {/* زر إنشاء المحادثة الجماعية */}
          <button
            onClick={handleCreateGroupChat}
            className="p-2.5 px-4 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium text-xs transition-all cursor-pointer shadow-xs flex items-center gap-2"
            title="Create Group Chat"
          >
            <GroupsIcon fontSize="small" />
            <span>Create Group Chat</span>
          </button>

          {/* زر إلغاء الجلسة */}
          {role === "SUPER" ? (
            <button
              onClick={handleCancel}
              disabled={isCancelling}
              className="p-2.5 px-4 rounded-xl border border-gray-200 bg-(--main-color) hover:opacity-90 text-white font-medium text-xs transition-all cursor-pointer shadow-xs disabled:opacity-50"
              title="Cancel"
            >
              {isCancelling ? "Cancelling..." : "Cancel Session"}
            </button>
          ) : null}
        </div>
      </div>

      {/* Dashboard Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left / Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <SessionGeneralInfo session={session} />

          {/* العرض المشروط بناءً على نوع الجلسة (ONSITE أو ONLINE) */}
          {!session.joinUrl ? (
            <SessionOnsiteAttendance sessionId={id1} courseId={courseId} />
          ) : (
            <SessionJoinRequests sessionId={id1} />
          )}

          {/* Files & Exams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SessionFiles sessionId={id1} />
            <SessionExams sessionId={id1} courseId={courseId} />
          </div>
        </div>

        {/* Right Sidebar Area */}
        <div className="lg:col-span-1 space-y-6">
          <SessionSupervisors sessionId={id1} />
        </div>
      </div>
      <GroupChat 
        sessionId={id1} 
        courseId={courseId} 
        open={isOpenGroupChat} 
        onClose={() => setIsOpenGroupChat(false)} 
      />
    </div>
  );
};