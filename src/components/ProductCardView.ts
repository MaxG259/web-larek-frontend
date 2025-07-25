/**
 * Компонент для отображения карточки товара в каталоге
 * Показывает основную информацию о товаре: название, цену, категорию, изображение
 */
import { IProduct } from '../types';
import { CDN_URL } from '../utils/constants';
import { categoryMap } from '../utils/categoryMap';
import { cloneTemplate } from '../utils/utils';

export class ProductCardView {
  protected product: IProduct;

  constructor(product: IProduct) {
    this.product = product;
  }

  /**
   * Создает и возвращает HTML-элемент карточки товара
   * @returns HTMLElement - готовая карточка товара
   */
  render(): HTMLElement {
    // Используем утилиту cloneTemplate для правильной работы с шаблоном
    const card = cloneTemplate<HTMLButtonElement>('#card-catalog');
    
    // Находим элементы в клонированном шаблоне
    const category = card.querySelector('.card__category') as HTMLSpanElement;
    const title = card.querySelector('.card__title') as HTMLHeadingElement;
    const image = card.querySelector('.card__image') as HTMLImageElement;
    const price = card.querySelector('.card__price') as HTMLSpanElement;
    
    // Заполняем данными из продукта
    const categoryMod = categoryMap[this.product.category.toLowerCase()] || 'other';
    category.className = `card__category card__category_${categoryMod}`;
    category.textContent = this.product.category;
    
    title.textContent = this.product.title;
    
    image.src = this.product.image.startsWith('http')
      ? this.product.image
      : `${CDN_URL}/${this.product.image}`;
    image.alt = this.product.title;
    
    price.textContent = this.product.price !== null ? `${this.product.price} синапсов` : 'Нет в наличии';
    
    // Устанавливаем id товара для идентификации
    card.dataset.id = this.product.id;
    
    return card;
  }
}