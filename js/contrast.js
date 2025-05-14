/* contrast.js  – żółty tekst na czarnym tle, bez !important
 * Wersja „wszystko zawsze wraca” (MutationObserver + iframes + full-cleanup)
 * 2025-05-14
 */

(() => {

  const YELLOW  = '#ffff00';
  const BLACK   = '#000000';
  const EX = new Set(['IMG','VIDEO','SVG','PATH','SOURCE','STYLE','SCRIPT','IFRAME']);

  let contrastOn = false;

  // --- FUNKCJE -------------------------------------------------------
  const paint = el => {
    if (EX.has(el.tagName)) return;
    el.style.backgroundColor = BLACK;
    el.style.color           = YELLOW;
    el.style.borderColor     = YELLOW;
    el.style.outlineColor    = YELLOW;
  };
/* …początek pliku bez zmian… */

/*  ✅  zamień TYLKO funkcję clean na tę poniżej  -------------------- */
const RGB_BLACK  = 'rgb(0, 0, 0)';
const RGB_YELLOW = 'rgb(255, 255, 0)';

const clean = el => {
  if (EX.has(el.tagName)) return;
  const { backgroundColor, color, borderColor, outlineColor } = el.style;

  if (backgroundColor === BLACK  || backgroundColor === RGB_BLACK)  el.style.backgroundColor = '';
  if (color           === YELLOW || color           === RGB_YELLOW) el.style.color           = '';
  if (borderColor     === YELLOW || borderColor     === RGB_YELLOW) el.style.borderColor     = '';
  if (outlineColor    === YELLOW || outlineColor    === RGB_YELLOW) el.style.outlineColor    = '';
};
/* ------------------------------------------------------------------ */

/* …dalsza część pliku bez zmian… */


  // rekurencyjnie wchodzimy również do ramek (o ile ta sama domena)
  const forEveryNode = (root, fn) => {
    fn(root);
    root.querySelectorAll('*').forEach(fn);
    root.querySelectorAll('iframe').forEach(ifr => {
      try { forEveryNode(ifr.contentDocument?.body, fn); } catch(e){}
    });
  };

  // MutationObserver – nakłada style na nowe węzły
  const observer = new MutationObserver(recs => {
    if (!contrastOn) return;
    recs.forEach(r => r.addedNodes.forEach(n => {
      if (n.nodeType !== 1) return;
      forEveryNode(n, paint);
    }));
  });

  // --- PRZEŁĄCZNIK ---------------------------------------------------
  function toggle() {
    contrastOn = !contrastOn;

    if (contrastOn) {
      forEveryNode(document.body, paint);
      observer.observe(document.body, { childList:true, subtree:true });
    } else {
      observer.disconnect();
      forEveryNode(document.body, clean);
    }
  }

  // --- PODPIĘCIE PRZYCISKÓW -----------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.contrast-btn').forEach(btn => {
      btn.style.cursor = 'pointer';
      btn.addEventListener('click', toggle);
    });
  });

})();
