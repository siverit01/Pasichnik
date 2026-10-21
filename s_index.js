document.addEventListener("DOMContentLoaded", function() {
    // 1. Зчитуємо параметри ids з URL-адреси (якщо користувач повернувся з кошика)
    const urlParams = new URLSearchParams(window.location.search);
    const idsParam = urlParams.get('ids') || '';
    
    // Ініціалізуємо масив ID товарів значеннями з URL (або залишаємо порожнім)
    let selectedProducts = idsParam ? idsParam.split(',') : [];

    const cartBtn = document.getElementById('cart-btn');
    const cartCount = document.getElementById('cart-count');
    const productButtons = document.querySelectorAll('.toggle-cart-btn');

    // Функція для оновлення стану головної кнопки "КОШИК" та оновлення URL в браузері
    function updateCartState() {
        // Оновлюємо лічильник
        const count = selectedProducts.length;
        cartCount.textContent = count;
        
        // Активуємо/деактивуємо кнопку кошика
        if (count > 0) {
            cartBtn.removeAttribute('disabled');
            cartBtn.classList.add('active');
        } else {
            cartBtn.setAttribute('disabled', 'true');
            cartBtn.classList.remove('active');
        }

        // Динамічно оновлюємо URL-рядок браузера, щоб при перезавантаженні стан не губився
        if (selectedProducts.length > 0) {
            urlParams.set('ids', selectedProducts.join(','));
        } else {
            urlParams.delete('ids');
        }
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.replaceState({}, '', newUrl);
    }

    // 2. Функція для встановлення початкового стану кнопок при завантаженні сторінки
    function initButtonsState() {
        productButtons.forEach(button => {
            const productId = button.getAttribute('data-id');
            
            // Якщо цей товар прийшов з URL, робимо кнопку активною
            if (selectedProducts.includes(productId)) {
                button.textContent = 'ПРИБРАТИ З КОШИКА';
                button.classList.add('in-cart');
            } else {
                button.textContent = 'ДОДАТИ В КОШИК';
                button.classList.remove('in-cart');
            }
        });
    }

    // Обробник кліків для кнопок товарів
    productButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            
            if (!selectedProducts.includes(productId)) {
                // Якщо товару немає в кошику — додаємо
                selectedProducts.push(productId);
                this.textContent = 'ПРИБРАТИ З КОШИКА';
                this.classList.add('in-cart');
            } else {
                // Якщо товар уже в кошику — видаляємо
                selectedProducts = selectedProducts.filter(id => id !== productId);
                this.textContent = 'ДОДАТИ В КОШИК';
                this.classList.remove('in-cart');
            }
            
            // Перераховуємо кошик та оновлюємо URL
            updateCartState();
        });
    });

    // Обробник кліку на саму кнопку "КОШИК"
    cartBtn.addEventListener('click', function() {
        if (selectedProducts.length > 0) {
            const queryParams = selectedProducts.join(',');
            // Перенаправляємо на сторінку кошика (вказано i_koshik.html, змініть за потреби)
            window.location.href = `i_koshik.html?ids=${queryParams}`;
        }
    });

    // Запускаємо початкове налаштування кнопок та лічильника
    initButtonsState();
    updateCartState();
});