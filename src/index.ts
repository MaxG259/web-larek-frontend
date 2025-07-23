import './scss/styles.scss';
import { Api } from './components/base/api';
import { API_URL, CDN_URL } from './utils/constants';
import { ProductCardView } from './components/ProductCardView';
import { IProduct, IOrderFormSubmitData, IProductDetailViewRenderResult, IOrderFormViewRenderResult } from './types'; // Импорт новых типов
import { ProductDetailView } from './components/ProductDetailView';
import { BasketModel } from './models/BasketModel';
import { BasketView } from './components/BasketView';
import { OrderFormView } from './components/OrderFormView';

// Создаём API клиент
const api = new Api(API_URL);

const modal = document.querySelector('.modal') as HTMLElement;
const modalContent = modal.querySelector('.modal__content') as HTMLElement;
const modalClose = modal.querySelector('.modal__close') as HTMLElement;

const basketModel = new BasketModel();
const basketView = new BasketView();
const basketIcon = document.querySelector('.header__basket'); // селектор иконки корзины

type ScreenState = 'main' | 'modal-product' | 'modal-basket' | 'modal-order' | 'modal-success';

function setScreen(state: ScreenState, data?: any) {
  modal.classList.remove('modal_active');
  modalContent.innerHTML = '';

  switch (state) {
    case 'main':
      // Главная страница, ничего не делаем (если всё через JS)
      break;
    case 'modal-product': {
      const { product } = data;
      const inBasket = basketModel.has(product.id);
      const detailView = new ProductDetailView(product);
      // Уточнение типа возвращаемого значения
      const renderResult: IProductDetailViewRenderResult = detailView.render(inBasket);
      const { card, button } = renderResult;
      if (inBasket) {
        button.addEventListener('click', (event) => {
          event.stopPropagation();
          basketModel.remove(product.id);
          setScreen('modal-success', { message: 'Товар удалён из корзины' });
          setTimeout(() => { modal.classList.remove('modal_active'); }, 1000);
        });
      } else {
        button.addEventListener('click', (event) => {
          event.stopPropagation();
          basketModel.add(product);
          button.textContent = 'В корзине';
          button.disabled = true;
        });
      }
      modalContent.appendChild(card);
      modal.classList.add('modal_active');
      break;
    }
    case 'modal-basket': {
      const products = basketModel.getAll();
      // Тип onRemove теперь определяется через IRemoveFromBasketCallback (внутри BasketView)
      const basketElement = basketView.render(products, (id) => {
        basketModel.remove(id);
        setScreen('modal-basket');
      });
      // Находим кнопку оформления заказа
      const orderBtn = basketElement.querySelector('.basket__button');
      if (orderBtn) {
        orderBtn.addEventListener('click', () => {
          setScreen('modal-order');
        });
      }
      modalContent.innerHTML = '';
      modalContent.appendChild(basketElement);
      modal.classList.add('modal_active');
      break;
    }
    case 'modal-order': {
      const orderFormView = new OrderFormView();
      // Уточнение типа onSubmit и возвращаемого значения
      const formRenderResult: IOrderFormViewRenderResult = orderFormView.render((formData: IOrderFormSubmitData) => {
        // Считаем сумму заказа только по товарам с ценой
        const products = basketModel.getAll();
        const total = products.reduce((sum, p) => sum + (p.price || 0), 0);
        setScreen('modal-success', { message: 'Заказ оформлен', total });
        basketModel.clear();
      });
      // Используем wrapper из результата render
      modalContent.appendChild(formRenderResult.wrapper);
      modal.classList.add('modal_active');
      break;
    }
    case 'modal-success': {
      const message = data?.message || 'Заказ оформлен';
      const total = data?.total || 0;
      modalContent.innerHTML = `
    <div class="order-success">
      <h2 class="order-success__title">${message}</h2>
      <p class="order-success__description">Списано ${total} синапсов</p>
      <button class="button order-success__close">За новыми покупками!</button>
    </div>
  `;
      modal.classList.add('modal_active');
      const closeBtn = modalContent.querySelector('.order-success__close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          modal.classList.remove('modal_active');
          setScreen('main');
        });
      }
      break;
    }
  }
}

// Функция для отображения всех товаров
function displayProducts(products: IProduct[]): void {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;
  gallery.innerHTML = '';

  products.forEach((product: IProduct) => {
    const cardView = new ProductCardView(product);
    const cardElement = cardView.render();

    cardElement.addEventListener('click', () => {
      const inBasket = basketModel.has(product.id);
      const detailView = new ProductDetailView(product);
      // Уточнение типа возвращаемого значения
      const renderResult: IProductDetailViewRenderResult = detailView.render(inBasket);
      const { card, button } = renderResult;

      if (inBasket) {
        button.addEventListener('click', (event) => {
          event.stopPropagation();
          basketModel.remove(product.id);
          setScreen('modal-success', { message: 'Товар удалён из корзины' });
          setTimeout(() => { modal.classList.remove('modal_active'); }, 1000);
        });
      } else {
        button.addEventListener('click', (event) => {
          event.stopPropagation();
          basketModel.add(product);
          button.textContent = 'В корзине';
          button.disabled = true;
          // modal.classList.remove('modal_active'); // если закрывать модалку
        });
      }

      modalContent.innerHTML = '';
      modalContent.appendChild(card);
      modal.classList.add('modal_active');
    });

    gallery.appendChild(cardElement);
  });
}

// Функция для загрузки товаров
async function loadProducts(): Promise<void> {
  try {
    const response = await api.get('/product') as { items: IProduct[] };
    const products = response.items;
    displayProducts(products);
  } catch (error) {
    console.error('Ошибка загрузки товаров:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadProducts);

// Закрытие модалки по крестику
modalClose?.addEventListener('click', () => {
  modal.classList.remove('modal_active');
});

// Закрытие модалки по клику вне окна
modal?.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.remove('modal_active');
  }
});

// Закрытие модалки по ESC
// (навешиваем на document, чтобы работало всегда)
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('modal_active')) {
    modal.classList.remove('modal_active');
  }
});

basketIcon?.addEventListener('click', () => setScreen('modal-basket'));