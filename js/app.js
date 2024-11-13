let container  = document.querySelector('.container'); 
let wrapper  = document.querySelector('.wrapper'); 
let divColor  = document.createElement('div');
divColor.classList.add('result');
let btnReload = document.createElement('button');
btnReload.textContent = "change colors";

wrapper.append(divColor);
wrapper.append(btnReload);

let inputOpacity = document.getElementById('opacity')
let valueOpacity = document.getElementById('valueOpacity')

let opacity = 0.99; 

let selectedColor ;

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

inputOpacity.addEventListener('input',function(){
    opacity = this.value/10;
    valueOpacity.textContent = opacity
    updateOpacity(opacity)
})



function createColor(){
    let r = randomInteger(0,256);
    let g = randomInteger(0,256);
    let b = randomInteger(0,256);
    return(`rgba(${r}, ${g}, ${b}, ${opacity})`)
}

function printValueColor(color){
 
      const displayedColor = color.replace(/rgba\((\d+), (\d+), (\d+), [^)]+\)/, `rgba($1, $2, $3, ${opacity})`);
      divColor.textContent = `Selected color: ${displayedColor}`;

}



function createBlock(){
    for( let i = 0; i<=15; i++){ 
        let color = createColor();
        let divColor  = document.createElement('div');
        divColor.classList.add('color');
        divColor.style.background = color
        divColor.addEventListener('click',function(){
            selectedColor = color
            printValueColor(selectedColor)
        })
        container.append(divColor);

    }  
}

function redrawColors(){
    let listDivs = document.querySelectorAll('.color');
    listDivs.forEach((elem)=>{
        let newColor = createColor();
        elem.style.background = newColor;
    })
}

btnReload.addEventListener('click',function(){ 
    redrawColors();
    selectedColor = '';
    divColor.textContent = `Selected color `
})

function updateOpacity(opacity){ 
    let listDivs = document.querySelectorAll('.color');
    listDivs.forEach((elem)=>{
        let activBacground = elem.style.background;
        console.log('vhod',activBacground)
        let rgbValues = activBacground.slice(5, -1).split(", ");
        console.log('obrez',rgbValues)
        let rgbaString = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, ${opacity})`;
        elem.style.background = rgbaString
        console.log(rgbaString)
        if (selectedColor) {
            selectedColor = selectedColor.replace(/rgba\((\d+), (\d+), (\d+), [^)]+\)/, `rgba($1, $2, $3, ${opacity})`);
            printValueColor(selectedColor);
          }

    })

}


createBlock()
