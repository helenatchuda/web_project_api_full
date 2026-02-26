import React, { useRef, useState, useEffect } from "react";

export default function EditAvatar({onUpdateAvatar, onClose}) {
  const avatarInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");

  const handleInputChange = () => {
    const url = avatarInputRef.current.value.trim();

    if (!url) {
   
      setError("");
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const avatarUrl = avatarInputRef.current.value.trim();

    if (!avatarUrl) {
      setError("Por favor, insira uma URL");
      return;
    }

    try {
      new URL(avatarUrl);
    } catch (err) {
      setError("Por favor, insira uma URL válida");
      return;
    }

    setIsSubmitting(true);

    onUpdateAvatar({
      avatar: avatarUrl,
    });
    onClose();
  };

  useEffect(() => {
    return () => {
      if (avatarInputRef.current) {
        avatarInputRef.current.value = "";
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
