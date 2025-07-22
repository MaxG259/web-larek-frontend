/*
 * Это View-компонент для отображения подробной карточки товара в модальном окне.
 * Используется для показа полной информации о товаре и кнопки "В корзину" или "Удалить из корзины".
 * Не хранит данные, только отображает.
 */
import { IProduct } from '../types';
import { CDN_URL } from '../utils/constants';

const categoryMap: Record<string, string> = {
  'софт-скилл': 'soft',
  'софт-скил': 'soft',
  'soft': 'soft',
  'другое': 'other',
  'other': 'other',
  'хард-скилл': 'hard',
  'хард-скил': 'hard',
  'hard': 'hard',
  'дополнительно': 'additional',
  'additional': 'additional',
  'кнопка': 'button',
  'button': 'button'
};

export class ProductDetailView {
  protected product: IProduct;

  constructor(product: IProduct) {
    this.product = product;
  }

  render(inBasket: boolean = false): { card: HTMLElement, button: HTMLButtonElement } {
    const card = document.createElement('div');
    card.className = 'card card_full';

    // Картинка товара
    const img = document.createElement('img');
    img.className = 'card__image';
    img.src = this.product.image.startsWith('http')
      ? this.product.image
      : `${CDN_URL}/${this.product.image}`;
    img.alt = this.product.title;
    card.appendChild(img);

    const column = document.createElement('div');
    column.className = 'card__column';
    card.appendChild(column);

    // Категория товара
    const categoryMod = categoryMap[this.product.category.toLowerCase()] || 'other';
    const category = document.createElement('span');
    category.className = `card__category card__category_${categoryMod}`;
    category.textContent = this.product.category;
    column.appendChild(category);

    const title = document.createElement('h2');
    title.className = 'card__title';
    title.textContent = this.product.title;
    column.appendChild(title);

    const desc = document.createElement('p');
    desc.className = 'card__text';
    desc.textContent = this.product.description;
    column.appendChild(desc);

    const row = document.createElement('div');
    row.className = 'card__row';
    column.appendChild(row);

    const button = document.createElement('button');
    button.className = 'button card__button';
    if (this.product.price === null) {
      button.textContent = 'Недоступно';
      button.disabled = true;
    } else {
      button.textContent = inBasket ? 'Удалить из корзины' : 'В корзину';
    }
    row.appendChild(button);

    const price = document.createElement('span');
    price.className = 'card__price';
    price.textContent = this.product.price === null ? 'Бесценно' : `${this.product.price} синапсов`;
    row.appendChild(price);

    return { card, button };
  }
}