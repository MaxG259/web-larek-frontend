/* Модель для управления корзиной товаров
 * Хранит список товаров в корзине и предоставляет методы для работы с ним */
import { IProduct } from '../types';

export class BasketModel {
  protected items: IProduct[] = [];

  /**
   * Добавляет товар в корзину
   * @param product - товар для добавления
   */
  add(product: IProduct): void {
    // Проверяем, есть ли уже такой товар (по id)
    if (!this.items.find(item => item.id === product.id)) {
      this.items.push(product);
    }
  }

  /**
   * Возвращает все товары в корзине
   * @returns IProduct[] - массив товаров в корзине
   */
  getAll(): IProduct[] {
    return this.items;
  }

  /**
   * Проверяет, есть ли товар в корзине
   * @param productId - идентификатор товара
   * @returns boolean - true если товар есть в корзине
   */
  has(productId: string): boolean {
    return this.items.some(item => item.id === productId);
  }

  /**
   * Удаляет товар из корзины
   * @param productId - идентификатор товара для удаления
   */
  remove(productId: string): void {
    this.items = this.items.filter(item => item.id !== productId);
  }

  /* Очищает корзину */
  clear(): void {
    this.items = [];
  }

  /**
   * Вычисляет общую сумму товаров в корзине
   * @returns number - общая сумма товаров
   */
  getTotal(): number {
    return this.items.reduce((total, item) => {
      return total + (item.price || 0);
    }, 0);
  }
}