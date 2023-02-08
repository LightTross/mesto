import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('form[name]');
  }

  //получаем колбэк на удаление элемента
  deleteConfirm(deleting){
    this._deleting = deleting;
  }

  //навешиваем обработчик на удаление элемента с подтверждением
  setEventListeners() {
    this._form.addEventListener('click', event => {
      event.preventDefault();
      this._deleting();
    });

    super.setEventListeners();
  }
}