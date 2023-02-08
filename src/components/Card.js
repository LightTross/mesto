export default class Card {
  constructor({itemData, userId, templateSelector, handleCardClick, handleAddLikeClick, handleDeleteLikeClick, handleDeleteButtonClick}) {
    this._itemId = itemData._id
    this._name = itemData.name;
    this._link = itemData.link;
    this._likes = itemData.likes;
    this._itemOwnerId = itemData.owner._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleAddLikeClick = handleAddLikeClick;
    this._handleDeleteLikeClick = handleDeleteLikeClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
  }

  //получаем шаблон элемента
  _getTemplate() {
    return document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.elements__item')
    .cloneNode(true);
  }

  //проставляем или убираем лайк
  toggleItemLike(itemData) {
    this._itemLikeButton.classList.toggle('elements__like_active');
    this._likes = itemData.likes;
    this._itemLikeCounter.textContent = this._likes.length;
  }

  //проверяем наличие лайка
  _checkItemLike() {
    if (this._likes.some(user => this._userId === user._id)) {
      this._itemLikeButton.classList.add('elements__like_active');
    }
  }

  //убираем кнопку удаления элемента, если владелец иной
  _checkOwnerItem() {
    if (this._userId !== this._itemOwnerId) {
      this._itemDeleteButton.remove();
    }
  }

  //удаляем элемент
  deleteItem() {
    this._itemElement.remove();
    this._itemElement = null;
  }

  //навешиваем события
  _setEventListeners() {
    this._itemImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    
    this._itemLikeButton.addEventListener('click', () => {
      if (this._itemLikeButton.classList.contains('elements__like_active')) {
        this._handleDeleteLikeClick(this._itemId);
      } 
      else {
        this._handleAddLikeClick(this._itemId);
      };
    })

    this._itemDeleteButton.addEventListener('click', () => this._handleDeleteButtonClick(this._itemId));
  }

  //добавление нового элемента
  createItem() {
    this._itemElement = this._getTemplate();
    this._itemImage = this._itemElement.querySelector('.elements__image');
    this._itemTitle = this._itemElement.querySelector('.elements__title');
    this._itemLikeButton = this._itemElement.querySelector('.elements__like');
    this._itemLikeCounter = this._itemElement.querySelector('.elements__like-counter');
    this._itemDeleteButton = this._itemElement.querySelector('.elements__button-remove');

    //задаем параметры картинки
    this._itemImage.src = this._link;
    this._itemImage.alt = this._name;
    this._itemTitle.textContent = this._name;
    this._itemLikeCounter.textContent = this._likes.length;

    this._checkItemLike();
    this._checkOwnerItem();
    this._setEventListeners();

    return this._itemElement;
  }
}