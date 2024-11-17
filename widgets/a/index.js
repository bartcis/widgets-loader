import WidgetBase from "../index.js";
export default class AWidget extends WidgetBase {
  injectContent(parentId) {
    this.parent = document.querySelector(`#${parentId}`);
    this.widget = document.createElement("p");
    this.widget.innerHTML = `Widget A ${Math.random()
      .toString(36)
      .slice(2, 7)}`;
    this.parent.prepend(this.widget);
  }
}
