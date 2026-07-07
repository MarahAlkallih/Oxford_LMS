
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import SettingsIcon from "@mui/icons-material/Settings";
import RuleIcon from "@mui/icons-material/Rule";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Edit ,Delete} from "@mui/icons-material";
export interface FormCardData {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  image: string | null;
  showCondition: boolean;
  showConfiguration: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CustomCardProps {
  data: FormCardData;
  onEdit:()=>void;
  onDelete:()=>void;
}
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
export const FormCard=({ data,onEdit,onDelete }: CustomCardProps)=>{
    const hasImage = data.image && data.image.trim() !== "";
    return(
       <div className="group flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      
  
      <div className="relative flex h-48 w-full shrink-0 items-center justify-center bg-gray-50">
        {hasImage ? (
          <img
            src={data.image || ""} 
            alt={data.title}
            className="h-full w-full object-cover"
          />
        ) : (
       
          <div className="flex flex-col items-center justify-center text-gray-400">
            <ImageNotSupportedIcon sx={{ fontSize: 48 }} className="mb-2 opacity-40" />
            <span className="text-sm font-medium opacity-60">No Image</span>
          </div>
        )}
        
 
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {data.showCondition && (
            <span className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-blue-700 shadow-sm backdrop-blur-sm">
              <RuleIcon sx={{ fontSize: 14 }} />
              Condition
            </span>
          )}
          {data.showConfiguration && (
            <span className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-purple-700 shadow-sm backdrop-blur-sm">
              <SettingsIcon sx={{ fontSize: 14 }} />
              Config
            </span>
          )}
        </div>
      </div>

      {/* 2. قسم المحتوى (Content Section) */}
      <div className="flex grow flex-col p-5">
        <h3 className="line-clamp-1 mb-1 text-xl font-bold text-gray-900">
          {data.title}
        </h3>
        
        {data.subTitle && (
          <p className="line-clamp-1 mb-3 text-sm font-semibold text-blue-600">
            {data.subTitle}
          </p>
        )}
        <div className="flex">
             <p className="line-clamp-2 mb-4 grow text-sm text-gray-600">
          {data.description || <span className="italic text-gray-400">No description available.</span>}
        </p>
        <div>
           <button className="p-2 text-(--main-color) cursor-pointer" onClick={onEdit}>
            <Edit/>
        </button> 
         <button className="p-2 text-(--color-watermelon-dark) cursor-pointer" onClick={onDelete}>
            <Delete/>
        </button> 
        </div>
        
        </div>
       

    
        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
            <CalendarTodayIcon sx={{ fontSize: 14 }} className="text-gray-400" />
            {formatDate(data.createdAt)}
          </div>
        </div>
      </div>
    </div>
    )
}