const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");



const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

//네모박스 만들기, 색채우기, 여러개만들기
// ctx.rect(50, 50, 100, 100) //(x축, y축, width, height)
// ctx.fill();
// ctx.rect(150, 150, 100, 100);
// ctx.rect(250, 250, 100, 100);
// ctx.stroke();
 
// ctx.beginPath(); // 경로 분리
// ctx.rect(350, 350, 100, 100);
// ctx.rect(450, 450, 100, 100);
// ctx.fillStyle = "red";
// ctx.fill();

//선으로 박스만들기
// ctx.moveTo(50,50);
// ctx.lineTo(150, 50);
// ctx.lineTo(150, 150);
// ctx.lineTo(50, 150);
// ctx.lineTo(50, 50);
// // ctx.stroke()
// ctx.fill();

//집 만들기
// ctx.fillRect(200, 200, 50, 200);
// ctx.fillRect(400, 200, 50, 200);
// ctx.fillRect(300, 300, 50, 100);
// ctx.fillRect(200, 200, 200, 20);

// ctx.moveTo(200,200);
// ctx.lineTo(325, 100);
// ctx.lineTo(450, 200);
// ctx.fill();

// ctx.moveTo(200, 400)
// ctx.lineTo(450, 400)
// ctx.stroke();


//사람 만들기
// ctx.fillRect(210 - 40, 200 - 30, 15, 100);
// ctx.strokeRect(350 - 40, 200 - 30, 15, 100);
// ctx.strokeRect(260 - 40, 200 - 30, 60, 100);
// ctx.arc(250, 100, 50, 0, 2* Math.PI);
// ctx.fill();

// ctx.beginPath();
// ctx.fillStyle = "white";
// ctx.arc(260 + 10, 80, 5, 0, Math.PI, 2 * Math.PI);
// ctx.arc(220 + 10, 80, 5, 0, Math.PI, 2 * Math.PI);
// ctx.fill();

// ctx.moveTo(240, 270);
// ctx.lineTo(240, 350);
// ctx.stroke();

// ctx.moveTo(260, 270);
// ctx.lineTo(260, 350);
// ctx.stroke();

//간이 그림판 만들기
// ctx.lineWidth = "1"
// ctx.moveTo(0,0)

// const colors = [
//     "#DA6951",
//     "#7AA945",
//     "#456DA9",
//     "#7545A9",
//     "#9F45A9",
//     "#A94565",
//     "#C5D956",
//     "#56D95E",
// ]

// function mou(x){
//     ctx.beginPath()
//     // ctx.moveTo(0,0)
//     ctx.moveTo(400,400)
//     console.log(x.offsetX, x.offsetY);
//     const color = colors[Math.floor(Math.random() * colors.length)]
//     ctx.strokeStyle = color
//     ctx.lineTo(x.offsetX, x.offsetY);
//     ctx.stroke()
// }

// canvas.addEventListener('mousemove',mou)

let isPainting = false;
let isFilling = false;

const saveBtn = document.getElementById('save')
const textInput = document.getElementById('text');
const fileInput = document.getElementById('file');
const eraserBtn = document.getElementById('eraser-btn');
const destoryBtn = document.getElementById('destroy-btn')
const modeBtn = document.getElementById('mode-btn')
const colorOptions = Array.from(document.getElementsByClassName('color-option'));
// const colorOptions = Array.from(document.queryselector('.color-option'));
//queryselector , getElementsByClassName 차이점
// queryselector 로 선택할 경우 forEach에서 에러가난다 이유가 뭘까

const stWidthInp = document.querySelector('#line-width');
const stColorInp = document.querySelector('#line-color');

ctx.lineCap = "round"
ctx.lineWidth  = stWidthInp.value

function strokeColorChange(e){
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
}

function onColorClick(e){
    // console.log(e.target)
    console.dir(e.target.dataset.color)
    const colorValue = e.target.dataset.color;
    ctx.strokeStyle = colorValue
    ctx.fillStyle = colorValue;
    stColorInp.value = colorValue;
}

function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = 'fill'
    }else{
        isFilling = true
        modeBtn.innerText = 'draw'
    }
}



function strokeWidthChange(e){
    console.log(e.target.value)
    ctx.lineWidth  = e.target.value;
}


function onMove(x){
    if(isPainting){
        ctx.lineTo(x.offsetX, x.offsetY);
        ctx.stroke();
        return;
    }
    
    ctx.beginPath();
    ctx.moveTo(x.offsetX, x.offsetY);
    // console.log(x.offsetX, x.offsetY)
}

function startPainting(){
    isPainting = true;
    console.log(isPainting);
 }

 function canclePainting(){
    isPainting = false;
    console.log(isPainting);
 }

 function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    }
 }
 

 function onDestoryClick(){
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
 }

 function onEraserClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = 'fill'

 }

 function onFileChange(e){
    // console.dir(e.target)
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    //<img src=""> 랑 같은 것
    //document.createElement('img') 도 같은것
    image.src = url;

    // console.log(file)
    // console.log(url)

    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT) //(이미지, x축, y축, width, height)
        fileInput.value = null
    }

 }

 function onDobleClick(e){
    const text = textInput.value;

    if(text !== ""){
        ctx.save(); //체크포인트
        ctx.lineWidth = 1;
        ctx.font = "48px serif"
        ctx.fillText(text, e.offsetX, e.offsetY);
        ctx.restore(); //체크포인트 상태의 설정값으로 돌아감
    }
 }

function onSaveClick(){
    // console.log(canvas.toDataURL())
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.href = url;
    a.download = 'myDrawing.png';
    a.click();
}


canvas.addEventListener('dblclick', onDobleClick)
canvas.addEventListener('mousemove', onMove)
canvas.addEventListener('mousedown', startPainting)
canvas.addEventListener('mouseup', canclePainting)

canvas.addEventListener('click',onCanvasClick)

canvas.addEventListener('mouseleave', canclePainting)

stColorInp.addEventListener('change' , strokeColorChange);
stWidthInp.addEventListener('change' , strokeWidthChange);

colorOptions.forEach((color) => color.addEventListener('click', onColorClick))
//forEach 어떻게 돌아가는지 잘 기억 안남;; 공부하셈 ;;



modeBtn.addEventListener('click', onModeClick)
destoryBtn.addEventListener('click', onDestoryClick)
eraserBtn.addEventListener('click', onEraserClick)
fileInput.addEventListener('change', onFileChange)
saveBtn.addEventListener('click', onSaveClick)