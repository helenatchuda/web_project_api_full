import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.png";

export default function Header({ userEmail, isLoggedIn, onLogout }) {
  const location = useLocation();
  const authLink = location.pathname === "/register"
    ? { to: "/login", label: "Faça o login" }
    : { to: "/register", label: "Inscrever-se" };

  return (
    <div className="page__content">
      <header className="header page__section">
        <img
          src={logo}
          alt="Around the U.S logo"
          className="logo header__logo"
        />

        {!isLoggedIn ? (
          <Link to={authLink.to} className="header__action">
            {authLink.label}
          </Link>
        ) : (
          <div className="header__user">
            <span className="header__email">{userEmail}</span>
            <button className="header__logout" onClick={onLogout} type="button">
              Sair
            </button>
          </div>
        )}
      </header>
    </div>
  );
}
