import { computed, reactive } from 'vue';

const USER_KEY = 'smartLearnCodeUser';
const THEME_KEY = 'smartLearnCodeTheme';
const LANGUAGE_KEY = 'smartLearnCodeLanguage';

const messages = {
  km: {
    'nav.home': 'ទំព័រដើម',
    'nav.courses': 'វគ្គសិក្សា',
    'nav.roadmap': 'ផ្លូវរៀន',
    'nav.challenges': 'លំហាត់',
    'nav.about': 'អំពីយើង',
    'nav.login': 'ចូលប្រើ',
    'nav.signup': 'ចុះឈ្មោះ',
    'nav.search': 'ស្វែងរក',
    'brand.name': 'Smart Learn Code',
    'sidebar.dashboard': 'ផ្ទាំងគ្រប់គ្រង',
    'sidebar.myCourses': 'វគ្គរបស់ខ្ញុំ',
    'sidebar.learning': 'រៀន',
    'sidebar.quiz': 'សំណួរ',
    'sidebar.assignments': 'កិច្ចការ',
    'sidebar.certificates': 'វិញ្ញាបនបត្រ',
    'sidebar.profile': 'ប្រវត្តិរូប',
    'sidebar.upgradeTitle': 'ដំឡើងទៅ Pro',
    'sidebar.upgradeText': 'ចូលប្រើវគ្គសិក្សា ឯកសារ និងវិញ្ញាបនបត្រពិសេស។',
    'sidebar.upgradeButton': 'ដំឡើងឥឡូវនេះ',
    'sidebar.help': 'ត្រូវការជំនួយ?',
    'sidebar.helpLink': 'ទៅកាន់មជ្ឈមណ្ឌលជំនួយ →',
    'hero.eyebrow': 'រៀនសរសេរកូដ។ បង្កើតអនាគត',
    'hero.titleA': 'រៀន',
    'hero.titleCode': 'កូដ។',
    'hero.titleB': 'បង្កើតអ្វីៗបាន',
    'hero.subtitle': 'មេរៀនសរសេរកូដជាជំហានៗ គម្រោងពិត និងលំហាត់ប្រកួតប្រជែង ដើម្បីជួយអ្នកក្លាយជាអ្នកអភិវឌ្ឍន៍ល្អជាងមុន។',
    'hero.start': 'ចាប់ផ្ដើមរៀនឥឡូវនេះ →',
    'hero.explore': 'មើលវគ្គសិក្សា ▷',
    'hero.learners': 'អ្នករៀនសប្បាយចិត្ត',
    'home.features.structured': 'មេរៀនមានលំដាប់',
    'home.features.structuredText': 'ពីមូលដ្ឋានដល់កម្រិតខ្ពស់ រៀបចំឱ្យងាយរៀន។',
    'home.features.practice': 'អនុវត្ត និងបង្កើត',
    'home.features.practiceText': 'ហាត់សរសេរកូដជាមួយគម្រោងពិត។',
    'home.features.track': 'តាមដានវឌ្ឍនភាព',
    'home.features.trackText': 'តាមដានការរៀន និងសម្រេចគោលដៅ។',
    'home.features.challenge': 'លំហាត់សរសេរកូដ',
    'home.features.challengeText': 'ពង្រឹងជំនាញជាមួយលំហាត់រីករាយ។',
    'home.popular': 'វគ្គពេញនិយម',
    'home.popularText': 'បង្ហាញតែវគ្គសរសេរកូដ និងជំនាញ developer ប៉ុណ្ណោះ។',
    'home.viewAll': 'មើលវគ្គទាំងអស់ →',
    'home.path': 'ផ្លូវរៀនដែលបានណែនាំ',
    'home.pathText': 'ចាប់ផ្ដើមពីមូលដ្ឋាន រួចបន្តទៅការអភិវឌ្ឍន៍ app ទំនើប។',
    'home.categories': 'ប្រភេទវគ្គ',
    'home.categoriesText': 'រកមើលមេរៀនកូដតាមផ្នែក។',
    'home.teachers': 'គ្រូបង្រៀន',
    'home.teachersText': 'អ្នកណែនាំផ្តោតលើជំនាញសរសេរកូដអនុវត្ត។',
    'home.ctaTitle': 'ត្រៀមចាប់ផ្ដើមដំណើរការសរសេរកូដហើយឬនៅ?',
    'home.ctaText': 'ចូលរួម Smart Learn Code ហើយក្លាយជាអ្នកអភិវឌ្ឍន៍ល្អជាងមុនរៀងរាល់ថ្ងៃ។',
    'home.email': 'បញ្ចូលអ៊ីមែលរបស់អ្នក',
    'home.getStarted': 'ចាប់ផ្ដើមឥតគិតថ្លៃ →',
    'home.testimonials': 'មតិយោបល់',
    'home.testimonialsText': 'មតិពីអ្នករៀនដែលកំពុងបង្កើតគម្រោងពិត។',
    'courses.titleA': 'វគ្គសិក្សា',
    'courses.titleB': 'ទាំងអស់',
    'courses.subtitle': 'ស្វែងរកវគ្គសរសេរកូដ និងរៀនជំនាញ programming ដែលកំពុងត្រូវការ។',
    'courses.search': 'ស្វែងរកវគ្គ ប្រធានបទ ឬជំនាញ...',
    'courses.filters': 'តម្រង',
    'courses.categories': 'ប្រភេទ',
    'courses.level': 'កម្រិត',
    'courses.allLevels': 'គ្រប់កម្រិត',
    'courses.found': 'វគ្គត្រូវបានរកឃើញ',
    'courses.sort': 'តម្រៀបតាម',
    'courses.empty': 'មិនមានវគ្គសរសេរកូដត្រូវនឹងការស្វែងរកទេ។ សូមសាកល្បងពាក្យគន្លឹះ ឬប្រភេទផ្សេង។',
    'courses.proTitle': 'ក្លាយជា Pro Developer',
    'courses.proText': 'ចូលប្រើវគ្គទាំងអស់ គម្រោង និងវិញ្ញាបនបត្រ។',
    'courses.upgrade': 'ដំឡើងឥឡូវនេះ',
    'auth.required': 'សូមបង្កើតគណនីជាមុនសិន ដើម្បីមើលទំព័រនេះ។',
    'login.title': 'សូមស្វាគមន៍ត្រឡប់មកវិញ!',
    'login.subtitle': 'ចូលប្រើដើម្បីបន្តដំណើរការរៀនកូដ និងមើលផ្ទាំងគ្រប់គ្រង។',
    'login.email': 'អ៊ីមែល',
    'login.password': 'ពាក្យសម្ងាត់',
    'login.remember': 'ចងចាំខ្ញុំ',
    'login.button': 'ចូលប្រើ →',
    'login.noAccount': 'មិនទាន់មានគណនីទេ? ចុះឈ្មោះ',
    'login.needAccount': 'សូមបង្កើតគណនីជាមុនសិន។',
    'register.title': 'បង្កើតគណនីថ្មី',
    'register.subtitle': 'ចូលរួម Smart Learn Code ហើយចាប់ផ្ដើមដំណើរការរៀនកូដថ្ងៃនេះ។',
    'register.fullName': 'ឈ្មោះពេញ',
    'register.email': 'អ៊ីមែល',
    'register.password': 'ពាក្យសម្ងាត់',
    'register.confirm': 'បញ្ជាក់ពាក្យសម្ងាត់',
    'register.terms': 'ខ្ញុំយល់ព្រមលក្ខខណ្ឌប្រើប្រាស់ និងគោលការណ៍ភាពឯកជន',
    'register.button': 'បង្កើតគណនី →',
    'register.hasAccount': 'មានគណនីរួចហើយ? ចូលប្រើ',
    'common.theme': 'ពណ៌',
    'common.dark': 'ងងឹត',
    'common.light': 'ភ្លឺ',
    'common.language': 'ភាសា',
    'common.khmer': 'ខ្មែរ',
    'common.english': 'English',
    'footer.description': 'រៀនកូដ។ បង្កើតអ្វីៗបាន។ កន្លែងល្អសម្រាប់រៀន programming ជាជំហានៗ។',
    'footer.quickLinks': 'តំណរហ័ស',
    'footer.resources': 'ធនធាន',
    'footer.contact': 'ទំនាក់ទំនង',
    'footer.rights': '© 2026 Smart Learn Code។ រក្សាសិទ្ធិគ្រប់យ៉ាង។',
    'footer.backTop': 'ត្រឡប់ទៅលើ ↑'
  },
  en: {
    'nav.home': 'Home',
    'nav.courses': 'Courses',
    'nav.roadmap': 'Roadmap',
    'nav.challenges': 'Challenges',
    'nav.about': 'About Us',
    'nav.login': 'Log In',
    'nav.signup': 'Sign Up',
    'nav.search': 'Search',
    'brand.name': 'Smart Learn Code',
    'sidebar.dashboard': 'Dashboard',
    'sidebar.myCourses': 'My Courses',
    'sidebar.learning': 'Learning',
    'sidebar.quiz': 'Quiz',
    'sidebar.assignments': 'Assignments',
    'sidebar.certificates': 'Certificates',
    'sidebar.profile': 'Profile',
    'sidebar.upgradeTitle': 'Upgrade to Pro',
    'sidebar.upgradeText': 'Access premium coding courses, resources, and certificates.',
    'sidebar.upgradeButton': 'Upgrade Now',
    'sidebar.help': 'Need help?',
    'sidebar.helpLink': 'Visit Help Center →',
    'hero.eyebrow': 'Learn Code. Build the Future',
    'hero.titleA': 'Learn',
    'hero.titleCode': 'Code.',
    'hero.titleB': 'Build Anything.',
    'hero.subtitle': 'Step-by-step coding lessons, real projects, and challenges to help you become a better developer.',
    'hero.start': 'Start Learning Now →',
    'hero.explore': 'Explore Courses ▷',
    'hero.learners': 'Happy Learners',
    'home.features.structured': 'Structured Lessons',
    'home.features.structuredText': 'From basics to advanced, well organized for you.',
    'home.features.practice': 'Practice & Build',
    'home.features.practiceText': 'Practice coding with real projects.',
    'home.features.track': 'Track Progress',
    'home.features.trackText': 'Track your learning and achieve goals.',
    'home.features.challenge': 'Coding Challenges',
    'home.features.challengeText': 'Sharpen your skills with fun challenges.',
    'home.popular': 'Popular Courses',
    'home.popularText': 'Only coding and developer courses are shown.',
    'home.viewAll': 'View All Courses →',
    'home.path': 'Recommended Learning Path',
    'home.pathText': 'Start from the basics and move into modern app development.',
    'home.categories': 'Categories',
    'home.categoriesText': 'Browse coding topics by focus area.',
    'home.teachers': 'Teachers',
    'home.teachersText': 'Mentors focused on practical coding skills.',
    'home.ctaTitle': 'Ready to start your coding journey?',
    'home.ctaText': 'Join Smart Learn Code and become a better developer every day.',
    'home.email': 'Enter your email',
    'home.getStarted': 'Get Started Free →',
    'home.testimonials': 'Testimonials',
    'home.testimonialsText': 'Feedback from learners building real projects.',
    'courses.titleA': 'All',
    'courses.titleB': 'Courses',
    'courses.subtitle': 'Explore coding courses and master in-demand programming skills.',
    'courses.search': 'Search courses, topics or skills...',
    'courses.filters': 'Filters',
    'courses.categories': 'Categories',
    'courses.level': 'Level',
    'courses.allLevels': 'All Levels',
    'courses.found': 'Courses Found',
    'courses.sort': 'Sort by',
    'courses.empty': 'No coding courses found. Try another keyword or category.',
    'courses.proTitle': 'Become a Pro Developer',
    'courses.proText': 'Get unlimited access to all courses, projects, and certificates.',
    'courses.upgrade': 'Upgrade Now',
    'auth.required': 'Please create an account before viewing this page.',
    'login.title': 'Welcome back!',
    'login.subtitle': 'Login to continue your coding journey and access your learning dashboard.',
    'login.email': 'Email Address',
    'login.password': 'Password',
    'login.remember': 'Remember me',
    'login.button': 'Login →',
    'login.noAccount': 'Need an account? Register',
    'login.needAccount': 'Please create an account first.',
    'register.title': 'Create Your Account',
    'register.subtitle': 'Join Smart Learn Code and start your coding journey today.',
    'register.fullName': 'Full Name',
    'register.email': 'Email Address',
    'register.password': 'Password',
    'register.confirm': 'Confirm Password',
    'register.terms': 'I agree to the Terms of Service and Privacy Policy',
    'register.button': 'Create Account →',
    'register.hasAccount': 'Already have an account? Log in',
    'common.theme': 'Theme',
    'common.dark': 'Dark',
    'common.light': 'Light',
    'common.language': 'Language',
    'common.khmer': 'ខ្មែរ',
    'common.english': 'English',
    'footer.description': 'Learn code. Build anything. The best place to learn programming step by step.',
    'footer.quickLinks': 'Quick Links',
    'footer.resources': 'Resources',
    'footer.contact': 'Contact Us',
    'footer.rights': '© 2026 Smart Learn Code. All rights reserved.',
    'footer.backTop': 'Back to top ↑'
  }
};

