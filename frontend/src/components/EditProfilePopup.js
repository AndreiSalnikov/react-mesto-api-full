import PopupWithForm from './PopupWithForm'
import {useState, useEffect, useContext} from 'react'
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser,isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (<PopupWithForm
    name='editProfileForm'
    id='popupEditProfile'
    title='Редактировать профиль'
    isLoading={isLoading}
    textLoad='Сохранение...'
    textOnButton='Сохранить'
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}>
    <input
      value={name}
      onChange={e => setName(e.target.value)}
      name='name'
      type="text"
      id="inputProfileName"
      placeholder="имя"
      className="popup__info popup__info_text_name"
      minLength={2}
      maxLength={40}
      required
    />
    <span className="popup__input" id="inputProfileName-error"/>
    <input
      value={description}
      onChange={e => setDescription(e.target.value)}
      type="text" id="inputProfileJob"
      name="description" placeholder="профессия"
      className="popup__info popup__info_text_job"
      minLength={2}
      maxLength={200}
      required
    />
    <span className="popup__input" id="inputProfileJob-error"/>
  </PopupWithForm>)
}

export default EditProfilePopup;

