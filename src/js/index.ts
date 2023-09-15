import { Remarkable } from "remarkable";

import prism from "prismjs";
import { body, footer, header } from "./elements";

const remarkable = new Remarkable();

const testMd =
  '```javascript \n\
 let company = "outpost" \n \
 ```';

const root = document.getElementById("root");
root?.classList.add("outpost-search");

root?.appendChild(header);
root?.appendChild(body);
const html = remarkable.render(testMd);

body.innerHTML = html;

root?.appendChild(footer);

prism.highlightAll();
