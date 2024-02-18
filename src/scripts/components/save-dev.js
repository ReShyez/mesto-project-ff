function updateProfileInform (name, job) {
  const submitButtonSelector = document.querySelector('.popup__button');
	fetch('https://nomoreparties.co/v1/wff-cohort-6/users/me', {
		method: 'PATCH',
		headers: {
			authorization: 'bdac4a1f-1572-41dd-943c-00b535864545',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: name,
			about: job
		})
	})
	.then((res) => {
		if(!res.ok) {
			throw new Error (`Ошибка: ${res.status}`);
		} 
		return res.json();
	})
	.then((card) => {
		console.log('Данные обновлены', card);
	})
	.catch((err) => {
		console.error('При изменении информации возникла ошибка:', err)
	})
	.finally(() => {
		submitButtonSelector.textContent = 'Сохранить';
	});
}

function updateProfilePhoto(link) {
  const submitButtonSelector = document.querySelector('.popup__button');
	fetch('https://nomoreparties.co/v1/wff-cohort-6/users/me/avatar', {
		method: 'PATCH',
		headers: {
			authorization: 'bdac4a1f-1572-41dd-943c-00b535864545',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			avatar: link
		})
	})
	.then((res) => {
		if(!res.ok) {
			throw new Error(`Ошибка: ${res.status}`);
		} 
		return res.json();
	})
	.then((card) => {
		console.log('Данные обновлены', card);
	})
	.catch((err) => {
		console.error('При изменении информации возникла ошибка:', err)
	})
	.finally(() => {
		submitButtonSelector.textContent = 'Сохранить';
	});
}

//добавление карточки 
function pushNewCard(name, link) {
  return new Promise((resolve, reject) => {
    fetch(`https://nomoreparties.co/v1/wff-cohort-6/cards`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
      })
      .then((newCardData) => {
        resolve(newCardData); // Отправляем данные новой карточки в resolve
      })
      .catch((error) => {
        console.error("Ошибка при добавлении карточки:", error);
        reject(error); // Отправляем ошибку в reject
      });
  });
}