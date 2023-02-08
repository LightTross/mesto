export default class UserInfo {
  constructor({name, about, avatar}) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }

  //получаем данные о пользователе
  getUserInfo() {
    return {username: this._name.textContent, about: this._about.textContent, avatarLink: this._avatar.src};
  }

  //задаем данные пользователя
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
