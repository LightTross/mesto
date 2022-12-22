import { validateParams } from './FormValidator.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';


//ПЕРЕМЕННЫЕ ----------------------------------------------------------
const elementsList = document.querySelector('.elements__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_profile');
const profileForm = document.querySelector('[name="profile"]');
const profileName = document.querySelector('.profile__name');
const inputName = document.querySelector('.form__input_info_name');
const profileAbout = document.querySelector('.profile__about');
const inputAbout = document.querySelector('.form__input_info_about');
const itemAddButton = document.querySelector('.profile__add-button');
const profileSubmitButton = profileForm.querySelector('.form__button-submit');

const popupItem = document.querySelector('.popup_item');
const itemForm = document.querySelector('[name="item"]');
const inputTitle = document.querySelector('.form__input_title');
const inputLink = document.querySelector('.form__input_link');
const itemSubmitButton = itemForm.querySelector('.form__button-submit');

const popupImage = document.querySelector('.popup_image');
const figureImage = document.querySelector('.figure__image');
const figureTitle = document.querySelector('.figure__title');

const initialItems = [
  {
    name: 'Italy, Lago Antorno',
    link: 'https://images.unsplash.com/photo-1664655072740-f600140c5fe8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    name: 'Switzerland, Obersee',
    link: 'https://images.unsplash.com/photo-1665922075670-f8f72ce53974?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80'
  },
  {
    name: 'Switzerland, Riffelsee',
    link: 'https://images.unsplash.com/photo-1666160399566-cae2609cbf6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Iceland, Rutshellir caves',
    link: 'https://images.unsplash.com/photo-1664833027898-540676803f80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Italy, Capri',
    link: 'https://images.unsplash.com/photo-1665690992253-f2bb077c1d02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'USA, Trillium Lake',
    link: 'https://images.unsplash.com/photo-1587656421406-273a011cad8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
  }
];

const profileFormValidation = new FormValidator(validateParams, profileForm);
const itemFormValidation = new FormValidator(validateParams, itemForm);


//ФОРМА ----------------------------------------------------------
//открываем форму
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupHandle);
  document.addEventListener('keydown', closePopupEsc);
}

//закрываем форму
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closePopupHandle);
  document.removeEventListener('keydown', closePopupEsc);
}

//поиск открытой формы и её закрытие
function closePopupHandle(event) {
  if (event.target === event.currentTarget || event.target.classList.contains('popup__button-close')) {
    closePopup(event.currentTarget);
  };
}

//закрываем форму по esc
function closePopupEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}


//ПРОФИЛЬ --------------------------------------------------------
//заполняем форму профиля значениями со страницы
function profileAddValue() {
  inputName.value = profileName.textContent; //имя
  inputAbout.value = profileAbout.textContent; //о себе
}

//по клику открываем форму профиля и заполняем ее
profileEditButton.addEventListener('click', () => {
  profileSubmitButton.disabled = false;
  openPopup(popupProfile);
  profileAddValue();
  profileFormValidation.resetErrors();
})

//заполняем страницу значениями из формы профиля
function editProfileText(event) {
  event.preventDefault();

  profileName.textContent = inputName.value; //имя
  profileAbout.textContent = inputAbout.value; //о себе

  closePopup(popupProfile); //закрываем форму
}

//по клику передаем значения из формы на страницу
profileForm.addEventListener('submit', editProfileText);

//добавляем валидацию в форму профиля
profileFormValidation.enableValidation();


//ЭЛЕМЕНТЫ --------------------------------------------------------
//открываем форму добавления элементов
itemAddButton.addEventListener('click', () => {
  itemSubmitButton.disabled = true;
  openPopup(popupItem);
  itemForm.reset();
  itemFormValidation.resetErrors();
})

//открываем картинку
export function openImage(name, link) {
  openPopup(popupImage);

  figureImage.src = link;
  figureImage.alt = name;
  figureTitle.textContent = name;
}

//генерация нового элемента
function renderItem(itemData) {
  const newItem = new Card(itemData, '#item');
  elementsList.prepend(newItem.createItem());
}

//заполнение стандартных элементов
initialItems.forEach(itemData => { renderItem(itemData) });

//добавление элемента пользователем
itemForm.addEventListener('submit', (event) => {
  renderItem({name: inputTitle.value, link: inputLink.value});
  event.preventDefault();
  closePopup(popupItem);
});

//добавляем валидацию в форму элемента
itemFormValidation.enableValidation();
