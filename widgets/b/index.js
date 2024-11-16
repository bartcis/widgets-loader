class BWidget {
  constructor() {}

  init(parentId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return reject("Widget B has problems");

        // this.injectContent(parentId);
      }, 500);
    });
  }

  injectContent(parentId) {
    const parent = document.querySelector(`#${parentId}`);
    const widget = document.createElement("h3");
    widget.innerHTML = `Widget B ${Math.random().toString(36).slice(2, 7)}`;
    parent.prepend(widget);
  }
}

const widget = new BWidget();

export { widget };
