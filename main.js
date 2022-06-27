const display = document.getElementById('display')
const clips = document.querySelectorAll('.clip')
const drumpads = document.querySelectorAll('.drum-pad')
const power = document.getElementById('power')
const bank = document.getElementById('bank')
const range = document.querySelector('input[type="range"]')
const spans = document.querySelectorAll('.drum-pad span')
const acoustic = ['./sounds/acoustic/clap.wav','./sounds/acoustic/cowbell.wav', './sounds/acoustic/kick-classic.wav',
	 				'./sounds/acoustic/perc-metal.wav', './sounds/acoustic/ride-acoustic.wav', './sounds/acoustic/shaker-shuffle.wav', 
					'./sounds/acoustic/snare.wav', './sounds/acoustic/snare-vinyl.wav', './sounds/acoustic/tom-rototom.wav']
const wind = ['./sounds/wind/Beef-Kick.wav', './sounds/wind/crash-tape.wav', './sounds/wind/Hi-Hat.wav',
			 './sounds/wind/Bap-Snare.wav', './sounds/wind/hihat-ring.wav', './sounds/wind/Upfront-Clap.wav',
			 './sounds/wind/Slinky.wav', './sounds/wind/Rim-Click.wav', './sounds/wind/TAG.wav']
// Add event listeners

drumpads.forEach(drumpad=>{
	drumpad.addEventListener('click', clip)
})

function clip(e){
	e.preventDefault();
	clips.forEach(clip=>{
		if(clip.getAttribute('id') === e.target.innerText){
			clip.play();
			srcName = clip.getAttribute('src').split('/');
			lastIndexfile = srcName.length -1;
			fileName = srcName[lastIndexfile].split('.')
			display.innerText = fileName[0];
			for(let i=0; i<drumpads.length;i++){
				if(e.target.innerText === spans[i].innerText){
			drumpads[i].style.boxShadow = '1px 1px 2px';
			setTimeout(()=>{drumpads[i].style.boxShadow = '2px 2px 3px'}, 300)
				}
			}
		}
	})
}

// Add bank options

if(bank.checked){
	for (var i = 0; i < acoustic.length ; i++) {
		clips[i].setAttribute('src', acoustic[i])
	}
}


function checked(){
	if(bank.checked){
	for (var i = 0; i < acoustic.length ; i++) {
		clips[i].setAttribute('src', acoustic[i])
	}
	display.innerText = 'Acoustic'
}else{
	for (var i = 0; i < acoustic.length ; i++) {
		clips[i].setAttribute('src', wind[i])
	}
	display.innerText= 'Brass'
}
}

// Power Switch

if(power.checked){

	bank.addEventListener('click', checked)
}

display.innerText = 'Power On'
power.addEventListener('click', ()=>{
	if(!power.checked){
		for (var i = 0; i < acoustic.length ; i++) {
		clips[i].setAttribute('src', false)
	}
	display.innerText = 'Power Off'
	bank.removeEventListener('click', checked)
	drumpads.forEach(drumpad=>{
	drumpad.removeEventListener('click', clip)
	})
	}else{
		for (var i = 0; i < acoustic.length ; i++) {
		clips[i].setAttribute('src', acoustic[i])
	}
	display.innerText= 'Power On'
	bank.addEventListener('click', checked)
	drumpads.forEach(drumpad=>{
	drumpad.addEventListener('click', clip)
	})
	}
})

// Volume Control

range.addEventListener('change', volumeControl)

window.addEventListener('DOMContentLoaded', (event) => {
	clips.forEach(clip=>{
		clip.volume = range.value / 100;
	})
});
function volumeControl(e){
	e.preventDefault();
	clips.forEach(clip=>{
		clip.volume = range.value / 100;
	})
	display.innerText = 'Volume'
}