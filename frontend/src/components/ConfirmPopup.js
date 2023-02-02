import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({isOpen, onClose, onCardDelete, card, isLoading}) {

  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name='editProfileForm'
      id='popupDelete'
      title='Вы уверены?'
      isLoading={isLoading}
      textLoad='Удаление...'
      textOnButton='Да'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  )
}

export default ConfirmPopup;