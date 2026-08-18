import type { ModalProps } from "../../types/ModalProps";

export const Modal = (props: ModalProps) => {
  return (
    <div
      onClick={props.onClose}
      className={`fixed inset-0 z-50 flex justify-center items-center p-4 transition-colors
      ${props.open ? "visible bg-black/20" : "invisible"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white rounded-xl shadow p-6
          transition-all relative
          w-full max-w-2xl
          max-h-[90vh]
          flex flex-col
          ${props.open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        {/* Close button */}
        <button
          onClick={props.onClose}
          className="absolute top-2 right-2 z-10 p-1 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <span aria-hidden="true">×</span>
        </button>

        {/* Modal Content */}
        <div className="overflow-y-auto pr-2 flex-1">
          {props.children}
        </div>
      </div>
    </div>
  );
};