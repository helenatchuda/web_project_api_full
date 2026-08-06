import React, { useRef, useState, useEffect } from "react";

export default function EditAvatar({onUpdateAvatar, onClose}) {
  const avatarInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = () => {
    const url = avatarInputRef.current.value.trim();

    if (!url) {
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const avatarUrl = avatarInputRef.current.value.trim();

    if (!avatarUrl) {
      return;
    }

    try {
      new URL(avatarUrl);
    } catch {
      return;
    }

    setIsSubmitting(true);

    onUpdateAvatar({
      avatar: avatarUrl,
    });
    onClose();
  };

  useEffect(() => {
    const currentRef = avatarInputRef.current;
    return () => {
      if (currentRef) {
        currentRef.value = "";
      }
    };
  }, []);
  return (
    <form className="form" name="photo-form" id="new-photo-form" onSubmit={handleSubmit}>
      <label className="form__field">
        <input ref={avatarInputRef}
          className="form__input form__input_type_photo-name"
          id="Photo-name"
        
         
          name="Photo-name"
          placeholder="image link"
          required
          type="url"
          onChange={handleInputChange}
          disabled={isSubmitting}
        />
        <span className="form__error" id="photo-name-error"></span>
      </label>

      <button
        className=" popup__save-button"
        disabled={isSubmitting}
        type={"submit"}
      >
        {isSubmitting ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
