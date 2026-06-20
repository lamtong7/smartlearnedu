// === GLOBAL AUTHENTICATION CHECK ===
// មុខងារនេះការពារមិនឲ្យអ្នកប្រើប្រាស់ចូលទៅកាន់ទំព័រផ្សេងៗបាន បើមិនទាន់ Login ក្រៅពីទំព័រដើម (index.html) និងទំព័រ Auth
(function checkAuthentication() {
    const pathName = window.location.pathname;
    const isAuthPage = pathName.includes('/auth/');
    const isIndexPage = pathName.endsWith('index.html') || pathName === '/' || pathName.endsWith('vscode/');
    
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // --- មុខងារ Auto Logout (២៤ ម៉ោង) ---
    const INACTIVITY_LIMIT = 24 * 60 * 60 * 1000; // ២៤ ម៉ោងគិតជាមិល្លីវិនាទី

    if (isLoggedIn) {
        const lastActivity = localStorage.getItem('lastActivityTime');
        const now = Date.now();

        if (lastActivity && (now - parseInt(lastActivity) > INACTIVITY_LIMIT)) {
            // លើស ២៤ ម៉ោង -> លុប Session ចោល
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('lastActivityTime');
            
            alert('សម័យកាលរបស់អ្នកបានផុតកំណត់ដោយសារមិនមានសកម្មភាព។ សូមចូលគណនីម្តងទៀត។');
            
            let loginPath = '../pages/auth/login.html';
            if (isIndexPage) loginPath = './pages/auth/login.html';
            else if (isAuthPage) loginPath = './login.html';
            
            window.location.replace(loginPath);
            return; // បញ្ឈប់ការអនុវត្តកូដខាងក្រោមបន្តទៀត
        } else {
            // ធ្វើបច្ចុប្បន្នភាពម៉ោងសកម្មភាពរាល់ពេលចូលទំព័រថ្មី
            localStorage.setItem('lastActivityTime', now.toString());
        }

        // ធ្វើបច្ចុប្បន្នភាពម៉ោងសកម្មភាពរាល់ពេលអ្នកប្រើប្រាស់ចុច, វាយអក្សរ ឬ Scroll (កំណត់ត្រឹម ១ នាទីម្តង ដើម្បីកុំឲ្យកម្មវិធីដើរធ្ងន់)
        let lastUpdate = now;
        const updateActivity = () => {
            const currentTime = Date.now();
            if (currentTime - lastUpdate > 60000) {
                localStorage.setItem('lastActivityTime', currentTime.toString());
                lastUpdate = currentTime;
            }
        };
        
        window.addEventListener('click', updateActivity, { passive: true });
        window.addEventListener('keypress', updateActivity, { passive: true });
        window.addEventListener('scroll', updateActivity, { passive: true });
        window.addEventListener('touchstart', updateActivity, { passive: true });
    }
    // -------------------------------------

    if (!isAuthPage && !isIndexPage) {
        if (!isLoggedIn) {
            sessionStorage.setItem('redirectUrl', window.location.href);
            window.location.replace('../pages/auth/login.html');
        }
    } else if (isAuthPage && isLoggedIn) {
        // បើមានគណនីរួចហើយ តែព្យាយាមចូលទំព័រ Login/Register វានឹងរុញទៅ Dashboard វិញដោយស្វ័យប្រវត្តិ
        window.location.replace('../dashboard.html');
    }
})();

