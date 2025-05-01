import React, { ReactNode } from 'react';

/**
 * Modal: reusable modal wrapper
 * Props:
 * - isOpen: controls visibility
 * - onClose: callback when modal should close
 * - title?: optional header title
 * - children: modal body content
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-30" onClick={onClose} />

      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full z-50">
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <div>{children}</div>
      </div>
    </div>
  );
};

