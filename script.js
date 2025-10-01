document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const navMenu = document.getElementById('main-nav');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = navMenu.querySelectorAll('a'); 
    let lastScrollY = window.scrollY; 
    const scrollThreshold = 80;

    // ------------------------------------------------
    // 1. وظيفة قائمة الجوال (Hamburger Toggle)
    // ------------------------------------------------
    const toggleMenu = () => {
        navMenu.classList.toggle('is-open');
        menuToggle.classList.toggle('is-active'); 
        document.body.classList.toggle('no-scroll', navMenu.classList.contains('is-open'));
    };
    
    menuToggle.addEventListener('click', toggleMenu);
    
    // إغلاق القائمة عند النقر على رابط (لتحسين تجربة الجوال)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('is-open')) {
                setTimeout(toggleMenu, 100); 
            }
        });
    });

    // إضافة تنسيق 'no-scroll' لمنع التمرير في الخلفية (يتم تطبيقه على body)
    const style = document.createElement('style');
    style.innerHTML = `
        .no-scroll {
            overflow: hidden; 
        }
    `;
    document.head.appendChild(style);

    // ------------------------------------------------
    // 2. وظيفة الهيدر الديناميكي (Scroll Hide/Show)
    // ------------------------------------------------
    
    // تعيين الحالة الأولية عند تحميل الصفحة
    if (window.scrollY < scrollThreshold) {
        header.classList.add('header-shown');
    }

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // لا تطبق تأثير الإخفاء/الظهور إذا كانت قائمة الجوال مفتوحة
        if (navMenu.classList.contains('is-open')) {
            return; 
        }

        // الإخفاء عند النزول والتمرير بعيداً عن الأعلى
        if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
            header.classList.add('header-hidden');
            header.classList.remove('header-shown'); 
        } 
        
        // الإظهار عند الصعود
        else if (currentScrollY < lastScrollY) {
            header.classList.remove('header-hidden');
            header.classList.add('header-shown'); 
        }

        lastScrollY = currentScrollY;
    });
    
    // التأكد من ظهور الهيدر في أعلى الصفحة تماماً عند التحميل
    if (window.scrollY === 0) {
        header.classList.remove('header-hidden');
    }
});
