import PopupWithForm from './PopupWithForm'
import {useEffect} from 'react'
import {useForm} from "react-hook-form";

function AddPlacePopup({isOpen, onClose, onAddCard, isLoading}) {
  const {register, formState: {errors,isValid},handleSubmit,reset } = useForm({mode: "onChange"})

  useEffect(() => {
    reset()
  }, [isOpen]);

  function onSubmit({title,url},e) {
    e.preventDefault();
    onAddCard({
      name: title,
      link: url,
    });
    reset();
  }

  return (<PopupWithForm
    name='editAddForm'
    id='popupAddCard'
    title='Новое место'
    isLoading={isLoading}
    textLoad='Сохранение...'
    textOnButton='Создать'
    onSubmit={handleSubmit(onSubmit)}
    isOpen={isOpen}
    onClose={onClose}
    isValid={isValid}
  >
    <input
      {...register('title',{required: 'Обязательное поле',
        validate: {
          minLength: (value) => value.length >= 2 || `Текст должен быть не короче 2 симв. Длина текста сейчас: ${value.length}`
        },
      })}
      placeholder="Название"
      className={"popup__info popup__info_text_title"}
      // value={namePlace}
      // onChange={e => setNamePlace(e.target.value)}
      // type="text"
      // id="inputAddPlace"
      // name="name"
      // placeholder="Название"
      // className="popup__info popup__info_text_title"
      // minLength={2}
       maxLength={30}
      // required

    />
    <span className={ errors.title ? "popup__input popup__input_error_visible" : "popup__input"}>{errors?.title?.message || ""}</span>
    {/*<span className="popup__input" id="inputAddPlace-error"/>*/}
    <input
      {...register('url',{required: 'Обязательное поле',
        validate: {
          isUrl: (value) => /[https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}]/gi.test(value) || `Введите корректную ссылку на картинку`
        },
      })}
      placeholder="Ссылка на картинку"
      className={"popup__info popup__info_text_link"}
      // value={link}
      // onChange={e => setLink(e.target.value)}
      // type="url"
      // id="inputAddLink"
      // name="link"
      // placeholder="Ссылка на картинку"
      // className="popup__info popup__info_text_link"
      // required
    />
    <span className={ errors.url ? "popup__input popup__input_error_visible" : "popup__input"}>{errors?.url?.message || ""}</span>
    {/*<span className="popup__input" id="inputAddLink-error"/>*/}
  </PopupWithForm>)
}

export default AddPlacePopup;
