document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    document.querySelector('.close-menu').addEventListener('click', closeMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Mobile Menu Accordion
    const accordions = document.querySelectorAll('.accordion button');
    
    accordions.forEach(accordion => {
        accordion.addEventListener('click', function() {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });
    });
    
    // Search Toggle
    const searchBtn = document.querySelector('.search-btn');
    const searchBox = document.querySelector('.search-box');
    
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        searchBox.classList.toggle('active');
    });
    
    // Hero Slider
    new Glide('.glide', {
        type: 'carousel',
        autoplay: 5000,
        animationDuration: 800,
        gap: 0
    }).mount();
    
    // Product Quantity Selectors
    document.querySelectorAll('.qty-plus').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentNode.querySelector('.qty-input');
            input.value = parseInt(input.value) + 1;
        });
    });
    
    document.querySelectorAll('.qty-minus').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentNode.querySelector('.qty-input');
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });
    });
    
    // Quick View Modal
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const quickViewModal = document.querySelector('.quick-view-modal');
    const closeModal = document.querySelector('.close-modal');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            loadProductData(productId);
            quickViewModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', function() {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    quickViewModal.addEventListener('click', function(e) {
        if (e.target === quickViewModal) {
            quickViewModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    function loadProductData(productId) {
        // In a real implementation, this would fetch product data from an API
        // For demo purposes, we'll use mock data
        const products = {
            '1': {
                name: 'Premium Almonds',
                price: '1100',
                oldPrice: '1300',
                description: 'Our premium California almonds are carefully selected for their size, texture and taste. Rich in nutrients and antioxidants, these almonds are perfect for snacking or adding to your recipes.',
                image: 'images/product-almonds-large.jpg'
            },
            '2': {
                name: 'Kaju Katli',
                price: '1440',
                description: 'Traditional Indian sweet made with cashews and sugar. Our Kaju Katli is prepared with pure ingredients and has a rich, melt-in-your-mouth texture.',
                image: 'images/product-kaju-katli-large.jpg'
            }
        };
        
        const product = products[productId] || products['1'];
        const modalContent = `
            <div class="modal-content">
                <button class="close-modal"><i class="fas fa-times"></i></button>
                <div class="modal-body">
                    <div class="modal-product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="modal-product-details">
                        <h2 class="modal-product-title">${product.name}</h2>
                        <div class="modal-product-price">
                            ₹${product.price} <span class="unit">/ kg</span>
                            ${product.oldPrice ? `<span class="old-price">₹${product.oldPrice}</span>` : ''}
                        </div>
                        <p class="modal-product-description">${product.description}</p>
                        <div class="modal-product-actions">
                            <div class="modal-quantity quantity-selector">
                                <button class="qty-minus"><i class="fas fa-minus"></i></button>
                                <input type="number" value="1" min="1" class="qty-input">
                                <button class="qty-plus"><i class="fas fa-plus"></i></button>
                            </div>
                            <button class="modal-add-to-cart add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        quickViewModal.innerHTML = modalContent;
        
        // Re-attach event listeners to new elements
        quickViewModal.querySelector('.close-modal').addEventListener('click', function() {
            quickViewModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        quickViewModal.querySelector('.qty-plus').addEventListener('click', function() {
            const input = this.parentNode.querySelector('.qty-input');
            input.value = parseInt(input.value) + 1;
        });
        
        quickViewModal.querySelector('.qty-minus').addEventListener('click', function() {
            const input = this.parentNode.querySelector('.qty-input');
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });
    }
    
    // Add to Cart Functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3 a').textContent;
            const quantity = productCard.querySelector('.qty-input').value;
            
            // In a real implementation, this would add the product to cart via AJAX
            alert(`${quantity} ${productName} added to cart!`);
            
            // Update cart count
            const cartCount = document.querySelector('.cart-btn .count');
            cartCount.textContent = parseInt(cartCount.textContent) + parseInt(quantity);
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to Top Button
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});