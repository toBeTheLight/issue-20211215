function component() {
  const element = document.querySelector('#first');
  element.innerHTML = 'first';
}

component();

if (module.hot) {
  module.hot.accept();
}
