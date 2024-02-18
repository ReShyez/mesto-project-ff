//показ и скрытие ошибок//

const showInputError = (formElement, inputElement, errorMessage, params) => {
	const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
	inputElement.classList.add(params.inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(params.errorClass);
};

const hideInputError = (formElement, inputElement, params) => {
	const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
	inputElement.classList.remove(params.inputErrorClass);
	errorElement.classList.remove(params.errorClass);
	errorElement.textContent = '';
};


const checkInputValidity = (formElement, inputElement, params) => {
	//добавить вывод кастомных ошибок - инфа в доп статье из урока// 
	if (inputElement.validity.patternMismatch) {
	inputElement.setCustomValidity(inputElement.dataset.errorMessage);
	} else {
	inputElement.setCustomValidity("");
	}

	if(!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage, params);
	} else {
		hideInputError(formElement, inputElement, params);
	}
};

const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	});
};

const toggleButtonState = (inputList, buttonElement, params) => {
	if(hasInvalidInput(inputList)) {
		buttonElement.classList.add(params.inactiveButtonClass);
	} else {
		buttonElement.classList.remove(params.inactiveButtonClass);
	}
};

const setEventList = (formElement, params) => {
	const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
	const buttonElement = formElement.querySelector(params.submitButtonSelector);
	toggleButtonState(inputList, buttonElement, params);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', function() {
			checkInputValidity(formElement, inputElement, params);
			toggleButtonState(inputList, buttonElement, params);
		});
	});
};

export const enableValidation = (params) => {
	const formList = Array.from(document.querySelectorAll(params.formSelector));
	formList.forEach((formElement) => {
		formElement.addEventListener('submit', function(evt) {
			evt.preventDefault();
		});
		setEventList(formElement, params);
	});
};

export const clearValidation = (profileForm, params) => {
	const inputList = Array.from(profileForm.querySelectorAll(params.inputSelector));
	const buttonElement = profileForm.querySelector(params.submitButtonSelector);

	inputList.forEach((inputElement) => {
		inputElement.value = '';
		hideInputError(profileForm, inputElement, params);
	});
	buttonElement.classList.add(params.inactiveButtonClass);
};

