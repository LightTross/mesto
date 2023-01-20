export default class UserInfo {
  constructor({name, about}) {
    this._name = name;
    this._about = about;
  }

  //получаем данные о пользователе
  getUserInfo() {
    return {username: this._name.textContent, aboutUser: this._about.textContent};
  }

  //задаем данные пользователя
  setUserInfo(data) {
    this._name.textContent = data.username;
    this._about.textContent = data.about;
  }
}
