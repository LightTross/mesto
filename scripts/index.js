const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupButtonClose = document.querySelector('.popup__button-close');
const popupForm = document.querySelector('.form');
const profileName = document.querySelector('.profile__name');
const formInputName = document.querySelector('.form__input_info_name');
const profileAbout = document.querySelector('.profile__about');
const formInputAbout = document.querySelector('.form__input_info_about');

//заполняем форму значениями со страницы
function addValue() {
  formInputName.value = profileName.textContent; //имя
  formInputAbout.value = profileAbout.textContent; //о себе
}

//заполняем страницу значениями из формы
function editProfileText(event) {
  event.preventDefault();

  profileName.textContent = formInputName.value; //имя
  profileAbout.textContent = formInputAbout.value; //о себе

  closePopup(); //закрываем форму
}

//открываем форму
function openPopup() {
  popup.classList.add('popup_opened');
}

//закрываем форму
function closePopup() {
  popup.classList.remove('popup_opened');
}

//по клику открываем форму и заполняем ее
profileEditButton.addEventListener('click', () => {
  openPopup();
  addValue();
})

//по клику закрываем форму
popupButtonClose.addEventListener('click', closePopup);

//по клику передаем значения из формы на страницу
popupForm.addEventListener('submit', editProfileText);
