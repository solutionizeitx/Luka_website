// Small JS helpers: year, parallax effect, and anchor offset for fixed navbar
(function(){
  // set current year
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = y;

  // Parallax for hero carousel slides
  const heroSlides = document.querySelectorAll('.hero-carousel .carousel-item');
  if(heroSlides.length){
    let ticking = false;
    function updateParallax(){
      if(!ticking){
        window.requestAnimationFrame(()=>{
          heroSlides.forEach(slide=>{
            const rect = slide.getBoundingClientRect();
            const centerOffset = rect.top + rect.height/2 - window.innerHeight/2;
            const movement = Math.round(-centerOffset * 0.12);
            slide.style.backgroundPosition = `center ${movement}px`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener('scroll', updateParallax, {passive:true});
    window.addEventListener('resize', updateParallax);
    updateParallax();
    const carouselEl = document.getElementById('heroCarousel');
    if(carouselEl){
      carouselEl.addEventListener('slid.bs.carousel', ()=> updateParallax());
    }
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
