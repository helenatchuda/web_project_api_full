import React from "react";

export default function InfoTooltip({ isOpen, onClose, title, message, isSuccess }) {
  if (!isOpen) return null;

  const defaultTitle = isSuccess ? "Tudo certo!" : "Algo deu errado";

  return (
    <div className="popup popup_opened" role="dialog" aria-modal="true">
      <div className="popup__container_tooltip">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
          aria-label="Fechar aviso"
        />

        <div
          className={`popup__icon ${isSuccess ? "popup__icon_success" : "popup__icon_error"}`}
        />

        <h2 className="popup__title_tooltip">{title || defaultTitle}</h2>
        {message && <p className="tooltip__message">{message}</p>}
      </div>
    </div>
  );
}


