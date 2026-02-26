export default function Popup(props) {
  const { title, children } = props;


  return (
    <div className="popup">
      
      <div className={`${title? "popup__content" :"popup__container-image"}`}>
        <button
          onClick={props.onClose}
          aria-label="Close modal"
          className="popup__close"
          type="button"
        />
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
