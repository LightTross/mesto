const elementsList = document.querySelector('.elements__list');
const popupButtonClose = document.querySelector('.popup__button-close');
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
const itemLikeButton = document.querySelectorAll('.elements__like');
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


//ФОРМА ----------------------------------------------------------
//открываем форму
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('click', closePopupHandle);
}

//закрываем форму
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('click', closePopupHandle);
}

//поиск открытой формы и её закрытие
function closePopupHandle(event) {
  const popupOpened = event.target.closest('.popup');
  const containPopupOpened = event.target.classList.contains('popup_opened');
  const containCloseButton = event.target.classList.contains('popup__button-close');

  if (containPopupOpened || containCloseButton) closePopup(popupOpened);
}


//ПРОФИЛЬ --------------------------------------------------------
//заполняем форму профиля значениями со страницы
function profileAddValue() {
  inputName.value = profileName.textContent; //имя
  inputAbout.value = profileAbout.textContent; //о себе
}

//по клику открываем форму профиля и заполняем ее
profileEditButton.addEventListener('click', () => {
  openPopup(popupProfile);
  profileAddValue();
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
//обнуление значений в форме добавления элементов
function itemDefaultValue() {
  inputTitle.value = ''; //название
  inputLink.value = ''; //ссылка
}

//открываем форму добавления элементов
itemAddButton.addEventListener('click', () => {
  openPopup(popupItem);
  itemDefaultValue();
})

//добавление нового элемента
function createItem(name, link) {
  const itemTemplate = document.querySelector('#item').content;
  const itemElement = itemTemplate.querySelector('.elements__item').cloneNode(true);
  const itemImage = itemElement.querySelector('.elements__image');
  const itemTitle = itemElement.querySelector('.elements__title');
  const itemButtonLike = itemElement.querySelector('.elements__like');
  const itemButtonRemove = itemElement.querySelector('.elements__button-remove');

  //задаем ссылку и название картинки
  itemImage.src = link;
  itemImage.alt = name;
  itemTitle.textContent = name;

  //открываем картинку на весь экран
  itemImage.addEventListener('click', (event) => {
    openPopup(popupImage);
    figureImage.src = itemImage.src;
    figureImage.alt = itemImage.alt;
    figureTitle.textContent = itemTitle.textContent;
  });

  //проставляем или убираем лайк
  itemButtonLike.addEventListener('click', (event) => event.target.classList.toggle('elements__like_active'));

  //удаляем карточку
  itemButtonRemove.addEventListener('click', (event) => event.target.closest('.elements__item').remove());

  return itemElement;
}

//заполнение стандартных элементов
initialItems.forEach(item => elementsList.append(createItem(item.name, item.link)));

//добавление элемента пользователем
itemForm.addEventListener('submit', (event) => {
  elementsList.prepend(createItem(inputTitle.value, inputLink.value));
  event.preventDefault();
  closePopup(popupItem);
});
