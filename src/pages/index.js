//ИМПОРТ ----------------------------------------------------------
import './index.css';
import { validateParams } from '../components/FormValidator.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


//ПЕРЕМЕННЫЕ ----------------------------------------------------------
const elementsList = document.querySelector('.elements__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_profile');
const profileName = document.querySelector('.profile__name');
const inputName = document.querySelector('.form__input_info_name');
const profileAbout = document.querySelector('.profile__about');
const inputAbout = document.querySelector('.form__input_info_about');
const itemAddButton = document.querySelector('.profile__add-button');

const popupItem = document.querySelector('.popup_item');

const popupImage = document.querySelector('.popup_image');

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
const userInfo = new UserInfo({name: profileName, about: profileAbout});

//по клику передаем значения из формы на страницу
const profilePopup = new PopupWithForm({
  popupSelector: popupProfile,
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    profilePopup.close();
  }
})

//по клику открываем форму профиля и заполняем ее
profileEditButton.addEventListener('click', () => {
  fillProfileInputs();
  formValidators['profile'].resetValidation();
  profilePopup.open();
})


//заполняем форму профиля значениями со страницы
function fillProfileInputs() {
  inputName.value = profileName.textContent; //имя
  inputAbout.value = profileAbout.textContent; //о себе
}


//ЭЛЕМЕНТЫ --------------------------------------------------------
const popupWithImage = new PopupWithImage({popupSelector: popupImage});

//открываем картинку
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

//создаем элемент
function createItem(itemData) {
  return new Card(itemData, '#item', handleCardClick).createItem();
}

//добавляем новый элемент
const renderItem = new Section({items: initialItems, renderer: item => renderItem.addItem(createItem(item))}, elementsList);

//добавление элемента пользователем
const addItemPopup = new PopupWithForm({
  popupSelector: popupItem,
  handleFormSubmit: (formData) => {
    renderItem.addItem(createItem({name: formData.title, link: formData.link}));
    addItemPopup.close();
  },
});

//открываем форму добавления элементов
itemAddButton.addEventListener('click', () => {
  addItemPopup.open();
  formValidators['item'].resetValidation();
})

//отрисовка элементов
renderItem.renderItems()


//ОБРАБОТЧИКИ --------------------------------------------------------
profilePopup.setEventListeners();
addItemPopup.setEventListeners();
popupWithImage.setEventListeners();
