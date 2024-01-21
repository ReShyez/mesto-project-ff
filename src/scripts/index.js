//Переменная контейнера//
import "../pages/index.css";
import {initialCards} from './components/cards.js';
import {renderCard, deleteCard, likeCard} from './components/card.js';
import {integrateName, showPopup, closePopup} from './components/modal.js';


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
const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardForm = addCardPopup.querySelector('.popup__form');
const inputPlace = addCardForm.querySelector('.popup__input_type_card-name');
const inputLink = addCardForm.querySelector('.popup__input_type_url');
const imgPopup = document.querySelector('.popup_type_image');
const addCardButton = document.querySelector('.profile__add-button');

const isClosedPopup = (evt) => (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close'));

//функция создания набора карточек на странице
function addCards () {
  initialCards.forEach(function (userCard) {
      const card = renderCard(userCard, templateCard, deleteCard, likeCard, function() {
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

  const card = renderCard(newObj, templateCard, deleteCard, likeCard, function() {
		zoomImage(newObj);
	});
  listCards.prepend(card);
  inputPlace.value = '';
  inputLink.value = '';

  closePopup(addCardPopup);
}


function zoomImage({name, link}) {
	const imgPopup = document.querySelector('.popup_type_image');
	const popupImg = imgPopup.querySelector('.popup__image');
	const popupTitle = imgPopup.querySelector('.popup__caption');
	popupTitle.textContent = name;
	popupImg.src = link;
	popupImg.alt = `Полюбуемся ${name}`;
	showPopup(imgPopup);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
    const name = inputName.value;
    userName.textContent = name;

    const job = inputJob.value;
    userJob.textContent = job;

    closePopup(profileEditPopup);
}


//добавляем слушатель клика, для изменения контактов//
//открытие форм//
userPhoto.addEventListener('click', () => showPopup(profileEditPopup));

editButton.addEventListener('click', () => showPopup(profileEditPopup));

addCardButton.addEventListener('click', () => showPopup(addCardPopup));
//закрытие по клику формы профиля //
profileEditPopup.addEventListener('click', (evt) => {
  if (isClosedPopup(evt)) {
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


//закрытие по клику формы//
addCardPopup.addEventListener('click', (evt) => {
  if (isClosedPopup(evt)) {
    closePopup(addCardPopup);
  }
});

addCardPopup.addEventListener('keydown', (evt) => {
  if ((evt.key === 'Escape')){
    closePopup(addCardPopup);
  }
});

imgPopup.addEventListener('click', (evt) => {
  if (isClosedPopup(evt)) {
    closePopup(imgPopup);
  }
});

//создание карточки по введенным данным//
addCardPopup.addEventListener('submit', addNewCard); 


integrateName(inputName, userName, inputJob, userJob);
addCards();