import React from "react";

interface ConfirmModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  id,
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-xl w-96">
        <div className="my-auto mx-auto">
          <p className="text-center justify-center py-2">{message}</p>
        </div>
        <div className="flex justify-center items-center my-2">
          <button
            className="c66-btn-confirm-modal"
            type="button"
            onClick={() => onConfirm(id)}
          >
            {confirmText}
          </button>
          <button
            className="c66-btn-cancel-modal"
            type="button"
            onClick={onClose}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
