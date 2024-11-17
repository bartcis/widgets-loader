import WidgetBase from "../index.js";
export default class BWidget extends WidgetBase {
  injectContent(parentId) {
    this.parent = document.querySelector(`#${parentId}`);
    this.widget = document.createElement("h3");
    this.widget.innerHTML = `Widget B ${Math.random()
      .toString(36)
      .slice(2, 7)}`;
    this.parent.prepend(this.widget);
  }
}
