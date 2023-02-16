import PopupWithForm from "./PopupWithForm";
import {useEffect} from 'react'
import {useForm} from "react-hook-form";

function EditAvatarPopup({isOpen, onClose, isLoading, onUpdateAvatar}) {
  const {register, formState: {errors,isValid},handleSubmit,reset } = useForm({mode: "onChange"})

  useEffect(() => {
    reset()
  }, [isOpen,reset]);

  function onSubmit({url},e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: url
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
    onSubmit={handleSubmit(onSubmit)}
    isValid={isValid}
  >
    <input
      {...register('url',{required: 'Обязательное поле',
        validate: {
          isUrl: (value) => /[https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}]/gi.test(value) || `Введите корректную ссылку на картинку`
        },
      })}
      placeholder="Ссылка на аватар"
      className="popup__info popup__info_text_link"
    />
    <span className={ errors.url ? "popup__input popup__input_error_visible" : "popup__input"}>{errors?.url?.message || ""}</span>
  </PopupWithForm>)
}

export default EditAvatarPopup;