const khmerCourses = {
  'javascript-fundamentals': {
    title: 'JavaScript មូលដ្ឋាន',
    description: 'រៀន JavaScript ពីមូលដ្ឋាន និងបង្កើតគម្រោងពិត សម្រាប់អ្នកចង់ក្លាយជា developer ដោយមានទំនុកចិត្ត។'
  },
  'react-essentials': {
    title: 'React.js សំខាន់ៗ',
    description: 'បង្កើត web app ទំនើបជាមួយ React, Hooks, component patterns និង UI ដែលអាចប្រើឡើងវិញបាន។'
  },
  'vue-mastery': {
    title: 'វគ្គជំនាញ Vue.js 3',
    description: 'រៀន Vue 3, Composition API, Vue Router និងបង្កើត single-page application ស្អាតៗ។'
  },
  'node-guide': {
    title: 'Node.js សម្រាប់អ្នកចាប់ផ្ដើម',
    description: 'រៀន backend development ជាមួយ Node.js, Express, REST APIs និង MongoDB ពីសូន្យ។'
  },
  'python-basics': {
    title: 'Python សម្រាប់អ្នកចាប់ផ្ដើម',
    description: 'រៀន Python ពីមូលដ្ឋានជាមួយគម្រោងអនុវត្ត functions, loops និង data structures។'
  },
  'html-css-crash': {
    title: 'HTML & CSS រហ័ស',
    description: 'រៀន HTML5 និង CSS3 ដើម្បីបង្កើត website responsive ស្អាតៗ។'
  },
  'typescript-guide': {
    title: 'TypeScript ពេញលេញ',
    description: 'រៀន TypeScript ដើម្បីបង្កើត application ធំៗដោយមានទំនុកចិត្ត។'
  },
  'git-github': {
    title: 'Git & GitHub រហ័ស',
    description: 'រៀន Git, GitHub និង version control ដូចជា developer អាជីព។'
  },
  'data-structures': {
    title: 'Data Structures & Algorithms',
    description: 'រៀន DSA ជាមួយ JavaScript ដើម្បីដោះស្រាយបញ្ហា និងត្រៀមសម្ភាសន៍ការងារ។'
  }
};

