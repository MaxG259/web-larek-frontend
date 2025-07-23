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

- **Model (Модель):** хранит и управляет данными (товары, корзина).
- **View (Представление):** отвечает за отображение данных пользователю (карточки товаров, формы, модальные окна).
- **Presenter (Презентер):** связывает модель и представление, обрабатывает действия пользователя и обновляет данные.

## Основные компоненты

### Модели (Model)

- **ProductModel** — хранит и управляет списком всех товаров (`IProduct[]`), предоставляет методы для получения списка товаров и поиска товара по `id`.
- **BasketModel** — хранит список товаров (`IProduct[]`), добавленных в корзину. Позволяет добавлять (`add`), удалять (`remove`), очищать (`clear`) корзину, проверять наличие товара (`has`) и получать все товары (`getAll`).

### Представления (View)

- **ProductCardView** — отображает карточку товара для каталога. Принимает `IProduct`, рендерит `HTMLElement` (кнопку).
- **ProductDetailView** — отображает подробную карточку товара в модальном окне. Принимает `IProduct`, рендерит `HTMLElement` и `HTMLButtonElement`.
- **BasketView** — отображает содержимое корзины. Принимает массив `IProduct[]` и колбэк `onRemove`, рендерит `HTMLElement`.
- **OrderFormView** — отображает двухшаговую форму заказа (адрес/оплата -> email/телефон). Принимает колбэк `onSubmit`, рендерит `HTMLElement`.
- **ModalView** — управляет открытием/закрытием модального окна и вставкой содержимого. Принимает `HTMLElement` или `string` для отображения.

### Презентер

- **`src/index.ts`** — основной файл приложения. Управляет состоянием (`'main'`, `'modal-product'`, `'modal-basket'`, `'modal-order'`, `'modal-success'`), создает экземпляры View-компонентов, обрабатывает события (клик по карточке, кнопки в модалках, отправка формы), взаимодействует с API для загрузки товаров и управляет `BasketModel`.

## Типы данных

- **IProduct** — товар (id, название, описание, изображение, категория, цена).
- **IBasket** — состояние корзины (массив товаров, методы управления).
- **IOrderFormSubmitData** — данные, передаваемые при сабмите формы заказа.
- **IOrderResult** — потенциальный формат ответа API при успешном заказе.
- **TScreenState** — возможные состояния экрана приложения.
- **ISuccessScreenData** — данные для экрана успешного оформления заказа.
- **IProductScreenData** — данные для экрана просмотра товара.
- **IBasketScreenData** — данные для экрана корзины.
- **IRemoveFromBasketCallback** — тип для колбэка удаления из корзины.
- **ISubmitOrderCallback** — тип для колбэка сабмита формы заказа.
- **IProductDetailViewRenderResult** — структура результата рендера `ProductDetailView`.
- **IBasketViewRenderResult** — структура результата рендера `BasketView`.
- **IOrderFormViewRenderResult** — структура результата рендера `OrderFormView`.

---
# Описание классов и интерфейсов

## ProductModel

**Конструктор:**
`constructor(products: IProduct[])`

**Поля:**
- `protected products: IProduct[]` — список всех товаров

**Методы:**
- `getAll(): IProduct[]` — получить все товары
- `getProductById(id: string): IProduct | undefined` — получить товар по id

---

## BasketModel

**Конструктор:**
`constructor()`

**Поля:**
- `protected items: IProduct[]` — массив товаров в корзине

**Методы:**
- `add(product: IProduct): void` — добавить товар в корзину
- `remove(productId: string): void` — удалить товар из корзины по id
- `clear(): void` — очистить корзину
- `getAll(): IProduct[]` — получить все товары в корзине
- `has(productId: string): boolean` — проверить, есть ли товар в корзине по id

---

## ProductCardView

**Конструктор:**
`constructor(product: IProduct)`

**Поля:**
- `protected product: IProduct` — товар для отображения

**Методы:**
- `render(): HTMLElement` — отрисовать карточку товара (возвращает кнопку)

---

## ProductDetailView

**Конструктор:**
`constructor(product: IProduct)`

**Поля:**
- `protected product: IProduct` — товар для отображения

**Методы:**
- `render(inBasket: boolean = false): IProductDetailViewRenderResult` — отрисовать подробную карточку товара, возвращает объект с элементом карточки и кнопкой

---

## BasketView

**Конструктор:**
`constructor()`

**Методы:**
- `render(products: IProduct[], onRemove: IRemoveFromBasketCallback): HTMLElement` — отрисовать содержимое корзины

---

## OrderFormView

**Конструктор:**
`constructor()`

**Методы:**
- `render(onSubmit: ISubmitOrderCallback): HTMLElement` — отрисовать форму заказа

---

## ModalView

**Конструктор:**
`constructor()`

**Поля:**
- `protected modalElement: HTMLElement` — корневой элемент модального окна
- `protected contentElement: HTMLElement` — элемент для вставки содержимого

**Методы:**
- `open(content: HTMLElement | string): void` — открыть модальное окно с содержимым
- `close(): void` — закрыть модальное окно