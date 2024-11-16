import javascriptLogo from "/javascript.svg";

class DWidget {
  constructor() {}

  init(parentId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.injectContent(parentId);

        return resolve("Widget D loaded");
      }, 500);
    });
  }

  injectContent(parentId) {
    const parent = document.querySelector(`#${parentId}`);
    const widget = document.createElement("a");
    widget.setAttribute(
      "href",
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
    );
    widget.setAttribute("target", "_blank");

    widget.innerHTML = `<img
  src="${javascriptLogo}"
  class="logo vanilla"
  alt="JavaScript logo"
/>`;
    parent.prepend(widget);
  }
}

const widget = new DWidget();

export { widget };
