/**
 * Компонент для отображения главной страницы с каталогом товаров
 * Управляет отображением списка товаров и обработкой кликов по карточкам
 */
import { IProduct } from '../types';

export class PageView {
  private gallery: HTMLElement;

  constructor() {
    this.gallery = document.querySelector('.gallery') as HTMLElement;
  }

  /**
   * Отображает список товаров на главной странице
   * @param products - массив товаров для отображения
   * @param cardElements - готовые HTML элементы карточек товаров
   */
  render(products: IProduct[], cardElements: HTMLElement[]): void {
    if (!this.gallery) return;
    
    this.gallery.innerHTML = '';

    // Вставляем готовые HTML элементы карточек
    cardElements.forEach(cardElement => {
      this.gallery.appendChild(cardElement);
    });
  }

  /**
   * Добавляет обработчик клика на карточки товаров
   * @param handler - функция, вызываемая при клике на карточку товара (получает id товара)
   */
  addCardClickHandler(handler: (productId: string) => void): void {
    this.gallery.addEventListener('click', (event) => {
      const card = (event.target as HTMLElement).closest('.card') as HTMLElement;
      if (!card) return;

      const productId = card.dataset.id;
      if (!productId) return;

      // Передаем только id товара в обработчик
      handler(productId);
    });
  }
}