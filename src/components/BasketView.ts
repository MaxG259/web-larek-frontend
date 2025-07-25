/**
 * Компонент для отображения корзины товаров
 * Показывает список товаров в корзине, итоговую сумму и кнопку оформления заказа
 */
import { IProduct, IRemoveFromBasketCallback } from '../types';
import { BasketItemView } from './BasketItemView';
import { cloneTemplate } from '../utils/utils';

export class BasketView {
  /**
   * Создает и возвращает HTML-элемент корзины с товарами
   * @param products - список товаров в корзине
   * @param total - общая сумма товаров
   * @param onRemove - функция для удаления товара из корзины
   * @returns HTMLElement - готовый элемент корзины
   */
  render(products: IProduct[], total: number, onRemove: IRemoveFromBasketCallback): HTMLElement {
    // Используем готовый шаблон из HTML
    const basket = cloneTemplate<HTMLElement>('#basket');
    
    const list = basket.querySelector('.basket__list') as HTMLUListElement;
    const orderBtn = basket.querySelector('.basket__button') as HTMLButtonElement;
    const priceSpan = basket.querySelector('.basket__price') as HTMLSpanElement;
    
    products.forEach((product, idx) => {
      const itemView = new BasketItemView(product, idx);
      const item = itemView.render(onRemove);
      list.appendChild(item);
    });
    
    orderBtn.disabled = products.length === 0 || total === 0;
    priceSpan.textContent = `${total} синапсов`;
    
    return basket;
  }
} 