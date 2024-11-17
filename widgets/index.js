export default class WidgetBase {
  constructor(name) {
    this.name = name;
    this.parent = undefined;
    this.widget = undefined;
  }

  init(parentId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.injectContent(parentId);

        return resolve(`Widget ${this.name} loaded`);
      }, 500);
    });
  }

  destroy() {
    if (this.parent && this.widget) {
      this.parent.removeChild(this.widget);
    }
  }
}
