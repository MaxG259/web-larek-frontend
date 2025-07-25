/**
 * Компонент для отображения детальной информации о товаре
 * Используется в модальном окне при клике на карточку товара
 * Показывает полную информацию: изображение, категорию, название, описание, цену, кнопку покупки
 */
import { IProduct } from '../types';
import { CDN_URL } from '../utils/constants';
import { categoryMap } from '../utils/categoryMap';
import { cloneTemplate } from '../utils/utils';

export class ProductDetailView {
  protected product: IProduct;

  constructor(product: IProduct) {
    this.product = product;
  }

  /**
   * Создает и возвращает HTML-элемент с детальной информацией о товаре
   * @param inBasket - находится ли товар в корзине
   * @returns HTMLElement - готовая карточка с детальной информацией
   */
  render(inBasket: boolean = false): HTMLElement {
    const card = cloneTemplate<HTMLElement>('#card-preview');
    
    const image = card.querySelector('.card__image') as HTMLImageElement;
    const category = card.querySelector('.card__category') as HTMLSpanElement;
    const title = card.querySelector('.card__title') as HTMLHeadingElement;
    const description = card.querySelector('.card__text') as HTMLParagraphElement;
    const button = card.querySelector('.card__button') as HTMLButtonElement;
    const price = card.querySelector('.card__price') as HTMLSpanElement;
    
    // Устанавливаем изображение
    image.src = this.product.image.startsWith('http')
      ? this.product.image
      : `${CDN_URL}/${this.product.image}`;
    image.alt = this.product.title;
    
    // Устанавливаем категорию
    const categoryMod = categoryMap[this.product.category.toLowerCase()] || 'other';
    category.className = `card__category card__category_${categoryMod}`;
    category.textContent = this.product.category;
    
    // Устанавливаем название и описание
    title.textContent = this.product.title;
    description.textContent = this.product.description;
    
    // Устанавливаем цену
    price.textContent = this.product.price !== null ? `${this.product.price} синапсов` : 'Нет в наличии';
    
    // Настраиваем кнопку
    if (inBasket) {
      button.textContent = 'Убрать из корзины';
      button.disabled = false;
    } else {
      button.textContent = 'В корзину';
      button.disabled = this.product.price === null;
    }
    
    return card;
  }
}