function initializeScrollObserver() {
    // Prevent creating duplicate observers
    if (!window.globalScrollObserver) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px', // ចាប់ផ្តើម Animation ពេលធាតុនៅសល់ 50px ទៀតទើបចូលដល់អេក្រង់
            threshold: 0.1
        };

        window.globalScrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
    }

    // Only observe elements that haven't been observed yet
    document.querySelectorAll('.reveal-on-scroll:not(.is-observed)').forEach(el => {
        el.classList.add('is-observed');
        window.globalScrollObserver.observe(el);
    });
}
document.addEventListener("DOMContentLoaded", function() {
    
    // === GLOBAL LOCALSTORAGE INITIALIZATION ===
    // មុខងារនេះនឹងរៀបចំទិន្នន័យទាំងអស់បញ្ចូលទៅក្នុង localStorage តែម្តងគត់នៅពេលបើកវេបសាយដំបូង
    async function initializeGlobalStorage() {
        if (!localStorage.getItem('is_db_initialized_v2')) {
            
            // ១. បញ្ចូលទិន្នន័យ Static ទៅក្នុង LocalStorage (អ្នកអាចថែមទិន្នន័យពីទំព័រផ្សេងៗទៀតនៅទីនេះ)
            const defaultInvoices = [
                { id: "INV-00123", course: "វគ្គបណ្តុះបណ្តាលការអភិវឌ្ឍគេហទំព័រពេញលេញ 2026", courseKey: "course_web_dev", date: "15 មីនា 2026", amount: "$19.99" },
                { id: "INV-00124", course: "Google UX Design Professional Certificate", courseKey: "course_ui_ux", date: "10 កុម្ភៈ 2026", amount: "$29.99" },
                { id: "INV-00125", course: "Python for Data Science", courseKey: "course_python", date: "05 មករា 2026", amount: "$14.99" }
            ];
            localStorage.setItem('invoices_db', JSON.stringify(defaultInvoices));

            // បញ្ចូលទិន្នន័យ Dashboard
            const defaultDashboard = {
                stats: [
                    { colorClass: "primary", icon: "bi-journal-bookmark-fill", target: 4, suffix: "", title: "វគ្គសិក្សាកំពុងរៀន", titleKey: "stat_in_progress" },
                    { colorClass: "success", icon: "bi-patch-check-fill", target: 12, suffix: "", title: "វគ្គបានបញ្ចប់", titleKey: "stat_completed" },
                    { colorClass: "warning", icon: "bi-award-fill", target: 5, suffix: "", title: "វិញ្ញាបនបត្រ", titleKey: "stat_cert" },
                    { colorClass: "info", icon: "bi-star-fill", target: 850, suffix: "", title: "ពិន្ទុ (XP)", titleKey: "stat_xp" }
                ],
                continueLearning: { category: "ការអភិវឌ្ឍគេហទំព័រ", categoryKey: "cat_web_dev", courseTitle: "វគ្គបណ្តុះបណ្តាលការអភិវឌ្ឍគេហទំព័រពេញលេញ 2026", courseTitleKey: "course_web_dev", nextLesson: "សេចក្តីផ្តើមនៃ HTML", nextLessonKey: "lesson_intro_html", progress: 22, link: "learning.html?id=1" },
                tasks: [
                    { colorClass: "danger", icon: "bi-exclamation-triangle-fill", type: "កិច្ចការ", typeKey: "task_assignment", title: "បង្កើតទំព័រ HTML ដំបូង", titleKey: "task_1_title", course: "Web Development", courseKey: "course_web_dev_en", due: "ថ្ងៃស្អែក", dueKey: "due_tomorrow" },
                    { colorClass: "warning", icon: "bi-journal-text", type: "កម្រងសំណួរ", typeKey: "task_quiz", title: "មូលដ្ឋានគ្រឹះ CSS", titleKey: "task_2_title", course: "Web Development", courseKey: "course_web_dev_en", due: "3 ថ្ងៃទៀត", dueKey: "due_in_3_days" }
                ]
            };
            localStorage.setItem('dashboard_db', JSON.stringify(defaultDashboard));

            // បញ្ចូលទិន្នន័យ គ្រូបង្រៀន
            const defaultTeachers = [
                { id: 1, name: "John Doe", role: "អ្នកអភិវឌ្ឍន៍គេហទំព័រ", desc: "អ្នកជំនាញផ្នែក Fullstack Development ដែលមានបទពិសោធន៍ជាង ១០ ឆ្នាំ។", rating: 4.8, students: "50k+", courses: 15, img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop" },
                { id: 2, name: "Jane Smith", role: "អ្នករចនា UI/UX", desc: "អតីតអ្នករចនានៅ Google, ចែករំលែកគន្លឹះរចនាទាន់សម័យ។", rating: 4.9, students: "35k+", courses: 8, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
                { id: 3, name: "David Lee", role: "អ្នកវិទ្យាសាស្ត្រទិន្នន័យ", desc: "អ្នកជំនាញ Python និង AI ដែលជួយអ្នកចាប់ផ្តើមជាមួយ Data Science។", rating: 4.7, students: "28k+", courses: 12, img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
                { id: 4, name: "Sarah Connor", role: "អ្នកជំនាញទីផ្សារឌីជីថល", desc: "ជួយអ្នករៀនពីរបៀបធ្វើទីផ្សារតាមបណ្តាញសង្គមនិង SEO។", rating: 4.6, students: "40k+", courses: 10, img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop" }
            ];
            localStorage.setItem('teachers_db', JSON.stringify(defaultTeachers));

            // បញ្ចូលទិន្នន័យ កម្រងសំណួរ នឹងកិច្ចការ
            const defaultQuizzes = [
                { id: 1, status: 'active', iconClass: 'status-active text-primary', icon: 'bi-journal-text', title: 'កម្រងសំណួរ: មូលដ្ឋានគ្រឹះ HTML', titleKey: 'quiz_html_title', course: 'វគ្គបណ្តុះបណ្តាលការអភិវឌ្ឍគេហទំព័រពេញលេញ 2026', courseKey: 'course_web_dev', questions: 15, time: '20 នាទី', timeKey: 'time_20_min', badgeClass: 'status-active', statusText: 'កំពុងដំណើរការ', statusTextKey: 'status_active', actionBtnClass: 'btn-primary', actionTextKey: 'btn_continue', actionTarget: '' },
                { id: 2, status: 'completed', iconClass: 'status-passed text-success', icon: 'bi-check-circle-fill', title: 'កម្រងសំណួរ: ការរចនា UI/UX', titleKey: 'quiz_ui_title', course: 'Google UX Design Professional Certificate', courseKey: 'course_ui_ux', questions: 20, time: '30 នាទី', timeKey: 'time_30_min', badgeClass: 'status-passed', statusText: 'បានបញ្ចប់ (90%)', statusTextKey: 'status_completed_90', actionBtnClass: 'btn-outline-secondary', actionTextKey: 'btn_view_results', actionTarget: 'data-bs-toggle="modal" data-bs-target="#quizResultsModal"' }
            ];
            localStorage.setItem('quizzes_db', JSON.stringify(defaultQuizzes));

            const defaultAssignments = [
                { id: 1, status: 'pending', iconClass: 'bg-warning bg-opacity-10 text-warning', icon: 'bi-hourglass-split', title: 'ការរចនាទំព័រចុះចត (Landing Page)', titleKey: 'task_landing_page', course: 'ថ្នាក់ជំនាញរចនា UI/UX', courseKey: 'course_ui_ux', statusText: 'មិនទាន់សម្រេច', statusTextKey: 'status_pending', metaIcon: 'bi-calendar-event', metaTextKey: 'due_tomorrow', actionBtnClass: 'btn-primary', actionTextKey: 'btn_submit_task', dueDate: '2026-10-20T23:59:59' },
                { id: 2, status: 'submitted', iconClass: 'bg-primary bg-opacity-10 text-primary', icon: 'bi-cloud-arrow-up-fill', title: 'បង្កើតទំព័រ HTML ដំបូង', titleKey: 'task_html', course: 'វគ្គបណ្តុះបណ្តាលការអភិវឌ្ឍគេហទំព័រ', courseKey: 'course_web_dev', statusText: 'បានបញ្ជូន', statusTextKey: 'status_submitted', metaIcon: 'bi-clock-history', metaTextKey: 'pending_grading', actionBtnClass: 'btn-outline-secondary', actionTextKey: 'btn_view_task' },
                { id: 3, status: 'graded', iconClass: 'bg-success bg-opacity-10 text-success', icon: 'bi-check-circle-fill', title: 'កម្រងសំណួរ CSS មូលដ្ឋាន', titleKey: 'task_css_quiz', course: 'វគ្គបណ្តុះបណ្តាលការអភិវឌ្ឍគេហទំព័រ', courseKey: 'course_web_dev', statusText: 'បានដាក់ពិន្ទុ', statusTextKey: 'status_graded', metaIcon: 'bi-star-fill', metaIconColor: 'text-warning', metaTextKey: 'score_95', actionBtnClass: 'btn-outline-secondary', actionTextKey: 'btn_view_feedback' }
            ];
            localStorage.setItem('assignments_db', JSON.stringify(defaultAssignments));

            // បញ្ចូលទិន្នន័យ វិញ្ញាបនបត្រ និងសារជូនដំណឹង
            const defaultCertificates = [
                { id: "UC-A1B2C3", course: "វគ្គបណ្តុះបណ្តាលការអភិវឌ្ឍគេហទំព័រពេញលេញ 2026", date: "15 មីនា 2026" },
                { id: "UC-D4E5F6", course: "Google UX Design Professional Certificate", date: "10 កុម្ភៈ 2026" },
                { id: "UC-G7H8I9", course: "Python for Data Science", date: "05 មករា 2026" }
            ];
            localStorage.setItem('certificates_db', JSON.stringify(defaultCertificates));

            const defaultNotifications = [
                { id: 1, dateGroup: "today", unread: true, link: "assignments.html", iconClass: "icon-success", icon: "bi-journal-check", title: "កិច្ចការត្រូវបានដាក់ពិន្ទុ: កម្រងសំណួរ HTML ចុងក្រោយ", titleKey: "notif_1_title", desc: "គ្រូបង្រៀនរបស់អ្នក Sarah Johnson បានដាក់ពិន្ទុលើការបញ្ជូនរបស់អ្នក។ អ្នកទទួលបានពិន្ទុ 95/100។", descKey: "notif_1_desc", time: "2 ម៉ោងមុន", timeKey: "time_2_hours_ago" },
                { id: 2, dateGroup: "today", unread: true, link: "certificates.html", iconClass: "icon-warning", icon: "bi-award-fill", title: "ទទួលបានវិញ្ញាបនបត្រថ្មី!", titleKey: "notif_2_title", desc: "សូមអបអរសាទរ! អ្នកបានបញ្ចប់ \"វគ្គបណ្តុះបណ្តាលសរសេរកូដ Python\" ដោយជោគជ័យ និងទទួលបានវិញ្ញាបនបត្រថ្មីមួយ។", descKey: "notif_2_desc", time: "5 ម៉ោងមុន", timeKey: "time_5_hours_ago" },
                { id: 3, dateGroup: "today", unread: true, link: "courses.html", iconClass: "icon-primary", icon: "bi-megaphone-fill", title: "វគ្គសិក្សាថ្មីអាចចូលរៀនបាន: Advanced React Patterns", titleKey: "notif_3_title", desc: "វគ្គសិក្សាថ្មីដែលត្រូវនឹងចំណាប់អារម្មណ៍របស់អ្នកត្រូវបានបោះពុម្ពផ្សាយហើយ។ ចុះឈ្មោះឥឡូវនេះដើម្បីទទួលបានការបញ្ចុះតម្លៃ 20%។", descKey: "notif_3_desc", time: "8 ម៉ោងមុន", timeKey: "time_8_hours_ago" },
                { id: 4, dateGroup: "yesterday", unread: false, link: "messages.html", iconClass: "icon-purple", icon: "bi-chat-dots-fill", title: "សារថ្មីពី Emma Brown", titleKey: "notif_4_title", desc: "\"ខ្ញុំនឹងផ្ញើឯកសារតាមក្រោយ។ ប្រាប់ខ្ញុំប្រសិនបើអ្នកត្រូវការអ្វីផ្សេងទៀត...\"", descKey: "notif_4_desc", time: "ម្សិលមិញម៉ោង 4:30 ល្ងាច", timeKey: "time_yesterday_430" },
                { id: 5, dateGroup: "yesterday", unread: false, link: "assignments.html", iconClass: "icon-danger", icon: "bi-exclamation-triangle-fill", title: "ការរំលឹកពីកិច្ចការ", titleKey: "notif_5_title", desc: "កិច្ចការ \"ការរចនាទំព័រចុះចត (Landing Page) ដែលអាចបត់បែនបាន\" របស់អ្នកនឹងផុតកំណត់នៅថ្ងៃស្អែក។ សូមប្រាកដថាបានបញ្ជូនវាឲ្យទាន់ពេលវេលា។", descKey: "notif_5_desc", time: "ម្សិលមិញម៉ោង 9:00 ព្រឹក", timeKey: "time_yesterday_900" },
                { id: 6, dateGroup: "older", unread: false, link: "profile.html", iconClass: "bg-secondary text-white", icon: "bi-shield-lock-fill", title: "ការដាស់តឿនសុវត្ថិភាព: ការចូលគណនីថ្មី", titleKey: "notif_6_title", desc: "យើងបានកត់សម្គាល់ការចូលគណនី Smart Learn របស់អ្នកពីឧបករណ៍ថ្មី (Mac OS, Chrome)។ ប្រសិនបើនេះជាអ្នក អ្នកអាចមិនអើពើនឹងសារនេះ។", descKey: "notif_6_desc", time: "15 តុលា 2026", timeKey: "time_oct_15" }
            ];
            localStorage.setItem('notifications_db', JSON.stringify(defaultNotifications));

            // បញ្ចូលទិន្នន័យ វគ្គសិក្សារបស់ខ្ញុំ
            const defaultMyCourses = [
                { id: 1, title: "វគ្គបណ្តុះបណ្តាលការអភិវឌ្ឍគេហទំព័រពេញលេញ 2026", category: "ការអភិវឌ្ឍគេហទំព័រ", instructor: "John Doe", instructorImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100", courseImg: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600", progress: 22, nextLesson: "សេចក្តីផ្តើមនៃ HTML", link: "learning.html?id=1", level: "Beginner", priceType: "Paid" },
                { id: 2, title: "Google UX Design Professional Certificate", category: "ការរចនា UI/UX", instructor: "Jane Smith", instructorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", courseImg: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600", progress: 100, nextLesson: "", link: "learning.html?id=2", level: "Beginner", priceType: "Paid" }
            ];
            localStorage.setItem('my_courses_db', JSON.stringify(defaultMyCourses));

            // បញ្ចូលទិន្នន័យ វគ្គសិក្សាទាំងអស់ (36 វគ្គ) 
            const defaultAllCourses = [
                // 1. ការអភិវឌ្ឍន៍
                { id: 1, title: "វគ្គបណ្តុះបណ្តាលការអភិវឌ្ឍគេហទំព័រពេញលេញ 2026", category: "ការអភិវឌ្ឍន៍", level: "Beginner", priceType: "Paid", price: 49.99, oldPrice: "$99.99", rating: 4.8, reviews: 120, duration: "15h 30m", instructor: "John Doe", instructorImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100", courseImg: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600", badgeText: "លក់ដាច់បំផុត", badgeClass: "bg-danger" },
                { id: 2, title: "បង្កើតកម្មវិធីទូរស័ព្ទជាមួយ Flutter", category: "ការអភិវឌ្ឍន៍", level: "Intermediate", priceType: "Paid", price: 59.99, oldPrice: "$119.99", rating: 4.7, reviews: 85, duration: "20h 15m", instructor: "David Lee", instructorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", courseImg: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600", badgeText: "ថ្មី", badgeClass: "bg-primary" },
                { id: 3, title: "Python សម្រាប់វិទ្យាសាស្ត្រទិន្នន័យ (Data Science)", category: "ការអភិវឌ្ឍន៍", level: "Advanced", priceType: "Paid", price: 69.99, oldPrice: "$149.99", rating: 4.9, reviews: 200, duration: "25h 00m", instructor: "Jane Smith", instructorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", courseImg: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600", badgeText: "ពេញនិយម", badgeClass: "bg-warning text-dark" },
                { id: 4, title: "React.js កម្រិតខ្ពស់ និង Redux", category: "ការអភិវឌ្ឍន៍", level: "Intermediate", priceType: "Free", price: 0, oldPrice: "", rating: 4.6, reviews: 320, duration: "10h 45m", instructor: "John Doe", instructorImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100", courseImg: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600", badgeText: "", badgeClass: "" },
                { id: 5, title: "Node.js និងសាងសង់ API ទំនើប", category: "ការអភិវឌ្ឍន៍", level: "Advanced", priceType: "Paid", price: 45.00, oldPrice: "$80.00", rating: 4.8, reviews: 90, duration: "18h 20m", instructor: "Sarah Connor", instructorImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100", courseImg: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600", badgeText: "", badgeClass: "" },
                { id: 6, title: "មូលដ្ឋានគ្រឹះ Java Programming", category: "ការអភិវឌ្ឍន៍", level: "Beginner", priceType: "Free", price: 0, oldPrice: "", rating: 4.5, reviews: 500, duration: "12h 00m", instructor: "David Lee", instructorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", courseImg: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600", badgeText: "ពេញនិយម", badgeClass: "bg-warning text-dark" },
                // 2. ការរចនា
                { id: 7, title: "ថ្នាក់ជំនាញរចនា UI/UX ជាមួយ Figma", category: "ការរចនា", level: "Beginner", priceType: "Paid", price: 39.99, oldPrice: "$79.99", rating: 4.9, reviews: 350, duration: "14h 10m", instructor: "Jane Smith", instructorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", courseImg: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600", badgeText: "លក់ដាច់បំផុត", badgeClass: "bg-danger" },
                { id: 8, title: "គំនូរជីវចល 3D ជាមួយ Blender", category: "ការរចនា", level: "Intermediate", priceType: "Paid", price: 55.00, oldPrice: "$100.00", rating: 4.7, reviews: 110, duration: "22h 30m", instructor: "Sarah Connor", instructorImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100", courseImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600", badgeText: "", badgeClass: "" },
                { id: 9, title: "រចនា Graphic សម្រាប់អ្នកចាប់ផ្តើម", category: "ការរចនា", level: "Beginner", priceType: "Free", price: 0, oldPrice: "", rating: 4.6, reviews: 420, duration: "8h 00m", instructor: "John Doe", instructorImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100", courseImg: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600", badgeText: "", badgeClass: "" },
                { id: 10, title: "គន្លឹះរចនា Logo អាជីព", category: "ការរចនា", level: "Intermediate", priceType: "Paid", price: 29.99, oldPrice: "$50.00", rating: 4.8, reviews: 65, duration: "6h 45m", instructor: "Jane Smith", instructorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", courseImg: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600", badgeText: "ថ្មី", badgeClass: "bg-primary" },
                { id: 11, title: "Adobe Premiere Pro កាត់តវីដេអូ", category: "ការរចនា", level: "Advanced", priceType: "Paid", price: 65.00, oldPrice: "$130.00", rating: 4.9, reviews: 180, duration: "19h 20m", instructor: "David Lee", instructorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", courseImg: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600", badgeText: "", badgeClass: "" },
                { id: 12, title: "រចនាគេហទំព័រទំនើប (Web Design)", category: "ការរចនា", level: "Intermediate", priceType: "Paid", price: 35.00, oldPrice: "$70.00", rating: 4.7, reviews: 95, duration: "11h 15m", instructor: "John Doe", instructorImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100", courseImg: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600", badgeText: "ពេញនិយម", badgeClass: "bg-warning text-dark" },
                // 3. អាជីវកម្ម
                { id: 13, title: "យុទ្ធសាស្រ្តគ្រប់គ្រងអាជីវកម្មខ្នាតតូច", category: "អាជីវកម្ម", level: "Beginner", priceType: "Free", price: 0, oldPrice: "", rating: 4.8, reviews: 310, duration: "9h 30m", instructor: "Sarah Connor", instructorImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100", courseImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600", badgeText: "ពេញនិយម", badgeClass: "bg-warning text-dark" },
                { id: 14, title: "ការវិភាគទិន្នន័យអាជីវកម្មអនឡាញ", category: "អាជីវកម្ម", level: "Intermediate", priceType: "Paid", price: 49.99, oldPrice: "$90.00", rating: 4.7, reviews: 145, duration: "16h 00m", instructor: "David Lee", instructorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", courseImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600", badgeText: "", badgeClass: "" },
                { id: 15, title: "ហិរញ្ញវត្ថុសម្រាប់សហគ្រិន", category: "អាជីវកម្ម", level: "Advanced", priceType: "Paid", price: 79.99, oldPrice: "$150.00", rating: 4.9, reviews: 210, duration: "21h 45m", instructor: "John Doe", instructorImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100", courseImg: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600", badgeText: "លក់ដាច់បំផុត", badgeClass: "bg-danger" },
                { id: 16, title: "សិល្បៈនៃការលក់ និងចរចា", category: "អាជីវកម្ម", level: "Beginner", priceType: "Paid", price: 25.00, oldPrice: "$50.00", rating: 4.6, reviews: 88, duration: "7h 20m", instructor: "Jane Smith", instructorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", courseImg: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600", badgeText: "ថ្មី", badgeClass: "bg-primary" },
                { id: 17, title: "ភាពជាអ្នកដឹកនាំក្នុងយុគសម័យឌីជីថល", category: "អាជីវកម្ម", level: "Intermediate", priceType: "Free", price: 0, oldPrice: "", rating: 4.8, reviews: 450, duration: "10h 00m", instructor: "Sarah Connor", instructorImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100", courseImg: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600", badgeText: "", badgeClass: "" },
                { id: 18, title: "ការគ្រប់គ្រងគម្រោង (Project Management)", category: "អាជីវកម្ម", level: "Advanced", priceType: "Paid", price: 59.00, oldPrice: "$110.00", rating: 4.7, reviews: 130, duration: "14h 50m", instructor: "David Lee", instructorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", courseImg: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600", badgeText: "", badgeClass: "" },
                // 4. ទីផ្សារ
                { id: 19, title: "ទីផ្សារឌីជីថលពេញលេញ 2026", category: "ទីផ្សារ", level: "Beginner", priceType: "Paid", price: 45.99, oldPrice: "$89.99", rating: 4.8, reviews: 175, duration: "18h 30m", instructor: "Sarah Connor", instructorImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100", courseImg: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600", badgeText: "លក់ដាច់បំផុត", badgeClass: "bg-danger" },
                { id: 20, title: "ការរត់ពាណិជ្ជកម្ម Facebook & TikTok", category: "ទីផ្សារ", level: "Intermediate", priceType: "Paid", price: 39.99, oldPrice: "$75.00", rating: 4.9, reviews: 250, duration: "12h 00m", instructor: "Jane Smith", instructorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", courseImg: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600", badgeText: "ពេញនិយម", badgeClass: "bg-warning text-dark" },
                { id: 21, title: "SEO សម្រាប់គេហទំព័រ", category: "ទីផ្សារ", level: "Advanced", priceType: "Paid", price: 55.00, oldPrice: "$100.00", rating: 4.7, reviews: 120, duration: "14h 45m", instructor: "John Doe", instructorImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100", courseImg: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=600", badgeText: "", badgeClass: "" },
                { id: 22, title: "ទីផ្សារមាតិកា (Content Marketing)", category: "ទីផ្សារ", level: "Beginner", priceType: "Free", price: 0, oldPrice: "", rating: 4.6, reviews: 380, duration: "8h 15m", instructor: "David Lee", instructorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", courseImg: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600", badgeText: "", badgeClass: "" },
                { id: 23, title: "អ៊ីមែលម៉ាឃីតទីង (Email Marketing)", category: "ទីផ្សារ", level: "Intermediate", priceType: "Paid", price: 29.00, oldPrice: "$60.00", rating: 4.5, reviews: 90, duration: "6h 30m", instructor: "Sarah Connor", instructorImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100", courseImg: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600", badgeText: "ថ្មី", badgeClass: "bg-primary" },
                { id: 24, title: "ការវិភាគទីផ្សារជាមួយ Google Analytics", category: "ទីផ្សារ", level: "Advanced", priceType: "Paid", price: 49.99, oldPrice: "$95.00", rating: 4.8, reviews: 160, duration: "15h 10m", instructor: "Jane Smith", instructorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", courseImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600", badgeText: "", badgeClass: "" },
                // 5. ព័ត៌មានវិទ្យា និងកម្មវិធី
                { id: 25, title: "សន្តិសុខបណ្តាញ (Cybersecurity)", category: "ព័ត៌មានវិទ្យា និងកម្មវិធី", level: "Advanced", priceType: "Paid", price: 89.99, oldPrice: "$180.00", rating: 4.9, reviews: 220, duration: "30h 00m", instructor: "David Lee", instructorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", courseImg: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600", badgeText: "លក់ដាច់បំផុត", badgeClass: "bg-danger" },
                { id: 26, title: "មូលដ្ឋានគ្រឹះ Cloud Computing (AWS/Azure)", category: "ព័ត៌មានវិទ្យា និងកម្មវិធី", level: "Intermediate", priceType: "Paid", price: 59.99, oldPrice: "$120.00", rating: 4.8, reviews: 140, duration: "24h 45m", instructor: "John Doe", instructorImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100", courseImg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600", badgeText: "ពេញនិយម", badgeClass: "bg-warning text-dark" },
                { id: 27, title: "គ្រប់គ្រងម៉ាស៊ីនមេ Linux", category: "ព័ត៌មានវិទ្យា និងកម្មវិធី", level: "Intermediate", priceType: "Paid", price: 45.00, oldPrice: "$85.00", rating: 4.7, reviews: 95, duration: "16h 20m", instructor: "Sarah Connor", instructorImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100", courseImg: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600", badgeText: "", badgeClass: "" },
                { id: 28, title: "ជួសជុល និងតម្លើងកុំព្យូទ័រ", category: "ព័ត៌មានវិទ្យា និងកម្មវិធី", level: "Beginner", priceType: "Free", price: 0, oldPrice: "", rating: 4.6, reviews: 520, duration: "10h 30m", instructor: "Jane Smith", instructorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", courseImg: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600", badgeText: "", badgeClass: "" },
                { id: 29, title: "បណ្តាញកុំព្យូទ័រ (Networking CCNA)", category: "ព័ត៌មានវិទ្យា និងកម្មវិធី", level: "Advanced", priceType: "Paid", price: 75.00, oldPrice: "$140.00", rating: 4.8, reviews: 185, duration: "28h 15m", instructor: "David Lee", instructorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", courseImg: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600", badgeText: "ថ្មី", badgeClass: "bg-primary" },
                { id: 30, title: "រដ្ឋបាលប្រព័ន្ធ IT ក្នុងក្រុមហ៊ុន", category: "ព័ត៌មានវិទ្យា និងកម្មវិធី", level: "Intermediate", priceType: "Paid", price: 35.00, oldPrice: "$65.00", rating: 4.5, reviews: 75, duration: "11h 00m", instructor: "John Doe", instructorImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100", courseImg: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600", badgeText: "", badgeClass: "" },
                // 6. ការអភិវឌ្ឍខ្លួន
                { id: 31, title: "វិធីសាស្ត្រគ្រប់គ្រងពេលវេលា", category: "ការអភិវឌ្ឍខ្លួន", level: "Beginner", priceType: "Free", price: 0, oldPrice: "", rating: 4.8, reviews: 640, duration: "5h 45m", instructor: "Sarah Connor", instructorImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100", courseImg: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600", badgeText: "ពេញនិយម", badgeClass: "bg-warning text-dark" },
                { id: 32, title: "សិល្បៈនៃការនិយាយជាសាធារណៈ", category: "ការអភិវឌ្ឍខ្លួន", level: "Intermediate", priceType: "Paid", price: 25.00, oldPrice: "$45.00", rating: 4.9, reviews: 215, duration: "8h 30m", instructor: "Jane Smith", instructorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", courseImg: "https://images.unsplash.com/photo-1475721028070-90c8694841e5?w=600", badgeText: "លក់ដាច់បំផុត", badgeClass: "bg-danger" },
                { id: 33, title: "ការដោះស្រាយបញ្ហា និងការគិតបែបរិះគន់", category: "ការអភិវឌ្ឍខ្លួន", level: "Advanced", priceType: "Paid", price: 39.99, oldPrice: "$75.00", rating: 4.7, reviews: 130, duration: "12h 15m", instructor: "David Lee", instructorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", courseImg: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600", badgeText: "", badgeClass: "" },
                { id: 34, title: "ការអានលឿន និងចងចាំបានយូរ", category: "ការអភិវឌ្ឍខ្លួន", level: "Beginner", priceType: "Paid", price: 19.99, oldPrice: "$40.00", rating: 4.6, reviews: 95, duration: "4h 50m", instructor: "John Doe", instructorImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100", courseImg: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600", badgeText: "ថ្មី", badgeClass: "bg-primary" },
                { id: 35, title: "ភាពឆ្លាតវៃផ្នែកអារម្មណ៍ (EQ)", category: "ការអភិវឌ្ឍខ្លួន", level: "Intermediate", priceType: "Free", price: 0, oldPrice: "", rating: 4.8, reviews: 510, duration: "7h 00m", instructor: "Jane Smith", instructorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", courseImg: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600", badgeText: "", badgeClass: "" },
                { id: 36, title: "វិធីសាស្ត្រកាត់បន្ថយភាពតានតឹង (Stress Mgt)", category: "ការអភិវឌ្ឍខ្លួន", level: "Beginner", priceType: "Paid", price: 15.00, oldPrice: "$30.00", rating: 4.9, reviews: 185, duration: "3h 45m", instructor: "Sarah Connor", instructorImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100", courseImg: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600", badgeText: "", badgeClass: "" }
            ];
            localStorage.setItem('admin_courses_db', JSON.stringify(defaultAllCourses));

            // ២. ព្យាយាមទាញយកទិន្នន័យពី db.json បញ្ចូលទៅ localStorage
            const pathName = window.location.pathname;
            const isRoot = pathName.endsWith('index.html') || pathName === '/' || pathName.endsWith('vscode/');
            let basePath = isRoot ? './' : '../';
            if (pathName.includes('/auth/')) basePath = '../../';
            
            try {
                const response = await fetch(`${basePath}assets/data/db.json`);
                if (response.ok) {
                    const data = await response.json();
                    
                    // រក្សាទុកតារាងទិន្នន័យ (Collections) ផ្សេងៗទៅក្នុង LocalStorage ដាច់ដោយឡែកពីគ្នា
                    // (យើងបានបញ្ចូលវគ្គសិក្សា ៣៦ វគ្គនៅខាងលើរួចហើយ ដូច្នេះមិនចាំបាច់យកពី db.json ទេ)
                    // if (data.courses) localStorage.setItem('admin_courses_db', JSON.stringify(data.courses));
                    if (data.learningSyllabus) localStorage.setItem('learning_syllabus_db', JSON.stringify(data.learningSyllabus));
                    
                    // ប្រសិនបើអ្នកមាន myCourses, assignments ក្នុង db.json ក៏អាចដាក់បញ្ចូលដូចគ្នា
                    // if (data.myCourses) localStorage.setItem('my_courses_db', JSON.stringify(data.myCourses));
                }
            } catch (error) {
                console.warn('Could not load db.json into localStorage, fallback to static defaults.', error);
            }

            // សម្គាល់ថាបាន Setup រួចរាល់ ដើម្បីកុំឲ្យវា Reset ទិន្នន័យនៅពេលដែលអ្នកប្រើប្រាស់ Refresh ទំព័រ
            localStorage.setItem('is_db_initialized_v2', 'true');
        }
    }
    
    // ចាប់ផ្តើមរៀបចំទិន្នន័យ Global
    initializeGlobalStorage();

    // --- GLOBAL THEME MANAGEMENT ---
    // Function to update all theme toggle icons/switches on the page
    function updateAllThemeToggles() {
        const isDark = document.body.classList.contains('dark-mode');
        const iconClass = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
        
        // Update public navbar toggle (sun/moon icon)
        const publicToggleIcon = document.querySelector('#publicThemeToggle i');
        if (publicToggleIcon) {
            publicToggleIcon.className = iconClass;
        }

        // Update sidebar toggle (switch)
        const sidebarToggleSwitch = document.getElementById('sidebarThemeSwitch');
        if (sidebarToggleSwitch) {
            sidebarToggleSwitch.checked = isDark;
        }
    }

    // Define the global theme toggler function
    window.toggleTheme = function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        updateAllThemeToggles();
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { isDark: document.body.classList.contains('dark-mode') } }));
    };

    window.changeLanguage = function(lang) {
        localStorage.setItem('language', lang);
        // ប្រកាស Event ថ្មីដើម្បីឲ្យគ្រប់ផ្នែកដឹងថាភាសាបានប្តូរ (មិនបាច់ Reload)
        document.dispatchEvent(new CustomEvent('languageChanged'));
    };

    // កំណត់ទម្រង់ Dark Mode ដំបូងគេពេលបើកទំព័រ
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // កំណត់ស្ថានភាព Sidebar ដំបូងគេ
    const savedSidebarState = localStorage.getItem('sidebarState');
    if (savedSidebarState === 'collapsed') {
        document.body.classList.add('sidebar-collapsed');
    }

    // ធ្វើសមកាលកម្ម Dark Mode ទៅកាន់គ្រប់ទំព័រ (Tabs) ទាំងអស់ដែលកំពុងបើកក្នុងពេលតែមួយ
    window.addEventListener('storage', function(e) {
        if (e.key === 'theme') {
            if (e.newValue === 'dark') {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
            updateAllThemeToggles();
            document.dispatchEvent(new CustomEvent('themeChanged', { detail: { isDark: e.newValue === 'dark' } }));
        }
    });

    // បង្កើត និងបន្ថែមប៊ូតុង "Back to Top" ទៅក្នុងគ្រប់ទំព័រទាំងអស់
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top-btn';
    backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // មុខងារសម្រាប់បន្ថែមស្រមោល (Shadow) ទៅលើ Navbar ពេល Scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const topbar = document.querySelector('.top-dash-navbar');
        
        if (window.scrollY > 10) {
            if (navbar) navbar.classList.add('scrolled');
            if (topbar) topbar.classList.add('scrolled');
        } else {
            if (navbar) navbar.classList.remove('scrolled');
            if (topbar) topbar.classList.remove('scrolled');
        }
        
        // បង្ហាញ ឬលាក់ប៊ូតុង Back to Top នៅពេល Scroll ហួស 300px
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // មុខងារបិទបើកពាក្យសម្ងាត់ (Show/Hide Password) សម្រាប់ទំព័រ Login និង Register
    document.addEventListener('click', function(e) {
        const toggleBtn = e.target.closest('.toggle-password');
        if (toggleBtn) {
            const container = toggleBtn.closest('.input-group') || toggleBtn.parentElement;
            const input = container.querySelector('input');
            const icon = toggleBtn.querySelector('i');
            
            if (input && icon) {
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.replace('bi-eye', 'bi-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.replace('bi-eye-slash', 'bi-eye');
                }
            }
        }
    });

    // === មុខងារ Effect លោតទឹកភ្លៀង (Ripple Effect) សម្រាប់ប៊ូតុង ===
    document.addEventListener('click', function (e) {
        const btn = e.target.closest('.btn, .sidebar-menu-link, .course-card, .my-course-card, .continue-course-banner, .task-list-item');
        if (!btn) return;

        const circle = document.createElement('span');
        const diameter = Math.max(btn.clientWidth, btn.clientHeight);
        const radius = diameter / 2;
        const rect = btn.getBoundingClientRect();
        
        const x = e.clientX - rect.left - radius;
        const y = e.clientY - rect.top - radius;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
        circle.classList.add('ripple');

        btn.appendChild(circle);

        // លុបរង្វង់ចោលវិញ ក្រោយពេលចលនា (Animation) ដំណើរការចប់ ដើម្បីកុំឲ្យស្មុគស្មាញកូដ
        setTimeout(() => {
            circle.remove();
        }, 1000);
    });

    // មុខងារពិនិត្យភាពត្រឹមត្រូវនៃទម្រង់ (Form Validation) ជាសកល
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            // ពិនិត្យមើលពាក្យសម្ងាត់ និងការបញ្ជាក់ពាក្យសម្ងាត់ (បើមាន)
            const password = form.querySelector('input[name="password"]');
            const confirmPassword = form.querySelector('input[name="confirmPassword"]');
            
            if (password && confirmPassword) {
                if (password.value !== confirmPassword.value) {
                    confirmPassword.setCustomValidity('ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ');
                } else {
                    confirmPassword.setCustomValidity('');
                }
            }
            
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
        
        // ពេលវាយអក្សរម្តងទៀត ឲ្យលុបការព្រមានចេញប្រសិនបើវាត្រូវគ្នាហើយ
        const confirmPassword = form.querySelector('input[name="confirmPassword"]');
        if (confirmPassword) {
            confirmPassword.addEventListener('input', function() {
                const password = form.querySelector('input[name="password"]');
                if (password && this.value === password.value) {
                    this.setCustomValidity('');
                }
            });
        }
    });

    // កំណត់ Path ទៅកាន់ទំព័រដើមដោយស្វ័យប្រវត្តិ
    const pathName = window.location.pathname;
    const isRoot = pathName.endsWith('index.html') || pathName === '/' || pathName.endsWith('vscode/') || pathName.endsWith('vscode');
    let basePath = isRoot ? './' : '../';
    // កែសម្រួល Path សម្រាប់ទំព័រក្នុង Folder 'auth'
    if (pathName.includes('/auth/')) {
        basePath = '../../';
    }

    // អនុគមន៍សម្រាប់បញ្ចាំង (Render) ផ្នែកខាងលើ និងខាងក្រោម
    function renderComponents() {
        const currentLang = localStorage.getItem('language') || 'km';
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const translations = {
            'km': {
                'home': 'ទំព័រដើម', 'courses': 'វគ្គសិក្សា', 'teachers': 'គ្រូបង្រៀន', 'about': 'អំពីយើង', 'contact': 'ទំនាក់ទំនង', 'login': 'ចូលគណនី', 'dashboard': 'ផ្ទាំងគ្រប់គ្រង',
                'search': 'ស្វែងរកអ្វីទាំងអស់...', 'student': 'សិស្ស', 'my_account': 'គណនីរបស់ខ្ញុំ', 'settings': 'ការកំណត់', 'logout': 'ចាកចេញ',
                'footer_desc': 'វេទិកាសិក្សាតាមអនឡាញឈានមុខគេនៅកម្ពុជា ផ្តល់ជូននូវវគ្គសិក្សាគុណភាពខ្ពស់បង្រៀនដោយអ្នកជំនាញ។',
                'explore': 'ស្វែងយល់', 'all_courses': 'វគ្គសិក្សាទាំងអស់',
                'cat_web_dev': 'ការអភិវឌ្ឍគេហទំព័រ', 'cat_ui_ux': 'ការរចនា UI/UX',
                'profile_history': 'ប្រវត្តិរូប', 'terms_conditions': 'លក្ខខណ្ឌប្រើប្រាស់', 'contact_us': 'ទាក់ទងមកយើង',
                'location': 'រាជធានីភ្នំពេញ, កម្ពុជា', 'copyright': '&copy; 2026 Smart Learn. រក្សាសិទ្ធិគ្រប់យ៉ាង។',
                'dark_mode': 'ងងឹត (Dark Mode)', 'notifications': 'សេចក្តីជូនដំណឹង', 'cart': 'កន្ត្រកទិញទំនិញ',
                'subscribe': 'ទទួលព័ត៌មានថ្មីៗ', 'enter_email': 'អាសយដ្ឋានអ៊ីមែល...', 'btn_subscribe': 'ជាវ'
            },
            'en': {
                'home': 'Home', 'courses': 'Courses', 'teachers': 'Teachers', 'about': 'About Us', 'contact': 'Contact', 'login': 'Login', 'dashboard': 'Dashboard',
                'search': 'Search anything...', 'student': 'Student', 'my_account': 'My Account', 'settings': 'Settings', 'logout': 'Logout',
                'footer_desc': 'Cambodia\'s leading online learning platform offering high-quality courses taught by experts.',
                'explore': 'Explore', 'all_courses': 'All Courses',
                'cat_web_dev': 'Web Development', 'cat_ui_ux': 'UI/UX Design',
                'profile_history': 'Profile / History', 'terms_conditions': 'Terms of Use', 'contact_us': 'Contact Us',
                'location': 'Phnom Penh, Cambodia', 'copyright': '&copy; 2026 Smart Learn. All rights reserved.',
                'dark_mode': 'Dark Mode', 'notifications': 'Notifications', 'cart': 'Cart',
                'subscribe': 'Newsletter', 'enter_email': 'Email address...', 'btn_subscribe': 'Subscribe'
            }
        };
        const tr = (key) => translations[currentLang][key] || key;

        // ១. Public Navbar (សម្រាប់ទំព័រខាងក្រៅ)
        const publicNavbar = document.getElementById('public-navbar');
        if (publicNavbar) {
            const currentPath = pathName.split('/').pop() || 'index.html';
        
        // ប្តូរទៅជា container-fluid (លាតពេញ) ប្រសិនបើទំព័រនោះមាន Sidebar
        const hasSidebar = document.getElementById('app-sidebar') !== null;
        const navContainerClass = hasSidebar ? 'container-fluid px-4' : 'container';

            publicNavbar.innerHTML = `
            <nav class="navbar navbar-expand-lg sticky-top">
            <div class="${navContainerClass}">
                    <a class="navbar-brand text-primary" href="${basePath}index.html">
                        <i class="bi bi-mortarboard-fill me-2"></i>Smart Learn
                    </a>
                    <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav mx-auto mb-2 mb-lg-0 fw-medium">
                            <li class="nav-item"><a class="nav-link ${isRoot ? 'active' : ''}" href="${basePath}index.html">${tr('home')}</a></li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle ${currentPath === 'courses.html' ? 'active' : ''}" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    ${tr('courses')}
                                </a>
                                <ul class="dropdown-menu border-0 shadow-sm mt-2" style="border-radius: 12px;">
                                    <li><a class="dropdown-item py-2 fw-medium" href="${basePath}pages/courses.html"><i class="bi bi-collection me-2"></i> ${tr('all_courses')}</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item py-2 fw-medium" href="${basePath}pages/courses.html?category=ការអភិវឌ្ឍន៍"><i class="bi bi-code-slash text-primary me-2"></i> ${tr('cat_web_dev')}</a></li>
                                    <li><a class="dropdown-item py-2 fw-medium" href="${basePath}pages/courses.html?category=ការរចនា"><i class="bi bi-palette text-danger me-2"></i> ${tr('cat_ui_ux')}</a></li>
                                </ul>
                            </li>
                            <li class="nav-item"><a class="nav-link ${currentPath === 'teachers.html' ? 'active' : ''}" href="${basePath}pages/teachers.html">${tr('teachers')}</a></li>
                            <li class="nav-item"><a class="nav-link ${currentPath === 'about.html' ? 'active' : ''}" href="${basePath}pages/about.html">${tr('about')}</a></li>
                            <li class="nav-item"><a class="nav-link ${currentPath === 'contact.html' ? 'active' : ''}" href="${basePath}pages/contact.html">${tr('contact')}</a></li>
                        </ul>
                        <div class="d-flex align-items-center gap-2">
                            <button class="btn btn-light border-0 p-2" id="publicThemeToggle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${tr('dark_mode')}" style="border-radius: 8px; width: 38px; height: 38px;">
                                <i class="bi bi-moon-stars-fill"></i>
                            </button>
                            <a href="${basePath}pages/checkout.html" class="btn btn-light position-relative p-2 d-flex align-items-center justify-content-center" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${tr('cart')}" style="border-radius: 8px; width: 38px; height: 38px;">
                                <i class="bi bi-cart3"></i>
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger d-none cart-badge-count" style="font-size: 10px;">0</span>
                            </a>
                            <div class="dropdown">
                                <button class="btn btn-light border-0 p-2 text-muted bg-transparent" type="button" data-bs-toggle="dropdown" style="border-radius: 8px;">
                                    <i class="bi bi-globe me-1"></i> ${currentLang === 'km' ? 'KM' : 'EN'}
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2" style="border-radius: 12px; min-width: 120px;">
                                    <li><a class="dropdown-item ${currentLang === 'km' ? 'active' : ''}" href="#" onclick="changeLanguage('km')">ខ្មែរ (KM)</a></li>
                                    <li><a class="dropdown-item ${currentLang === 'en' ? 'active' : ''}" href="#" onclick="changeLanguage('en')">English (EN)</a></li>
                                </ul>
                            </div>
                            ${isLoggedIn ?
                                `<div class="dropdown ms-2">
                                    <button class="btn border-0 p-0 d-flex align-items-center gap-2" data-bs-toggle="dropdown">
                                        <img src="${localStorage.getItem('profile_image') || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}" alt="User" class="rounded-circle object-fit-cover shadow-sm" style="width: 38px; height: 38px;">
                                        <div class="d-none d-lg-block text-start">
                                            <p class="mb-0 fw-bold small text-dark lh-1">${localStorage.getItem('profile_firstName') || 'John'}</p>
                                        </div>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end shadow-sm border-light-subtle mt-2" style="border-radius: 12px; min-width: 200px;">
                                        <li><a class="dropdown-item py-2 fw-medium" href="${basePath}pages/dashboard.html"><i class="bi bi-grid-1x2 me-2"></i> ${tr('dashboard')}</a></li>
                                        <li><a class="dropdown-item py-2 fw-medium" href="${basePath}pages/profile.html"><i class="bi bi-person me-2"></i> ${tr('my_account')}</a></li>
                                        <li><a class="dropdown-item py-2 fw-medium" href="${basePath}pages/profile.html"><i class="bi bi-gear me-2"></i> ${tr('settings')}</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item py-2 fw-medium text-danger" href="#" onclick="event.preventDefault(); localStorage.removeItem('isLoggedIn'); window.location.replace('${basePath}index.html');"><i class="bi bi-box-arrow-right me-2"></i> ${tr('logout')}</a></li>
                                    </ul>
                                </div>` :
                                `<a href="${basePath}pages/auth/login.html" class="btn btn-primary fw-semibold px-4 ms-2" style="border-radius: 8px;">${tr('login')}</a>`
                            }
                        </div>
                    </div>
                </div>
            </nav>
        `;

            // Add event listener for the new public theme toggle button
            const publicThemeToggle = document.getElementById('publicThemeToggle');
            if (publicThemeToggle) {
                publicThemeToggle.addEventListener('click', window.toggleTheme);
            }
    }

    // ២. Public Footer (សម្រាប់ទំព័រខាងក្រៅ)
    const publicFooter = document.getElementById('public-footer');
    if (publicFooter) {
        
        // ប្តូរទៅជា container-fluid (លាតពេញ) ប្រសិនបើទំព័រនោះមាន Sidebar
        const hasSidebar = document.getElementById('app-sidebar') !== null;
        const footerContainerClass = hasSidebar ? 'container-fluid px-4' : 'container';

        publicFooter.innerHTML = `
            <footer class="custom-footer text-white pt-5 pb-4 mt-5">
                <div class="${footerContainerClass}">
                    <div class="row g-4">
                        <div class="col-lg-4 col-md-6">
                            <h4 class="footer-brand text-white mb-3"><i class="bi bi-mortarboard-fill text-primary me-2"></i>Smart Learn</h4>
                            <p class="text-white-50 small mb-4">${tr('footer_desc')}</p>
                            <div class="d-flex gap-3">
                                <a href="#" class="text-white-50 text-white-hover fs-5"><i class="bi bi-facebook"></i></a>
                                <a href="#" class="text-white-50 text-white-hover fs-5"><i class="bi bi-youtube"></i></a>
                                <a href="#" class="text-white-50 text-white-hover fs-5"><i class="bi bi-telegram"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-6">
                            <h5 class="text-white mb-3 fs-6">${tr('explore')}</h5>
                            <ul class="list-unstyled footer-links small">
                                <li class="mb-2"><a href="${basePath}pages/courses.html" class="text-white-50 text-decoration-none">${tr('all_courses')}</a></li>
                                <li class="mb-2"><a href="${basePath}pages/teachers.html" class="text-white-50 text-decoration-none">${tr('teachers')}</a></li>
                            </ul>
                        </div>
                        <div class="col-lg-2 col-md-6">
                            <h5 class="text-white mb-3 fs-6">${tr('about')}</h5>
                            <ul class="list-unstyled footer-links small">
                                <li class="mb-2"><a href="${basePath}pages/about.html" class="text-white-50 text-decoration-none">${tr('profile_history')}</a></li>
                                <li class="mb-2"><a href="${basePath}pages/contact.html" class="text-white-50 text-decoration-none">${tr('contact')}</a></li>
                                <li class="mb-2"><a href="${basePath}pages/about.html" class="text-white-50 text-decoration-none">${tr('terms_conditions')}</a></li>
                            </ul>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <h5 class="text-white mb-3 fs-6">${tr('contact_us')}</h5>
                            <ul class="list-unstyled text-white-50 small mb-4">
                                <li class="mb-2"><i class="bi bi-geo-alt me-2"></i> ${tr('location')}</li>
                                <li class="mb-2"><i class="bi bi-telephone me-2"></i> +855 12 345 678</li>
                                <li class="mb-2"><i class="bi bi-envelope me-2"></i> support@smartlearn.com</li>
                            </ul>
                            <h5 class="text-white mb-3 fs-6">${tr('subscribe')}</h5>
                            <div class="input-group shadow-sm">
                                <input type="email" class="form-control border-0 bg-light bg-opacity-10 text-white shadow-none" placeholder="${tr('enter_email')}" style="font-size: 13px; border-radius: 8px 0 0 8px !important;">
                                <button class="btn btn-primary px-3 fw-bold" type="button" style="font-size: 13px; border-radius: 0 8px 8px 0 !important;" onclick="if(typeof Swal !== 'undefined'){Swal.fire({toast:true,position:'bottom-end',icon:'success',title:'អរគុណសម្រាប់ការចុះឈ្មោះ!',showConfirmButton:false,timer:3000})}">${tr('btn_subscribe')}</button>
                            </div>
                        </div>
                    </div>
                    <hr class="border-secondary mt-4 mb-4">
                    <div class="text-center text-white-50 small">
                        ${tr('copyright')}
                    </div>
                </div>
            </footer>
        `;

        // បន្ថែមមុខងារ Smooth Scroll សម្រាប់អ្នកដែលចុចលើ Links ក្នុង Footer (ដែលមាន href="#...")
        const footerLinks = publicFooter.querySelectorAll('a[href^="#"]');
        footerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                // បើចុចលើ "#" ទទេ គឺឲ្យអូសទៅលើគេយ៉ាងរលូន
                if (targetId === '#') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    // រកមើល Section ដែលត្រូវទៅ (ឧទាហរណ៍ href="#about")
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        // ដកកម្ពស់ Navbar ចេញ ដើម្បីកុំឲ្យ Navbar បាំងពីលើ Section ពេល Scroll ដល់
                        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // ៤. Dashboard Top Navbar (Topbar សម្រាប់ទំព័រខាងក្នុង)
    const dashboardTopbar = document.getElementById('dashboard-topbar');
    if (dashboardTopbar) {
        dashboardTopbar.innerHTML = `
            <div class="d-flex align-items-center gap-3 w-100">
                <button class="btn btn-light d-lg-none" id="mobileMenuToggle">
                    <i class="bi bi-list fs-5"></i>
                </button>
                <div class="top-search-bar d-none d-md-flex">
                    <i class="bi bi-search text-muted" id="globalSearchIcon" style="cursor: pointer;" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${tr('search')}"></i>
                    <input type="text" id="globalSearchInput" placeholder="${tr('search')}">
                </div>
                
                <div class="d-flex align-items-center gap-3 ms-auto">
                    <div class="dropdown">
                        <button class="btn btn-light position-relative" type="button" data-bs-toggle="dropdown" style="border-radius: 50%; width: 40px; height: 40px; padding: 0; line-height: 40px;">
                            <i class="bi bi-globe"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end shadow border-light-subtle mt-2" style="border-radius: 12px; min-width: 150px;">
                            <li><a class="dropdown-item py-2 fw-medium ${currentLang === 'km' ? 'active' : ''}" href="#" onclick="changeLanguage('km')">ភាសាខ្មែរ</a></li>
                            <li><a class="dropdown-item py-2 fw-medium ${currentLang === 'en' ? 'active' : ''}" href="#" onclick="changeLanguage('en')">English</a></li>
                        </ul>
                    </div>

                    <a href="notifications.html" class="btn btn-light position-relative" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${tr('notifications')}" style="border-radius: 50%; width: 40px; height: 40px; padding: 0; line-height: 40px;">
                        <i class="bi bi-bell"></i>
                        <span class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
                    </a>

                    <a href="checkout.html" class="btn btn-light position-relative text-center" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${tr('cart')}" style="border-radius: 50%; width: 40px; height: 40px; padding: 0; line-height: 40px;">
                        <i class="bi bi-cart3"></i>
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger d-none cart-badge-count" style="font-size: 10px; line-height: 1.2;">0</span>
                    </a>

                    <div class="dropdown">
                        <button class="btn border-0 p-0 d-flex align-items-center gap-2" data-bs-toggle="dropdown">
                            <img src="${localStorage.getItem('profile_image') || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}" id="topbarUserImg" alt="User" class="rounded-circle object-fit-cover shadow-sm" style="width: 40px; height: 40px;">
                            <div class="d-none d-md-block text-start">
                                <p class="mb-0 fw-bold small text-dark lh-1" id="topbarUserName">${localStorage.getItem('profile_firstName') || 'John'}</p>
                                <span class="text-muted" style="font-size: 11px;">${tr('student')}</span>
                            </div>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end shadow border-light-subtle mt-2" style="border-radius: 12px; min-width: 200px;">
                            <li><a class="dropdown-item py-2 fw-medium" href="profile.html"><i class="bi bi-person me-2"></i> ${tr('my_account')}</a></li>
                        <li><a class="dropdown-item py-2 fw-medium" href="profile.html"><i class="bi bi-gear me-2"></i> ${tr('settings')}</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item py-2 fw-medium text-danger" href="#" onclick="event.preventDefault(); localStorage.removeItem('isLoggedIn'); window.location.replace('${basePath}index.html');"><i class="bi bi-box-arrow-right me-2"></i> ${tr('logout')}</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        // មុខងារស្វែងរក (Search) ពី Navbar
        const globalSearchInput = document.getElementById('globalSearchInput');
        const globalSearchIcon = document.getElementById('globalSearchIcon');
        
        function executeGlobalSearch() {
            const query = globalSearchInput.value.trim();
            if (query) {
                localStorage.setItem('courseSearchQuery', query);
                window.location.href = `${basePath}pages/courses.html`;
            }
        }

        if (globalSearchInput) {
            globalSearchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') executeGlobalSearch();
            });
        }
        if (globalSearchIcon) {
            globalSearchIcon.addEventListener('click', executeGlobalSearch);
        }

        // មុខងារបើក/បិទ Sidebar នៅលើទូរស័ព្ទដៃ
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (mobileMenuToggle) {
                mobileMenuToggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    if (window.innerWidth < 992) {
                        document.body.classList.toggle('sidebar-open');
                    } else {
                        document.body.classList.toggle('sidebar-collapsed');
                        localStorage.setItem('sidebarState', document.body.classList.contains('sidebar-collapsed') ? 'collapsed' : 'expanded');
                    }
            });
        }
    }
    }

    // បញ្ចាំង Components លើកដំបូងពេលបើកទំព័រ
    renderComponents();
    
    // ស្តាប់ការផ្លាស់ប្តូរភាសា ហើយបញ្ចាំង Components ម្តងទៀត
    document.addEventListener('languageChanged', renderComponents);

    // ចាប់ផ្តើមត្រួតពិនិត្យការ Scroll សម្រាប់ Animation លើធាតុដែលបានផ្ទុកដំបូង
    initializeScrollObserver();
});