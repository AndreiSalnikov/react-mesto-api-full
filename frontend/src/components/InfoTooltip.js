import Popup from "./Popup";
import successLogo from "../images/success-registration.svg"
import unsuccessLogo from "../images/unsuccess-registration.svg"

const InfoTooltip = ({success, onClose, isOpen}) => {
  return (
    <Popup onClose={onClose} isOpen={isOpen}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          id="closeButton-popupImg"
          title="Закрыть"
          onClick={onClose}
        />
        <img src={success ? successLogo : unsuccessLogo} alt={success ?"Вы успешно зарегистрировались" : "Регистрация не удалась"} className="popup__img-icon"/>
        <h2 className="popup__registration-text">
          {success ? "Вы успешно зарегистрировались!" : " Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </Popup>);
};

export default InfoTooltip;