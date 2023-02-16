import PopupWithForm from './PopupWithForm'
import {useEffect, useContext} from 'react'
import CurrentUserContext from "../contexts/CurrentUserContext";
import {useForm} from "react-hook-form";

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
  const {register, formState: {errors,isValid},handleSubmit,reset } = useForm({mode: "onChange"})

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    reset({
      name: currentUser.name,
      description: currentUser.about
    })
  }, [currentUser,isOpen,reset]);

  function onSubmit({name,description},e) {
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
    onSubmit={handleSubmit(onSubmit)}
    isValid={isValid}>
    <input
      {...register('name',{required: 'Обязательное поле',
        validate: {
          minLength: (value) => value.length >= 2 || `Текст должен быть не короче 2 симв. Длина текста сейчас: ${value.length}`
        },
      })}
      placeholder="Имя"
      className={"popup__info popup__info_text_name"}
      maxLength={40}
    />
    <span className={ errors.name ? "popup__input popup__input_error_visible" : "popup__input"}>{errors?.name?.message || ""}</span>
    <input
      {...register('description',{required: 'Обязательное поле',
        validate: {
          minLength: (value) => value.length >= 2 || `Текст должен быть не короче 2 симв. Длина текста сейчас: ${value.length}`
        },
      })}
      placeholder="Профессия"
      className={"popup__info popup__info_text_job"}
      maxLength={200}
    />
    <span className={ errors.description ? "popup__input popup__input_error_visible" : "popup__input"}>{errors?.description?.message || ""}</span>
  </PopupWithForm>)
}

export default EditProfilePopup;

