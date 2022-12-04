//параметры валидации
const validateParams = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-submit',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

//показать ошибку
const showInputError = (formElement, inputElement, errorMessage, params) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(params.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(params.errorClass);
};

//скрыть ошибку
const hideInputError = (formElement, inputElement, params) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(params.inputErrorClass);
  errorElement.classList.remove(params.errorClass);
  errorElement.textContent = '';
};

//проверяем на корректность ввода
const hasInvalidInput = (inputList) => {
  return inputList.some((inputList) => {
    return !inputList.validity.valid;
  })
};

//переключаем состояние кнопки (активная / неактивная)
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

//показываем или скрываем ошибку, в зависимости от корректности ввода данных
const checkInputValidity = (formElement, inputElement, params) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, params);
  } else {
    hideInputError(formElement, inputElement, params);
  }
};

//навешиваем обработчики событий на ввод данных
const setEventListeners = (formElement, params) => {
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElement = formElement.querySelector(params.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, params);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//для каждой формы проверяем корректность данных
const enableValidation = (params) => {
  const formList = Array.from(document.querySelectorAll(params.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, params);
  });
};

//сброс ошибок при открытии формы
function resetErrors(form) {
  const inputs = form.querySelectorAll(validateParams.inputSelector);
  inputs.forEach((input) => {
    hideInputError(form, input, validateParams);
  });
}


//запускаем проверку корректности ввода данных
enableValidation(validateParams);
