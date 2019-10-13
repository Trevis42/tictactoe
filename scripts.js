const btnX = document.querySelector("#btn_pickX");
const btnO = document.querySelector("#btn_pickO");
const btnReset = document.querySelector("#btn_reset");

const canvasArr = ["tLeft", "tCenter", "tRight", "mLeft", "mCenter", "mRight", "bLeft", "bCenter", "bRight"];

let cells = document.querySelectorAll("canvas");
let tokensArr = [];
let didWin = false;
let turn = 0;

const strX = btnX.dataset.tokenName;
const colorX = btnX.dataset.tokenColor;
const strO = btnO.dataset.tokenName;
const colorO = btnO.dataset.tokenColor;
//populate array with blank for comparison
const populateTokenArray = function() {
	for (let i = 0; i < 9; i++) {
		tokensArr[i] = "_";
	}
};

//get X & O string and color from buttons
const getTokenInfo = function() {
	let tknName = " ";
	let tknColor = " ";
	if (btnX.dataset.selected === "true") {
		tknName = strX;
		tknColor = colorX;
	} else if (btnO.dataset.selected === "true") {
		tknName = strO;
		tknColor = colorO;
	} else {
		return { tknName, tknColor };
	}
	return { tknName, tknColor };
};

//change state of button
const placeX = function() {
	btnX.dataset.selected = "true";
	btnO.dataset.selected = "false";
	btnO.disabled = true;
};

//change state of button
const placeO = function() {
	btnO.dataset.selected = "true";
	btnX.dataset.selected = "false";
	btnX.disabled = true;
};

//reset the board and replace the eventlistener
const resetBoard = function() {
	for (const c of cells) {
		c.dataset.wasClicked = "n";
		c.addEventListener("click", this.drawTokens);
		c.dataset.drawToken = "n";

		const ctx = c.getContext("2d");
		ctx.clearRect(0, 0, c.width, c.height);
	}

	btnX.dataset.selected = "false";
	btnO.dataset.selected = "false";
	btnX.disabled = false;
	btnO.disabled = false;
	didWin = false;
	turn = 0;
	populateTokenArray();
};

//initialize the click eventlistener when page starts.
window.onload = function() {
	for (let i = 0; i < canvasArr.length; i++) {
		//event to register click on a canvas and invoke the drawTokens method
		cells[i].addEventListener("click", drawTokens);
	}
};

//function to draw the tokens
function drawTokens() {
	let canvas = this;
	let info = getTokenInfo();
	let color = info.tknColor;
	let name = info.tknName;

	canvas.dataset.drawToken = "n";

	console.log(`canvas draw before: ${canvas.dataset.drawToken}`);
	//draws token when clicked if button is selected
	if ((name === strX || name === strO) && canvas.dataset.drawToken === "n") {
		console.log(`Draw: ${name} on cell: ${canvas.id}`);

		var ctx = canvas.getContext("2d");
		ctx.font = "48pt Roboto";
		ctx.fillStyle = color;
		ctx.textAlign = "center";
		ctx.fillText(name, canvas.width / 2, canvas.height * (3 / 4));

		canvas.dataset.drawToken = "y";
		canvas.dataset.wasClicked = "y";

		for (let i = 0; i < canvasArr.length; i++) {
			if (canvas.id === canvasArr[i]) {
				tokensArr[i] = name;
				console.log(`index: ${i}  name: ${name}`);
			}
		}

		winnerWinner(name, ++turn);
	}
	console.log(`canvas draw after: ${canvas.dataset.drawToken}`);

	if (name === strX) {
		btnO.disabled = false;
		btnX.disabled = true;
		btnX.dataset.selected = "false";
	}
	if (name === strO) {
		btnX.disabled = false;
		btnO.disabled = true;
		btnO.dataset.selected = "false";
	}

	if (canvas.dataset.drawToken === "y") {
		console.log("Removed click functionality");
		this.removeEventListener("click", drawTokens);
	}
}

//check win condition
function winnerWinner(tName, turn) {
	console.log(`Turn: ${turn}`);

	//top row
	if (
		(tokensArr[0] === strX && tokensArr[1] === strX && tokensArr[2] === strX) ||
		(tokensArr[0] === strO && tokensArr[1] === strO && tokensArr[2] === strO)
	) {
		console.log("Top ROW win");
		didWin = true;
	}
	//mid row
	if (
		(tokensArr[3] === strX && tokensArr[4] === strX && tokensArr[5] === strX) ||
		(tokensArr[3] === strO && tokensArr[4] === strO && tokensArr[5] === strO)
	) {
		console.log("Mid ROW win");
		didWin = true;
	}
	//bot row
	if (
		(tokensArr[6] === strX && tokensArr[7] === strX && tokensArr[8] === strX) ||
		(tokensArr[6] === strO && tokensArr[7] === strO && tokensArr[8] === strO)
	) {
		console.log("Bot ROW win");
		didWin = true;
	}
	//left col
	if (
		(tokensArr[0] === strX && tokensArr[3] === strX && tokensArr[6] === strX) ||
		(tokensArr[0] === strO && tokensArr[3] === strO && tokensArr[6] === strO)
	) {
		console.log("left COL win");
		didWin = true;
	}
	//mid col
	if (
		(tokensArr[1] === strX && tokensArr[4] === strX && tokensArr[7] === strX) ||
		(tokensArr[1] === strO && tokensArr[4] === strO && tokensArr[7] === strO)
	) {
		console.log("Mid COL win");
		didWin = true;
	}
	//right col
	if (
		(tokensArr[2] === strX && tokensArr[5] === strX && tokensArr[8] === strX) ||
		(tokensArr[2] === strO && tokensArr[5] === strO && tokensArr[8] === strO)
	) {
		console.log("Right COL win");
		didWin = true;
	}
	//diag tLeft to bRight
	if (
		(tokensArr[0] === strX && tokensArr[4] === strX && tokensArr[8] === strX) ||
		(tokensArr[0] === strO && tokensArr[4] === strO && tokensArr[8] === strO)
	) {
		console.log("Diag tL to bR win");
		didWin = true;
	}
	//diag tRight to bLeft
	if (
		(tokensArr[2] === strX && tokensArr[4] === strX && tokensArr[6] === strX) ||
		(tokensArr[2] === strO && tokensArr[4] === strO && tokensArr[6] === strO)
	) {
		console.log("Diag tR to bL win");
		didWin = true;
	}

	//print if win, not yet determined or a tie
	if (didWin === true) {
		console.log(`Token: ${tName} WINS!!!`);
		didWin = false;
		Swal.fire({
			type: "success",
			title: "!WINNER &#128515 WINNER!",
			text: `Congrats, Player \'${tName}\' has won!`,
			footer:
				'<a><button id="btn_reset" data-token-name="reset" data-token-color="blue" data-selected="" onclick="resetBoard()"> Reset Board </button></a>'
		});
		//check for tie
	} else if (turn >= 9 && didWin === false) {
		console.log("TIE!!!!");
		Swal.fire({
			type: "question",
			title: "TIE...&#128528",
			text: "Looks like you both tied. Please try again.",
			footer:
				'<a><button id="btn_reset" data-token-name="reset" data-token-color="blue" data-selected="" onclick="resetBoard()"> Reset Board </button></a>'
		});
	} else {
		console.log("No winner yet");
		//didWin = false;
	}
}

/*
win rows: (by index) 012; 
					 345; 
					 678;
win cols: (by index) 036; 
					 147; 
					 258;
win diag: (by index) 048; 
					 246;
*/
