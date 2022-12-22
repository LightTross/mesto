import { openImage } from './index.js';

export default class Card {
  constructor(itemData, templateSelector) {
    this._name = itemData.name;
    this._link = itemData.link;
    this._templateSelector = templateSelector;
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
  _toggleItemLike() {
    this.classList.toggle('elements__like_active');
  }

  //удаляем карточку
  _deleteItem() {
    this._itemElement.remove();
  }

  //навешиваем события
  _setEventListeners() {
    this._itemElement.querySelector('.elements__like').addEventListener('click', this._toggleItemLike);
    this._itemElement.querySelector('.elements__button-remove').addEventListener('click', () => this._deleteItem());
    this._itemImage.addEventListener('click', () => openImage(this._name, this._link));
  }

  //добавление нового элемента
  createItem() {
    this._itemElement = this._getTemplate();
    this._itemImage = this._itemElement.querySelector('.elements__image');
    this._itemTitle = this._itemElement.querySelector('.elements__title');

    //задаем ссылку и название картинки
    this._itemImage.src = this._link;
    this._itemImage.alt = this._name;
    this._itemTitle.textContent = this._name;

    this._setEventListeners();

    return this._itemElement;
  }
}
