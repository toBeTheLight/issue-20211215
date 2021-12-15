function component() {
  const element = document.querySelector('#second');
  element.innerHTML = 'second';
}

component();

if (module.hot) {
  module.hot.accept();
}
