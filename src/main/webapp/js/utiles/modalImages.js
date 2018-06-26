/**
 * @author agomezm
 */

function modalImage(img){
	modal = document.getElementById('modalImages');
	modalImg = document.getElementById('imageModal');
	captionText = document.getElementById('captionModal');
	
	modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;
	
    closeModal();
}

function closeModal(){
	span = document.getElementsByClassName("closeModal")[0];
	span.onclick = function() { 
		modal.style.display = "none";
	}
}