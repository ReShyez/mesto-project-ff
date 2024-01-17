//Переменная контейнера
const listCards = document.querySelector('.places__list');
const templateCard = document.querySelector('#card-template').content;
const userProfile = document.querySelector('.profile');
const profileEditPopup = document.querySelector('.popup');
const userForm = document.querySelector('.popup_type_edit');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_description');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__description');
const addCardPopup = document.querySelector('.popup_type_new-card');
const inputPlace = document.querySelector('.popup__input_type_card-name');
const inputLink = document.querySelector('.popup__input_type_url');
//функция удаление карточки
function deleteCard(el) {
  el.remove();
}
function likeCard(el) {
  el.classList.toggle('card__like-button_is-active');
}
//функция сборки карточки
function renderCard({name, link}, delButton, likeButton) {
	const userCard = templateCard.querySelector('.places__item').cloneNode(true);
  //Переменная кнопки
  const trashButton =  userCard.querySelector('.card__delete-button');
  const cardLikeButton = userCard.querySelector('.card__like-button');
  //слушатель кнопки удаления
  trashButton.addEventListener('click', () => delButton(userCard));
  cardLikeButton.addEventListener('click', () => likeButton(cardLikeButton));
  //подстановка значений из массива
  userCard.querySelector('.card__image').src =  link;
  userCard.querySelector('.card__image').alt =  `На этой карточке ${name}`;
  userCard.querySelector('.card__title').textContent = name;
  return userCard;
}
//функция создания набора карточек на страние
function addCards () {
  initialCards.forEach(function (userCard) {
      const card = renderCard(userCard, deleteCard, likeCard);
      listCards.prepend(card);
  });
}
//функции открытия закрытия//
function showPopup(evt) {
    evt.classList.add('popup_is-opened');
    evt.classList.remove('popup_is-animated');
}

function closePopup(evt) {
    evt.classList.add('popup_is-animated');
    evt.classList.remove('popup_is-opened');
}
// автоподстановка в placehoder и замена данных профиля
function integrateName (iName, uName, iJob, uJob) {
  iName.placeholder = uName.textContent;
  iJob.placeholder = uJob.textContent;
}

function handleFormSubmit(evt) {
  evt.preventDefault();
    const name = inputName.value;
    const job = inputJob.value;
    userName.textContent = name;
    userJob.textContent = job;
    closePopup(profileEditPopup);
  // Вставьте новые значения с помощью textContent
}
// создание пользовательской карты
function addNewCard(evt) {
  evt.preventDefault();
  const newObj = {};
  const name = inputPlace.value;
  const link = inputLink.value;
  newObj.name = name;
  newObj.link = link;
  const card = renderCard(newObj, deleteCard);
  listCards.prepend(card);
  closePopup(addCardPopup);
}
//добавляем слушатель клика, для изменения контактов//
//открытие форм//
userProfile.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('profile__image') || evt.target.classList.contains('profile__edit-button')) {
   showPopup(profileEditPopup);
  } else if (evt.target.classList.contains('profile__add-button')) {
    showPopup(addCardPopup);
   }
});
//закрытие по клику формы профиля //
profileEditPopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(profileEditPopup);
  }
});
//закрытие по кнопке профиля //
profileEditPopup.addEventListener('keydown', (evt) => {
  if ((evt.key === 'Escape')){
    closePopup(profileEditPopup);
  }
});

userForm.addEventListener('submit', handleFormSubmit); 

//Слушатели и действия над форомой добавления карточки//
//закрытие по клику формы карточки//
addCardPopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(addCardPopup);
  }
});

addCardPopup.addEventListener('keydown', (evt) => {
  if ((evt.key === 'Escape')){
    closePopup(addCardPopup);
  }
});
//создание карточки по введенным данным//
addCardPopup.addEventListener('submit', addNewCard); 


integrateName(inputName, userName, inputJob, userJob);
addCards();