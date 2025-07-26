/**
 * Компонент для отображения формы ввода контактных данных
 * Показывает поля для ввода email и телефона
 */
import { IContactsFormSubmitData } from '../types';
import { cloneTemplate } from '../utils/utils';

export class ContactsFormView {
  private emailInput: HTMLInputElement;
  private phoneInput: HTMLInputElement;
  private submitBtn: HTMLButtonElement;
  private errorsSpan: HTMLSpanElement;

  /**
   * Создает и возвращает HTML-элемент формы контактов
   * @param onSubmit - функция, вызываемая при отправке формы
   * @returns HTMLElement - готовая форма контактов
   */
  render(onSubmit: (formData: IContactsFormSubmitData) => void): HTMLElement {
    const form = cloneTemplate<HTMLFormElement>('#contacts');
    
    this.emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
    this.phoneInput = form.querySelector('input[name="phone"]') as HTMLInputElement;
    this.submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    this.errorsSpan = form.querySelector('.form__errors') as HTMLSpanElement;
    
    // Изменил тип кнопки с submit на button
    this.submitBtn.type = 'button';
    
    // Настраиваем обработчики событий
    this.setupEventListeners(onSubmit);
    
    // Сразу делаем кнопку неактивной при создании формы
    this.setButtonState(false);
    
    return form;
  }

  /**
   * Настраивает обработчики событий для полей формы
   */
  private setupEventListeners(onSubmit: (formData: IContactsFormSubmitData) => void): void {
    // Обработчики для изменения полей - отправляем события в презентер
    this.emailInput.addEventListener('input', () => {
      this.emit('emailChanged', this.emailInput.value);
    });

    this.phoneInput.addEventListener('input', () => {
      this.emit('phoneChanged', this.phoneInput.value);
    });

    // Обработчик для кнопки отправки
    this.submitBtn.addEventListener('click', () => {
      if (this.submitBtn.disabled) return;
      
      const formData: IContactsFormSubmitData = {
        email: this.emailInput.value.trim(),
        phone: this.phoneInput.value.trim()
      };
      
      onSubmit(formData);
    });
  }

  /**
   * Устанавливает состояние кнопки отправки
   * @param isValid - валидны ли данные формы
   */
  setButtonState(isValid: boolean): void {
    this.submitBtn.disabled = !isValid;
  }

  /**
   * Устанавливает ошибки валидации
   * @param errors - массив ошибок
   */
  setErrors(errors: string[]): void {
    this.errorsSpan.textContent = errors.join(', ');
  }

  /**
   * Очищает ошибки валидации
   */
  clearErrors(): void {
    this.errorsSpan.textContent = '';
  }

  /**
   * Отправляет событие (заглушка для простоты)
   */
  private emit(event: string, data: any): void {
    // Пока просто вызываем глобальную функцию
    if (window.contactsFormEvents) {
      window.contactsFormEvents(event, data);
    }
  }
} 