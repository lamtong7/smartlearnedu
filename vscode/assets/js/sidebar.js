document.addEventListener("DOMContentLoaded", function() {

    const sidebar = document.getElementById("app-sidebar");
    if (!sidebar) return;

    // ទាញយកឈ្មោះ File បច្ចុប្បន្ន (ឧទាហរណ៍: dashboard.html)
    const currentPage = window.location.pathname.split("/").pop() || "dashboard.html";

    // ទំព័រណាខ្លះដែលត្រូវបង្ហាញកាតប្រូម៉ូសិន (Keep Going)
    const showPromoCard = ['dashboard.html', 'myCourses.html', 'learning.html'].includes(currentPage);

    function renderSidebar() {
        // កំណត់ភាសាសម្រាប់ Sidebar
        const currentLang = localStorage.getItem('language') || 'km';
        const sidebarTr = {
            'km': {
                'dashboard': 'ផ្ទាំងគ្រប់គ្រង', 'my_courses': 'វគ្គសិក្សារបស់ខ្ញុំ', 'learning': 'ការសិក្សា',
                'assignments': 'កិច្ចការ', 'quizzes': 'កម្រងសំណួរ', 'certificates': 'វិញ្ញាបនបត្រ',
                'wishlist': 'បញ្ជីចំណូលចិត្ត', 'messages': 'សារ', 'notifications': 'សេចក្តីជូនដំណឹង',
                'my_account': 'គណនីរបស់ខ្ញុំ', 'settings': 'ការកំណត់',
                'keep_going': 'បន្តទៅមុខទៀត!', 'doing_great': 'អ្នកកំពុងធ្វើបានល្អ។', 'view_progress': 'មើលវឌ្ឍនភាព',
                'help_center': 'មជ្ឈមណ្ឌលជំនួយ', 'logout': 'ចាកចេញ', 'dark_mode': 'ងងឹត (Dark)'
            },
            'en': {
                'dashboard': 'Dashboard', 'my_courses': 'My Courses', 'learning': 'Learning',
                'assignments': 'Assignments', 'quizzes': 'Quizzes', 'certificates': 'Certificates',
                'wishlist': 'Wishlist', 'messages': 'Messages', 'notifications': 'Notifications',
                'my_account': 'My Account', 'settings': 'Settings',
                'keep_going': 'Keep Going!', 'doing_great': 'You are doing great.', 'view_progress': 'View Progress',
                'help_center': 'Help Center', 'logout': 'Logout', 'dark_mode': 'Dark Mode'
            }
        };
        const t = (key) => sidebarTr[currentLang][key] || key;

        // បញ្ជី Menu ទាំងអស់
        const menuItems = [
            { name: t("dashboard"), url: "dashboard.html", icon: "bi-grid-1x2" },
            { name: t("my_courses"), url: "myCourses.html", icon: "bi-book" },
            { name: t("learning"), url: "learning.html", icon: "bi-play-circle" },
            { name: t("assignments"), url: "assignments.html", icon: "bi-journal-check" },
            { name: t("quizzes"), url: "quizzes.html", icon: "bi-question-square" },
            { name: t("certificates"), url: "certificates.html", icon: "bi-award" },
            { name: t("wishlist"), url: "wishlist.html", icon: "bi-heart" },
            { name: t("notifications"), url: "notifications.html", icon: "bi-bell", badge: "3" }
        ];

        const bottomItems = [
            { name: t("my_account"), url: "profile.html", icon: "bi-person", extraClass: "mt-4" },
            { name: t("settings"), url: "settings.html", icon: "bi-gear" }
        ];

        let menuHtml = `<ul class="sidebar-menu-list">`;
        
        menuItems.forEach(item => {
            const isActive = currentPage === item.url ? "active" : "";
            const badge = item.badge ? `<span class="badge bg-primary ms-auto sidebar-text">${item.badge}</span>` : "";
            menuHtml += `<li class="sidebar-menu-item"><a href="${item.url}" class="sidebar-menu-link ${isActive}" data-bs-toggle="tooltip" data-bs-placement="right" title="${item.name}"><i class="bi ${item.icon}"></i> <span class="sidebar-text">${item.name}</span> ${badge}</a></li>`;
        });

        bottomItems.forEach(item => {
            const isActive = currentPage === item.url ? "active" : "";
            const extraClass = item.extraClass ? `class="sidebar-menu-item ${item.extraClass}"` : `class="sidebar-menu-item"`;
            menuHtml += `<li ${extraClass}><a href="${item.url}" class="sidebar-menu-link ${isActive}" data-bs-toggle="tooltip" data-bs-placement="right" title="${item.name}"><i class="bi ${item.icon}"></i> <span class="sidebar-text">${item.name}</span></a></li>`;
        });

        menuHtml += `</ul>`;

        const promoHtml = showPromoCard ? `
            <div class="sidebar-promo-card">
                <i class="bi bi-trophy text-warning fs-3 mb-2"></i>
                <h6 class="fw-bold mb-1 small" style="font-size: 13px;">${t('keep_going')}</h6>
                <p class="text-muted small mb-2" style="font-size: 11px;">${t('doing_great')}</p>
                <div class="progress mb-2" style="height: 6px;">
                    <div class="progress-bar" role="progressbar" style="width: 75%; background-color: var(--primary-color);"></div>
                </div>
                <div class="text-end text-dark fw-bold mb-3" style="font-size: 11px;">75%</div>
                <button class="btn btn-primary w-100 py-2 btn-sm fw-semibold" style="background-color: var(--primary-color); border-radius: 8px;" onclick="window.location.href='myCourses.html'">${t('view_progress')}</button>
            </div>
        ` : "";

        // បញ្ចូលកូដ HTML ទៅក្នុង Sidebar
        sidebar.innerHTML = `
            <div>
                ${menuHtml}
            </div>
            <div>
                ${promoHtml}
                <div class="d-flex flex-column gap-1 mt-3">
                <a href="#" class="sidebar-menu-link py-2" data-bs-toggle="tooltip" data-bs-placement="right" title="${t('help_center')}"><i class="bi bi-question-circle"></i> <span class="sidebar-text">${t('help_center')}</span></a>
                
                <div class="sidebar-menu-link d-flex justify-content-between align-items-center py-2" id="sidebarThemeToggle" style="cursor: pointer;">
                    <span class="d-flex align-items-center gap-2" data-bs-toggle="tooltip" data-bs-placement="right" title="${t('dark_mode')}"><i class="bi bi-moon-stars"></i> <span class="sidebar-text">${t('dark_mode')}</span></span>
                    <div class="form-check form-switch m-0 sidebar-text">
                        <input class="form-check-input pe-none" type="checkbox" id="sidebarThemeSwitch">
                    </div>
                </div>
                
                <a href="#" id="sidebarLogoutBtn" class="sidebar-menu-link py-2 text-danger" data-bs-toggle="tooltip" data-bs-placement="right" title="${t('logout')}"><i class="bi bi-box-arrow-left"></i> <span class="sidebar-text">${t('logout')}</span></a>
                </div>
            </div>
        `;

        // ដំណើរការមុខងារ Dark Mode Toggle ក្នុង Sidebar
        const sidebarThemeToggle = document.getElementById('sidebarThemeToggle');
        const sidebarThemeSwitch = document.getElementById('sidebarThemeSwitch');
        if (sidebarThemeToggle && sidebarThemeSwitch) {
            // The global toggleTheme function is defined in components.js
            // This just attaches event listeners to it.
            sidebarThemeToggle.addEventListener('click', function(e) {
                // Prevent double-toggling when clicking the switch itself
                if (e.target !== sidebarThemeSwitch && window.toggleTheme) {
                    window.toggleTheme();
                }
            });
            sidebarThemeSwitch.addEventListener('change', () => { if (window.toggleTheme) window.toggleTheme() });
        }

        // មុខងារចាកចេញ (Logout)
        const sidebarLogoutBtn = document.getElementById('sidebarLogoutBtn');
        if (sidebarLogoutBtn) {
            sidebarLogoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                window.location.replace("../index.html");
            });
        }

        // === បន្ថែមមុខងារ Bootstrap Tooltip ===
        document.querySelectorAll('.tooltip').forEach(t => t.remove()); // លុប Tooltip ចាស់ចេញសិន (ការពារជាន់គ្នាពេលដូរភាសា)
        const tooltipTriggerList = sidebar.querySelectorAll('[data-bs-toggle="tooltip"]');
        [...tooltipTriggerList].forEach(tooltipTriggerEl => {
            if (typeof bootstrap !== 'undefined') {
                new bootstrap.Tooltip(tooltipTriggerEl, { trigger: 'hover', customClass: 'sidebar-tooltip' });
            }
        });
    }

    // បញ្ចាំង Sidebar លើកដំបូង
    renderSidebar();
    
    // ស្តាប់ការផ្លាស់ប្តូរភាសា ហើយបញ្ចាំង Sidebar ម្តងទៀត
    document.addEventListener('languageChanged', renderSidebar);

    // === UI STANDARDS & RESPONSIVE FIXES ===
    const globalStyles = document.createElement('style');
    globalStyles.innerHTML = `
        /* Modern Scrollbar */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #f8fafc; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

        /* Responsive Sidebar Improvements */
        @media (max-width: 991.98px) {
            .dashboard-sidebar {
                transform: translateX(-100%);
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 1050 !important;
                box-shadow: 4px 0 24px rgba(0,0,0,0.1);
            }
            .dashboard-main-view {
                margin-left: 0 !important;
                width: 100%;
            }
            body.sidebar-open .dashboard-sidebar {
                transform: translateX(0);
            }
            .sidebar-backdrop {
                position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(15, 23, 42, 0.4);
                backdrop-filter: blur(2px);
                z-index: 1040;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            body.sidebar-open .sidebar-backdrop {
                opacity: 1;
                visibility: visible;
            }
        }
        @media (min-width: 992px) {
            .dashboard-sidebar { transition: width 0.3s ease, transform 0.3s ease; overflow-x: hidden; }
            .dashboard-main-view { transition: margin-left 0.3s ease; }
            

            /* Mini Sidebar Styles */
            body.sidebar-collapsed .dashboard-sidebar { width: 84px !important; transform: translateX(0); }
            body.sidebar-collapsed .dashboard-main-view { margin-left: 84px !important; }
            body.sidebar-collapsed .sidebar-text, 
            body.sidebar-collapsed .sidebar-promo-card { display: none !important; }
            
            body.sidebar-collapsed .sidebar-menu-link { justify-content: center; padding-left: 0; padding-right: 0; }
            body.sidebar-collapsed .sidebar-menu-link i { font-size: 1.3rem; margin: 0 !important; }
            body.sidebar-collapsed #sidebarThemeToggle span.d-flex { justify-content: center; width: 100%; }
            
            /* Animation លោតព្រិលៗ (Fade in) សម្រាប់អក្សរពេលបើក Sidebar វិញ */
            body:not(.sidebar-collapsed) .sidebar-text,
            body:not(.sidebar-collapsed) .sidebar-promo-card {
                animation: fadeInSidebarText 0.4s ease forwards;
            }
            @keyframes fadeInSidebarText {
                0% { opacity: 0; transform: translateX(-10px); }
                100% { opacity: 1; transform: translateX(0); }
            }
        }
        .top-dash-navbar { box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
        .form-control:focus, .form-select:focus {
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1) !important;
            border-color: var(--primary-color) !important;
        }
        
        /* លាក់ Tooltip ពេល Sidebar បើកធំ ដើម្បីកុំឲ្យរំខាន (បង្ហាញតែពេលរួមតូចប៉ុណ្ណោះ) */
        body:not(.sidebar-collapsed) .sidebar-tooltip {
            display: none !important;
        }
        @media (max-width: 991.98px) {
            .sidebar-tooltip { display: none !important; }
        }
    `;
    document.head.appendChild(globalStyles);

    const sidebarToggleBtn = document.querySelector('.bi-list')?.closest('button');
    if (sidebarToggleBtn) {
        const backdrop = document.createElement('div');
        backdrop.className = 'sidebar-backdrop';
        document.body.appendChild(backdrop);

        backdrop.addEventListener('click', function() {
            document.body.classList.remove('sidebar-open');
        });
    }

        // មុខងារបិទ Sidebar ដោយស្វ័យប្រវត្តិនៅពេលអ្នកប្រើប្រាស់ Scroll លើទូរស័ព្ទដៃ
        window.addEventListener('scroll', function() {
            if (window.innerWidth < 992 && document.body.classList.contains('sidebar-open')) {
                document.body.classList.remove('sidebar-open');
            }
        }, { passive: true });

        // មុខងារបិទ Sidebar ដោយស្វ័យប្រវត្តិពេលចុចលើតំណភ្ជាប់ណាមួយ (ពិសេសសម្រាប់ទូរស័ព្ទដៃ)
        sidebar.addEventListener('click', function(e) {
            const clickedLink = e.target.closest('.sidebar-menu-link') || e.target.closest('.btn');
            if (clickedLink && window.innerWidth < 992 && document.body.classList.contains('sidebar-open')) {
                document.body.classList.remove('sidebar-open');
            }
        });

        // មុខងារអូស (Swipe Left) ដើម្បីបិទ Sidebar នៅលើទូរស័ព្ទដៃ
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
            const isMobile = window.innerWidth < 992;

            // អូសទៅឆ្វេង (Swipe Left) ដើម្បីបិទ
            if (swipeDistance < -50 && isMobile && document.body.classList.contains('sidebar-open')) {
                document.body.classList.remove('sidebar-open');
            }
            // អូសទៅស្តាំ (Swipe Right) ដើម្បីបើក
            if (swipeDistance > 50 && isMobile && !document.body.classList.contains('sidebar-open')) {
                document.body.classList.add('sidebar-open');
            }
        }
});