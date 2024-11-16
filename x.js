class X {
  constructor() {
    this.widgets = [];
    this.initialized = [];
  }

  /**
   * Initialize widgets.
   * @param {string} rootSelector - HTML selector for the root tag.
   * @param {(successes, errors) => void} callback - Function that will be initialized when widgets initializations is either completed or failed
   */
  async init(rootSelector, callback) {
    this.#getWidgets(rootSelector);

    // Load widgets and trigger init logic for each
    const loaders = await Promise.allSettled(
      this.widgets.map(async (widget) => {
        if (!this.initialized.some((initialized) => initialized === widget)) {
          return await this.#resolver(widget);
        }
      })
    );

    const fulfilled = loaders.filter((widget) => {
      if (widget && widget.status === "fulfilled") {
        this.initialized.push(widget.value.widget);

        return true;
      }
    });
    const rejected = loaders.filter(
      (widget) => widget && widget.status === "rejected"
    );

    callback(fulfilled, rejected);
  }

  /**
   * DOM tree analyzer - check for all the widgets within a root selector
   * @param {string} rootSelector - HTML selector for the root tag.
   */
  #getWidgets(rootSelector) {
    const rootContainer = document.querySelector(rootSelector);

    this.#nodeIterator(rootContainer);

    return;
  }

  /**
   * Set id for parent element
   * @param {string} widgetPath
   */
  #setParentId(widgetPath) {
    return widgetPath.replace("/", "-");
  }

  /**
   * Check if node is widget and iterate wia children
   * @param {DOM element} tree of nodes
   */
  #nodeIterator(tree) {
    const widgetPath = tree.getAttribute ? tree.getAttribute("widget") : null;

    if (widgetPath) {
      this.widgets.push(widgetPath);
      tree.setAttribute("id", this.#setParentId(widgetPath));
    }

    if (tree.hasChildNodes()) {
      let children = tree.childNodes;

      for (const node of children) {
        this.#nodeIterator(node);
      }
    }

    return;
  }

  /**
   * Check if node is widget and iterate wia children
   * @param {DOM element} tree of nodes
   */
  #resolver(path, mode = "dynamic") {
    if ((mode = "dynamic")) {
      return new Promise((resolve, reject) => {
        import(`./${path}/index`)
          .then((module) => {
            module.widget
              .init(this.#setParentId(path))
              .then((resolved) => resolve({ value: resolved, widget: path }))
              .catch((error) => {
                console.error("Internal widget's error", error);
                reject({ message: error, widget: path });
              });
          })
          .catch((error) => reject(error));
      });
    }
  }
}

export const widgetsInitializer = new X();
