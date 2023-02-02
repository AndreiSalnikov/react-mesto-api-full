import logo from '../images/logo.svg';
import {Link, Route, Switch} from "react-router-dom";
import {useState} from "react";

function Header({email, onSignOut}) {
  const [isBurgerMenuClick, setIsBurgerMenuClick] = useState(false)
  return (
    <header className={`${isBurgerMenuClick ? 'header header_mobile' : 'header'}`}>
      <img src={logo} className="header__logo" alt="логотип страницы"/>
      <Switch>
        <Route exact path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
        <Route exact path="/">
          <div className={`${isBurgerMenuClick ? 'header__user-info header__user-info_active' : 'header__user-info'}`}>
            <p className="header__email">{email}</p>
            <Link to='/sign-in' className="header__menu-link" onClick={onSignOut}>Выйти</Link>
          </div>
          <button className="hamburger" onClick={()=>{
              setIsBurgerMenuClick(!isBurgerMenuClick)
          }}>
            <span className={`${isBurgerMenuClick ? 'hamburger__line hamburger__line_active' : 'hamburger__line'}`}></span>
            <span className={`${isBurgerMenuClick ? 'hamburger__line hamburger__line_active' : 'hamburger__line'}`}></span>
            <span className={`${isBurgerMenuClick ? 'hamburger__line hamburger__line_active' : 'hamburger__line'}`}></span>
          </button>
        </Route>
      </Switch>
    </header>
  )
}

export default Header;