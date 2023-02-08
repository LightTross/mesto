export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer  = renderer;
    this._container = containerSelector;
  }

  //отрисовка элементов
  renderItems(renderedItems) {
    renderedItems.forEach(item => this._renderer(item));
  }

  //добавление элемента
  addItem(element) {
    this._container.append(element);
  }
}