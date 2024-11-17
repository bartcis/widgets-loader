import WidgetBase from "../index.js";
export default class EWidget extends WidgetBase {
  constructor(name) {
    super(name);
    this.counter = 0;
    this.button = undefined;
  }

  init(parentId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.injectContent(parentId);

        this.button = document.querySelector("#counter");

        this.button.addEventListener("click", () =>
          this.setCounter(this.counter + 1)
        );
        return resolve("Widget E loaded");
      }, 500);
    });
  }

  injectContent(parentId) {
    this.parent = document.querySelector(`#${parentId}`);
    this.widget = document.createElement("div");
    this.widget.innerHTML = `<button id="counter" type="button">Click on me</button>`;
    this.parent.prepend(this.widget);
  }

  setCounter = (count) => {
    this.counter = count;
    this.button.innerHTML = `count is ${this.counter}`;
  };
}
