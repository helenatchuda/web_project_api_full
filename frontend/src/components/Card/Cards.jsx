import card from "../../images/image2_card.png";
import lixeira from "../../images/Trash_lixeira.png";
import heart from "../../images/heart.png";
import ImagePopup from "../ImagePopup/ImagePopup";

export default function Card(props) {
  const { card, isLiked, isOwn, onCardLike, onCardDelete, onCardClick } = props;
  const { name, link } = props.card;

  const  handleLikeClick=(e)=> {

    onCardLike({...card,isLiked:!isLiked},!isLiked
     
    );
  }

  function handleDeleteClick(e) {
    e.stopPropagation();
    onCardDelete(card);
  }

  function handleImageClick() {
    if (onCardClick) {
      onCardClick({children:<ImagePopup name={card.name}link={card.link}/>})
    }
  }
 
  const heartClassName = `card__heart ${isLiked ? "card__heart_active" : ""}`;

  return (
    <>
      <li className="card">
        <div className="card__image-container">
          <img src={link} alt="Imagem do cartão" className="card__image"  onClick={handleImageClick} />
        
          <button className="card__delete-button" aria-label="Apagar cartão">
            <img
              src={lixeira}
              alt="Lixeira apagar"
              className="card__trash-icon"onClick={handleDeleteClick}
            />
          </button>
        </div>
        <div className="card__footer">
          <h2 className="card__title">{name}</h2>
          <img src={heart} alt="Curtir cartão" className={heartClassName} onClick={handleLikeClick}/>
        </div>
      </li>
    </>
  );
}
