document.addEventListener('DOMContentLoaded', () => {
  const langSwitcher = document.querySelector('.lang-switcher');
  let currentLang = localStorage.getItem('lang') || 'fr';
  let translations = {};

  async function fetchTranslations() {
    try {
      let res = await fetch('/translations.json');
      if (!res.ok) {
        res = await fetch('../translations.json');
      }
      if (!res.ok) throw new Error('Failed to fetch translations');
      
      translations = await res.json();
      translatePage(currentLang, document.body);
      observeDOMChanges();
    } catch (error) {
      console.error('Error fetching translations:', error);
    }
  }

  function translatePage(lang, scope) {
    const elements = scope.querySelectorAll('[data-translate-key]');
    elements.forEach(el => {
      const key = el.getAttribute('data-translate-key');
      if (translations[lang] && translations[lang][key]) {
        if (el.placeholder && (key.includes('placeholder') || el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {
          el.placeholder = translations[lang][key];
        } else {
          el.innerHTML = translations[lang][key];
        }
      }
    });
    document.documentElement.lang = lang;
    updateSwitcherUI(lang);
  }

  function updateSwitcherUI(lang) {
    const fr = document.querySelector('.lang-fr');
    const en = document.querySelector('.lang-en');
    if (fr && en) {
        fr.classList.toggle('active', lang === 'fr');
        en.classList.toggle('active', lang === 'en');
    }
  }

  function observeDOMChanges() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            translatePage(currentLang, node);
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (langSwitcher) {
    langSwitcher.addEventListener('click', (e) => {
      let newLang = null;
      if (e.target.classList.contains('lang-fr')) {
        newLang = 'fr';
      } else if (e.target.classList.contains('lang-en')) {
        newLang = 'en';
      }

      if (newLang && newLang !== currentLang) {
        currentLang = newLang;
        localStorage.setItem('lang', currentLang);
        translatePage(currentLang, document.body);
      }
    });
  }

  fetchTranslations();
});

