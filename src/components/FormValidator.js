//параметры валидации
export const validateParams = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-submit',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

export default class FormValidator {
  constructor(validateParams, formElement) {
    this._params = validateParams;
    this._formElement = formElement;
  }

  //показать ошибку
  _showInputError = (inputElement) => {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._params.inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._params.errorClass);
  };

  //скрыть ошибку
  _hideInputError = (inputElement) => {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._params.inputErrorClass);
    this._errorElement.classList.remove(this._params.errorClass);
    this._errorElement.textContent = '';
  };

  //проверяем на корректность ввода
  _hasInvalidInput() {
    return this._inputList.some(inputList => !inputList.validity.valid);
  };

  //переключаем состояние кнопки (активная / неактивная)
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.disabled = false;
    }
  };

  //показываем или скрываем ошибку, в зависимости от корректности ввода данных
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  //навешиваем обработчики событий на ввод данных
  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._params.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._params.submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  //сброс валидации
  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //проверяем корректность данных в форме
  enableValidation() {
    this._setEventListeners();
  };
}
