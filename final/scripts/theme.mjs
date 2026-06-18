const THEME_KEY = 'final-theme';

const toggle = document.getElementById('themeToggle');

function applyTheme(theme){
  if(theme === 'dark'){
    document.body.classList.add('dark');
    if(toggle) toggle.setAttribute('aria-pressed','true');
  } else {
    document.body.classList.remove('dark');
    if(toggle) toggle.setAttribute('aria-pressed','false');
  }
}

function initTheme(){
  const stored = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);

  if(toggle){
    toggle.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark');
      const next = isDark ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  }

  if(!stored && window.matchMedia){
    try{
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if(!localStorage.getItem(THEME_KEY)){
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }catch(e){
      // older browsers fallback: no-op
    }
  }
}

initTheme();
