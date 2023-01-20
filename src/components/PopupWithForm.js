import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector)
    this._form = this._popup.querySelector('form[name]');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._handleFormSubmit = handleFormSubmit;
  }

  //получаем значения из формы
  _getInputValues() {
    this._formInputData = {};
    this._inputList.forEach(input => this._formInputData[input.name] = input.value);
    return this._formInputData;
  }

  //навешиваем обработчик и устанавливаем значения из формы
  setEventListeners() {
    this._form.addEventListener('submit', (event) => {
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
