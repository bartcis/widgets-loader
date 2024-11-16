import viteLogo from "/vite.svg";

class CWidget {
  constructor() {}

  init(parentId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.injectContent(parentId);

        return resolve("Widget C loaded");
      }, 500);
    });
  }

  injectContent(parentId) {
    const parent = document.querySelector(`#${parentId}`);
    const widget = document.createElement("a");
    widget.setAttribute("href", "https://vite.dev");
    widget.setAttribute("target", "_blank");

    widget.innerHTML = `<img src="${viteLogo}" class="logo" alt="Vite logo" />`;
    parent.prepend(widget);
  }
}

const widget = new CWidget();

export { widget };
