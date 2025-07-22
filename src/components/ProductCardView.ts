/*
 * Это View-компонент для отображения одной карточки товара в списке товаров.
 * Используется на главной странице. Показывает картинку, категорию, название, цену.
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

export class ProductCardView {
  protected product: IProduct;

  constructor(product: IProduct) {
    this.product = product;
  }

  render(): HTMLElement {
    const card = document.createElement('button');
    card.className = 'gallery__item card';
    card.type = 'button';
    card.dataset.id = this.product.id;

    // Категория товара
    const categoryMod = categoryMap[this.product.category.toLowerCase()] || 'other';
    const category = document.createElement('span');
    category.className = `card__category card__category_${categoryMod}`;
    category.textContent = this.product.category;
    card.appendChild(category);

    // Название товара
    const title = document.createElement('h2');
    title.className = 'card__title';
    title.textContent = this.product.title;
    card.appendChild(title);

    // Картинка товара
    const img = document.createElement('img');
    img.className = 'card__image';
    img.src = this.product.image.startsWith('http')
      ? this.product.image
      : `${CDN_URL}/${this.product.image}`;
    img.alt = this.product.title;
    card.appendChild(img);

    // Цена товара
    const price = document.createElement('span');
    price.className = 'card__price';
    price.textContent = this.product.price !== null ? `${this.product.price} синапсов` : 'Нет в наличии';
    card.appendChild(price);

    return card;
  }
}