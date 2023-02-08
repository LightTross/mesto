import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._form = this._popup.querySelector('form[name]');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._form.querySelector('.form__button-submit');
    this._submitButtonText = this._submitButton.textContent;
  }

  //получаем значения из формы
  _getInputValues() {
    this._formInputData = {};
    this._inputList.forEach(input => this._formInputData[input.name] = input.value);
    
    return this._formInputData;
  }

  //изменяем название кнопки при сохранении
  loadingState(loading) {
    if (loading) {
      this._submitButton.textContent = 'Сохранение...';
    }
    else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  //навешиваем обработчик и устанавливаем значения из формы
  setEventListeners() {
    this._form.addEventListener('submit', event => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });

    super.setEventListeners();
  }

  //закрываем форму и сбрасываем её
  close() {
    super.close();
    this._form.reset();
  }
}