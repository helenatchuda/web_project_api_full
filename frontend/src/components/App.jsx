import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom"; // Importações necessárias
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Popup from "./Popup/Popup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";

function App() {
  // --- NOVOS ESTADOS (O que o instrutor pediu) ---
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [infoTooltip, setInfoTooltip] = useState({ title: "", message: "" });
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const navigate = useNavigate(); // Resolve o erro de 'navigate'

  // --- FUNÇÃO PARA CARREGAR DADOS (O que o instrutor pediu) ---
  const loadAppData = async () => {
    try {
      const [userData, cardsData] = await Promise.all([
        api.getUserInfo(),
        api.getInitialCards(),
      ]);
      setCurrentUser(userData);
      setCards(cardsData);
    } catch (error) {}
  };

  // Tenta recuperar sessão se houver um token (Opcional, mas recomendado)
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      api.setAccessToken(token);
      setIsLoggedIn(true);
      loadAppData();
    }
  }, []);

  const closeInfoTooltip = () => {
    setIsInfoTooltipOpen(false);
  };

  const openInfoTooltip = (title, message, type = "success") => {
    setInfoTooltip({ title, message, type });
    setIsInfoTooltipOpen(true);
  };

  const renderInfoTooltip = () => {
    const isSuccess = infoTooltip.type === "success";
    const iconClass = isSuccess
      ? "tooltip__icon tooltip__icon_success"
      : "tooltip__icon tooltip__icon_error";

    return (
      <div className="tooltip__content">
        <div className={iconClass} aria-hidden="true">
          {isSuccess ? "✓" : "✕"}
        </div>
        <h3 className="popup__title">{infoTooltip.title}</h3>
        <p className="tooltip__message">{infoTooltip.message}</p>
      </div>
    );
  };

  // --- LÓGICA DE LOGIN ---
  async function handleLogin(data) {
    try {
      console.log("Dados de login recebidos:", data); // 🔍 Debug
      const res = await api.login(data); // data contém {email, password}
      console.log("Resposta do login:", res);
      // Salva o token na API, no localStorage e no estado
      api.setAccessToken(res.token);
      localStorage.setItem("jwt", res.token);
      setAccessToken(res.token);

      // Busca informações do usuário para pegar o email
      const info = await api.getUserInfo();
      console.log("info", info);
      setUserEmail(info.email);

      await loadAppData()
        .then(() => setIsLoggedIn(true))
        .finally(() => navigate("/"));
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      openInfoTooltip(
        "Falha no login",
        "E-mail ou senha inválidos. Por favor, verifique seus dados e tente novamente.",
        "error",
      );
    }
  }

  // --- LÓGICA DE REGISTRO ---
  const handleRegister = async (data) => {
    try {
      await api.register(data);
      openInfoTooltip(
        "Cadastro realizado",
        "Seu cadastro foi realizado com sucesso. Faça login para continuar.",
        "success",
      );
      navigate("/login");
    } catch (error) {
      console.error("Erro no registro:", error);
      openInfoTooltip(
        "Erro no cadastro",
        "Não foi possível concluir o registro. Por favor, tente novamente.",
        "error",
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    api.setAccessToken(null);
    setIsLoggedIn(false);
    setUserEmail("");
    setCurrentUser({});
    setCards([]);
    navigate("/login");
  };

  // --- RESTANTE DAS FUNÇÕES (Cards e Avatar) ---
  function handleAddCard(card) {
    api.addNewCard(card).then((addedCard) => {
      setCards([addedCard, ...cards]);
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like === currentUser._id); // ou como você determina se está curtido
    console.log("isLiked", isLiked);
    console.log("like_id", card.likes);
    console.log("user", currentUser);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((prevCards) =>
        prevCards.map((c) => (c._id === card._id ? newCard : c)),
      );
    });
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar).then((avatarData) => {
      setCurrentUser(avatarData);
    });
  }

  function handleCardDelete(card) {
    console.log("Card a ser deletado:", card); // 🔍 Debug
    console.log("ID do card:", card._id); // 🔍 Debug

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
      <div className="page">
        <Header
          userEmail={userEmail}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />

        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Main
                  cards={cards}
                  onUpdateUser={setCurrentUser}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onUpdateAvatar={handleUpdateAvatar}
                  onAddCard={handleAddCard}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/register"
            element={<Register onRegister={handleRegister} />}
          />
        </Routes>

        {isInfoTooltipOpen && (
          <Popup onClose={closeInfoTooltip}>{renderInfoTooltip()}</Popup>
        )}

        {isLoggedIn && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
