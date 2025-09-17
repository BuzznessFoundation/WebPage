import React from 'react';

export default function PromptLimitModal({
  show,
  promptCount,
  dailyLimit = 30,
  threshold = 15,
  onClose = () => {}
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" />
      <div className="relative w-11/12 md:w-1/3 bg-white rounded-lg p-6 shadow-lg opacity-95">
        <h3 className="text-lg font-bold mb-2">Has alcanzado un umbral de uso</h3>
        <p className="text-sm text-gray-700 mb-4">
          Has enviado {promptCount} prompts hoy. El límite diario es de {dailyLimit} prompts.
        </p>
        <p className="text-xs text-gray-500">
          Este modal puede cerrarse con el botón de prueba. Se muestra a partir de {threshold} prompts.
        </p>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-white rounded hover:opacity-90"
            aria-label="Cerrar aviso de límite de prompts"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}