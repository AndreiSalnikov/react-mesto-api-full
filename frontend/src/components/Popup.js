import {useEffect} from "react";

function Popup({isOpen, card, onClose, children, id}) {

  useEffect(() => {
    if (isOpen || card) {
      function handleEsc(evt) {
        if (evt.key === 'Escape') {
          onClose();
        }
      }

      document.addEventListener('keydown', handleEsc);

      return () => {
        document.removeEventListener('keydown', handleEsc);
      }
    }
  }, [isOpen, onClose, card]);

  const closePopupOverlay = (event) => {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
      onClose();
    }
  }

  return (<div
    className={`popup popup_overlay_black ${isOpen || card ? 'popup_opened' : ''}`}
    id={id}
    onClick={closePopupOverlay}>
    {children}
  </div>)

}

export default Popup;