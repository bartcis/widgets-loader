export default class X {
  constructor() {
    this.notInitializedWidgets = [];
    this.initializedWidgets = [];
    this.readWidgets = [];
  }

  /**
   * Initialize widgets.
   * @param {HTML Element} container - HTML tree.
   * @param {(successes, errors) => void} callback - Function that will be initialized when widgets initializations is either completed or failed
   */
  async init(container, callback) {
    // reset previous read state
    this.readWidgets = [];
    // Analyze widgets available within given container
    this.#getWidgets(container);

    const widgetsToLoad = this.#getNotInitializedWidgets();

    // Load available widgets
    const loaders = await Promise.allSettled(
      widgetsToLoad.map(async (widget) => await this.#resolver(widget))
    );
    // Trigger init logic for each and save in the state
    const initialized = await this.#initializeModules(loaders);

    const fulfilled = initialized
      .filter((widget) => {
        if (widget && widget.status === "fulfilled") {
          this.initializedWidgets.push(widget.value);

          return true;
        }
      })
      .map((widget) => ({
        [widget.value.widgetPath]: `#${widget.value.widget.parent.id}`,
      }));

    const rejected = initialized
      .filter((widget) => {
        if (widget && widget.status === "rejected") {
          if (
            !this.notInitializedWidgets.some(
              (previouslyFailedWidget) =>
                previouslyFailedWidget === widget.reason.widgetPath
            )
          ) {
            this.notInitializedWidgets.push(widget.reason.widgetPath);
          }

          return true;
        }
      })
      .map((widget) => widget.reason.message);
    callback(fulfilled, rejected);
  }

  /**
   * Set id for parent element
   * @param {string} widgetPath
   */
  #setParentId(widgetPath) {
    return widgetPath.replace("/", "-");
  }

  /**
   * DOM tree analyzer - check for all the widgets within a root selector
   * @param {HTML Element} container - HTML tree.
   */
  #getWidgets(container) {
    const widgetPath = container.getAttribute
      ? container.getAttribute("widget")
      : null;

    // if widget is either loaded or flagged as not initialized don't update loading list
    if (widgetPath) {
      this.readWidgets.push(widgetPath);

      container.setAttribute("id", this.#setParentId(widgetPath));
    }

    if (container.hasChildNodes()) {
      let children = container.childNodes;

      for (const node of children) {
        this.#getWidgets(node);
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
            resolve({
              module,
              widgetPath: path,
            });
          })
          .catch((error) =>
            reject({
              value: error,
              widgetPath: path,
            })
          );
      });
    }
  }

  /**
   * Run init command for each loaded module
   * @param {loaders} array of loaded modules
   */
  async #initializeModules(loaders) {
    return await Promise.allSettled(
      loaders.map(
        async (widget) =>
          new Promise((resolve, reject) => {
            const newWidget = new widget.value.module.default(
              widget.value.widgetPath
            );

            newWidget
              .init(this.#setParentId(widget.value.widgetPath))
              .then((resolved) => {
                resolve({
                  value: resolved,
                  widget: newWidget,
                  widgetPath: widget.value.widgetPath,
                });
              })
              .catch((error) => {
                console.error("Internal widget's error", error);
                reject({ message: error, widgetPath: widget.value.widgetPath });
              });
          })
      )
    );
  }

  /**
   * Find widgets that are read and not initialized
   * @param {DOM element} tree of nodes
   */
  #getNotInitializedWidgets() {
    return this.readWidgets.filter(
      (widget) =>
        !this.initializedWidgets.some(
          (initialized) => initialized.widgetPath === widget
        )
    );
  }

  /**
   * Find widgets that are read and already initialized
   * @param {DOM element} tree of nodes
   */
  #getInitializedWidgets() {
    return this.readWidgets.filter((widget) =>
      this.initializedWidgets.some(
        (initialized) => initialized.widgetPath === widget
      )
    );
  }

  /**
   * Destroy widgets for given tree.
   * @param {HTML Element} container - HTML tree.
   */
  destroy(container) {
    // reset previous read state
    this.readWidgets = [];
    this.#getWidgets(container);

    const widgetsToDestroy = this.#getInitializedWidgets();
    // start from bottom of the active widgets for given tree
    widgetsToDestroy.reverse().map((widget) => {
      const index = this.initializedWidgets.findIndex(
        (initialized) => initialized.widgetPath === widget
      );

      // widget is active - destroy it
      if (index >= 0) {
        const widget = this.initializedWidgets[index].widget;
        const destroyMethod = widget.destroy;

        if (destroyMethod) {
          const boundDestroy = destroyMethod.bind(widget);

          boundDestroy();
        }

        this.initializedWidgets.splice(index, 1);
      }
    });
  }
}
