export function integrateName (iName, uName, iJob, uJob) {
  iName.placeholder = uName.textContent;
  iJob.placeholder = uJob.textContent;
}
//функции открытия закрытия//
export function showPopup(evt) {
    evt.classList.add('popup_is-opened');
}

export function closePopup(evt) {
    evt.classList.remove('popup_is-opened');
    evt.removeEventListener('click', closePopup);
    
}

