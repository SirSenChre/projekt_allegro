 const slider   = document.getElementById('bannerSlider');
    const images   = slider.querySelectorAll('img');
    const prevBtn  = slider.querySelector('.prev');
    const nextBtn  = slider.querySelector('.next');
    const dotsBox  = document.getElementById('dots');
    let   index    = 0;
    const autoTime = 5000; // ms; usuń lub zmodyfikuj, by zmienić prędkość
    let   timer;

    // generuj kropki
    images.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i===0 ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i+1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsBox.appendChild(dot);
    });

    const dots = dotsBox.querySelectorAll('.dot');

    function showSlide(i){
      images.forEach((img,idx)=>{
        img.classList.toggle('active', idx===i);
        dots[idx].classList.toggle('active', idx===i);
      });
      index = i;
    }

    function next(){showSlide((index+1)%images.length);}
    function prev(){showSlide((index-1+images.length)%images.length);}
    function goToSlide(i){showSlide(i);}

    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    // auto-slide
    function startAuto(){timer = setInterval(next, autoTime);}   
    function stopAuto(){clearInterval(timer);}                    
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);
    startAuto();