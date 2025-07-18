# Web-ларёк

Интернет-магазин для веб-разработчиков. Здесь можно посмотреть каталог товаров, добавить товары в корзину и оформить заказ.

## Используемый стек

- TypeScript — основной язык программирования
- SCSS — стилизация интерфейса
- Webpack — сборка проекта
- HTML — разметка страниц

## Инструкция по запуску

1. Склонируйте репозиторий и перейдите в папку проекта.
2. Установите зависимости:
   ```
   npm install
   ```
3. Запустите проект:
   ```
   npm start
   ```

## Архитектура приложения

Архитектура построена по паттерну MVP (Model-View-Presenter):

- **Model (Модель):** хранит и управляет данными (товары, корзина, заказы).
- **View (Представление):** отвечает за отображение данных пользователю (карточки товаров, формы, модальные окна).
- **Presenter (Презентер):** связывает модель и представление, обрабатывает действия пользователя и обновляет данные.
- **EventEmitter (Брокер событий):** позволяет частям приложения общаться друг с другом через события.

## Базовые классы

- **EventEmitter** — управляет событиями между компонентами (подписка, отписка, вызов событий).
- **Api** — отправляет запросы к серверу, получает данные о товарах и заказах.
- **Component** — базовый класс для всех UI-компонентов (работа с DOM, показ/скрытие, обновление данных).
- **ViewComponent** — расширяет Component, добавляет работу с событиями.

## Основные компоненты

- **PageView** — отображает список товаров на главной странице (каталоге).
- **BasketView** — показывает список выбранных товаров и сумму заказа.
- **Modal** — модальное окно для подробной информации о товаре или оформления заказа.
- **OrderFormView** — форма для ввода данных заказа (адрес и способ оплаты).
- **ContactsFormView** — форма для ввода контактных данных (email и телефон).
- **OrderSuccessView** — компонент для отображения успешного оформления заказа.
- **Page** — управляет отображением всех компонентов на странице.

> Каждый класс-View отвечает только за один шаблон/разметку. Для форм используются отдельные представления: OrderFormView и ContactsFormView. Можно реализовать базовый класс FormView для общих методов.

## Модели (Model)

- **ProductModel** — хранит и управляет списком товаров, предоставляет методы для поиска товара по id.
- **BasketModel** — хранит id товаров в корзине, позволяет добавлять, удалять и очищать корзину.
- **OrderModel** — хранит данные текущего заказа (товары, адрес, способ оплаты), предоставляет методы для изменения этих данных и расчёта итоговой суммы.
- **UserModel** — хранит контактные данные пользователя (email, телефон), позволяет их изменять.

## Типы данных

- **Product** — товар (id, название, цена, описание, изображение)
- **Order** — заказ (товары, способ оплаты, адрес)
- **User** — пользователь (email, телефон)

---

# Описание классов и интерфейсов

## Card
**Конструктор:**
`constructor(container: HTMLElement, actions?: ICardActions)`

**Поля:**
- `id: string` — идентификатор карточки
- `title: string` — заголовок
- `price: number | null` — цена
- `category: string` — категория
- `image: string` — изображение
- `description: string` — описание
- `button: string` — текст кнопки

**Методы:**
- `render(): void` — отрисовать карточку
- `setTitle(title: string): void` — установить заголовок
- `setPrice(price: number | null): void` — установить цену
- `setCategory(category: string): void` — установить категорию
- `setImage(image: string): void` — установить изображение
- `setDescription(description: string): void` — установить описание
- `setButton(text: string): void` — установить текст кнопки

---

## PageView
**Конструктор:**
`constructor(container: HTMLElement)`

**Методы:**
- `render(items: IProductItemView[]): void` — отрисовать список товаров на главной странице

---

## ProductItemView
**Поля:**
- `id: string` — id товара

**Методы:**
- `render(): void` — отрисовать карточку товара

---

## BasketView
**Конструктор:**
`constructor(container: HTMLElement)`

**Методы:**
- `render(items: IBasketItemView[]): void` — отрисовать список товаров в корзине
- `toggleButton(enabled: boolean): void` — включить/выключить кнопку оформления заказа
- `setTotal(total: number): void` — задать общую сумму заказа

---

## BasketItemView
**Поля:**
- `id: string` — id товара

**Методы:**
- `render(): void` — отрисовать товар в корзине

---

## OrderFormView
**Конструктор:**
`constructor(container: HTMLFormElement, events: IEvents)`

**Поля:**
- `address: string` — адрес доставки
- `payment: string` — способ оплаты

**Методы:**
- `showErrors(errors: string[]): void` — показать ошибки валидации
- `render(): void` — отрисовать форму заказа

---

## ContactsFormView
**Конструктор:**
`constructor(container: HTMLFormElement, events: IEvents)`

**Поля:**
- `email: string` — email пользователя
- `phone: string` — телефон пользователя

**Методы:**
- `showErrors(errors: string[]): void` — показать ошибки валидации
- `render(): void` — отрисовать форму контактов

---

## OrderSuccessView
**Конструктор:**
`constructor(container: HTMLElement, total: number, onClose: () => void)`

**Поля:**
- `_close: HTMLElement` — кнопка закрытия
- `_total: HTMLElement` — текст с информацией о списанной сумме

**Методы:**
- `setTotal(total: number): void` — задать сумму списанных синапсов
- `close(): void` — закрыть сообщение об успехе
- `render(): void` — отрисовать сообщение об успехе

---

## ProductModel
**Конструктор:**
`constructor(products: ApiProduct[])`

**Поля:**
- `products: ApiProduct[]` — список всех товаров

**Методы:**
- `getProductById(id: string): ApiProduct | undefined` — получить товар по id

---

## BasketModel
**Конструктор:**
`constructor(items: string[])`

**Поля:**
- `items: string[]` — массив id товаров в корзине

**Методы:**
- `add(id: string): void` — добавить товар в корзину
- `remove(id: string): void` — удалить товар из корзины
- `clear(): void` — очистить корзину

---

## OrderModel
**Конструктор:**
`constructor(order: ApiOrder)`

**Поля:**
- `order: ApiOrder` — данные заказа

**Методы:**
- `setAddress(address: string): void` — установить адрес
- `setPayment(payment: string): void` — установить способ оплаты
- `getTotal(products: ApiProduct[]): number` — получить итоговую сумму

---

## UserModel
**Конструктор:**
`constructor(contacts: IUserContacts)`

**Поля:**
- `email: string` — email пользователя
- `phone: string` — телефон пользователя

**Методы:**
- `setEmail(email: string): void` — установить email
- `setPhone(phone: string): void` — установить телефон

---

## ICardProduct (интерфейс для товара)
```
export interface ICardProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
```