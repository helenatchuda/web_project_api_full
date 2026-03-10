import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin({ email, password });
  };

  return (
    <section className="popup"> 
      <div className="popup__content"> 
        <form className='form' id='login-form' onSubmit={handleSubmit}>
          <h2 className='popup__title'>Entrar</h2>

          <label className='form__field'>
            <input
              className='form__input'
              placeholder='E-mail'
              required
              type='email'
              minLength="6" 
              maxLength="40"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label className='form__field'>
            <input
              className='form__input'
              placeholder='Senha'
              required
              type='password'
             
              minLength="6"
              maxLength="20"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <button className='popup__save-button' type='submit'>
            Entrar
          </button>

          <p className='form__text'>
            Ainda não é membro?{" "}
            <Link to="/register" className='form__link'>
              Inscreva-se aqui!
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;