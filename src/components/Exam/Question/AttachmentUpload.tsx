interface AttachmentUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

export const AttachmentUpload = ({ file, setFile }: AttachmentUploadProps) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 h-full">
      <h3 className="text-lg font-bold text-(--main-color) mb-4">Attachments</h3>
      <label className="block text-sm font-medium text-gray-600 mb-2">Upload supportive file (Optional)</label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-8 hover:bg-gray-50 transition-colors">
        <div className="text-center">
          <svg className="mx-auto h-10 w-10 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
          </svg>
          <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-(--color-watermelon) focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--main-color)] hover:text-[var(--color-watermelon-dark)]">
              <span>Upload a file</span>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </label>
          </div>
          <p className="text-xs leading-5 text-gray-500 mt-1">
            {file ? file.name : "PDF, PNG, JPG up to 10MB"}
          </p>
        </div>
      </div>
    </div>
  );
};