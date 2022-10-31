const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupButtonClose = document.querySelector('.popup__button-close');
const popupForm = document.querySelector('.form');
const profileName = document.querySelector('.profile__name');
const formInputName = document.querySelector('.form__input_info_name');
const profileAbout = document.querySelector('.profile__about');
const formInputAbout = document.querySelector('.form__input_info_about');

function addValue() {
  formInputName.value = profileName.textContent;
  formInputAbout.value = profileAbout.textContent;
}

function EditProfileText(form) {
  form.preventDefault();

  profileName.textContent = formInputName.value;
  profileAbout.textContent = formInputAbout.value;

  closePopup();
}

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', () => {
  openPopup();
  addValue();
})

popupButtonClose.addEventListener('click', closePopup);

popupForm.addEventListener('submit', EditProfileText);
