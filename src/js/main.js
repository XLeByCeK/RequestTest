document.addEventListener('DOMContentLoaded', () => {
    // Get all elements needed for the slider functionality
    const mainProduct = document.querySelector('.product-main');
    const sideProducts = document.querySelectorAll('.side-product');
    const productShowcase = document.querySelector('.product-showcase');
    
    // Add pointer events to side products
    sideProducts.forEach(product => {
        product.style.pointerEvents = 'auto';
        product.style.cursor = 'pointer';
    });

    // Add active class to main product by default
    mainProduct.classList.add('active');
    // Set initial opacity
    mainProduct.style.opacity = '1';
    mainProduct.style.transform = 'translateX(0) scale(1)';
    
    // Create the compact version of the main product
    const compactMainProduct = createCompactProduct(
        '01', 
        'images/lamp-main.png', 
        'First product', 
        'rgba(153, 102, 204, 0.8)'
    );
    productShowcase.appendChild(compactMainProduct);
    compactMainProduct.style.display = 'none';
    
    // Create compact version of the second product (pink)
    const compactSecondProduct = createCompactProduct(
        '02', 
        'images/chair-pink.png', 
        'Pink chair', 
        'rgba(255, 105, 180, 0.8)'
    );
    productShowcase.appendChild(compactSecondProduct);
    compactSecondProduct.style.display = 'none';
    
    // Function to create a compact product element
    function createCompactProduct(number, imageSrc, altText, bgColor) {
        const compactProduct = document.createElement('div');
        compactProduct.className = 'side-product compact-product';
        compactProduct.style.backgroundColor = bgColor;
        compactProduct.style.pointerEvents = 'auto';
        compactProduct.style.cursor = 'pointer';
        
        const imageContainer = document.createElement('div');
        imageContainer.className = 'side-product-image';
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = altText;
        
        const footer = document.createElement('div');
        footer.className = 'side-product-footer';
        
        const label = document.createElement('div');
        label.className = 'side-product-label';
        label.textContent = 'СЛАЙД';
        
        const numberDiv = document.createElement('div');
        numberDiv.className = 'side-product-number';
        numberDiv.textContent = number;
        
        imageContainer.appendChild(img);
        footer.appendChild(label);
        footer.appendChild(numberDiv);
        
        compactProduct.appendChild(imageContainer);
        compactProduct.appendChild(footer);
        
        return compactProduct;
    }
    
    // Clone the main product for the alternative views
    const product2Content = {
        name: 'COMFORTABLE CHAIR',
        description: 'Стильное и удобное кресло<br>для комфортного отдыха<br>в Вашем интерьере',
        price: '85 000',
        image: 'images/chair-pink.png',
        bgText: 'PINK COMFORT'
    };
    
    const product3Content = {
        name: 'MODERN LAMP',
        description: 'Современная настольная лампа<br>с регулировкой яркости<br>и цветовой температуры',
        price: '62 000',
        image: 'images/lamp-blue.png',
        bgText: 'BLUE STYLE'
    };
    
    // Create expanded version of other products
    const expandedProduct2 = createExpandedProduct(product2Content, 'pink');
    const expandedProduct3 = createExpandedProduct(product3Content, 'blue');
    
    productShowcase.appendChild(expandedProduct2);
    productShowcase.appendChild(expandedProduct3);
    
    expandedProduct2.style.display = 'none';
    expandedProduct3.style.display = 'none';
    
    // Position side products properly
    positionSideProducts();
    
    // Function to create expanded product element
    function createExpandedProduct(content, colorClass) {
        const expandedProduct = document.createElement('div');
        expandedProduct.className = `expanded-product ${colorClass}`;
        
        expandedProduct.innerHTML = `
            <div class="product-tag">ТОВАР ДНЯ</div>
            
            <div class="product-info">
                <h1 class="product-name">${content.name}</h1>
               
                <p class="product-description">
                    ${content.description}
                </p>
                <div class="product-separator"></div>
                <div class="product-price">${content.price}<span class="price-currency">₽</span></div>
            </div>
            
            <div class="product-image">
                <img src="${content.image}" alt="${content.name}">
            </div>
            
            <div class="buy-button-container">
                <button class="buy-button">
                    <i class="fas fa-shopping-cart"></i>
                    Купить
                </button>
            </div>
            
            <div class="background-text">${content.bgText}</div>
        `;
        
        return expandedProduct;
    }
    
    // Makes sure side products are positioned correctly
    function positionSideProducts() {
        sideProducts[0].style.right = '245px';
        sideProducts[1].style.right = '10px';
    }
    
    // Slide selection and animations
    const mainProductIndex = 0;
    const pinkProductIndex = 1;
    const blueProductIndex = 2;
    
    // Keep track of the currently active slide
    let activeSlideIndex = 0;
    
    // Add click event listeners to side products
    sideProducts.forEach((product, index) => {
        product.dataset.index = index + 1;
        product.addEventListener('click', () => {
            if (index + 1 !== activeSlideIndex) {
                switchToSlide(index + 1);
            }
        });
    });
    
    // Add click event to compact products
    compactMainProduct.addEventListener('click', () => {
        switchToSlide(0);
    });
    
    compactSecondProduct.addEventListener('click', () => {
        switchToSlide(1);
    });
    
    // Function to prepare slides for transition
    function prepareSlideTransition() {
        // Reset all active classes
        mainProduct.classList.remove('active');
        expandedProduct2.classList.remove('active');
        expandedProduct3.classList.remove('active');
        
        // Reset opacity and transform for animations - prepare for entrance
        mainProduct.style.opacity = '0';
        mainProduct.style.transform = 'translateX(-30px) scale(0.95)';
        expandedProduct2.style.opacity = '0';
        expandedProduct2.style.transform = 'translateX(-30px) scale(0.95)';
        expandedProduct3.style.opacity = '0';
        expandedProduct3.style.transform = 'translateX(-30px) scale(0.95)';
    }
    
    // Function to switch between slides
    function switchToSlide(newIndex) {
        // Don't do anything if it's the same slide
        if (newIndex === activeSlideIndex) return;
        
        const previousIndex = activeSlideIndex;
        activeSlideIndex = newIndex;
        
        // Prepare for slide transition
        prepareSlideTransition();
        
        // Reset all products visibility with a small delay to allow transitions
        setTimeout(() => {
            mainProduct.style.display = 'none';
            expandedProduct2.style.display = 'none';
            expandedProduct3.style.display = 'none';
            compactMainProduct.style.display = 'none';
            compactSecondProduct.style.display = 'none';
            
            // Transition to the new slide
            if (newIndex === 0) {
                // Switch to main product (first slide)
                // Show both side products in normal positions
                sideProducts[0].style.display = 'flex';
                sideProducts[1].style.display = 'flex';
                positionSideProducts();
                
                // Show and animate main product
                mainProduct.style.display = 'flex';
                mainProduct.style.left = '0';
                mainProduct.style.width = 'calc(100% - 440px)';
                mainProduct.classList.add('active');
                
                setTimeout(() => {
                    mainProduct.style.opacity = '1';
                    mainProduct.style.transform = 'translateX(0) scale(1)';
                }, 50);
            } else if (newIndex === 1) {
                // Switch to the pink product (second slide) - in the middle
                // Hide the pink side product (it becomes the main slide)
                sideProducts[0].style.display = 'none';
                
                // Position the blue slide correctly
                sideProducts[1].style.display = 'flex';
                sideProducts[1].style.right = '10px';
                
                // Show compact version of the first product
                compactMainProduct.style.display = 'flex';
                compactMainProduct.style.left = '5px';
                
                // Show and animate expanded pink product in the middle
                expandedProduct2.style.display = 'flex';
                expandedProduct2.style.left = '235px';  // Positioned after the compact main product
                expandedProduct2.style.width = 'calc(100% - 485px)';
                expandedProduct2.classList.add('active');
                
                setTimeout(() => {
                    expandedProduct2.style.opacity = '1';
                    expandedProduct2.style.transform = 'translateX(0) scale(1)';
                }, 50);
            } else if (newIndex === 2) {
                // Switch to the blue product (third slide)
                // Hide both original side products
                sideProducts[0].style.display = 'none';
                sideProducts[1].style.display = 'none';
                
                // Show compact versions of first and second products
                compactMainProduct.style.display = 'flex';
                compactMainProduct.style.left = '5px';
                
                compactSecondProduct.style.display = 'flex';
                compactSecondProduct.style.left = '235px';
                
                // Show and animate expanded blue product (positioned to the right)
                expandedProduct3.style.display = 'flex';
                expandedProduct3.style.left = '465px';
                expandedProduct3.style.width = 'calc(100% - 485px)';
                expandedProduct3.classList.add('active');
                
                setTimeout(() => {
                    expandedProduct3.style.opacity = '1';
                    expandedProduct3.style.transform = 'translateX(0) scale(1)';
                }, 50);
            }
        }, 100); // Small delay for smoother transitions
    }
});
