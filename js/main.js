(function(){
  // Footer year
  var y=document.getElementById('y');
  if(y){ y.textContent=new Date().getFullYear(); }
  
  // Testimonial slider
  var sliders = document.querySelectorAll('.testimonial-slider');
  sliders.forEach(function(slider){
    var track = slider.querySelector('.slides');
    if(!track) return;
    var cards = Array.from(track.children);
    var prev = slider.querySelector('.t-prev');
    var next = slider.querySelector('.t-next');
    var dotsWrap = slider.querySelector('.t-dots');
    var autoplayMs = parseInt(slider.getAttribute('data-autoplay')||'5000',10);
    var idx = 0;

    function perView(){
      var w = window.innerWidth || document.documentElement.clientWidth;
      if(w >= 980) return 3;
      if(w >= 640) return 2;
      return 1;
    }

    function maxStart(){ return Math.max(0, cards.length - perView()); }

    function goTo(i){
      if(i < 0) i = maxStart();
      if(i > maxStart()) i = 0;
      idx = i;
      var el = cards[idx];
      if(el){ track.scrollTo({ left: el.offsetLeft, behavior: 'smooth' }); }
      updateDots();
    }

    function nextPage(){ goTo(idx + perView()); }
    function prevPage(){ goTo(idx - perView()); }

    // Dots
    function buildDots(){
      if(!dotsWrap) return;
      dotsWrap.innerHTML = '';
      var total = maxStart()+1;
      for(var i=0;i<total;i++){
        var b = document.createElement('button');
        (function(j){ b.addEventListener('click', function(){ goTo(j); }); })(i);
        dotsWrap.appendChild(b);
      }
      updateDots();
    }
    function updateDots(){
      if(!dotsWrap) return;
      var btns = dotsWrap.querySelectorAll('button');
      btns.forEach(function(b, i){ b.classList.toggle('active', i===idx); });
    }

    // Autoplay
    var timer;
    function start(){ if(autoplayMs>0){ stop(); timer = setInterval(nextPage, autoplayMs); } }
    function stop(){ if(timer){ clearInterval(timer); timer = null; } }

    // Events
    if(prev) prev.addEventListener('click', function(){ prevPage(); });
    if(next) next.addEventListener('click', function(){ nextPage(); });
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    window.addEventListener('resize', function(){ buildDots(); goTo(idx); });

    // Init
    buildDots();
    goTo(0);
    start();
  });
})();