const state = reactive({
  user: readJson(USER_KEY),
  theme: readString(THEME_KEY, 'dark'),
  language: readString(LANGUAGE_KEY, 'km')
});

applySettings();

export function useAppState() {
  const hasAccount = computed(() => Boolean(state.user));
  const themeLabel = computed(() => (state.theme === 'dark' ? t('common.dark') : t('common.light')));
  const languageLabel = computed(() => (state.language === 'km' ? t('common.khmer') : t('common.english')));

  return {
    state,
    hasAccount,
    themeLabel,
    languageLabel,
    t,
    createAccount,
    loginWithExistingAccount,
    toggleTheme,
    toggleLanguage,
    setTheme,
    setLanguage,
    courseTitle,
    courseDescription,
    levelLabel
  };
}

export function accountExists() {
  return Boolean(readJson(USER_KEY));
}

function t(key) {
  return messages[state.language]?.[key] || messages.en[key] || key;
}

function courseTitle(course) {
  return state.language === 'km' ? course.titleKm || khmerCourses[course.id]?.title || course.title : course.title;
}

function courseDescription(course) {
  return state.language === 'km' ? course.descriptionKm || khmerCourses[course.id]?.description || course.description : course.description;
}

function levelLabel(level) {
  if (state.language !== 'km') return level;
  if (level === 'Beginner') return 'មូលដ្ឋាន';
  if (level === 'Intermediate') return 'មធ្យម';
  if (level === 'Advanced') return 'កម្រិតខ្ពស់';
  if (level === 'All Levels') return t('courses.allLevels');
  return level;
}

