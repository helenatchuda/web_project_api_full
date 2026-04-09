import { Link } from "react-router-dom";
import { useState } from "react";

const Login = ({  onLogin }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     onLogin(data);
  };


  return (
    <div className="login">
      <p className="login__welcome">
        Entrar
      </p>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          id="email"
          required
          name="email"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          id="password"
          required
          name="password"
          type="password"
          placeholder="Senha"
          value={data.password}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <div className="login__button-container">
          <button type="submit" className="login__button">
            Entrar
          </button>
        </div>
      </form>

      <div className="login__signup">
        <p>
          Ainda não é membro?{" "}
          <Link to="/signup" className="login__signup-link">
            Inscreva-se aqui!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;