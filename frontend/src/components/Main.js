import {useContext} from 'react'
import CurrentUserContext from "../contexts/CurrentUserContext";
import CardsContext from "../contexts/CardsContext";
import Card from "./Card";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onTrashClick, onCardLike}) {
  const currentUser = useContext(CurrentUserContext);
  const cards = useContext(CardsContext);

  return (<>
    <section className="profile">
      <div className="profile__left-group">
        <div className="profile__avatar" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="изображение профиля" className="profile__avatar-image"/>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button type="button" aria-label="редактировать профиль" className="profile__edit-button"
                  onClick={onEditProfile}/>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
      </div>
      <button type="button" aria-label="загрузить фото" className="profile__add-button" onClick={onAddPlace}/>
    </section>

    <section className="photo-grid">
      {cards.map((card) => (<Card
        key={card._id}
        onCardLike={onCardLike}
        card={card}
        onCardClick={onCardClick}
        onTrashClick={onTrashClick}
      />))}
    </section>
  </>)
}

export default Main;