import { menu } from './data.js';
// scrollLeft: Controls how far the element is scrolled horizontally.
// scrollWidth: Total width of the scrollable content.
// clientWidth: Visible width of the element.
// Math.min: Ensures the scroll stops at the maximum scrollable point.
// setInterval: Animates the scrolling step by step.

/* @param direction : left || right */
function scrollMenu(direction) {
	const menuElement = document.getElementById('container-menu');

	const maxScroll = menuElement.scrollWidth - menuElement.clientWidth;

	const scrollInterval = setInterval(function () {
		let scrollStep;
		if (direction === 'left') {
			scrollStep = 10;
		} else if (direction === 'right') {
			scrollStep = -10;
		}

		let newScroll = Math.min(menuElement.scrollLeft + scrollStep, maxScroll);
		menuElement.scrollLeft = newScroll;

		if (newScroll === maxScroll || newScroll % 350 === 0) {
			clearInterval(scrollInterval);
		}
	}, 10);
}

const elementBack = document.getElementById('arrow-left');
const elementNext = document.getElementById('arrow-right');

elementBack.addEventListener(
	'click',
	function () {
		scrollMenu('right');
	},
	false
);
elementNext.addEventListener(
	'click',
	function () {
		scrollMenu('left');
	},
	false
);

const containerMenu = document.getElementById('container-menu');

function handleOpenModal(menuId) {
	const item = menu.find((item) => item.id === menuId);

	const overlay = document.getElementById('overlay');

	overlay.style.display = 'block';
	setTimeout(function () {
		document.getElementById('menu-item').style.width = '800px';
		document.getElementById('menu-item').style.opacity = '1';
	}, 600);

	overlay.innerHTML = `
  <div class="menu-item" id="menu-item">
    <img
      class="close"
      id="close"
      src="./assets/close.png"
      alt="Close icon"
    />
    <div class="content">
      <img src="./assets/${item.imageUrl}" alt="${item.name}" class="menu-pic" />
      <div class="details">
        <h2>${item.name}</h2>
        <p>
          ${item.description}
        </p>
        <div class="actions">
          <span class="price">$ ${item.price}</span>
          <button id="order" class="btn btn-large">Order Now</button>
        </div>
      </div>
    </div>
	</div>`;

	const closeBtn = document.getElementById('close');
	closeBtn.addEventListener(
		'click',
		function () {
			document.getElementById('menu-item').style.width = '0';
			setTimeout(function () {
				document.getElementById('overlay').style.display = 'none';
			}, 400);
		},
		false
	);

	const order = document.getElementById('order');
	order.addEventListener(
		'click',
		function () {
			alert('Order Made Successfully!!');

			document.getElementById('menu-item').style.width = '0';
			setTimeout(function () {
				document.getElementById('overlay').style.display = 'none';
			}, 400);
		},
		false
	);
}

containerMenu.innerHTML = `${menu
	.reverse()
	.map(function (item) {
		return `<div class="container-menu__item">
    <img
      class="menu-image"
      src="./assets/${item.imageUrl}"
      alt="Beautify plate of food"
    />
    <div class="item-details">
      <div class="item-details__labels">
        <span class="name">${item.name}</span>
        <span class="price">$${item.price}</span>
      </div>
      <div class="item-details__labels">
        <div class="rating">
          <img src="./assets/star-fill.svg" alt="Stars" />
          <img src="./assets/star-fill.svg" alt="Stars" />
          <img src="./assets/star-fill.svg" alt="Stars" />
          <img src="./assets/star.svg" alt="Stars" />
          <img src="./assets/star.svg" alt="Stars" />
        </div>
        <button class="btn">Order now</button>
      </div>
    </div>
	</div>`;
	})
	.join('')}`;

const elements = document.querySelectorAll('.container-menu__item');
elements.forEach(function (element, index) {
	element.addEventListener(
		'click',
		function () {
			handleOpenModal(12 - index);
		},
		false
	);
});
