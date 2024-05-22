import { Button } from "@/components/ui/button";
import { X } from "react-feather";

interface ModalPropsType {
  isOpen: boolean;
  children: any;
  closeModal: () => void;
}

const Modal = ({ isOpen, children, closeModal }: ModalPropsType) => {
  if (!isOpen) return null;
  return (
    <div
      onClick={closeModal}
      className={`fixed inset-0 flex justify-center items-center bg-black/50`}
    >
      {/* modal */}
      <div
        className={`relative bg-[#0F0F0F] rounded-xl shadow px-20 pt-5 transition-all${
          isOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
        onClick={(e): any => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-900"
          onClick={closeModal}
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
