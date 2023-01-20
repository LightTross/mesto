//ИМПОРТ ----------------------------------------------------------
import './index.css';
import {
  elementsList,
  profileEditButton,
  profileName,
  inputName,
  profileAbout,
  inputAbout,
  itemAddButton,
  formValidators
} from '../utils/constants.js';
import {initialItems} from '../utils/initialItems.js';
import {validateParams} from '../components/FormValidator.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


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
  popupSelector: '.popup_profile',
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    profilePopup.close();
  }
})

//по клику открываем форму профиля и заполняем ее
profileEditButton.addEventListener('click', () => {
  fillProfileInputs(userInfo.getUserInfo());
  formValidators['profile'].resetValidation();
  profilePopup.open();
})

//заполняем форму профиля значениями со страницы
function fillProfileInputs(infoData) {
  inputName.value = infoData.username //profileName.textContent; //имя
  inputAbout.value = infoData.aboutUser //.textContent; //о себе
}


//ЭЛЕМЕНТЫ --------------------------------------------------------
const popupWithImage = new PopupWithImage('.popup_image');

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
  popupSelector: '.popup_item',
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
