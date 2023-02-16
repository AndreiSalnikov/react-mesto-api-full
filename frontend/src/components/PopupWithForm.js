import Popup from "./Popup";

function PopupWithForm({name, id, title, onClose, isOpen, textOnButton, children, onSubmit, textLoad, isLoading, isValid}) {

  return (<Popup isOpen={isOpen} onClose={onClose} id={id}>
    <div className="popup__container">
      <button type="button" className="popup__close-button" title="Закрыть" onClick={onClose}/>
      <h3 className="popup__title">{title}</h3>
      <form onSubmit={onSubmit} name={name} id="popupEditForm" className="popup__form">
        {children}
        <button type="submit" id="submitEditButton"
                className={isValid ? "popup__save-button" : "popup__save-button popup__save-button_disabled" } disabled={!isValid}
               >{isLoading ? textLoad : textOnButton}</button>
      </form>
    </div>
  </Popup>);
}

export default PopupWithForm;
