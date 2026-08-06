import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Button } from "../../../../../../components/Buttons/SubmitBtn";
import { useState } from "react";
import { AddSessionFileModal } from "../../../../../../components/Sessions/Session/Media/AddFileModal";
import { SessionMediaCard,type CourseFile } from "../../../../../../components/Sessions/Session/Media/SessionMediaCard"; // تأكد من المسار الصحيح
import { useGetSessionFilesQuery } from "../../../../../../services/sessions/files/sessionFiles";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
interface SessionFilesProps {
  sessionId: number;
}

export const SessionFiles = ({ sessionId }: SessionFilesProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {data:files,isLoading}=useGetSessionFilesQuery(sessionId)


  return (
    <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <InsertDriveFileIcon className="text-(--main-color)" /> Session Files
        </h2>
        <button onClick={() => setIsOpen(true)} className="flex items-center gap-1 text-(--main-color) cursor-pointer">
          <DriveFolderUploadIcon />
        </button>
        {/* <Button name="Add" onClick={() => setIsOpen(true)} /> */}
      </div>

      {/* File List / Empty State */}
      {!files || files.length === 0 ? (
        <div className="p-8 border-2 border-dashed border-gray-200 rounded-2xl text-center">
          <p className="text-xs text-gray-400 font-semibold">
            No files uploaded for this session yet.
          </p>
        </div>
      ) : (
        /* Horizontal Rows Container */
        <div className="flex flex-col gap-2.5">
          {files.map((file:any) => (
            <SessionMediaCard key={file.id} file={file} />
          ))}
        </div>
      )}

      {/* Add Modal */}
      <AddSessionFileModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sessionId={sessionId}
      />
    </div>
  );
};