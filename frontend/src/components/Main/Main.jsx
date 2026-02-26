import { useState, useEffect, useContext } from "react";
import Card from "../Card/Cards";
import Profile from "../Profile";
import Popup from "../Popup/Popup";
import NewCard from "../NewCard/NewCard";
import EditAvatar from "../EditAvatar/EditAvatar";
import EditProfile from "../EditProfile/EditProfile";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";


export default function Main({
  onCardLike,
  onCardDelete,
  onUpdateUser,
  onAddCard,
  onUpdateAvatar,
 

  cards

}) {
  const currentUser = useContext(CurrentUserContext); // Obter usuário do contexto

  const [popup, setPopup] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  
    

  // Configuração dos popups
  const newCardPopup = {
    title: "New card",
    children: (
      <NewCard
        onAddCard={onAddCard}
        onClose={handleClosePopup}
      />
    ),
  };

  const editProfilePopup = {
    title: "Edit profile",
    children: (
      <EditProfile
        onUpdateUser={onUpdateUser}
        onClose={handleClosePopup}
      />
    ),
  };

  const editAvatarPopup = {
    title: "Edit avatar",
    children: (
      <EditAvatar
        onUpdateAvatar={onUpdateAvatar}
        onClose={handleClosePopup}
      />
    ),
  };

  // Handlers para abrir/fechar popups
  function handleOpenPopup(popupType) {
   
    setPopup(popupType);
  }

  function handleClosePopup() {
    setPopup(null);
  }

 


  


  return (
    <main>
      <Profile
        onPhotoClick={() => handleOpenPopup(editAvatarPopup)}
        onAddCard={() => handleOpenPopup(newCardPopup)}
        onEditProfile={() => handleOpenPopup(editProfilePopup)}

      />

      <ul className="cards">
        {cards.length === 0 ? (
          <p className="no-cards-message">Nenhum cartão encontrado</p>
        ) : (

          cards.map((card) => {

            // Verificar se o usuário atual curtiu este card
            const isLiked = card.isLiked;
            // Verificar se o card pertence ao usuário atual
            const isOwn = card.owner === currentUser._id;

            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={handleOpenPopup}
                isLiked={isLiked}
                isOwn={isOwn}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })
        )}
      </ul>

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}