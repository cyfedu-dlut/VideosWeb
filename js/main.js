// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 轮播图功能
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        
        if (index < 0) {
            currentSlide = slides.length - 1;
        } else if (index >= slides.length) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        slides[currentSlide].classList.add('active');
    }
    
    // 自动轮播
    let slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
    
    // 轮播控制按钮
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(currentSlide - 1);
            slideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        });
        
        nextBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(currentSlide + 1);
            slideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        });
    }
    
    // 黑暗/亮色模式切换
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            if (document.body.classList.contains('light-mode')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'light');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'dark');
            }
        });
        
        // 检查本地存储中的主题设置
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    // 展开/收起剧情简介
    const expandBtn = document.querySelector('.btn-expand');
    const plotText = document.querySelector('.plot-text');
    
    if (expandBtn && plotText) {
        expandBtn.addEventListener('click', () => {
            plotText.classList.toggle('expanded');
            
            if (plotText.classList.contains('expanded')) {
                expandBtn.innerHTML = '收起 <i class="fas fa-chevron-up"></i>';
            } else {
                expandBtn.innerHTML = '展开 <i class="fas fa-chevron-down"></i>';
            }
        });
    }
    
    // 平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 添加动画效果
    const animateElements = document.querySelectorAll('.animate');
    
    function checkInView() {
        const windowHeight = window.innerHeight;
        const windowTop = window.scrollY;
        const windowBottom = windowTop + windowHeight;
        
        animateElements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementBottom = elementTop + element.offsetHeight;
            
            if (elementBottom > windowTop && elementTop < windowBottom) {
                element.classList.add('fade-in');
            }
        });
    }
    
    window.addEventListener('scroll', checkInView);
    window.addEventListener('resize', checkInView);
    
    // 初始检查
    checkInView();
});