(() => {
  function changeState(card) {
    let currectCheckbox = card.querySelector('.checkbox_hidden');

    if(!card.classList.contains('disabled')) {
      if(currectCheckbox.checked) {
        currectCheckbox.checked = false;
        card.classList.remove('selected');
        card.classList.add('default');
      } else {
        currectCheckbox.checked = true;
        card.classList.add('selected');
        card.classList.remove('default');
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const arrayOfProducts = Array.from(document.querySelectorAll('.catalog__list-item'));

    for (let product of arrayOfProducts) {
      let productCard = product.querySelector('.product-card');
      let productButton = product.querySelector('.buy-now__button');

      productCard.addEventListener('click', () => {
        changeState(product);
      });

      productButton.addEventListener('click', (e) => {
        e.preventDefault();
        changeState(product);
      });

      // Состояние наведения для выбранной карточки

      product.addEventListener('mouseenter', () => {
        if (product.classList.contains('selected')) {
          product.classList.add('selected-hover');
        }
      });

      product.addEventListener('mouseleave', () => {
        product.classList.remove('selected-hover');
      })
    }

    // Отправка формы

    const form = document.getElementById('form');
    document.addEventListener('keyup', (event) => {
      if(event.key == 'Enter') {
        form.submit();
      }
    })
  })
})()
