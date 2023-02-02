import {useContext} from 'react'
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onTrashClick, onCardLike}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `${isLiked ? 'item__icon item__icon_active' : 'item__icon'}`
  );

  function handleTrashClick() {
    onTrashClick(card);
  }

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <article className="item">
      {isOwn && <button className="item__delete-img" id="trash" onClick={handleTrashClick}></button>}
      <img src={card.link} id="photoGridImg" className="item__img" alt="картинка" onClick={handleCardClick}/>
      <div className="item__group-icon">
        <h2 className="item__text">{card.name}</h2>
        <div className="item__like-container">
          <button className={cardLikeButtonClassName} id="like" onClick={handleLikeClick}></button>
          <div className="item__like-counter">{card.likes.length}</div>
        </div>
      </div>
    </article>)
}

export default Card;