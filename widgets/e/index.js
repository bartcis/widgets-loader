class EWidget {
  constructor() {
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
    const parent = document.querySelector(`#${parentId}`);
    const widget = document.createElement("div");
    widget.innerHTML = `<button id="counter" type="button"></button>`;
    parent.prepend(widget);
  }

  setCounter = (count) => {
    this.counter = count;
    this.button.innerHTML = `count is ${this.counter}`;
  };
}

const widget = new EWidget();

export { widget };
