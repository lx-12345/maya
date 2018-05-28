// ->REM
(function rem () {
  var desW = 750;
  var winW = document.documentElement.clientWidth;
  var ratio = winW / desW;
  var oMain = document.querySelector('body');
  if (winW > desW) {
    oMain.style.margin = '0 auto';
    oMain.style.width = desW + 'px';
    return;
  }
  document.documentElement.style.fontSize = ratio * 100 + 'px';
})();

