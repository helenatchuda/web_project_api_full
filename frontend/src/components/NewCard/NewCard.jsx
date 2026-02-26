import React from "react";
export default function NewCard({ onAddCard, onClose }) {

  const [cardName, setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();


    onAddCard({
      name: cardName,
      link: cardLink
    });



    onClose();
  }
  return (
    
    <form className="form" name="card-form" id="new-card-form" onSubmit={handleSubmit} >
      <label className="form__field">
        <input
          className="form__input form__input_type_card-name"
          id="card-name"
          maxLength="30"
          minLength="1"
          name="card-name"
          placeholder="Title"
          required
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
        <span className="form__error" id="card-name-error"></span>
      </label>
      <label className="form__field">
        <input
          className="form__input form__input_type_url"
          id="card-link"
          name="link"
          placeholder="Image link"
          required
          type="url"

          value={cardLink}
          onChange={(e) => setCardLink(e.target.value)}
        />
        <span className="form__error" id="card-link-error"></span>
      </label>

      <button className=" popup__save-button "
        type="submit"
      >

        Salvar
      </button>
    </form>
  );
}
