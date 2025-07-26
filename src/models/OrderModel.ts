/* Модель для управления данными заказа
 * Хранит информацию о заказе: адрес, способ оплаты, контактные данные */
import { IOrderModel, IOrderData } from '../types';
import { Api } from '../components/base/api';

export class OrderModel implements IOrderModel {
  private api: Api;
  private orderData: IOrderData = {
    address: '',
    payment: '',
    email: undefined,
    phone: undefined
  };

  constructor(api: Api) {
    this.api = api;
  }

  /**
   * Устанавливает адрес доставки
   * @param address - адрес доставки
   */
  setAddress(address: string): void {
    this.orderData.address = address;
  }

  /**
   * Устанавливает способ оплаты
   * @param payment - способ оплаты
   */
  setPayment(payment: string): void {
    this.orderData.payment = payment;
  }

  /**
   * Устанавливает email и валидирует его
   * @param email - email покупателя
   * @returns boolean - результат валидации email
   */
  setEmail(email: string): boolean {
    this.orderData.email = email;
    return this.validateEmail(email);
  }

  /**
   * Устанавливает телефон и валидирует его
   * @param phone - телефон покупателя
   * @returns boolean - результат валидации телефона
   */
  setPhone(phone: string): boolean {
    this.orderData.phone = phone;
    return this.validatePhone(phone);
  }

  /**
   * Устанавливает контактные данные
   * @param email - email покупателя
   * @param phone - телефон покупателя
   */
  setContacts(email: string, phone: string): void {
    this.orderData.email = email;
    this.orderData.phone = phone;
  }

  /**
   * Возвращает данные заказа
   * @returns IOrderData - данные заказа
   */
  getOrderData(): IOrderData {
    return { ...this.orderData };
  }

  /**
   * Проверяет корректность данных заказа
   * @returns boolean - true если все поля заполнены
   */
  validate(): boolean {
    return !!(
      this.orderData.address.trim() &&
      this.orderData.payment &&
      this.orderData.email &&
      this.orderData.phone
    );
  }

  /**
   * Валидирует email
   * @param email - email для валидации
   * @returns boolean - true если email валиден
   */
  validateEmail(email: string): boolean {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  }

  /**
   * Валидирует телефон
   * @param phone - телефон для валидации
   * @returns boolean - true если телефон валиден
   */
  validatePhone(phone: string): boolean {
    return /^\+7\s?\d{3}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(phone) || /^\+7\d{10}$/.test(phone);
  }

  /**
   * Проверяет валидность контактных данных
   * @returns { isValid: boolean, errors: string[] } - результат валидации
   */
  validateContacts(): { isValid: boolean, errors: string[] } {
    const errors: string[] = [];
    
    if (!this.orderData.email || !this.validateEmail(this.orderData.email)) {
      errors.push('Введите корректный email');
    }
    
    if (!this.orderData.phone || !this.validatePhone(this.orderData.phone)) {
      errors.push('Введите корректный телефон');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Отправляет заказ на сервер
   * @throws Error если данные заказа неполные
   */
  async submit(): Promise<void> {
    if (!this.validate()) {
      throw new Error('Данные заказа неполные');
    }

    const orderPayload = {
      address: this.orderData.address,
      payment: this.orderData.payment,
      email: this.orderData.email,
      phone: this.orderData.phone
    };

    await this.api.post('/order', orderPayload);
  }

  /**
   * Очищает данные заказа
   */
  clear(): void {
    this.orderData = {
      address: '',
      payment: '',
      email: undefined,
      phone: undefined
    };
  }
} 