import type { ModalProps } from "../../types/ModalProps";
export const Modal = (props: ModalProps) => {
  return (
    <div
      onClick={props.onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors
      ${props.open ? "visible bg-black/20" : "invisible"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all relative
        ${props.open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        <button
          onClick={props.onClose}
          className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <span aria-hidden="true">x</span>
        </button>

        {props.children}
      </div>
    </div>
  );
};