function createAccount(payload) {
  const user = {
    name: payload.name || 'Dev San',
    email: payload.email || 'devsan@gmail.com',
    createdAt: new Date().toISOString()
  };
  state.user = user;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

function loginWithExistingAccount(email) {
  const savedUser = readJson(USER_KEY);
  if (!savedUser) {
    return { ok: false, message: t('login.needAccount') };
  }

  state.user = savedUser;
  if (email && savedUser.email && email.toLowerCase() !== savedUser.email.toLowerCase()) {
    return { ok: false, message: t('login.needAccount') };
  }

  return { ok: true, user: savedUser };
}

function toggleTheme() {
  setTheme(state.theme === 'dark' ? 'light' : 'dark');
}

function toggleLanguage() {
  setLanguage(state.language === 'km' ? 'en' : 'km');
}

function setTheme(theme) {
  state.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  applySettings();
}

function setLanguage(language) {
  state.language = language;
  localStorage.setItem(LANGUAGE_KEY, language);
  applySettings();
}

function applySettings() {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = state.theme;
  document.documentElement.lang = state.language === 'km' ? 'km' : 'en';
}

function readJson(key) {
  if (typeof localStorage === 'undefined') return null;
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

function readString(key, fallback) {
  if (typeof localStorage === 'undefined') return fallback;
  return localStorage.getItem(key) || fallback;
}
