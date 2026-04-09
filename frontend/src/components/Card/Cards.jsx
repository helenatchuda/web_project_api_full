import card from "../../images/image2_card.png";
import lixeira from "../../images/Trash_lixeira.png";
import heart from "../../images/heart.png";
import heartativa from "../../images/heartativa.png";
import ImagePopup from "../ImagePopup/ImagePopup";
import React, { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'; 

export default function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const { card, isOwn, onCardLike, onCardDelete, onCardClick } = props;
  const { name, link } = props.card;
  const isLiked = card.likes.some(like => like === currentUser._id);
  

const handleLikeClick = (e) => {
  e.stopPropagation(); 
  console.log("like")
  onCardLike(card); 
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
         <img src={isLiked ? heartativa : heart} alt="Curtir cartão" className={heartClassName} onClick={handleLikeClick}/>
        </div>
      </li>
    </>
  );
}
