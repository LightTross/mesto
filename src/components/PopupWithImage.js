import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({popupSelector}) {
    super({popupSelector});
    this._figureImage = this._popupSelector.querySelector('.figure__image');
    this._figureTitle = this._popupSelector.querySelector('.figure__title');
  }

  //открываем картинку
  open(name, link) {
    this._figureImage.src = link;
    this._figureImage.alt = name;
    this._figureTitle.textContent = name;

    super.open();
  }
}
