import viteLogo from "/vite.svg";
import WidgetBase from "../index.js";

export default class CWidget extends WidgetBase {
  injectContent(parentId) {
    this.parent = document.querySelector(`#${parentId}`);
    this.widget = document.createElement("a");
    this.widget.setAttribute("href", "https://vite.dev");
    this.widget.setAttribute("target", "_blank");

    this.widget.innerHTML = `<img src="${viteLogo}" class="logo" alt="Vite logo" />`;
    this.parent.prepend(this.widget);
  }
}
