/* contrast.js  – żółty tekst na czarnym tle, bez !important
 * Jedno kliknięcie dowolnego .contrast-btn przełącza tryb,
 * niezależnie od tego, który wariant (desktop/tablet/mobile) jest widoczny.
 */

document.addEventListener('DOMContentLoaded', () => {

  // pobierz wszystkie przyciski z klasą 'contrast-btn'
  const buttons = document.querySelectorAll('.contrast-btn');
  if (!buttons.length) return;  // brak przycisku – kończymy

  // podpowiedź kursora
  buttons.forEach(btn => btn.style.cursor = 'pointer');

  // stan trybu + lista zmodyfikowanych elementów
  let contrastOn = false;
  let touchedEls = [];

  function toggleContrast () {
    contrastOn = !contrastOn;

    if (contrastOn) {
      // WŁĄCZ – ustaw inline style
      touchedEls = [];
      document.querySelectorAll('*').forEach(el => {
        if (['IMG','VIDEO','SVG','PATH','SOURCE'].includes(el.tagName)) return;
        if (!el.dataset.origBg) {                 // zapisz tylko raz
          el.dataset.origBg  = el.style.backgroundColor || '';
          el.dataset.origCol = el.style.color           || '';
          touchedEls.push(el);
        }
        el.style.backgroundColor = '#000000';
        el.style.color           = '#ffff00';
        el.style.borderColor     = '#ffff00';
        el.style.outlineColor    = '#ffff00';
      });

    } else {
      // WYŁĄCZ – przywróć zapisane wartości
      touchedEls.forEach(el => {
        el.style.backgroundColor = el.dataset.origBg;
        el.style.color           = el.dataset.origCol;
        el.style.borderColor     = '';
        el.style.outlineColor    = '';
        delete el.dataset.origBg;
        delete el.dataset.origCol;
      });
      touchedEls = [];
    }
  }

  // podpinamy obsługę do KAŻDEGO przycisku
  buttons.forEach(btn => btn.addEventListener('click', toggleContrast));
});
