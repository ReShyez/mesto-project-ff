import {userId} from '../index.js';
import {deletedCard} from './api.js';
export function createCard(
	{_id, name, link, owner, likes },
	temp,
	delButton,
	likeButton,
	zoomCard,
	currentUserId
	) {
	const userCard = temp.querySelector('.places__item').cloneNode(true);
	const cardImg = userCard.querySelector('.card__image');
	const cardTitle = userCard.querySelector('.card__title');
	const trashButton =  userCard.querySelector('.card__delete-button');
	const cardLikeButton = userCard.querySelector('.card__like-button');
	const likeCounter = userCard.querySelector('.card__like_counter');

	cardImg.src =  link;
	cardTitle.alt =  `На этой карточке ${name}`;
	cardTitle.textContent = name;
	likeCounter.textContent = likes.length;
	const isLikes = likes.some((user) => user._id === userId);

	if (isLikes) {
			cardLikeButton.classList.add('card__like-button_is-active');
		}
	if (owner._id === currentUserId) {
		trashButton.style.display = 'flex';
		} else {
			trashButton.style.display = 'none';
		}
	cardImg.addEventListener('click', zoomCard);
	trashButton.addEventListener('click', function(){
		deletedCard(_id)
			.then(() => {
				delButton(userCard);
			})
			.catch((err) => {
				console.error('При удалении карточки возникла ошибка:', err);
			});
	});
	 
	cardLikeButton.addEventListener('click', function () {
		likeButton(_id, cardLikeButton)
		.then((updData) => {
			likeCounter.textContent = updData.likes.length;
			cardLikeButton.classList.toggle('card__like-button_is-active');
		})
		.catch((err) => {
			console.error("Ошибка при выполнении запроса:", err);
		});
		}
	);
	return userCard;
}
//функция создания набора карточек на странице

// создание пользовательской карты
export function deleteCard(el) {
	el.remove();
}
