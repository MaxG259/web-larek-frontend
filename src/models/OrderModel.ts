/**
 * Модель для управления данными заказа
 * Хранит информацию о заказе: адрес, способ оплаты, контактные данные
 */
import { IOrderModel, IOrderData } from '../types';
import { Api } from '../components/base/api';
import { API_URL } from '../utils/constants';

export class OrderModel implements IOrderModel {
  private api: Api;
  private orderData: IOrderData = {
    address: '',
    payment: '',
    email: undefined,
    phone: undefined
  };

  constructor() {
    this.api = new Api(API_URL);
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