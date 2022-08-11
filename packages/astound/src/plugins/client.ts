import { Plugin } from '../../types/plugins';

export default function Client(): Plugin {
  return {
    name: 'client-plugin',

    addScript() {
      return `/*client*/
const astound = window.astound || {};

var addListener = () => {
  Array.from(document.querySelectorAll('a')).forEach((script) => {
    script.addEventListener('click', async (event) => {
      linkListener(event, script.getAttribute('href'));
      renderer(script.getAttribute('href'));
    });
  });
}

addListener();

function linkListener(e, link) {
  window.history.pushState('page2', 'Title', link);
  e.preventDefault();
}

astound.__addListener = addListener;
astound.__renderer = renderer;

async function renderer(href) {
  const page = await (await fetch(href)).text();
  const virtualPage = document.createElement('div');
  virtualPage.innerHTML = page;

  const scripts = JSON.parse(virtualPage.querySelector("script[id='_astound_script']").innerText);
  // is exists script
  let count = 0;
 document.querySelectorAll('script[pagemodule]').forEach((sc) => {
    if (scripts?.filter(script => sc.getAttribute('src').includes(script)).length >= 1) {
      count++;
      scripts[scripts.indexOf(scripts?.filter(script => sc.getAttribute('src').includes(script))[0])] = null;
    }
  });
  if (count >= 1) window.astound.load[window.location.pathname]();
  scripts.forEach((sc) => {
    if (!sc) return;
    var e = document.createElement('script');
    e.setAttribute('pagemodule', '');
    e.setAttribute('src', \`/.astound/js/\${sc}\`);
    e.setAttribute('type', 'module');
    document.body.appendChild(e);
  });
}
window.addEventListener('popstate', function (event) {
  renderer(window.location.pathname);
});

window.astound = astound;

`;
    },
  };
}
