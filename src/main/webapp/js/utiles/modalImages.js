/**
 * @author agomezm
 */

function modalImage(img, url, nombre){
	rotar(2); //reestablece imagen
	modal = document.getElementById('modalImages');
	modalImg = document.getElementById('imageModal');
	captionText = document.getElementById('captionModal');
	
	modal.style.display = "block";
	if(url == undefined) {
		modalImg.src = img.src;
		captionText.innerHTML = img.alt;
	} else {
		modalImg.src = url;
		captionText.innerHTML = nombre;
	}
    
    closeModal();
}

function closeModal(){
	span = document.getElementsByClassName("closeModal")[0];
	span.onclick = function() { 
		modal.style.display = "none";
	}
}