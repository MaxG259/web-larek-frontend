/**
 * Компонент для отображения главной страницы с каталогом товаров
 * Управляет отображением списка товаров и обработкой кликов по карточкам
 */
import { IProduct } from '../types';
import { ProductCardView } from './ProductCardView';

export class PageView {
  private gallery: HTMLElement;
  private products: IProduct[] = [];

  constructor() {
    this.gallery = document.querySelector('.gallery') as HTMLElement;
  }

  /**
   * Отображает список товаров на главной странице
   * @param products - массив товаров для отображения
   */
  render(products: IProduct[]): void {
    if (!this.gallery) return;
    
    this.products = products; // Сохраняем продукты для поиска
    this.gallery.innerHTML = '';

    products.forEach((product: IProduct) => {
      const cardView = new ProductCardView(product);
      const cardElement = cardView.render();
      this.gallery.appendChild(cardElement);
    });
  }

  /**
   * Добавляет обработчик клика на карточки товаров
   * @param handler - функция, вызываемая при клике на карточку товара
   */
  addCardClickHandler(handler: (product: IProduct) => void): void {
    this.gallery.addEventListener('click', (event) => {
      const card = (event.target as HTMLElement).closest('.card') as HTMLElement;
      if (!card) return;

      const productId = card.dataset.id;
      if (!productId) return;

      // Находим продукт по id
      const product = this.findProductById(productId);
      if (product) {
        handler(product);
      }
    });
  }

  /**
   * Находит товар по его id
   * @param id - идентификатор товара
   * @returns IProduct | null - найденный товар или null
   */
  private findProductById(id: string): IProduct | null {
    return this.products.find(product => product.id === id) || null;
  }
}
