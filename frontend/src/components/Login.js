import {useState} from 'react';

const Login = ({onLogin, textLoad, textOnButton, isLoading}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault()
    onLogin(email, password)
  } 

  return (
    <div className={"authentication"}>
      <h2 className={"authentication__title"}>Вход</h2>
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
    </div>
  );
};

export default Login;