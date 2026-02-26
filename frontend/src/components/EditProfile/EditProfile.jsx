import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import{api} from "../../utils/api";


export default function EditProfile({ onUpdateUser, onClose }) {
  // Obter o contexto do usuário atual
  const currentUser = useContext(CurrentUserContext);

  // Estados locais para os campos do formulário
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inicializar os campos com os valores do usuário atual
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setDescription(currentUser.about || "");
    }
  }, [currentUser]);

  // Handlers para mudanças nos inputs
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handler para submit do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !description.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Chamar a função do App para atualizar o usuário
      await onUpdateUser({
        name: name.trim(),
        about: description.trim(),
      });
      api.setUserInfo({

        name: name.trim(),
        about: description.trim(),
      })

     onClose();
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="popup__form form popup__form-edit-name"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name">
        <input
          type="text"
          id="name"
          className="form__input form__input-userName"
          placeholder="Nome"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
          disabled={isSubmitting}
        />
        <span className="form__error" id="name-error" aria-live="polite"></span>
      </label>

      <label htmlFor="description">
        <input
          type="text"
          id="description"
          className="form__input form__input-about"
          placeholder="Descrição"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
          disabled={isSubmitting}
        />
        <span
          className="form__error"
          id="description-error"
          aria-live="polite"
        ></span>
      </label>

      <button
        type="submit"
        className={`popup__save-button ${
          isSubmitting ? "popup__save-button_disabled" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Salvando..." : "Salvar"}
      </button>

      <div
        className="form__error-summary"
        role="alert"
        aria-live="polite"
      ></div>
    </form>
  );
}
