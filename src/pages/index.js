//ИМПОРТ ----------------------------------------------------------
import './index.css';
import {
  elementsList,
  profileEditButton,
  profileAvatarEditButton,
  profileName,
  inputName,
  profileAbout,
  profileAvatar,
  inputAbout,
  inputAvatar,
  itemAddButton,
  formValidators
} from '../utils/constants.js';
import {validateParams} from '../components/FormValidator.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

let userId;

//параметры для запроса к серверу
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '35d66a15-d267-44df-89c1-13d257cc7168',
    'Content-Type': 'application/json'
  }
});

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
const userInfo = new UserInfo({name: profileName, about: profileAbout, avatar: profileAvatar});

//по клику передаем значения из формы на сервер и отражаем на странице
const profilePopup = new PopupWithForm({
  popupSelector: '.popup_profile',
  handleFormSubmit: formData => {
    profilePopup.loadingState(true);
    api.editProfile(formData)
      .then(formData => {
        userInfo.setUserInfo(formData);
        profilePopup.close();
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => {profilePopup.loadingState(false)});
  }
})

//по клику проставляем аватар на сервере и отражаем на странице
const profileAvatarPopup = new PopupWithForm({
  popupSelector: '.popup_update-avatar',
  handleFormSubmit: avatarData => {
    profileAvatarPopup.loadingState(true);
    api.updateAvatar(avatarData)
      .then(avatarData => {
        profileAvatar.src = avatarData.avatar;
        profileAvatarPopup.close();
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => profileAvatarPopup.loadingState(false));
  }
})

//по клику открываем форму профиля и заполняем ее с сервера
profileEditButton.addEventListener('click', () => {
  fillProfileInputs(userInfo.getUserInfo());
  formValidators['profile'].resetValidation();
  profilePopup.open();
})

//по клику открываем форму аватара и заполняем ее с сервера
profileAvatarEditButton.addEventListener('click', () => {
  fillProfileInputs(userInfo.getUserInfo());
  formValidators['avatar'].resetValidation();
  profileAvatarPopup.open();
})

//заполняем форму профиля
function fillProfileInputs(infoData) {
  inputName.value = infoData.name //имя
  inputAbout.value = infoData.about //о себе
  inputAvatar.value = infoData.avatar //аватар
}


//ЭЛЕМЕНТЫ --------------------------------------------------------
const popupWithImage = new PopupWithImage('.popup_image');
const popupItemDelete = new PopupWithConfirmation('.popup_delete-item');

//создаем элемент
const createItem = itemData => {
  const item = new Card({
    itemData: itemData, 
    userId: userId, 
    templateSelector: '#item', 
    handleCardClick: (name, link) => popupWithImage.open(name, link), 
    handleAddLikeClick: itemId => {
      api.setLike(itemId)
        .then(itemData => item.toggleItemLike(itemData))
        .catch(error => console.log(`Ошибка: ${error}`));
    }, 
    handleDeleteLikeClick: itemId => {
      api.deleteLike(itemId)
        .then(itemData => item.toggleItemLike(itemData))
        .catch(error => console.log(`Ошибка: ${error}`));
    },
    handleDeleteButtonClick: itemId => {
      popupItemDelete.open();
      popupItemDelete.deleteConfirm(() => {
        api.deleteItem(itemId)
          .then(() => {
            popupItemDelete.close();
            item.deleteItem();
          })
          .catch(error => console.log(`Ошибка: ${error}`));
      })
    }
  })
  
  return item.createItem();
}

//добавляем новый элемент
const renderItem = new Section({renderer: item => renderItem.addItem(createItem(item))}, elementsList);

//добавление элемента пользователем
const addItemPopup = new PopupWithForm({
  popupSelector: '.popup_item',
  handleFormSubmit: formData => {
    addItemPopup.loadingState(true);
    api.addNewItem(formData)
      .then(formData => {
        renderItem.addItem(createItem(formData));
        addItemPopup.close();
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => addItemPopup.loadingState(false));
  }
});

//открываем форму добавления элементов
itemAddButton.addEventListener('click', () => {
  addItemPopup.open();
  formValidators['item'].resetValidation();
})

//добавляем загруженные элементы и получаем данные пользователя с сервера
Promise.all([api.getInitialItems(), api.getUserInfo()])
  .then(([initialItems, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    renderItem.renderItems(initialItems);
  })
  .catch(error => console.log(`Ошибка: ${error}`));


//ОБРАБОТЧИКИ --------------------------------------------------------
profilePopup.setEventListeners();
profileAvatarPopup.setEventListeners();
addItemPopup.setEventListeners();
popupWithImage.setEventListeners();
popupItemDelete.setEventListeners();