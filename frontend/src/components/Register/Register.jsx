import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister({ email, password });
  };

  return (
    <section className="popup"> 
      <div className="popup__content"> 
        <form 
          className='form' 
          name='register-form' 
          id='register-form' 
          onSubmit={handleSubmit}
        >
          <h2 className='popup__title'>Inscrever-se</h2>

          <label className='form__field'>
            <input
              className='form__input'
              id='user-email'
              name='user-email'
              placeholder='E-mail'
              required
              type='email'
              
              minLength="6"
              maxLength="40"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <span className='form__error' id='user-email-error'></span>
          </label>

          <label className='form__field'>
            <input
              className='form__input'
              id='user-password'
              name='user-password'
              placeholder='Senha'
              required
              type='password'
             
              minLength="6"
              maxLength="20"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <span className='form__error' id='user-password-error'></span>
          </label>

          <button className='popup__save-button' type='submit'>
            Inscrever-se
          </button>

          <p className='form__text'>
            Já é um membro?{" "}
            <Link to="/login" className='form__link'>
              Faça o login aqui!
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;