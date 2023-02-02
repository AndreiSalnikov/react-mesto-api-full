import {Link} from "react-router-dom";
import {useState} from "react";

const Register = ({onRegister, isLoading, textLoad, textOnButton}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault()
    onRegister(email, password)
  }

  return (
    <div className={"authentication"}>
      <h2 className={"authentication__title"}>Регистрация</h2>
      <form className={"authentication__form"} onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type={"email"}
          className={"authentication__input"}
          placeholder="Email"
          required/>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type={"password"}
          className={"authentication__input"}
          placeholder="Пароль"
          required/>
        <button className={"authentication__button"}>{isLoading ? textLoad : textOnButton}</button>
      </form>
      <p className={"authentication__text"}> Уже зарегистрированы?
        <Link to="sign-in" className={"authentication__link"}>
          ㅤВойти
        </Link>
      </p>
    </div>
  );
};

export default Register;