/**
 * Компонент для отображения одного товара в корзине
 * Показывает название, цену, номер товара и кнопку удаления
 */
import { IProduct } from '../types';
import { cloneTemplate } from '../utils/utils';

export class BasketItemView {
  constructor(private product: IProduct, private index: number) {}

  /**
   * Создает и возвращает HTML-элемент товара в корзине
   * @param onRemove - функция для удаления товара из корзины
   * @returns HTMLElement - готовый элемент товара в корзине
   */
  render(onRemove: (id: string) => void): HTMLElement {
    const item = cloneTemplate<HTMLElement>('#card-basket');
    
    const indexElement = item.querySelector('.basket__item-index') as HTMLSpanElement;
    const title = item.querySelector('.card__title') as HTMLSpanElement;
    const price = item.querySelector('.card__price') as HTMLSpanElement;
    const removeBtn = item.querySelector('.basket__item-delete') as HTMLButtonElement;
    
    indexElement.textContent = String(this.index + 1);
    title.textContent = this.product.title;
    price.textContent = this.product.price !== null ? `${this.product.price} синапсов` : 'Нет в наличии';
    
    removeBtn.addEventListener('click', () => onRemove(this.product.id));
    
    return item;
  }
} 