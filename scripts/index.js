//Переменная контейнера
const listCards = document.querySelector('.places__list');
// Получили содержимое темплейта
const templateCard = document.querySelector('#card-template').content;
//функция удаление карточки
function deleteCard(el) {
  el.remove();
}
//функция сборки карточки
function renderCard({name, link}, delButton) {
	const userCard = templateCard.querySelector('.places__item').cloneNode(true);
  //Переменная кнопки
  const trashButton =  userCard.querySelector('.card__delete-button');
  //слушатель кнопки удаления
  trashButton.addEventListener('click', () => delButton(userCard));
  //подстановка значений из массива
  userCard.querySelector('.card__image').src =  link;
  userCard.querySelector('.card__image').alt =  `На этой карточке ${name}`;
  userCard.querySelector('.card__title').textContent = name;
  return userCard;
}
//функция создания набора карточек на страние
function addCards () {
  initialCards.forEach(function (userCard) {
      const card = renderCard(userCard,deleteCard);
      listCards.prepend(card);
  });
}

addCards();
