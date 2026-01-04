let uiClick;

export function initSfx() {
  uiClick = new Audio("/sfx/ClickSoundEffect.mp3"); 
  uiClick.volume = 0.35;
}

export function playClick() {
  try {
    if (!uiClick) initSfx();
    uiClick.currentTime = 0;
    uiClick.play();
  } catch {
    
  }
}
