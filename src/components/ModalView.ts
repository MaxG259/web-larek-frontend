
/**
 * Компонент для управления модальным окном
 * Отвечает за открытие, закрытие и управление содержимым модального окна
 */
export class ModalView {
  private modal: HTMLElement;
  private modalContent: HTMLElement;
  private modalClose: HTMLElement;

  constructor() {
    this.modal = document.querySelector('.modal') as HTMLElement;
    this.modalContent = this.modal.querySelector('.modal__content') as HTMLElement;
    this.modalClose = this.modal.querySelector('.modal__close') as HTMLElement;
    
    this.setupEventListeners();
  }

  /**
   * Настраивает обработчики событий для модального окна
   * Добавляет обработчики для закрытия по крестику, клику вне окна и ESC
   */
  private setupEventListeners(): void {
    // Закрытие по крестику
    this.modalClose?.addEventListener('click', () => {
      this.close();
    });

    // Закрытие по клику вне окна
    this.modal?.addEventListener('click', (event) => {
      if (event.target === this.modal) {
        this.close();
      }
    });

    // Закрытие по ESC
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.modal.classList.contains('modal_active')) {
        this.close();
      }
    });
  }

  /**
   * Открывает модальное окно
   */
  open(): void {
    this.modal.classList.add('modal_active');
  }

  /**
   * Закрывает модальное окно
   */
  close(): void {
    this.modal.classList.remove('modal_active');
  }

  /**
   * Очищает содержимое модального окна
   */
  clearContent(): void {
    this.modalContent.innerHTML = '';
  }

  /**
   * Устанавливает содержимое модального окна
   * @param content - HTML-элемент для отображения в модальном окне
   */
  setContent(content: HTMLElement): void {
    this.modalContent.innerHTML = '';
    this.modalContent.appendChild(content);
  }

  /**
   * Проверяет, открыто ли модальное окно
   * @returns boolean - true если модальное окно открыто
   */
  isOpen(): boolean {
    return this.modal.classList.contains('modal_active');
  }
} 
