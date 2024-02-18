//Переменная контейнера//
import "../pages/index.css";
import {initialCards} from './components/cards.js';
import {createCard, deleteCard} from './components/card.js';
import {
	getUserInfo,
	getCards,
	updateProfileInform,
	updateProfilePhoto,
	pushNewCard,
	likeCard
} from './components/api.js';
import {showPopup, closePopup} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';

const placeList = document.querySelector('.places__list');
const templateCard = document.querySelector('#card-template').content;
const editButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profilePhotoPopup = document.querySelector('.popup_type_load-photo');
const userPhoto = document.querySelector('.profile__image');
const userForm = profileEditPopup.querySelector('.popup__form');
const photoForm = profilePhotoPopup.querySelector('.popup__form');
const inputPhoto = photoForm.querySelector('.popup__input_type_url');
const inputName = userForm.querySelector('.popup__input_type_name');
const inputJob = userForm.querySelector('.popup__input_type_description');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__description');
const imgPopup = document.querySelector('.popup_type_image');
const popupImg = imgPopup.querySelector('.popup__image');
const popupTitle = imgPopup.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');
//Константы попапа добавления карточки//
const popupAddCard = document.querySelector('.popup_type_new-card');
const formAddCard = popupAddCard.querySelector('.popup__form');
const inputPlace = formAddCard.querySelector('.popup__input_type_card-name');
const inputLink = formAddCard.querySelector('.popup__input_type_url');
//константы валидации//
const configValid = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_off',
	inputErrorClass: 'form__input_err',
	errorClass: 'form__input-error_active'
};
export let userId;
//константы карточек//

Promise.all([getUserInfo(), getCards()])
	.then(([userData, cardsData]) => {
		console.log('Информация о пользователе', userData);
		userName.textContent = userData.name;
		userJob.textContent = userData.about;
		userId = userData._id;
		userPhoto.style.backgroundImage = `url(${userData.avatar})`;
		cardsData.forEach(function (userCard) {
			const card = createCard(userCard, templateCard, deleteCard, likeCard, function() {
				zoomImage(userCard);
			}, userId);
			placeList.append(card);
	});
		console.log('Карточки', cardsData);
	})
	.catch(() => {
		console.error('Ошибка подключения к серверу, загружено в Off-line режиме');
	});

//функция создания набора карточек на странице
function addCards () {
	initialCards.forEach(function (userCard) {
			const card = createCard(userCard, templateCard, deleteCard, likeCard, function() {
				zoomImage(userCard);
			});
			placeList.append(card);
	});
}

function addNewCard(evt) {
	evt.preventDefault();
	evt.submitter.textContent = 'Сохранение...';
	const cardName = inputPlace.value;
	const cardLink = inputLink.value;
	pushNewCard(cardName, cardLink)
	.then((data) => {
		const newCard = {
				_id: data._id,
				name: data.name,
				link: data.link,
				likes: data.likes,
				owner: data.owner
		}
		const newUserCard = createCard(newCard, templateCard, deleteCard, likeCard, function() {
			zoomImage(newCard);
		}, userId);
		placeList.prepend(newUserCard);
		evt.target.reset();
		closePopup(popupAddCard);
	})
	.catch((err) => {
		console.error("Ошибка при выполнении запроса:", err);
	})
	.finally(() =>{
		evt.submitter.textContent = 'Сохранить';
	});
}

function zoomImage({name, link}) {
	popupTitle.textContent = name;
	popupImg.src = link;
	popupImg.alt = `Полюбуемся ${name}`;
	showPopup(imgPopup);
}

function handleFormUserName(evt) {
	evt.preventDefault();

		evt.submitter.textContent = 'Сохранение...';
			updateProfileInform(inputName.value, inputJob.value)
				.then(() => {
					userName.textContent = inputName.value;
					userJob.textContent = inputJob.value;
					closePopup(profileEditPopup);
				})
				.catch((err) => {
					console.error('При изменении информации возникла ошибка:', err);
				})
				.finally(() => {
					evt.submitter.textContent = 'Сохранить';
				});
}

function handleFormPhoto(evt) {
	evt.preventDefault();
	const link = inputPhoto.value;
	evt.submitter.textContent = 'Сохранение...';
	
	updateProfilePhoto(link)
		.then(() => {
			userPhoto.style.backgroundImage = `url(${link})`;
			closePopup(profilePhotoPopup);
		})
		.catch((err) => {
			console.error('При изменении информации возникла ошибка:', err);
		})
		.finally(() => {
			evt.submitter.textContent = 'Сохранить';
		});
}

//Кнопка добавления карточки//
const buttonAddCard = document.querySelector('.profile__add-button');
buttonAddCard.addEventListener('click', function() {
	clearValidation(formAddCard, configValid);
	showPopup(popupAddCard);
}
);

userPhoto.addEventListener('click', function() {
	showPopup(profilePhotoPopup);
});

//изменение UserData
editButton.addEventListener('click', () => {
	inputName.value = userName.textContent;
	inputJob.value = userJob.textContent;
	showPopup(profileEditPopup);
});
userForm.addEventListener('submit', handleFormUserName); 

popups.forEach((popup) => {
		popup.addEventListener('mousedown', (evt) => {
				if (evt.target.classList.contains('popup_is-opened')) {
						closePopup(popup);
				}
				if (evt.target.classList.contains('popup__close')) {
					closePopup(popup);
				}
		});
});

photoForm.addEventListener('submit', handleFormPhoto);
//создание карточки по введенным данным//
popupAddCard.addEventListener('submit', addNewCard); 
enableValidation(configValid);