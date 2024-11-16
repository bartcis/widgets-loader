import "./style.css";
import { widgetsInitializer } from "./x.js";

document.querySelector("#app").innerHTML = `
    <div class="flex">
        <button id="init" type="button">Initialize widgets</button>
        <button id="destroy" type="button">Destroy widgets</button>
        <button id="done" type="button">Fake done</button>
        <button id="fail" type="button">Fake fail</button>
    </div>
    <div>
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

const initButton = document.querySelector("#init");
const destroyButton = document.querySelector("#destroy");
const doneButton = document.querySelector("#done");
const failButton = document.querySelector("#fail");

initButton.addEventListener("click", () =>
  widgetsInitializer.init("#app", callback)
);
