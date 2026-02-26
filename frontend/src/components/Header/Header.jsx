import logo from "../../images/logo.png";

export default function Header() {
  return (
    <div className="page__content">
      <header className="header page__section">
        <img
          src={logo}
          alt="Around the U.S logo"
          className="logo header__logo"
        />
      </header>
    </div>
  );
}
