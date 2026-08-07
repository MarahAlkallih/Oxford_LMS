import GroupAddIcon from "@mui/icons-material/GroupAdd";

interface SessionJoinRequestsProps {
  sessionId?: number;
}

export const SessionJoinRequestsSection: React.FC<SessionJoinRequestsProps> = ({ sessionId }) => {
  return (
    <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-xs flex flex-col min-h-[420px]">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <GroupAddIcon className="text-(--main-color)" /> Join Requests
        </h2>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
          0 Requests
        </span>
      </div>

      {/* Placeholder Area for Future Requests Content */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-200 rounded-2xl mt-4 bg-gray-50/50">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
          <GroupAddIcon className="text-gray-400" sx={{ fontSize: 24 }} />
        </div>
        <p className="text-xs text-gray-400 font-semibold text-center max-w-xs">
          Join requests list and management table will be integrated here.
        </p>
      </div>
    </div>
  );
};