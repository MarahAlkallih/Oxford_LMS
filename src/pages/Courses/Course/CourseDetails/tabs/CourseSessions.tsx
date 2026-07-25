import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSessionQuery } from "../../../../../services/sessions/admin/sessionsQuery";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddIcon from "@mui/icons-material/Add";
import ClassIcon from "@mui/icons-material/Class";
import EventIcon from "@mui/icons-material/Event";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import { CreateSessionModal } from "../../../../../components/Sessions/Session/CreateSessionModal";
import { Supervisors } from "../../../../../components/Const/AdminsModal";
export interface props{
    courseId:number
}
export const SessionsPage = ({courseId}:props) => {
  const { id } = useParams();
  const Id=Number(id)
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
const [isOpenAddSuper,setIsOpenAddSuper]=useState(false)
const [selectedId,setSelectedId]=useState(0)
  const { data: sessions, isLoading } = useGetSessionQuery({id:Id});

  if (isLoading) {
    return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-52 bg-gray-100 rounded-2xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-150 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-(--main-color)/10 text-(--main-color) flex items-center justify-center font-bold">
            <ClassIcon />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Course Sessions</h2>
            <p className="text-xs text-gray-500">Manage and view all sessions for this course</p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-(--main-color) hover:opacity-95 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-sm shrink-0"
        >
          <AddIcon fontSize="small" />
          <span>Add New Session</span>
        </button>
      </div>

      {/* Grid List */}
      {!sessions || sessions.length === 0 ? (
        <div className="bg-white border border-gray-150 rounded-2xl p-12 text-center text-gray-400 shadow-sm">
          <EventIcon className="mb-2 text-gray-300" sx={{ fontSize: 48 }} />
          <p className="text-base font-semibold text-gray-600">No sessions scheduled yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white border border-gray-150 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-100">
                    {session.status}
                  </span>
                  <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                    <AccessTimeIcon sx={{ fontSize: 14 }} />
                    {new Date(session.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-800 group-hover:text-(--main-color) transition-colors mb-4 line-clamp-2">
                  {session.title}
                </h3>

                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-1.5 mb-4">
                  <div className="flex items-center gap-2">
                    <PersonIcon className="text-gray-400" sx={{ fontSize: 16 }} />
                    <span className="text-xs font-bold text-gray-700">{session.trainerName}</span>
                  </div>
                  <div className="text-[11px] text-gray-400 space-y-0.5 pl-6">
                    <p className="truncate flex items-center gap-1">
                      <EmailIcon sx={{ fontSize: 12 }} /> {session.trainerEmail}
                    </p>
                    <p className="flex items-center gap-1">
                      <PhoneIcon sx={{ fontSize: 12 }} /> {session.trainerPhone}
                    </p>
                  </div>
                </div>
              </div>
               <div className="flex">
                  <button
                onClick={() => navigate(`sessions/${session.id}`)}
                className="w-full border m-2 py-2.5 px-4 bg-gray-100 hover:bg-(--main-color) hover:text-white text-gray-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Details & Links</span>
                <ArrowForwardIcon sx={{ fontSize: 14 }} />
              </button>
               <button
                onClick={() => {setIsOpenAddSuper(true),setSelectedId(session.id)}}
                className="border m-2 py-2.5 px-4 bg-gray-100 hover:bg-(--main-color) hover:text-white text-gray-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
           <SupervisorAccountOutlinedIcon/>
              </button>
                </div>
           
            
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <CreateSessionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        id={courseId}
      />
      <Supervisors 
      open={isOpenAddSuper} 
      onClose={()=>setIsOpenAddSuper(false) } sessionId={selectedId}      
      />
    </div>
  );
};