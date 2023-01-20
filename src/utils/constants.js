//ПЕРЕМЕННЫЕ ----------------------------------------------------------
const elementsList = document.querySelector('.elements__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const inputName = document.querySelector('.form__input_info_name');
const profileAbout = document.querySelector('.profile__about');
const inputAbout = document.querySelector('.form__input_info_about');
const itemAddButton = document.querySelector('.profile__add-button');

const formValidators = {};

export {
  elementsList,
  profileEditButton,
  profileName,
  inputName,
  profileAbout,
  inputAbout,
  itemAddButton,
  formValidators
};
