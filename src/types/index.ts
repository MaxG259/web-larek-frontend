// Типы данных, приходящие с API

/**
 * Описывает товар, который приходит с сервера через API
 */
export interface ApiProduct {
  id: string; // Уникальный идентификатор товара
  title: string; // Название товара
  description: string; // Описание товара
  image: string; // Ссылка на изображение товара
  category: string; // Категория товара
  price: number; // Цена товара
}

/**
 * Описывает заказ, который отправляется на сервер
 */
export interface ApiOrder {
  items: string[]; // Массив id товаров, которые заказывает пользователь
  address: string; // Адрес доставки
  payment: string; // Способ оплаты
}

/**
 * Описывает ответ сервера после оформления заказа
 */
export interface ApiOrderResponse {
  id: string; // Уникальный номер заказа
  total: number; // Итоговая сумма заказа
}

// Типы для отображения на экране

/**
 * Описывает, как товар будет отображаться на экране
 * Может содержать дополнительные поля, например, inBasket
 */
export interface ViewProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  inBasket: boolean; // true, если товар уже в корзине
}

// Интерфейс API-клиента

/**
 * Описывает методы для работы с сервером (API)
 */
export interface IApiClient {
  /** Получить список всех товаров */
  getProducts(): Promise<ApiProduct[]>;
  /** Получить один товар по id */
  getProduct(id: string): Promise<ApiProduct>;
  /** Создать заказ */
  createOrder(order: ApiOrder): Promise<ApiOrderResponse>;
}

// Интерфейсы модели данных

/**
 * Описывает структуру и методы модели данных приложения
 */
export interface IModel {
  products: ApiProduct[]; // Список всех товаров
  basket: string[]; // Массив id товаров, добавленных в корзину
  /** Добавить товар в корзину */
  addToBasket(id: string): void;
  /** Удалить товар из корзины */
  removeFromBasket(id: string): void;
}

// Интерфейсы отображений

/**
 * Описывает методы для отображения данных на экране
 */
export interface IView {
  /** Отрисовать список товаров */
  render(products: ViewProduct[]): void;
  /** Показать подробную информацию о товаре */
  showProduct(product: ViewProduct): void;
}

// Перечисление событий и их интерфейсы

/**
 * Список возможных событий в приложении
 */
export type AppEvent =
  | 'product:add'      // Добавление товара в корзину
  | 'product:remove'   // Удаление товара из корзины
  | 'basket:open'      // Открытие корзины
  | 'order:submit';    // Оформление заказа

/**
 * Описывает структуру данных (payload), которые передаются с каждым событием
 */
export interface IEventPayloads {
  'product:add': { id: string }; // id добавленного товара
  'product:remove': { id: string }; // id удалённого товара
  'basket:open': undefined; // нет данных, просто открытие корзины
  'order:submit': { order: ApiOrder }; // данные заказа
}

// Интерфейсы базовых классов

/**
 * Базовый интерфейс для всех UI-компонентов
 */
export interface IComponent {
  /** Отрисовать компонент */
  render(): void;
  /** Показать компонент */
  show(): void;
  /** Скрыть компонент */
  hide(): void;
}

// Прочие типы (можно расширять по мере необходимости)

/**
 * Описывает состояние формы (валидность и ошибки)
 */
export interface IFormState {
  valid: boolean; // true, если форма заполнена правильно
  errors: string[]; // список ошибок, если есть
}

/**
 * Описывает контактные данные пользователя
 */
export interface IUserContacts {
  email: string; // Email пользователя
  phone: string; // Телефон пользователя
}
