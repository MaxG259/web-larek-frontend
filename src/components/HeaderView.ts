/**
 * Компонент для управления хедером страницы
 * Отвечает за отображение кнопки корзины и счетчика товаров
 */
export class HeaderView {
  private basketButton: HTMLElement;
  private basketCounter: HTMLElement;

  constructor() {
    this.basketButton = document.querySelector('.header__basket') as HTMLElement;
    this.basketCounter = document.querySelector('.header__basket-counter') as HTMLElement;
  }

  /**
   * Устанавливает количество товаров в корзине
   * @param count - количество товаров
   */
  setBasketCount(count: number): void {
    if (this.basketCounter) {
      this.basketCounter.textContent = String(count);
    }
  }

  /**
   * Добавляет обработчик клика на кнопку корзины
   * @param handler - функция, вызываемая при клике на кнопку корзины
   */
  addBasketClickHandler(handler: () => void): void {
    if (this.basketButton) {
      this.basketButton.addEventListener('click', handler);
    }
  }

  /**
   * Показывает или скрывает счетчик товаров в корзине
   * @param show - true для показа, false для скрытия
   */
  toggleBasketCounter(show: boolean): void {
    if (this.basketCounter) {
      this.basketCounter.style.display = show ? 'block' : 'none';
    }
  }
} 