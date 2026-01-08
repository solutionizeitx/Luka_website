// Small JS helpers: year, parallax effect, and anchor offset for fixed navbar
(function(){
  // set current year
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = y;

  // Parallax: adjust background position for elements with data-parallax
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if(parallaxEls.length){
    let ticking = false;
    function onScroll(){
      if(!ticking){
        window.requestAnimationFrame(()=>{
          const scrolled = window.scrollY;
          parallaxEls.forEach(el=>{
            // subtle effect: move bg position
            el.style.backgroundPosition = `center ${Math.round(scrolled * 0.3)}px`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  // Smooth anchor scrolling with offset (fixed navbar)
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const targetId = this.getAttribute('href').slice(1);
      if(!targetId) return;
      const el = document.getElementById(targetId);
      if(el){
        e.preventDefault();
        const nav = document.querySelector('.navbar');
        const navHeight = nav ? nav.getBoundingClientRect().height : 80;
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 12;
        window.scrollTo({top, behavior:'smooth'});
      }
    });
  });
})();
