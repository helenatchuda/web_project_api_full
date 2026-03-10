import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom"; // Importações necessárias
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login/Login"; 
import Register from "./Register/Register";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";

function App() {
  // --- NOVOS ESTADOS (O que o instrutor pediu) ---
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  
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
    } catch (error) {
      console.error("Erro ao carregar dados iniciais:", error);
    }
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

  // --- LÓGICA DE LOGIN ---
  async function handleLogin(data) {
    try {
      const res = await api.login(data); // data contém {email, password}
      
      // Salva o token na API e no estado
      api.setAccessToken(res.token);
      setAccessToken(res.token);
     
      
      // Busca informações do usuário para pegar o email
      const info = await api.getUserInfo();
      console.log("info",info)
      setUserEmail(info.email);
      
      await loadAppData().then(()=> setIsLoggedIn(true)).finally(()=> navigate("/"))
       
      // Redireciona para a home
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      // handleOpenPopup("loginError"); // Ative se tiver essa função
    }
  }

  // --- LÓGICA DE REGISTRO ---
  const handleRegister = async (data) => {
    try {
      await api.register(data);
      // handleOpenPopup(registerSuccessPopup);
      navigate("/login");
    } catch (error) {
      console.error("Erro no registro:", error);
    }
  };

  // --- RESTANTE DAS FUNÇÕES (Cards e Avatar) ---
  function handleAddCard(card) {
    api.addNewCard(card).then((addedCard) => {
      setCards([addedCard, ...cards]);
    });
  }

  function handleCardLike(updatedCard, like) {
    api.changeLikeCardStatus(updatedCard._id, like).then((newCard) => {
      setCards((prevCards) =>
        prevCards.map((card) => (card._id === updatedCard._id ? newCard : card))
      );
    });
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar).then((avatarData) => {
      setCurrentUser(avatarData);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() =>
      setCards((prevCards) => prevCards.filter((item) => item._id !== card._id))
    );
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={userEmail} isLoggedIn={isLoggedIn} />
        
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
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
        </Routes>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;