import React from "react";

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  if (!isOpen) return null;

  return (
    <div className="popup popup_opened">
      <div className="popup__container_tooltip">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        />

        <div
          className={`popup__icon ${isSuccess ? "popup__icon_success" : "popup__icon_error"
            }`}
        />

        <h2 className="popup__title_tooltip">
          {isSuccess
            ? "Vitória! Você precisa se registrar."
            : "Ops, algo saiu deu errado! Por favor, tente novamente."}
        </h2>
      </div>
    </div>
  );
}


