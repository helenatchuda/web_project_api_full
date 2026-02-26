import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useState, useEffect } from "react";
import { api } from "../utils/api";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  // Buscar dados do usuário
  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((error) => {
        console.error("Erro ao buscar usuário:", error);
      });
  }, []);

  // Buscar cards
  useEffect(() => {
    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((error) => {
        console.error("Erro ao buscar cards:", error);
      });
  }, []);
  function handleAddCard(card) {
    api.addNewCard(card).then((addedCard) => {
      setCards([addedCard, ...cards]);
    });
  }

  async function handleLogin(data) {
    try {
      const res = await api.login(data);
      setAccessToken(res.token);
      api.setAccessToken(res.token);
      setIsLoggedIn(true);

      const info = await api.getUserInfo();
      setUserEmail(info.email);
      await loadAppData();
    } catch (err) {
      console.error("Erro ao fazer login:", err);

      handleOpenPopup("loginError");
    }
  }
const handleRegister = async (data) => {
    try {
      await api.register(data);
      handleOpenPopup(registerSuccessPopup);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  // Função para atualizar likes
  function handleCardLike(updatedCard, like) {
    console.log(updatedCard);
    api.changeLikeCardStatus(updatedCard._id, like);
    setCards((prevCards) =>
      prevCards.map((card) =>
        card._id === updatedCard._id ? updatedCard : card,
      ),
    );
  }
  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar).then((avatarData) => {
      setCurrentUser(avatarData);
    });
  }
 

  // Função para excluir card
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() =>
        setCards((prevCards) =>
          prevCards.filter((item) => item._id !== card._id),
        ),
      );
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        cards={cards}
        onUpdateUser={setCurrentUser}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        onUpdateAvatar={handleUpdateAvatar}
        onAddCard={handleAddCard}
      />
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
