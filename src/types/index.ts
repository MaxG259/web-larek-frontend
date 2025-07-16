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
  price: number | null; // Цена товара может быть null
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

/**
 * Представление карточки товара (Card)
 * Отвечает за отображение информации о товаре и взаимодействие с корзиной
 */
export interface ICardView {
  /** Конструктор принимает данные товара и флаг наличия в корзине */
  new (product: ViewProduct, inBasket: boolean): ICardView;
  /** Данные товара */
  product: ViewProduct;
  /** true, если товар в корзине */
  inBasket: boolean;
  /** Отрисовать карточку товара */
  render(): void;
  /** Обновить состояние (например, кнопка "В корзину") */
  update(inBasket: boolean): void;
}

/**
 * Представление корзины (Basket)
 * Показывает список выбранных товаров и сумму заказа
 */
export interface IBasketView {
  /** Конструктор принимает список товаров и сумму */
  new (items: ViewProduct[], total: number): IBasketView;
  /** Список товаров в корзине */
  items: ViewProduct[];
  /** Итоговая сумма */
  total: number;
  /** Отрисовать корзину */
  render(): void;
  /** Обновить список товаров */
  update(items: ViewProduct[], total: number): void;
}

/**
 * Модальное окно (Modal)
 * Для отображения подробной информации или оформления заказа
 */
export interface IModalView {
  /** Конструктор принимает содержимое для отображения */
  new (content: HTMLElement): IModalView;
  /** Показать модальное окно */
  show(): void;
  /** Скрыть модальное окно */
  hide(): void;
  /** Задать новое содержимое */
  setContent(content: HTMLElement): void;
}

/**
 * Базовое представление формы (FormView)
 * Для наследования конкретными формами заказа и контактов
 */
export interface IFormView {
  /** Конструктор принимает callback для отправки формы */
  new (onSubmit: (data: object) => void): IFormView;
  /** Отрисовать форму */
  render(): void;
  /** Получить данные формы */
  getData(): object;
  /** Показать ошибки */
  showErrors(errors: string[]): void;
  /** Очистить форму */
  reset(): void;
}

/**
 * Представление формы заказа (OrderFormView)
 * Для ввода адреса и способа оплаты
 */
export interface IOrderFormView extends IFormView {
  /** Получить данные формы заказа */
  getData(): { address: string; payment: string };
}

/**
 * Представление формы контактов (ContactsFormView)
 * Для ввода email и телефона
 */
export interface IContactsFormView extends IFormView {
  /** Получить данные формы контактов */
  getData(): { email: string; phone: string };
}

/**
 * Представление успешного заказа (OrderSuccessView)
 * Показывает сообщение об успешном оформлении заказа
 */
export interface IOrderSuccessView {
  /** Конструктор принимает сумму заказа и callback для закрытия */
  new (total: number, onClose: () => void): IOrderSuccessView;
  /** Отрисовать сообщение об успехе */
  render(): void;
  /** Закрыть сообщение */
  close(): void;
}

/**
 * Модель товаров (ProductModel)
 * Хранит и управляет списком товаров
 */
export interface IProductModel {
  /** Конструктор принимает массив товаров */
  new (products: ApiProduct[]): IProductModel;
  /** Список всех товаров */
  products: ApiProduct[];
  /** Получить товар по id */
  getProductById(id: string): ApiProduct | undefined;
}

/**
 * Модель корзины (BasketModel)
 * Хранит id товаров в корзине и управляет ими
 */
export interface IBasketModel {
  /** Конструктор принимает массив id товаров */
  new (items: string[]): IBasketModel;
  /** Массив id товаров в корзине */
  items: string[];
  /** Добавить товар в корзину */
  add(id: string): void;
  /** Удалить товар из корзины */
  remove(id: string): void;
  /** Очистить корзину */
  clear(): void;
}

/**
 * Модель заказа (OrderModel)
 * Хранит данные текущего заказа
 */
export interface IOrderModel {
  /** Конструктор принимает данные заказа */
  new (order: ApiOrder): IOrderModel;
  /** Данные заказа */
  order: ApiOrder;
  /** Установить адрес */
  setAddress(address: string): void;
  /** Установить способ оплаты */
  setPayment(payment: string): void;
  /** Получить итоговую сумму */
  getTotal(products: ApiProduct[]): number;
}

/**
 * Модель пользователя (UserModel)
 * Хранит контактные данные пользователя
 */
export interface IUserModel {
  /** Конструктор принимает email и телефон */
  new (contacts: IUserContacts): IUserModel;
  /** Email пользователя */
  email: string;
  /** Телефон пользователя */
  phone: string;
  /** Установить email */
  setEmail(email: string): void;
  /** Установить телефон */
  setPhone(phone: string): void;
}