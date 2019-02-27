const versions = [
  {path: "mkdocs", text: "Experimental", selected: true },
  {path: "", text: "v0.2 Latest", selected: false },
];

  
// Material theme

function addMaterialMenu(elt, versions) {
  const current = versions.find(function (value) {
      return value.selected
  })

  const rootLi = document.createElement('li');
  rootLi.classList.add('md-nav__item--version');
  rootLi.classList.add('md-nav__item');
  rootLi.classList.add('md-nav__item--nested');
  rootLi.classList.add('md-nav__item--version');

  const input = document.createElement('input');
  input.classList.add('md-toggle');
  input.classList.add('md-nav__toggle');
  input.setAttribute('data-md-toggle', 'nav-10000000');
  input.id = "nav-10000000";
  input.type = 'checkbox';

  rootLi.appendChild(input);

  const lbl01 = document.createElement('label')
  lbl01.classList.add('md-nav__link');
  lbl01.setAttribute('for', 'nav-10000000');
  lbl01.textContent = current.text + " ";

  rootLi.appendChild(lbl01);

  const nav = document.createElement('nav')
  nav.classList.add('md-nav');
  nav.setAttribute('data-md-component','collapsible');
  nav.setAttribute('data-md-level','2');

  rootLi.appendChild(nav);

  const lbl02 = document.createElement('label')
  lbl02.classList.add('md-nav__title');
  lbl02.setAttribute('for', 'nav-10000000');
  lbl02.textContent = current.text + " ";

  nav.appendChild(lbl02);

  const ul = document.createElement('ul')
  ul.classList.add('md-nav__list');
  ul.setAttribute('data-md-scrollfix','');

  nav.appendChild(ul);

  for (let i = 0; i < versions.length; i++) {
    const li = document.createElement('li');
    li.classList.add('md-nav__item');

    ul.appendChild(li);

    const a = document.createElement('a');
    a.classList.add('md-nav__link');
    if (versions[i].selected) {
      a.classList.add('md-nav__link--active');
    }
    a.href = window.location.protocol + "//" + window.location.host + "/";
    if (window.location.host.includes(".github.io")) {
      a.href = a.href + window.location.pathname.split("/")[1] + "/";
    }
    if (versions[i].path) {
      a.href = a.href + versions[i].path + "/"
    }
    a.href = a.href + "intro/benefits/";
    a.title = versions[i].text;
    a.text = versions[i].text;

    li.appendChild(a);
  }

  elt.appendChild(rootLi);
}
const materialSelector = 'nav.md-nav--primary ul.md-nav__list li.md-nav__item--active nav.md-nav ul';
let elt = document.querySelector(materialSelector);
addMaterialMenu(elt, versions);

function updateRelativPath(node) {
  let href = node.attributes.getNamedItem("href").value;
  node.href = "../" + href;
}

function noDocumentationShouldDirectToLatestVersion(versions) {
  for (const version of versions) {
    if (version.selected && version.text.toLowerCase().includes("latest")) {
      return;
    }
  }
  let tabs = document.querySelectorAll(".md-tabs__list a.md-tabs__link");
  for (const tab of tabs) {
    if (tab.title.toLowerCase() == "docs"){
      continue;
    }
    updateRelativPath(tab);
  }
  let logo = document.querySelector("a.md-nav__button.md-logo");
  updateRelativPath(logo);
  logo = document.querySelector("a.md-header-nav__button.md-logo");
  updateRelativPath(logo);

  let topNavItems = document.querySelectorAll(".md-nav.md-nav--primary > ul > li");
  for (const item of topNavItems) {
    let label = item.querySelector("li > label.md-nav__link");
    if (label != null && label.innerHTML.toLowerCase().trim() == "docs") {
      console.log(label);
      continue;
    }
    let a = item.querySelector("li > a.md-nav__link");
    updateRelativPath(a);
  }
}
noDocumentationShouldDirectToLatestVersion(versions)
