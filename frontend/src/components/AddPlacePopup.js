import PopupWithForm from './PopupWithForm'
import {useState, useEffect} from 'react'

function AddPlacePopup({isOpen, onClose, onAddCard, isLoading}) {
  const [namePlace, setNamePlace] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setNamePlace('');
    setLink('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({
      name: namePlace,
      link: link,
    });
  }

  return (<PopupWithForm
    name='editAddForm'
    id='popupAddCard'
    title='Новое место'
    isLoading={isLoading}
    textLoad='Сохранение...'
    textOnButton='Создать'
    onSubmit={handleSubmit}
    isOpen={isOpen}
    onClose={onClose}
  >
    <input
      value={namePlace}
      onChange={e => setNamePlace(e.target.value)}
      type="text"
      id="inputAddPlace"
      name="name"
      placeholder="Название"
      className="popup__info popup__info_text_title"
      minLength={2}
      maxLength={30}
      required/>
    <span className="popup__input" id="inputAddPlace-error"/>
    <input
      value={link}
      onChange={e => setLink(e.target.value)}
      type="url"
      id="inputAddLink"
      name="link"
      placeholder="Ссылка на картинку"
      className="popup__info popup__info_text_link"
      required/>
    <span className="popup__input" id="inputAddLink-error"/>
  </PopupWithForm>)
}

export default AddPlacePopup;