/* ttsClick.js  |  Kliknij element (teksty + obrazki) – przeglądarka go przeczyta
 * Wersja: 2025-05-14  –  mówi „Synteza mowy włączona / wyłączona”
 */

document.addEventListener('DOMContentLoaded', () => {

  const toggleBtn = document.getElementById('tts-click-toggle');
  if (!toggleBtn) return;

  if (!('speechSynthesis' in window)) {
    toggleBtn.disabled = true;
    toggleBtn.textContent = '✖';
    console.warn('Web Speech API nieobsługiwane');
    return;
  }

  const utter  = new SpeechSynthesisUtterance();
  utter.lang   = 'pl-PL';
  utter.rate   = 1;
  utter.volume = 1;

  let ttsEnabled      = false;
  let highlightedNode = null;

  function speakElement(el){
    const txt = el.tagName === 'IMG'
                ? (el.alt.trim() || 'obrazek bez opisu')
                : el.innerText.trim();
    if(!txt) return;

    speechSynthesis.cancel();
    highlightedNode?.classList.remove('tts-current');

    highlightedNode = el;
    el.classList.add('tts-current');

    utter.text = txt;
    speechSynthesis.speak(utter);
  }
  utter.onend   = () => highlightedNode?.classList.remove('tts-current');
  utter.onerror = () => highlightedNode?.classList.remove('tts-current');

  // ---------- ON / OFF -------------------------------------------------
  toggleBtn.addEventListener('click', () => {
    ttsEnabled = !ttsEnabled;
    toggleBtn.setAttribute('aria-pressed', ttsEnabled);
    toggleBtn.textContent = ttsEnabled ? 'ON' : 'OFF';

    // Zatrzymaj ewentualne bieżące czytanie i podświetlenie
    speechSynthesis.cancel();
    highlightedNode?.classList.remove('tts-current');
    highlightedNode = null;

    // ► Powiedz, czy TTS jest włączony czy wyłączony
    const infoUtter = new SpeechSynthesisUtterance(
      ttsEnabled ? 'Synteza mowy włączona' : 'Synteza mowy wyłączona'
    );
    infoUtter.lang   = 'pl-PL';
    infoUtter.rate   = 1;
    infoUtter.volume = 1;
    speechSynthesis.speak(infoUtter);
  });

  // ---------- Delegacja kliknięć -------------------------------------
  const selectable = 'p,h1,h2,h3,h4,h5,h6,li,td,th,figcaption,blockquote,img,span';
document.addEventListener('click', (e)=>{
    if(!ttsEnabled) return;
    const el = e.target.closest(selectable);
    if(el) speakElement(el);
  });
});
