import Popup from "./Popup"

function ImagePopup({card, onClose}) {
  return (<Popup card={card} onClose={onClose} id={"popupShowImg"}>
    <figure className="popup__figure">
      <button
        type="button"
        className="popup__close-button"
        id="closeButton-popupImg"
        title="Закрыть"
        onClick={onClose}/>
      <img className="popup__img" src={card?.link} alt="картинка"/>
      <figcaption className="popup__figcaption" title={card?.name}/>
    </figure>
  </Popup>)
}

export default ImagePopup;