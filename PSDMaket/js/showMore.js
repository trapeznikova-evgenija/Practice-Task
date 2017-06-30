var showMoreButton = document.getElementById('button_more');
var showMoreBlock = document.getElementById('blocks_open');
var comeBackButton = document.getElementById('back');

showMoreButton.onclick = function () {
  showMoreButton.style.display = 'none';
  getInvisibleBlock(showMoreBlock, 0);
  getInvisibleBlock(showMoreBlock, 1);
  showMoreBlock.style.display = 'block';
  comeBackButton.style.display = 'block';
};

comeBackButton.onclick = function () {
  showMoreBlock.style.display = 'none';
  comeBackButton.style.display = 'none';
  showMoreButton.style.display = 'block';
  showMoreBlock.style.opacity = 0;
};

function getInvisibleBlock(block, opacity) {
  setTimeout(function () {
    block.style.opacity = opacity;
  }, 100)
}