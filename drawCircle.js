var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var circles = [];
var preSelectedCircle = null;

var btn = document.getElementById('btn');
btn.onclick = addRandomCircle;
canvas.onclick = canvasClick;
var smallBtn = document.getElementById('small');
smallBtn.onclick = smallButton;
var bigBtn = document.getElementById('big');
bigBtn.onclick = bigButton;
var changeColorBtn = document.getElementById('changeColor');
changeColorBtn.onclick = changeColor;
var deleteBtn = document.getElementById('delete');
deleteBtn.onclick = deleteCircle;
canvas.onmousemove = moveCircle;
canvas.onmouseup = stopMove;
canvas.onmousedown = startMove;
function Circle(x, y, r, color){
	
	this.x = x;
	this.y = y;
	this.r = r;
	this.color = color;
	this.isSelected = false;
	this.isMove = false;
}

function addRandomCircle(){
	
	var x = randomFromTo(0,canvas.width);
	var y = randomFromTo(0,canvas.height);
	var r = randomFromTo(10,60);
	
	var colors = ["green","red","yellow","magenta","blue","orange","brown","purple","pink"];
	var color = colors[randomFromTo(0,8)];
	
	var circle = new Circle(x,y,r,color);
	circles.push(circle);
	drawCircles();
}

function randomFromTo(x,y){
	
	var range = y - x;
	var rand = Math.random();
	var result = x + y*rand;
	return Math.floor(result);
}

function drawCircles(){
	
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.globalAlpha = 0.85;
	ctx.strokeStyle = "black";
	
	for(var i=0;i<circles.length;i++){
		
		var circle = circles[i];
		if(circle.isSelected == true){
			ctx.lineWidth = 5;
		}else{
			ctx.lineWidth = 1;
		}
		ctx.beginPath();
		ctx.arc(circle.x,circle.y,circle.r,0,Math.PI*2);
		ctx.fillStyle = circle.color;
		ctx.fill();
		ctx.stroke();
	}
}

function canvasClick(e){
	
	var clickX = e.pageX - canvas.offsetLeft;
	var clickY = e.pageY - canvas.offsetTop;
	//alert(clickX+" "+ clickY);
	for(var i=circles.length-1;i>=0;i--){
		
		var circle = circles[i];
		var distance = Math.sqrt(Math.pow(circle.x-clickX,2)+Math.pow(circle.y-clickY,2));
		if(distance <= circle.r){
			if(preSelectedCircle != null){
				preSelectedCircle.isSelected = false;
			}
			preSelectedCircle = circle;
			circle.isSelected = true;
			drawCircles();
			return;
		}
	}
}
function smallButton(){
	for(var i=0;i<circles.length;i++){
		var circle = circles[i];
		if(circle.isSelected == true){
			circle.r *= 0.9;
			drawCircles();
			return;
		}
	}
}
function bigButton(){
	for(var i=0;i<circles.length;i++){
		var circle = circles[i];
		if(circle.isSelected == true){
			circle.r *= 1.1;
			drawCircles();
			return;
		}
	}
}
function changeColor(){
	var color = document.getElementById('myColor').value;
	for(var i=0;i<circles.length;i++){
		var circle = circles[i];
		if(circle.isSelected == true){
			circle.color = color;
			drawCircles();
			return;
		}
	}
}
function deleteCircle(){
	
	for(var i=0;i<circles.length;i++){
		var circle = circles[i];
		if(circle.isSelected == true){
			circles.splice(i,1);
			drawCircles();
			return;
		}
	}
}
function startMove(e){
	
	var clickX = e.pageX - canvas.offsetLeft;
	var clickY = e.pageY - canvas.offsetTop;
	//alert(clickX+" "+ clickY);
	for(var i=circles.length-1;i>=0;i--){
		
		var circle = circles[i];
		var distance = Math.sqrt(Math.pow(circle.x-clickX,2)+Math.pow(circle.y-clickY,2));
		if(distance <= circle.r){			
			circle.isMove = true;
			return;
		}
	}
}
function moveCircle(e){
	
	var x = e.pageX - canvas.offsetLeft;
	var y = e.pageY - canvas.offsetTop;
	for(var i=0;i<circles.length;i++){
		var circle = circles[i];
		if(circle.isMove == true){
			circle.x = x;
			circle.y = y;
			drawCircles();
			return;
		}
	}
}
function stopMove(e){
	
	var x = e.pageX - canvas.offsetLeft;
	var y = e.pageY - canvas.offsetTop;
	for(var i=0;i<circles.length;i++){
		var circle = circles[i];
		if(circle.isMove == true){
			circle.x = x;
			circle.y = y;
			circle.isMove = false;
			return;
		}
	}
}



