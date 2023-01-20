export default class Popup {
  constructor({popupSelector}) {
    this._popupSelector = popupSelector;
    this._closeEsc = this._handleEscClose.bind(this);
  }

  //открываем форму
  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener("keydown", this._closeEsc);
  }

  //закрываем форму
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener("keydown", this._closeEsc);
  }

  //закрываем форму по клавиши Escape
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  //закрываем форму по нажатию клавиши мыши
  setEventListeners() {
    this._popupSelector.addEventListener("mousedown", event => {
      if (event.target === event.currentTarget || event.target.classList.contains('popup__button-close')) {
        this.close();
      };
    });
  }
}
