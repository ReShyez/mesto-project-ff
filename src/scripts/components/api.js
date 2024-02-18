const token = "bdac4a1f-1572-41dd-943c-00b535864545";
const cohortId = "wff-cohort-6";
const config = {
	baseUrl: 'https://nomoreparties.co/v1',
	headers: {
		authorization: token,
		"Content-Type": "application/json",
	}
};

function request(endpoint, method, body) {
	const url = `${config.baseUrl}/${cohortId}/${endpoint}`;
	
	return fetch(url, {
		method: method,
		headers: config.headers,
		body: JSON.stringify(body)
	})
	.then(checkResp)
	.catch((err) => {
		console.error("Ошибка при выполнении запроса:", err);
	});
}

function checkResp(res) {
	if(!res.ok) {
		throw new Error(`Ошибка: ${res.status}`);
	}
	return res.json();
}

//Обновление данных польззователя//
function updateProfileInform(name, about) {
	return request('users/me', "PATCH", {name:name, about:about});
}

//Обновление Аватарки//
function updateProfilePhoto (newLink) {
	return request(`users/me/avatar`, 'PATCH', {avatar: newLink});
}
//отправка данных о новой карточке//
function pushNewCard(name, link) {
	return request(`cards`, "POST", {name:name, link:link});
}

//Запрос удаление карточки//
function deletedCard(cardId) {
	return request(`cards/${cardId}`, 'DELETE');
}

function likeCard(cardId, likeButton) {
	const isLiked = likeButton.classList.contains('card__like-button_is-active');
	const method = isLiked ? "DELETE" : "PUT";
	return request(`cards/likes/${cardId}`, method);
}

export {
	token,
	cohortId,
	request,
	checkResp,
	updateProfileInform,
	updateProfilePhoto,
	pushNewCard,
	deletedCard,
	likeCard
}