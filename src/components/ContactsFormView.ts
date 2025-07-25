/**
 * Компонент для отображения формы ввода контактных данных
 * Показывает поля для ввода email и телефона с валидацией
 */
import { IContactsFormSubmitData } from '../types';
import { cloneTemplate } from '../utils/utils';

export class ContactsFormView {
  /**
   * Создает и возвращает HTML-элемент формы контактов
   * @param onSubmit - функция, вызываемая при отправке формы
   * @returns HTMLElement - готовая форма контактов
   */
  render(onSubmit: (formData: IContactsFormSubmitData) => void): HTMLElement {
    const form = cloneTemplate<HTMLFormElement>('#contacts');
    
    const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
    const phoneInput = form.querySelector('input[name="phone"]') as HTMLInputElement;
    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const errorsSpan = form.querySelector('.form__errors') as HTMLSpanElement;
    
    // Убираем disabled атрибут и CSS классы с кнопки Оплатить
    submitBtn.removeAttribute('disabled');
    submitBtn.classList.remove('disabled', 'button_disabled');
    // Изменяем тип кнопки с submit на button
    submitBtn.type = 'button';
    
    function validateEmail(value: string): boolean {
      return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
    }
    
    function validatePhone(value: string): boolean {
      return /^\+7\s?\d{3}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(value) || /^\+7\d{10}$/.test(value);
    }
    
    function checkValidity() {
      const emailValid = validateEmail(emailInput.value);
      const phoneValid = validatePhone(phoneInput.value);
      
      submitBtn.disabled = !emailValid || !phoneValid;
      
      if (!emailValid || !phoneValid) {
        const errors = [];
        if (!emailValid) errors.push('Введите корректный email');
        if (!phoneValid) errors.push('Введите корректный телефон');
        errorsSpan.textContent = errors.join(', ');
      } else {
        errorsSpan.textContent = '';
      }
    }
    
    emailInput.addEventListener('input', checkValidity);
    phoneInput.addEventListener('input', checkValidity);
    
    submitBtn.addEventListener('click', () => {
      if (submitBtn.disabled) return;
      
      const formData: IContactsFormSubmitData = {
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim()
      };
      
      onSubmit(formData);
    });
    
    return form;
  }
} 