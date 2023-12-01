const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;


let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
    
});

const draw = (e) => {
    if(!isPainting) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

function downloadImage() {
    let canvas2 = document.getElementById("drawing-board");
    var dataURL = canvas2.toDataURL("image/png");
    var a = document.createElement('a');
    a.href = dataURL
    a.download = 'canvas-download.jpeg';
    a.click();
}

function handleImage(){
    let imgInput = document.getElementById('imageInput');
  imgInput.addEventListener('change', function(e) {
    if (e.target.files) {
      let imageFile = e.target.files[0]; //here we get the image file
      var reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = function (e) {
        var myImage = new Image(); // Creates image object
        myImage.src = e.target.result; // Assigns converted image to image object
        myImage.onload = function(ev) {
          var myCanvas = document.getElementById("drawing-board"); // Creates a canvas object
          var myContext = myCanvas.getContext("2d"); // Creates a contect object
          //myCanvas.width = myImage.width; // Assigns image's width to canvas
          //myCanvas.height = myImage.height; // Assigns image's height to canvas
          myContext.drawImage(myImage, 0, 0); // Draws the image on canvas
          let imgData = myCanvas.toDataURL("image/jpeg", 0.75); // Assigns image base64 string in jpeg format to a variable
        }
      }
    }
  }); 
}
