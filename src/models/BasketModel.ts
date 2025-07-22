import { IProduct } from '../types';

/* Это Modal-компонент */
/* Хранит список товаров, которые пользователь добавил в корзину */
/* Позволяет добавлять, удалять, проверять наличие товара в корзине, получать все товары корзины */
/* Реализовывает “добавить в корзину”, “удалить из корзины” и тд */
/* Когда пользователь нажимает “В корзину”, товар добавляется сюда */

/**
 * Модель для работы с корзиной
 */
export class BasketModel {
  protected items: IProduct[] = [];

  /**
   * Добавить товар в корзину
   */
  add(product: IProduct): void {
    // Проверяем, есть ли уже такой товар (по id)
    if (!this.items.find(item => item.id === product.id)) {
      this.items.push(product);
    }
  }

  /**
   * Получить все товары в корзине
   */
  getAll(): IProduct[] {
    return this.items;
  }

  /**
   * Проверить, есть ли товар в корзине
   */
  has(productId: string): boolean {
    return this.items.some(item => item.id === productId);
  }

  remove(productId: string): void {
    this.items = this.items.filter(item => item.id !== productId);
  }

  clear(): void {
    this.items = [];
  }
}