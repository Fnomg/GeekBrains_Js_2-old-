// const goods = [
//   { id: 0, title: 'Shirt', price: 150 },
//   { id: 1, title: 'Socks', price: 50 },
//   { id: 2, title: 'Jacket', price: 350 },
//   { id: 3, title: 'Shoes', price: 250 },
//   { id: 4, title: 'Shoes' , price: 250},
// ];
//
// const renderGoodsItem = (title, price = 500 ) => {
//   return `<div class="goods-item">
//           <h3>${title}</h3>
//           <p>${price}</p>
//           </div>`;
// };
//
// const renderGoodsList = (list) => {
//   let goodsList = list.map(item => renderGoodsItem(item.title, item.price)).join('');
//   document.querySelector('.goods-list').innerHTML = goodsList;
// }
//
// renderGoodsList(goods);

'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// do not use fetch!! Only Promise! //Done
let getRequest = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject('Error')
        } else {
          resolve(xhr.responseText)
        }
      }
    }
    xhr.send();
  })
}

// как сложнааа. Вторую часть так и не поняла как делать. Надеюсь я не одна такая.


class ProductItem {
  constructor(product, img='https://via.placeholder.com/200x150') {

    this.title = product.title
    this.price = product.price
    this.id = product.id
    this.img = img
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
          <img src="${this.img}" alt="img">
          <div class="product-description">
            <h3>${this.title}</h3>
            <p>${this.price}</p>
            <button class="product-button button">Купить</button>
          </div>
        </div>`;
  }
};

class ProductList {
  constructor(container = '.goods-list') {
    this.container = document.querySelector(container)
    this.goods = []
    this.allProducts = []

    this.fetchGoods()
    this.render()
  }

  fetchGoods() {
    this.goods = [
      { id: 0, title: 'Shirt', price: 150 },
      { id: 1, title: 'Socks', price: 50 },
      { id: 2, title: 'Jacket', price: 350 },
      { id: 3, title: 'Shoes', price: 250 },
      { id: 4, title: 'Shoes' , price: 250},
    ]
  }

  getSum() {
    return this.goods.reduce( function (sum, cur) {
      return sum + cur.price
    }, 0)
  }

  render() {
    for (let product of this.goods) {
      const productObject = new ProductItem(product)
      this.allProducts.push(productObject)
      this.container.insertAdjacentHTML('beforeend', productObject.render())
    }
  }
}

const list = new ProductList();