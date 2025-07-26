import './scss/styles.scss';
import { Api } from './components/base/api';
import { API_URL, CDN_URL } from './utils/constants';
import { ProductCardView } from './components/ProductCardView';
import { IProduct, IOrderFormSubmitData } from './types';
import { ProductDetailView } from './components/ProductDetailView';
import { BasketModel } from './models/BasketModel';
import { OrderModel } from './models/OrderModel';
import { BasketView } from './components/BasketView';
import { OrderFormView } from './components/OrderFormView';
import { ContactsFormView } from './components/ContactsFormView';
import { PageView } from './components/PageView';
import { ModalView } from './components/ModalView';
import { HeaderView } from './components/HeaderView';
import { BasketItemView } from './components/BasketItemView';
import { ProductModel } from './models/ProductModel';

// Создаём API клиент
const api = new Api(API_URL);

// Инициализируем модели и представления
const basketModel = new BasketModel();
const orderModel = new OrderModel(api);
const productModel = new ProductModel();
const basketView = new BasketView();
const pageView = new PageView();
const modalView = new ModalView();
const headerView = new HeaderView();

// Добавляем типы для глобальных событий
declare global {
  interface Window {
    contactsFormEvents?: (event: string, data: any) => void;
  }
}

type ScreenState = 'main' | 'modal-product' | 'modal-basket' | 'modal-order' | 'modal-contacts' | 'modal-success';

function setScreen(state: ScreenState, data?: any) {
  modalView.close();
  modalView.clearContent();

  switch (state) {
    case 'main':
      // Главная страница, ничего не делаем (если всё через JS)
      break;
    case 'modal-product': {
      const { product } = data;
      const inBasket = basketModel.has(product.id);
      const detailView = new ProductDetailView(product);
      const card = detailView.render(inBasket);
      
      // Находим кнопку внутри карточки
      const button = card.querySelector('.card__button') as HTMLButtonElement;

      if (inBasket) {
        button.addEventListener('click', (event: Event) => {
          event.stopPropagation();
          basketModel.remove(product.id);
          updateBasketCount(); // Обновляем счетчик
          setScreen('modal-success', { message: 'Товар удалён из корзины' });
          setTimeout(() => { modalView.close(); }, 1000);
        });
      } else {
        button.addEventListener('click', (event: Event) => {
          event.stopPropagation();
          basketModel.add(product);
          updateBasketCount(); // Обновляем счетчик
          button.textContent = 'В корзине';
          button.disabled = true;
          // modalView.close(); // если закрывать модалку
        });
      }
      modalView.setContent(card);
      modalView.open();
      break;
    }
    case 'modal-basket': {
      const products = basketModel.getAll();
      const total = basketModel.getTotal();
      
      // Создаем элементы товаров в презентере
      const basketItemView = new BasketItemView();
      const basketItems = products.map((product, idx) => {
        return basketItemView.render(product, idx, (id) => {
          basketModel.remove(id);
          updateBasketCount(); // Обновляем счетчик
          setScreen('modal-basket');
        });
      });
      
      // Передаем готовые HTML элементы в BasketView
      const basketElement = basketView.render(products, total, basketItems, (id) => {
        basketModel.remove(id);
        updateBasketCount(); // Обновляем счетчик
        setScreen('modal-basket');
      });
      
      // Находим кнопку оформления заказа
      const orderBtn = basketElement.querySelector('.basket__button');
      if (orderBtn) {
        orderBtn.addEventListener('click', () => {
          setScreen('modal-order');
        });
      }
      modalView.setContent(basketElement);
      modalView.open();
      break;
    }
    case 'modal-order': {
      const orderFormView = new OrderFormView();
      const orderForm = orderFormView.render((formData: IOrderFormSubmitData) => {
        // Сохраняем данные заказа в модель
        orderModel.setAddress(formData.address);
        orderModel.setPayment(formData.payment);
        // Переходим к следующему шагу через setScreen
        setScreen('modal-contacts');
      });
      modalView.setContent(orderForm);
      modalView.open();
      break;
    }
    case 'modal-contacts': {
      const contactsFormView = new ContactsFormView();
      const contactsForm = contactsFormView.render((contactsData) => {
        // Сохраняем контакты в модель
        orderModel.setContacts(contactsData.email, contactsData.phone);
        // Получаем тотал из корзины
        const total = basketModel.getTotal();
        // Очищаем корзину и заказ
        basketModel.clear();
        orderModel.clear();
        updateBasketCount();
        setScreen('modal-success', { message: 'Заказ оформлен', total });
      });

      // Настраиваем обработчики событий от формы контактов
      window.contactsFormEvents = (event: string, data: any) => {
        switch (event) {
          case 'emailChanged':
            const emailValid = orderModel.setEmail(data);
            const emailValidation = orderModel.validateContacts();
            contactsFormView.setButtonState(emailValidation.isValid);
            if (emailValidation.errors.length > 0) {
              contactsFormView.setErrors(emailValidation.errors);
            } else {
              contactsFormView.clearErrors();
            }
            break;
          
          case 'phoneChanged':
            const phoneValid = orderModel.setPhone(data);
            const phoneValidation = orderModel.validateContacts();
            contactsFormView.setButtonState(phoneValidation.isValid);
            if (phoneValidation.errors.length > 0) {
              contactsFormView.setErrors(phoneValidation.errors);
            } else {
              contactsFormView.clearErrors();
            }
            break;
        }
      };

      modalView.setContent(contactsForm);
      modalView.open();
      break;
    }
    case 'modal-success': {
      const message = data?.message || 'Заказ оформлен';
      const total = data?.total || 0;
      
      const template = document.getElementById('success') as HTMLTemplateElement;
      const successElement = template.content.cloneNode(true) as HTMLElement;
      
      const title = successElement.querySelector('.order-success__title') as HTMLHeadingElement;
      const description = successElement.querySelector('.order-success__description') as HTMLParagraphElement;
      const closeBtn = successElement.querySelector('.order-success__close') as HTMLButtonElement;
      
      title.textContent = message;
      description.textContent = `Списано ${total} синапсов`;
      
      closeBtn.addEventListener('click', () => {
        modalView.close();
        setScreen('main');
      });
      
      modalView.setContent(successElement);
      modalView.open();
      break;
    }
  }
}

/**
 * Обновить счетчик товаров в корзине
 */
function updateBasketCount(): void {
  const count = basketModel.getAll().length;
  headerView.setBasketCount(count);
  headerView.toggleBasketCounter(count > 0);
}

// Функция для отображения всех товаров
function displayProducts(products: IProduct[]): void {
  // Сохраняем товары в модель
  productModel.setProducts(products);
  
  // Создаем карточки товаров в презентере
  const productCardView = new ProductCardView();
  const cardElements = products.map(product => {
    return productCardView.render(product);
  });
  
  // Передаем готовые HTML элементы в PageView
  pageView.render(products, cardElements);
  
  // Добавляем обработчик клика на карточки
  pageView.addCardClickHandler((productId: string) => {
    // Ищем товар в модели
    const product = productModel.getProductById(productId);
    if (product) {
      setScreen('modal-product', { product });
    }
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

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  
  // Настраиваем обработчик клика на кнопку корзины
  headerView.addBasketClickHandler(() => {
    setScreen('modal-basket');
  });
  
  // Инициализируем счетчик корзины
  updateBasketCount();
});