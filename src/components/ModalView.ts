/* Это View-компонент */
/* Его задача отображать модальное окно и вставлять в него любое содержимое */
/* Он не знает, что именно показывать — только как это показывать */
/* Отвечает за “как показывать” */

/* Класс для отображения модального окна */
export class ModalView {
  protected modalElement: HTMLElement; // Корневой элемент модального окна
  protected contentElement: HTMLElement; // Элемент для вставки содержимого

  /* Конструктор создаёт DOM-структуру модального окна */
  constructor() {
    // создаю корневой элемент модального окна
    this.modalElement = document.createElement('div');
    this.modalElement.className = 'modal';

    // создаю элемент для содержимого модального окна
    this.contentElement = document.createElement('div');
    this.contentElement.className = 'modal__content';

    // создаю кнопку закрытия модального окна
    const closeButton = document.createElement('button');
    closeButton.className = 'modal__close';
    closeButton.textContent = '×';

    // Добавляю обработчик клика для закрытия модального окна
    closeButton.addEventListener('click', () => this.close());

    // Собираю структуру модального окна
    this.modalElement.appendChild(this.contentElement);
    this.modalElement.appendChild(closeButton);

    // Закрытие по клику вне окна (уже есть)
    this.modalElement.addEventListener('click', (event) => {
      if (event.target === this.modalElement) {
        this.close();
      }
    });

    // Закрытие по ESC
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.modalElement.classList.contains('modal_active')) {
        this.close();
      }
    });
  }

  /**
   * Открывает модальное окно и вставляет содержимое
   * @param content - HTML-элемент или строка для отображения */
  open(content: HTMLElement | string): void {
    // Очищаю предыдущее содержимое
    this.contentElement.innerHTML = '';

    // Вставляю новое содержимое
    if (typeof content === 'string') {
      this.contentElement.innerHTML = content;
    } else {
      this.contentElement.appendChild(content);
    }

    // Добавляю модалку в body, если её ещё нет
    if (!document.body.contains(this.modalElement)) {
      document.body.appendChild(this.modalElement);
    }

    // Делаю модалку видимой
    this.modalElement.classList.add('modal_active');
  }

  /**
   * Закрывает модальное окно
   */
  close(): void {
    this.modalElement.classList.remove('modal_active');
  }
}