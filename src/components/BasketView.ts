/*
 * Это View-компонент для отображения корзины.
 * Показывает список товаров в корзине, итоговую сумму, кнопку оформления заказа и кнопки удаления товаров.
 * Не хранит данные, только отображает.
 */
import { IProduct } from '../types';

export class BasketView {
  render(products: IProduct[], onRemove: (id: string) => void): HTMLElement {
    const basket = document.createElement('div');
    basket.className = 'basket';

    // Заголовок
    const title = document.createElement('h2');
    title.className = 'modal__title';
    title.textContent = 'Корзина';
    basket.appendChild(title);

    // Список товаров
    const list = document.createElement('ul');
    list.className = 'basket__list';
    let total = 0;
    products.forEach((product, idx) => {
      const item = document.createElement('li');
      item.className = 'basket__item card card_compact';

      // Индекс
      const index = document.createElement('span');
      index.className = 'basket__item-index';
      index.textContent = String(idx + 1);
      item.appendChild(index);

      // Название
      const title = document.createElement('span');
      title.className = 'card__title';
      title.textContent = product.title;
      item.appendChild(title);

      // Цена
      const price = document.createElement('span');
      price.className = 'card__price';
      price.textContent = product.price !== null ? `${product.price} синапсов` : 'Нет в наличии';
      item.appendChild(price);
      if (product.price) total += product.price;

      // Кнопка удалить
      const removeBtn = document.createElement('button');
      removeBtn.className = 'basket__item-delete card__button';
      removeBtn.setAttribute('aria-label', 'удалить');
      removeBtn.addEventListener('click', () => onRemove(product.id));
      item.appendChild(removeBtn);

      list.appendChild(item);
    });
    basket.appendChild(list);

    // Итоговая сумма и кнопка оформить
    const actions = document.createElement('div');
    actions.className = 'modal__actions';

    const orderBtn = document.createElement('button');
    orderBtn.className = 'button basket__button';
    orderBtn.textContent = 'Оформить';
    orderBtn.disabled = products.length === 0 || total === 0;
    actions.appendChild(orderBtn);

    const sum = document.createElement('span');
    sum.className = 'basket__price';
    sum.textContent = `${total} синапсов`;
    actions.appendChild(sum);

    basket.appendChild(actions);

    return basket;
  }
} 