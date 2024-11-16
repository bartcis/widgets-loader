class AWidget {
  constructor() {}

  init(parentId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.injectContent(parentId);

        return resolve("Widget A loaded");
      }, 500);
    });
  }

  injectContent(parentId) {
    const parent = document.querySelector(`#${parentId}`);
    const widget = document.createElement("p");
    widget.innerHTML = `Widget A ${Math.random().toString(36).slice(2, 7)}`;
    parent.prepend(widget);
  }
}

const widget = new AWidget();

export { widget };
