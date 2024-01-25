//Переменная контейнера//
import "../pages/index.css";
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, likeCard} from './components/card.js';
import {showPopup, closePopup} from './components/modal.js';


const listCards = document.querySelector('.places__list');
const templateCard = document.querySelector('#card-template').content;
const userPhoto = document.querySelector('.profile__image');
const editButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const userForm = profileEditPopup.querySelector('.popup__form');
const inputName = userForm.querySelector('.popup__input_type_name');
const inputJob = userForm.querySelector('.popup__input_type_description');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__description');
const popupAddCard = document.querySelector('.popup_type_new-card');
const formAddCard = popupAddCard.querySelector('.popup__form');
const inputPlace = formAddCard.querySelector('.popup__input_type_card-name');
const inputLink = formAddCard.querySelector('.popup__input_type_url');
const imgPopup = document.querySelector('.popup_type_image');
const buttonAddCard = document.querySelector('.profile__add-button');
const isClosedPopup = (evt) => (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close'));

//функция создания набора карточек на странице
function addCards () {
  initialCards.forEach(function (userCard) {
      const card = createCard(userCard, templateCard, deleteCard, likeCard, function() {
				zoomImage(userCard);
			});
      listCards.prepend(card);
  });
}

function addNewCard(evt) {
  evt.preventDefault();
  const newObj = {};

  const name = inputPlace.value;
  newObj.name = name;

  const link = inputLink.value;
  newObj.link = link;

  const card = createCard(newObj, templateCard, deleteCard, likeCard, function() {
		zoomImage(newObj);
	});
  listCards.prepend(card);
  inputPlace.value = '';
  inputLink.value = '';

  closePopup(popupAddCard);
}

const popupImg = imgPopup.querySelector('.popup__image');
const popupTitle = imgPopup.querySelector('.popup__caption');

function zoomImage({name, link}) {

	popupTitle.textContent = name;
	popupImg.src = link;
	popupImg.alt = `Полюбуемся ${name}`;
	showPopup(imgPopup);
}

function handleFormAddNewPlace(evt) {
  evt.preventDefault();
    const name = inputName.value;
    userName.textContent = name;

    const job = inputJob.value;
    userJob.textContent = job;

    closePopup(profileEditPopup);
}

function integrateName (iName, uName, iJob, uJob) {
  iName.value = uName.textContent;
  iJob.value = uJob.textContent;
}

//добавляем слушатель клика, для изменения контактов//
//открытие форм//
userPhoto.addEventListener('click', () => showPopup(profileEditPopup));

editButton.addEventListener('click', () => showPopup(profileEditPopup));

buttonAddCard.addEventListener('click', () => showPopup(popupAddCard));
//закрытие по клику формы профиля //
profileEditPopup.addEventListener('click', (evt) => {
  if (isClosedPopup(evt)) {
    closePopup(profileEditPopup);
  }
});
//закрытие по кнопке профиля //


userForm.addEventListener('submit', handleFormAddNewPlace); 


//закрытие по клику формы//
popupAddCard.addEventListener('click', (evt) => {
  if (isClosedPopup(evt)) {
    closePopup(popupAddCard);
  }
});


imgPopup.addEventListener('click', (evt) => {
  if (isClosedPopup(evt)) {
    closePopup(imgPopup);
  }
});

//создание карточки по введенным данным//
popupAddCard.addEventListener('submit', addNewCard); 


integrateName(inputName, userName, inputJob, userJob);
addCards();