/* Описывает товар, который приходит с сервера через API */
export interface IProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number | null;
}

/* Описывает состояние корзины */
export interface IBasket {
  items: IProduct[]; // Хранит сами товары, а не только ID
  add(product: IProduct): void;
  remove(productId: string): void;
  clear(): void;
  getAll(): IProduct[]; // Добавлен метод получения всех товаров
  has(productId: string): boolean; // Добавлен метод проверки наличия товара
}

/** 
 * Интерфейс для данных формы заказа
 */
export interface IOrderFormSubmitData {
  address: string;
  payment: string;
}

/** 
 * Интерфейс для данных формы контактов
 */
export interface IContactsFormSubmitData {
  email: string;
  phone: string;
}

/* Данные заказа для OrderModel */
export interface IOrderData {
  address: string;
  payment: string;
  email?: string;
  phone?: string;
}

/**
 * Интерфейс модели заказа
 */
export interface IOrderModel {
  setAddress(address: string): void;
  setPayment(payment: string): void;
  setContacts(email: string, phone: string): void;
  getOrderData(): IOrderData;
  validate(): boolean;
  submit(): Promise<void>;
  clear(): void;
}

/* Потенциальный формат ответа API при успешном заказе */
export interface IOrderResult {
  id: string;
  total: number;
  // ... другие поля ответа API
}

/* Типы состояний экрана приложения */
export type TScreenState = 'main' | 'modal-product' | 'modal-basket' | 'modal-order' | 'modal-success';

/* Данные для состояния 'modal-success' */
export interface ISuccessScreenData {
  message?: string;
  total?: number;
}

/* Данные для состояния 'modal-product' */
export interface IProductScreenData {
  product: IProduct;
}

/* Данные для состояния 'modal-basket' */
export interface IBasketScreenData {
  products: IProduct[];
}

/* Интерфейс для данных, передаваемых в колбэк удаления товара из корзины */
export interface IRemoveFromBasketCallback {
  (id: string): void;
}

/* Интерфейс для данных, передаваемых в колбэк сабмита формы заказа */
export interface ISubmitOrderCallback {
  (formData: IOrderFormSubmitData): void;
}

/* Интерфейс, описывающий структуру данных, возвращаемую BasketView.render */
export interface IBasketViewRenderResult {
  basketElement: HTMLElement;
  orderButton: HTMLButtonElement | null;
}

/* Интерфейс, описывающий структуру данных, возвращаемую OrderFormView.render */
export interface IOrderFormViewRenderResult {
  wrapper: HTMLElement; // Обёртка, содержащая обе формы
  form: HTMLFormElement; // Форма адреса и оплаты
  contactsForm: HTMLFormElement; // Форма контактов (изначально скрыта)
}