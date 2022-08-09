import { Plugin } from '../../types/plugins';

export default function Params(): Plugin {
  return {
    name: 'params-plugin',

    addScript() {
      return `/*client*/
var data = window.astound || {};
if (document.getElementById("_astound")) {
  const json = JSON.parse(document.getElementById("_astound").innerText);
  data.query = json.query;
  data.params = json.params
}
window.astound = data;
`;
    },
  };
}
