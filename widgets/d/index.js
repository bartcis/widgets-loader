import javascriptLogo from "/javascript.svg";
import WidgetBase from "../index.js";
export default class DWidget extends WidgetBase {
  injectContent(parentId) {
    this.parent = document.querySelector(`#${parentId}`);
    this.widget = document.createElement("a");
    this.widget.setAttribute(
      "href",
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
    );
    this.widget.setAttribute("target", "_blank");

    this.widget.innerHTML = `<img
      src="${javascriptLogo}"
      class="logo vanilla"
      alt="JavaScript logo"
    />`;
    this.parent.prepend(this.widget);
  }
}
