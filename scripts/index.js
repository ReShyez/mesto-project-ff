//Переменная контейнера
const listCards = document.querySelector('.places__list');
// Получили содержимое темплейта
const templateCard = document.querySelector('#card-template').content;
//функция сборки карточки
function renderCard({name, link}) {
	const userCard = templateCard.querySelector('.places__item').cloneNode(true);
  //Переменная кнопки
  const trashButton =  userCard.querySelector('.card__delete-button');
  //слушатель кнопки удаления
  trashButton.addEventListener('click', deleteCard);
  //подстановка значений из массива
  userCard.querySelector('.card__image').src =  link;
  userCard.querySelector('.card__title').textContent = name;
  listCards.prepend(userCard);
}
//функция удаление карточки
function deleteCard() {
  let delCard = document.querySelector('.card');
  delCard.remove();
}

initialCards.forEach(renderCard);
