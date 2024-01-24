export function createCard({name, link}, temp, delButton, likeButton, zoomCard) {
	const userCard = temp.querySelector('.places__item').cloneNode(true);
  //Переменная кнопки и слушатель кнопки удаления//
  const trashButton =  userCard.querySelector('.card__delete-button');
  trashButton.addEventListener('click', () => delButton(userCard));
  //Переменная лайка и слушатель лайка//
  const cardLikeButton = userCard.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', () => likeButton(cardLikeButton));
  // открытие картинки на весь экран//
  const cardImg = userCard.querySelector('.card__image');
	const cardTitle = userCard.querySelector('.card__title');
  
	cardImg.addEventListener('click', () => {zoomCard({name, link})});
  //подстановка значений из массива
  cardImg.src =  link;
  cardTitle.alt =  `На этой карточке ${name}`;
  cardTitle.textContent = name;
  return userCard;
}
//функция создания набора карточек на странице

// создание пользовательской карты
export function deleteCard(el) {
  el.remove();
}
export function likeCard(el) {
  el.classList.toggle('card__like-button_is-active');
}
