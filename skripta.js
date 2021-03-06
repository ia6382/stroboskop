window.addEventListener('load', function() {
	//stran nalozena
	
	//Dodaj novo barvo
	var dodajBarvo = function(event) {
		var input = document.createElement('button');
        var picker = new jscolor(input);
        picker.fromRGB(Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255))
        document.getElementById("barve").appendChild(input);
	}
	
	document.querySelector("#novaBarva") 
		.addEventListener('click', dodajBarvo);
		
	//Odstrani barve
	var izvediOdstrani = function(event){
		//var element = document.getElementById("barve");
		//element.parentNode.removeChild(element);
		document.querySelector("#barve").innerHTML = " ";
	}
	
	document.querySelector("#odstraniBarve").addEventListener('click', izvediOdstrani);
	
	//Stroboskop
	var vrednosti = [];
	var minCas = 0;
	var maxCas = 0;
	var ustavi = false;
	
	var spremeniBarvo = function(id) {
		document.getElementById("stroboskop").style.backgroundColor = "#"+vrednosti[id];

		if (ustavi) {
			ustavi = false;
		} else {
			minCas = document.querySelector("#min").value;
			maxCas = document.querySelector("#max").value;
			var novId = (id+1) % vrednosti.length;
			var timeout = Math.floor((Math.random() * (maxCas-minCas)) + minCas);
			setTimeout(function() {spremeniBarvo(novId)} , timeout);
		}		
	}
	
	var stop = function(event) {
		ustavi = true;
	}
	
	var zagon = function(event) {
		vrednosti = [];
		var barve = document.querySelectorAll("#barve > button");
		for (var i = 0; i < barve.length; i++) {
			var barva = barve[i];
			vrednosti.push(barva.innerHTML);
		}
		
		minCas = 1000;
		maxCas = 1000;
		spremeniBarvo(0);
	}
	
	var toggle = function(event) {
		var start = document.querySelector("#start");
		
		if(start.innerHTML == "Zaženi stroboskop"){
			start.innerHTML = "Ustavi stroboskop";
			zagon();
		}
		else{
			start.innerHTML = "Zaženi stroboskop";
			stop();
		}
	}
	
	document.querySelector("#start").addEventListener('click', toggle);
	
});