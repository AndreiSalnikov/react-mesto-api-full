import PopupWithForm from "./PopupWithForm";
import {useRef, useEffect} from 'react'

function EditAvatarPopup({isOpen, onClose, isLoading, onUpdateAvatar}) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = ""
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (<PopupWithForm
    name='editAvatarForm'
    id='popupEditAvatar'
    title='Обновить аватар'
    isLoading={isLoading}
    textLoad='Сохранение...'
    textOnButton='Сохранить'
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
  >
    <input
      ref={avatarRef}
      type="url"
      id="inputEditLink"
      name="link"
      placeholder="Ссылка на аватар"
      className="popup__info popup__info_text_link"
      required/>
    <span className="popup__input" id="inputEditLink-error"/>
  </PopupWithForm>)
}

export default EditAvatarPopup;