/**
 * Verkefni 7 – Reikniæfingarforrit
 *
 * Forrit sem æfir hraða í að reikna einföld dæmi
 */

// fasti sem segir til um hve marga leiki eigi að spila
const GAMES_TO_PLAY = 2;

/**
 * Birtir upplýsingar um leik og eftir að notandi samþykkir spilar fyrsta leik
 * með kalli í play().
 * Eftir leik er notanda boðið að spila annan leik, ef ekki hættir forrit.
 */
function start() {
  alert("Markmiðið er að svara eins mörgum af dæmum rétt eins hratt og mögulegt er");
  do{
  	play();
	}while(confirm("Spila annan leik?"));
}

/**
 * Spilar einn leik. Heldur utan um hvenær leikur byrjaði, hvenær endar og
 * fjölda réttra svara. Eftir leik eru birtar upplýsingar um niðurstöðu:
 *   Þú svaraðir X af 10 dæmum rétt á Y sekúndum
 *   Meðalrétt svör á sekúndu eru Z
 * Þar sem Y og Z hafa tvo aukastafi.
 *
 * Ef notandi ýtir á "Cancel" í leik eru skilaboðin "Hætt í leik." birt og engar
 * upplsýingar um niðurstöður.
 *
 */
function play() {
	let total = 0;
	let correct = 0;
	let res;
	let a = new Date();
	do{
		res = ask();
		if(res === true){
			correct++;//telur rétt svör
		}
		if(res === null){
			alert("Hætt í leik");
			return;

		}
		total++;//telur skiptin
	}while(GAMES_TO_PLAY > total);
	let b = new Date();
	let time = (b-a) / 1000;
	let avg = time/correct;
	alert("Þú svaraðir " + correct + " af " + GAMES_TO_PLAY + " rétt á " + time.toFixed(2) + " sekúndum\nMeðalrétt svör á sekúndu eru " + avg.toFixed(2));	
}

/**
 * Spyr einnar spurningar og skilar upplýsingum um svar (mögulega með því að
 * nota true, false og null ef notandi hættir). Birtir notanda propmpt til að
 * svara í og túlkar svarið yfir í tölu.
 *
 * Mögulegar spurningar eru:
 * - `+` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `-` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `*` dæmi þar sem báðar tölur geta verið á bilinu `[1, 10]`
 * - `/` dæmi þar sem fyrri tala er á bilinu `[2, 10]` og seinni talan er fyrri
 *   talan sinnum tala á bilinu `[2, 10]` þ.a. svarið verði alltaf heiltala
 *
 * Sniðugt væri að færa það að búa til spurningu í nýtt fall sem ask() kallar í.
 */
function ask() {
	let q = getQuestion();
	console.log(q);
	let svar = prompt(q.question,);

	if(q.answer === parseInt(svar)){
		return true;
	}
	else if(svar === null){
		return null;
	}
	return false;
}

function getQuestion(){
	const type = randomNumber(1,4);
	let	question = 'Hvað er ';
	let	answer= 0;
	let a = 0;
	let b = 0;
	switch(type){
		case 1:
				a = randomNumber(1,100);
				b = randomNumber(1,100);
				question += a + " + " +  b;
				answer = a+b;
			break;
		case 2:
				a = randomNumber(1,100);
				b = randomNumber(1,100);
				let max = Math.max(a,b);
				let min = Math.min(a,b);
				question += max + " - " +  min;
				answer = max-min;
			break;
		case 3:
				a = randomNumber(1,10);
				b = randomNumber(1,10);
				question += a + " * " +  b;
				answer = a*b;
			break;
		case 4:
				a = randomNumber(2,10);
				b = (a * randomNumber(2,10));
				question += b + " / " +  a;
				answer = b/a;
			break;
	}
	return {question,answer};
}

/**
 * Skilar tölu af handahófi á bilinu [min, max]
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Byrjar leik
start();
