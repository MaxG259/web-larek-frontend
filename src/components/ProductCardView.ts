/**
 * Компонент для отображения карточки товара в каталоге
 * Показывает основную информацию о товаре: название, цену, категорию, изображение
 */
import { IProduct } from '../types';
import { CDN_URL } from '../utils/constants';
import { categoryMap } from '../utils/categoryMap';
import { cloneTemplate } from '../utils/utils';

export class ProductCardView {
  /**
   * Создает и возвращает HTML-элемент карточки товара
   * @param product - товар для отображения
   * @returns HTMLElement - готовая карточка товара
   */
  render(product: IProduct): HTMLElement {
    // Используем утилиту cloneTemplate для правильной работы с шаблоном
    const card = cloneTemplate<HTMLButtonElement>('#card-catalog');
    
    // Находим элементы в клонированном шаблоне
    const category = card.querySelector('.card__category') as HTMLSpanElement;
    const title = card.querySelector('.card__title') as HTMLHeadingElement;
    const image = card.querySelector('.card__image') as HTMLImageElement;
    const price = card.querySelector('.card__price') as HTMLSpanElement;
    
    // Заполняем данными из продукта
    const categoryMod = categoryMap[product.category.toLowerCase()] || 'other';
    category.className = `card__category card__category_${categoryMod}`;
    category.textContent = product.category;
    
    title.textContent = product.title;
    
    image.src = product.image.startsWith('http')
      ? product.image
      : `${CDN_URL}/${product.image}`;
    image.alt = product.title;
    
    price.textContent = product.price !== null ? `${product.price} синапсов` : 'Нет в наличии';
    
    // Устанавливаем id товара для идентификации
    card.dataset.id = product.id;
    
    return card;
  }
}