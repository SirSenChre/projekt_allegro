// fontZoom.js  – podłącz tuż przed </body>

document.addEventListener('DOMContentLoaded', () => {

  // zapamiętujemy rozmiar bazowy (zdefiniowany w CSS)
  const root        = document.documentElement;
  const baseSizePx  = parseFloat(getComputedStyle(root).fontSize);

  // każdy obrazek z klasą .font-btn to „przycisk”
  document.querySelectorAll('.font-btn').forEach(btn => {

    btn.style.cursor = 'pointer';   // podpowiedź, że można kliknąć

    btn.addEventListener('click', () => {
      const factor = parseFloat(btn.dataset.zoom) || 1;            // 1 / 1.25 / 1.5 …
      const newSize = (baseSizePx * factor).toFixed(2) + 'px';     // wynik w px z dwoma miejscami
      root.style.fontSize = newSize;                               // działa na rem/em w całej stronie
    });

  });

});
