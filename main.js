import "./style.css";
import X from "./x.js";

document.querySelector("#app").innerHTML = `
    <div class="flex">
        <button id="init" type="button">Initialize widgets</button>
        <button id="destroy" type="button">Destroy widgets</button>
    </div>
    <div id="nested-tree">
      <h2>I will load all widgets embedded on the page</h2>
      <p>Here I'll load some random text:</p>
      <div widget="widgets/a">
        <p>And random title:</p>
        <div widget="widgets/b"></div>
      </div>
    </div>
    <p>Widget with Vite logo will be loaded below:</p>
    <div widget="widgets/c">
      
    </div>

    <p>Widget with JS logo will be loaded here:</p>
    <div widget="widgets/d">
    </div>
    <p>Interactive widget:</p>
    <div widget="widgets/e">
    </div>
`;

const callback = (success, error) => {
  console.log("callback successful", success);
  console.log("callback rejected", error);
};

const rootContainer = document.querySelector("#app");
const nestedContainer = document.querySelector("#nested-tree");

// Widget can be initialized for any node within the tree
const widgetsHandler = new X();

const initButton = document.querySelector("#init");
const destroyButton = document.querySelector("#destroy");

initButton.addEventListener("click", () =>
  widgetsHandler.init(rootContainer, callback)
);
destroyButton.addEventListener("click", () =>
  widgetsHandler.destroy(rootContainer)
);
