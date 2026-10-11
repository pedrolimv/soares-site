/* Aplica o tema salvo antes da primeira pintura, evitando piscar o tema errado. */
try{var t=localStorage.getItem('soares-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}
