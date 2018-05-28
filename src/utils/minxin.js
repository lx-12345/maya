//->REM
~function () {
  var desW = 750,
    winW = document.documentElement.clientWidth,
    ratio = winW / desW,
    oMain = document.querySelector('.container');
  if (winW > desW) {
    oMain.style.margin = '0 auto';
    oMain.style.width = desW + 'px';
    return;
  }
  document.documentElement.style.fontSize = ratio * 100 + 'px';
}();
