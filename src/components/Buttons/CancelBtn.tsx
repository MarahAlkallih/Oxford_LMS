import type { Btn } from "../../types/submitBtn"

export const CancelBtn = ({ name, onClick }: Btn) => {
    return (
        <div className="w-full h-[50px]">
            <button
                onClick={onClick}
                className="
                    w-full h-full
                    p-2
                    bg-gray-300
                    hover:bg-gray-400
                    cursor-pointer
                    rounded
                "
            >
                {name}
            </button>
        </div>
    )
}