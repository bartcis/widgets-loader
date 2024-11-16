import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./widgets/e/counter.js";

document.querySelector("#app").innerHTML = `
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
      <a href="https://vite.dev" target="_blank">
        <img src="${viteLogo}" class="logo" alt="Vite logo" />
      </a>
    </div>

    <p>Widget with JS logo will be loaded here:</p>
    <div widget="widgets/d">
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
        target="_blank"
      >
        <img
          src="${javascriptLogo}"
          class="logo vanilla"
          alt="JavaScript logo"
        />
      </a>
    </div>
    <p>Interactive widget:</p>
    <div widget="widgets/e">
      <div class="card">
        <button id="counter" type="button"></button>
      </div>
    </div>
`;

setupCounter(document.querySelector("#counter"));
