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

const popupItem = document.querySelector('.popup_item');
const itemForm = document.querySelector('[name="item"]');
const inputTitle = document.querySelector('.form__input_title');
const inputLink = document.querySelector('.form__input_link');

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

const formValidators = {};


//ФОРМА ----------------------------------------------------------
//открываем форму
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', handlePopupClose);
  document.addEventListener('keydown', handlePopupCloseEsc);
}

//закрываем форму
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('mousedown', handlePopupClose);
  document.removeEventListener('keydown', handlePopupCloseEsc);
}

//поиск открытой формы и её закрытие
function handlePopupClose(event) {
  if (event.target === event.currentTarget || event.target.classList.contains('popup__button-close')) {
    closePopup(event.currentTarget);
  };
}

//закрываем форму по esc
function handlePopupCloseEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//включение валидации на всех формах
const enableValidation = (params) => {
  const formList = Array.from(document.querySelectorAll(params.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(params, formElement);
    const formName = formElement.getAttribute('name'); //получаем данные из атрибута 'name' у формы

    formValidators[formName] = validator; //в объект записываем под именем формы
    validator.enableValidation();
  });
};

enableValidation(validateParams);


//ПРОФИЛЬ --------------------------------------------------------
//заполняем форму профиля значениями со страницы
function fillProfileInputs() {
  inputName.value = profileName.textContent; //имя
  inputAbout.value = profileAbout.textContent; //о себе
}

//по клику открываем форму профиля и заполняем ее
profileEditButton.addEventListener('click', () => {
  openPopup(popupProfile);
  fillProfileInputs();
  formValidators['profile'].resetValidation();
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


//ЭЛЕМЕНТЫ --------------------------------------------------------
//открываем форму добавления элементов
itemAddButton.addEventListener('click', () => {
  openPopup(popupItem);
  itemForm.reset();
  formValidators['item'].resetValidation();
})

//открываем картинку
function openImage(name, link) {
  openPopup(popupImage);

  figureImage.src = link;
  figureImage.alt = name;
  figureTitle.textContent = name;
}

//создаем элемент
function createItem(itemData) {
  return new Card(itemData, '#item', openImage).createItem();
}

//добавляем новый элемент
function renderItem(itemData) {
  const newItem = createItem(itemData);
  elementsList.prepend(newItem);
}

//заполнение стандартных элементов
initialItems.forEach(renderItem);

//добавление элемента пользователем
itemForm.addEventListener('submit', (event) => {
  renderItem({name: inputTitle.value, link: inputLink.value});
  event.preventDefault();
  closePopup(popupItem);
});
