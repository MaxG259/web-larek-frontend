import { IProduct } from '../types';

/* Это Modal-компонент */
/* Хранит и управляет списком всех товаров, которые есть в магазине */
/* Позволяет получить список всех товаров или найти товар по id */
/* Когда приложение загружает товары с сервера, они сохраняются здесь */
/* Когда нужно отобразить товары — View запрашивает их отсюда */

/* Модель для работы со списком товаров */
export class ProductModel {
  protected products: IProduct[];

  constructor(products: IProduct[]) {
    this.products = products;
  }

  /* Получить все товары */
  getAll(): IProduct[] {
    return this.products;
  }

  /* Найти товар по id */
  getProductById(id: string): IProduct | undefined {
    return this.products.find(product => product.id === id);
  }
}