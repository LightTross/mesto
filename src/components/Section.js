export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer  = renderer;
    this._container = containerSelector;
  }

  //отрисовка элементов
  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }

  //добавление элемента
  addItem(element) {
    this._container.prepend(element);
  }
}
