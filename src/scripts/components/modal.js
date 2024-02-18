
//функции открытия закрытия//
function closePopupByEsc (evt) {
  if ((evt.key === 'Escape')){
    const openPopup = document.querySelector('.popup_is-opened');
    if(openPopup){
      closePopup(openPopup);
    }
  }
}
export function showPopup(evt) {
    evt.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEsc);
}

export function closePopup(evt) {
    evt.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEsc);
}