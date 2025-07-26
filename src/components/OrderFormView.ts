/**
 * Компонент для отображения формы оформления заказа
 * Показывает способ оплаты и поле для ввода адреса доставки
 */
import { IOrderFormSubmitData } from '../types';
import { cloneTemplate } from '../utils/utils';

export class OrderFormView {
  /**
   * Создает и возвращает HTML-элемент формы заказа
   * @param onSubmit - функция, вызываемая при отправке формы
   * @returns HTMLElement - готовая форма заказа
   */
  render(onSubmit: (formData: IOrderFormSubmitData) => void): HTMLElement {
    const form = cloneTemplate<HTMLFormElement>('#order');
    
    const addressInput = form.querySelector('input[name="address"]') as HTMLInputElement;
    const cardBtn = form.querySelector('button[name="card"]') as HTMLButtonElement;
    const cashBtn = form.querySelector('button[name="cash"]') as HTMLButtonElement;
    const nextBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const errorsSpan = form.querySelector('.form__errors') as HTMLSpanElement;
    
    // Изменяем тип кнопки с submit на button
    nextBtn.type = 'button';
    
    let selectedPayment = '';
    
    function checkValidity() {
      nextBtn.disabled = !addressInput.value.trim() || !selectedPayment;
      errorsSpan.textContent = '';
    }
    
    addressInput.addEventListener('input', checkValidity);
    
    cardBtn.addEventListener('click', () => {
      selectedPayment = 'card';
      cardBtn.classList.add('button_alt-active');
      cashBtn.classList.remove('button_alt-active');
      checkValidity();
    });
    
    cashBtn.addEventListener('click', () => {
      selectedPayment = 'cash';
      cashBtn.classList.add('button_alt-active');
      cardBtn.classList.remove('button_alt-active');
      checkValidity();
    });
    
    nextBtn.addEventListener('click', () => {
      if (nextBtn.disabled) return;
      
      const formData: IOrderFormSubmitData = {
        address: addressInput.value.trim(),
        payment: selectedPayment
      };
      
      onSubmit(formData);
    });

    checkValidity();
    
    return form;
  }
} 