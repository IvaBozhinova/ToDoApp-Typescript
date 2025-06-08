// src/ConfirmModal.tsx
import React from "react";

type ConfirmModalProps = {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Да</button>
          <button onClick={onCancel}>Не</button>
        </div>
      </div>
    </div>
  );
};
