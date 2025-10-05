import React, { useEffect } from "react";

const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const duration = toast.duration || 5000;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const getTypeStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: '#10b981',
          color: '#ffffff',
          border: '2px solid #059669'
        };
      case 'error':
        return {
          backgroundColor: '#ef4444',
          color: '#ffffff',
          border: '2px solid #dc2626'
        };
      case 'warning':
        return {
          backgroundColor: '#f59e0b',
          color: '#000000',
          border: '2px solid #d97706'
        };
      case 'info':
        return {
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          border: '2px solid #2563eb'
        };
      default:
        return {
          backgroundColor: '#374151',
          color: '#ffffff',
          border: '2px solid #1f2937'
        };
    }
  };

  const styles = getTypeStyles(toast.type);

  return (
    <div 
      className="fixed top-24 right-4 px-6 py-4 rounded-lg shadow-2xl z-[9999] max-w-sm animate-slide-in-right"
      style={styles}
    >
      <div className="flex items-start justify-between space-x-3">
        <div className="flex-1">
          {toast.title && (
            <div className="font-bold text-base mb-2" style={{ color: styles.color }}>
              {toast.title}
            </div>
          )}
          <div className="text-sm leading-relaxed" style={{ color: styles.color }}>
            {toast.message}
          </div>
        </div>
        <button 
          onClick={onClose}
          className="flex-shrink-0 ml-3 hover:opacity-70 font-bold text-xl leading-none"
          style={{ color: styles.color }}
          aria-label="Cerrar notificación"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;