/**
 * Created by zena on 25.08.17.
 */
var descriptionLink = document.getElementById('description');
var modalWindow = document.getElementById("descriptionWindow");
var closeButton = document.getElementById('closeButton');
descriptionLink.addEventListener('click', showWindow);
closeButton.addEventListener('click', closeWindow);


function showWindow() {
  modalWindow.style.display = 'block';
}

function closeWindow() {
  modalWindow.style.display = 'none';
}