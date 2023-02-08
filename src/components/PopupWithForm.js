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

  //заполняем форму профиля
  setInputValues(data) {
    this._inputList.forEach(input => input.value = data[input.name]);
  }

  //навешиваем обработчик, устанавливаем значения из формы, изменяем название кнопки при сохранении
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', () => {
      const initialText = this._submitButton.textContent;
      this._submitButton.textContent = 'Сохранение...';
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close())
        .finally(() => this._submitButton.textContent = initialText)
    });
  }

  //закрываем форму и сбрасываем её
  close() {
    super.close();
    this._form.reset();
  }
}
