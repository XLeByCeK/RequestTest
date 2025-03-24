document.addEventListener('DOMContentLoaded', () => {
    // Banner functionality
    const bannerSlides = document.querySelectorAll('.banner-slide');
    let currentSlide = 0;

    function showSlide(index) {
        bannerSlides.forEach(slide => slide.classList.remove('active'));
        bannerSlides[index].classList.add('active');
    }

    bannerSlides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Categories functionality
    const categories = document.querySelectorAll('.category');
    
    categories.forEach(category => {
        const items = category.querySelector('.category-items');
        const loadMoreBtn = category.querySelector('.load-more');
        const arrow = category.querySelector('.category-arrow');

        // Show/hide load more button based on content height
        if (items.scrollHeight > items.clientHeight) {
            loadMoreBtn.style.display = 'block';
        }

        loadMoreBtn.addEventListener('click', () => {
            items.style.maxHeight = items.scrollHeight + 'px';
            loadMoreBtn.style.display = 'none';
        });

        if (arrow) {
            arrow.addEventListener('click', () => {
                arrow.classList.toggle('active');
                items.classList.toggle('expanded');
            });
        }
    });

    // Cart functionality
    const buyButtons = document.querySelectorAll('.buy-btn');
    const cartBtn = document.querySelector('.cart-btn');

    buyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            cartBtn.classList.add('cart-animation');
            setTimeout(() => {
                cartBtn.classList.remove('cart-animation');
            }, 500);
        });
    });

    // Favorites functionality
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            if (document.body.classList.contains('favorites-page')) {
                btn.closest('.product-item').style.display = 'none';
            }
        });
    });

    // Form validation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const requiredInputs = form.querySelectorAll('[required]');
            let isValid = true;

            if (emailInput) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    emailInput.classList.add('error');
                    isValid = false;
                } else {
                    emailInput.classList.remove('error');
                }
            }

            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
            });

            if (isValid) {
                // Form submission logic here
                console.log('Form submitted successfully');
            }
        });
    });

    // Yandex Maps initialization
    ymaps.ready(() => {
        const myMap = new ymaps.Map('map', {
            center: [55.754724, 37.621365],
            zoom: 16
        });

        const myPlacemark = new ymaps.Placemark([55.754724, 37.621365], {
            hintContent: 'Elfen Lied',
            balloonContent: 'Хохловский переулок д. 11, стр. 3'
        });

        myMap.geoObjects.add(myPlacemark);
    });

    // Modal functionality
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.dataset.modal;
            const modal = document.querySelector(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}); 