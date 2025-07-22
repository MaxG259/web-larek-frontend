/*
 * Это View-компонент для формы оформления заказа.
 * Многошаговая: сначала адрес и оплата, потом email и телефон (если онлайн).
 * Валидация email и телефона, отображение ошибок.
 */
export class OrderFormView {
  render(onSubmit: (formData: { address: string; payment: string; email?: string; phone?: string }) => void): HTMLElement {
    // --- Шаг 1: способ оплаты и адрес ---
    const form = document.createElement('form');
    form.className = 'form';
    form.setAttribute('name', 'order');

    const order = document.createElement('div');
    order.className = 'order';
    form.appendChild(order);

    // Способ оплаты
    const paymentField = document.createElement('div');
    paymentField.className = 'order__field';
    order.appendChild(paymentField);

    const paymentTitle = document.createElement('h2');
    paymentTitle.className = 'modal__title';
    paymentTitle.textContent = 'Способ оплаты';
    paymentField.appendChild(paymentTitle);

    const paymentButtons = document.createElement('div');
    paymentButtons.className = 'order__buttons';
    paymentField.appendChild(paymentButtons);

    const payments = [
      { value: 'online', label: 'Онлайн' },
      { value: 'cash', label: 'При получении' }
    ];
    let selectedPayment = '';
    payments.forEach(opt => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'button button_alt';
      btn.textContent = opt.label;
      btn.addEventListener('click', () => {
        selectedPayment = opt.value;
        Array.from(paymentButtons.children).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        checkStep1Validity();
      });
      paymentButtons.appendChild(btn);
    });

    // Адрес
    const addressLabel = document.createElement('label');
    addressLabel.className = 'order__field';
    order.appendChild(addressLabel);

    const addressTitle = document.createElement('span');
    addressTitle.className = 'form__label modal__title';
    addressTitle.textContent = 'Адрес доставки';
    addressLabel.appendChild(addressTitle);

    const addressInput = document.createElement('input');
    addressInput.className = 'form__input';
    addressInput.type = 'text';
    addressInput.placeholder = 'Введите адрес';
    addressInput.required = true;
    addressLabel.appendChild(addressInput);

    // --- Кнопка далее и ошибки ---
    const actions1 = document.createElement('div');
    actions1.className = 'modal__actions';
    form.appendChild(actions1);

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'button order__button';
    nextBtn.textContent = 'Далее';
    nextBtn.disabled = true;
    actions1.appendChild(nextBtn);

    const errors1 = document.createElement('span');
    errors1.className = 'form__errors';
    actions1.appendChild(errors1);

    // --- Шаг 2: email и телефон ---
    const contactsForm = document.createElement('form');
    contactsForm.className = 'form';
    contactsForm.setAttribute('name', 'contacts');
    contactsForm.style.display = 'none';

    const contactsOrder = document.createElement('div');
    contactsOrder.className = 'order';
    contactsForm.appendChild(contactsOrder);

    // Email
    const emailLabel = document.createElement('label');
    emailLabel.className = 'order__field';
    contactsOrder.appendChild(emailLabel);

    const emailTitle = document.createElement('span');
    emailTitle.className = 'form__label modal__title';
    emailTitle.textContent = 'Email';
    emailLabel.appendChild(emailTitle);

    const emailInput = document.createElement('input');
    emailInput.className = 'form__input';
    emailInput.type = 'text';
    emailInput.placeholder = 'Введите Email';
    emailInput.required = true;
    emailLabel.appendChild(emailInput);

    // Телефон
    const phoneLabel = document.createElement('label');
    phoneLabel.className = 'order__field';
    contactsOrder.appendChild(phoneLabel);

    const phoneTitle = document.createElement('span');
    phoneTitle.className = 'form__label modal__title';
    phoneTitle.textContent = 'Телефон';
    phoneLabel.appendChild(phoneTitle);

    const phoneInput = document.createElement('input');
    phoneInput.className = 'form__input';
    phoneInput.type = 'text';
    phoneInput.placeholder = '+7 (';
    phoneInput.required = true;
    phoneLabel.appendChild(phoneInput);

    // --- Кнопка оплатить и ошибки ---
    const actions2 = document.createElement('div');
    actions2.className = 'modal__actions';
    contactsForm.appendChild(actions2);

    const payBtn = document.createElement('button');
    payBtn.type = 'submit';
    payBtn.className = 'button';
    payBtn.textContent = 'Оплатить';
    payBtn.disabled = true;
    actions2.appendChild(payBtn);

    const errors2 = document.createElement('span');
    errors2.className = 'form__errors';
    actions2.appendChild(errors2);

    // --- Валидация и переходы ---
    function checkStep1Validity() {
      nextBtn.disabled = !addressInput.value.trim() || !selectedPayment;
      errors1.textContent = '';
    }
    addressInput.addEventListener('input', checkStep1Validity);

    function validateEmail(value: string): boolean {
      return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
    }
    function validatePhone(value: string): boolean {
      return /^\+7\s?\d{3}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(value) || /^\+7\d{10}$/.test(value);
    }
    function checkStep2Validity() {
      let valid = true;
      errors2.textContent = '';
      if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
        errors2.textContent = 'Введите корректный email';
        valid = false;
      }
      if (!phoneInput.value.trim() || !validatePhone(phoneInput.value)) {
        errors2.textContent += (errors2.textContent ? ' ' : '') + 'Введите корректный телефон (+7...)';
        valid = false;
      }
      payBtn.disabled = !valid;
    }
    emailInput.addEventListener('input', checkStep2Validity);
    phoneInput.addEventListener('input', checkStep2Validity);

    nextBtn.addEventListener('click', () => {
      if (!addressInput.value.trim() || !selectedPayment) {
        errors1.textContent = 'Заполните адрес и выберите способ оплаты';
        return;
      }
      if (selectedPayment === 'online') {
        form.style.display = 'none';
        contactsForm.style.display = '';
      } else {
        onSubmit({
          address: addressInput.value,
          payment: selectedPayment
        });
      }
    });

    contactsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!emailInput.value.trim() || !validateEmail(emailInput.value) || !phoneInput.value.trim() || !validatePhone(phoneInput.value)) {
        checkStep2Validity();
        return;
      }
      onSubmit({
        address: addressInput.value,
        payment: selectedPayment,
        email: emailInput.value,
        phone: phoneInput.value
      });
    });

    // Обёртка для двух форм
    const wrapper = document.createElement('div');
    wrapper.appendChild(form);
    wrapper.appendChild(contactsForm);
    return wrapper;
  }
} 