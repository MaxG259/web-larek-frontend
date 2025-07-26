/* Модель для управления списком товаров
 * Хранит все товары и предоставляет методы для работы с ними */
import { IProduct } from '../types';

export class ProductModel {
  private products: IProduct[] = [];

  /**
   * Устанавливает список товаров
   * @param products - массив товаров */
  setProducts(products: IProduct[]): void {
    this.products = products;
  }

  /**
   * Возвращает все товары
   * @returns IProduct[] - массив всех товаров */
  getAll(): IProduct[] {
    return this.products;
  }

  /**
   * Находит товар по id
   * @param id - идентификатор товара
   * @returns IProduct | undefined - найденный товар или undefined */
  getProductById(id: string): IProduct | undefined {
    return this.products.find(product => product.id === id);
  }
}