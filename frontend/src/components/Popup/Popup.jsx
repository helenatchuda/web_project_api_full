export default function Popup(props) {
  const { title, children, onClose, className = "" } = props;

  return (
    <div className={`popup ${className}`.trim()}>
      <div className={`${title ? "popup__content" : "popup__container-image"}`}>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="popup__close"
            type="button"
          >
            ×
          </button>
        )}
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
