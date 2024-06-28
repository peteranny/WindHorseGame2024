const preventGesture = () => {
  // prevent context menu
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });

  // https://heidiliu2020.github.io/safari-pinch-and-double-tap/

  document.addEventListener('touchstart', (event) => {
    if (event.touches && event.touches.length > 1) {  // 禁止多指觸控
       event.preventDefault();
    }
  }, { passive: false });

  let lastTouchEndTime = 0;
  document.addEventListener('touchend', (event) => {
    const now = new Date().getTime();
    if((now - lastTouchEndTime) <= 300) {      // 偵測時間差是否小於 300ms
      event.preventDefault();
    }
    lastTouchEndTime = now;
  }, false);

  // [Safari only] gesturestart event: multi finger gestures touching
  document.addEventListener('gesturestart', function(event) {
    // 阻止兩指縮放畫面
    event.preventDefault();
  });
}

export default preventGesture;
