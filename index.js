// Referencing 
const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const alteredColor = document.getElementById('alteredColor');
const alteredColorText = document.getElementById('alteredColorText');
const slider = document.getElementById('slider');
const sliderText = document.getElementById('sliderText');
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');
const clrInput = document.getElementById('clrInput');

// Toggle Button
toggleBtn.addEventListener('click', () => {
  if(toggleBtn.classList.contains('toggled')){
    toggleBtn.classList.remove('toggled');
    lightenText.classList.remove('unselected');
    darkenText.classList.add('unselected');
    alteredColorText.style['color'] = "#222";
    alteredColorText.style['text-shadow'] = "2px .5px 2px white";
  } else {
    toggleBtn.classList.add('toggled');
    lightenText.classList.add('unselected');
    darkenText.classList.remove('unselected');
    alteredColorText.style['color'] = "#eee";
    alteredColorText.style['text-shadow'] = "2px .5px 2px black";
    
  }
  
  reset(); 
})

// Color Input Field
clrInput.addEventListener('input', () => {
  
  // console.log(clrInput.value)
  const hex = clrInput.value;
  hexInput.value = clrInput.value;
  if(!isValidHex(hex)) return;
  
  const strippedHex = hex.replace('#', '');

  inputColor.style.backgroundColor = "#" + strippedHex; 
  reset(); 
})

// Hex Input Field
hexInput.addEventListener('keyup', () => {
  
  const hex = hexInput.value;
  if(!isValidHex(hex)) return;
  
  const strippedHex = hex.replace('#', '');

  inputColor.style.backgroundColor = "#" + strippedHex; 
  reset(); 
})

// Copy to Clipboard
function copyToClipboard(){
    navigator.clipboard.writeText(alteredColorText.textContent);
  alert('Text copied to clipboard: ' + alteredColorText.textContent);
   
}

// Check for valid hex value from the input
const isValidHex = (hex) => {
    if(!hex) return false;
    
    const strippedHex = hex.replace('#', '');
    return strippedHex.length === 3 || strippedHex.length === 6;
}


// Convert Hex to RGB
const convertHexToRGB = (hex) => {
  if(!isValidHex(hex)) return null;
  
  let strippedHex = hex.replace('#', '');

  if(strippedHex.length === 3){
    strippedHex = strippedHex[0] + strippedHex[0] 
    + strippedHex[1] + strippedHex[1] 
    + strippedHex[2] + strippedHex[2];
  }
  
  const r  = parseInt(strippedHex.substring(0,2), 16);
  const g  = parseInt(strippedHex.substring(2,4), 16);
  const b  = parseInt(strippedHex.substring(4,6), 16);
  
  return {r,g,b};
}

// Convert RGB to Hex
const convertRGBToHex = (r,g,b) => {
  const firstPair = ("0" + r.toString(16)).slice(-2);
  const secondPair = ("0" + g.toString(16)).slice(-2);
  const thirdPair = ("0" + b.toString(16)).slice(-2);
  
  const hex = "#" + firstPair + secondPair + thirdPair;
  return hex;
}


// Alter Color
const alterColorL = (hex, percentage) => {
  const {r, g, b} = convertHexToRGB(hex);
  
  const amountR = Math.floor((percentage/100) * (r));
  const amountG = Math.floor((percentage/100) * (g));
  const amountB = Math.floor((percentage/100) * (b));
  
  const newR = increaseWithin0To255(r,amountR);
  const newG = increaseWithin0To255(g,amountG);
  const newB = increaseWithin0To255(b,amountB)
  return convertRGBToHex(newR, newG, newB);
}
const alterColorD = (hex, percentage) => {
  const {r, g, b} = convertHexToRGB(hex);
  
  const amountR = Math.floor((percentage/100) * (255-r));
  const amountG = Math.floor((percentage/100) * (255-g));
  const amountB = Math.floor((percentage/100) * (255-b));
  
  const newR = increaseWithin0To255(r,amountR);
  const newG = increaseWithin0To255(g,amountG);
  const newB = increaseWithin0To255(b,amountB)
  return convertRGBToHex(newR, newG, newB);
}

const increaseWithin0To255 = (hex, amount) => {
  return Math.min(255, Math.max(0, hex + amount));
}


// Slider
slider.addEventListener('input', () => {
  if(!isValidHex(hexInput.value)) return;
  
  sliderText.textContent = `${slider.value}%`;
  const valueAddition  = 
    toggleBtn.classList.contains('toggled') ? 
    -slider.value 
    : slider.value;

  const alteredHex = toggleBtn.classList.contains('toggled') ?
     alterColorL(hexInput.value, valueAddition)
    : alterColorD(hexInput.value, valueAddition);
  
  alteredColor.style.backgroundColor = alteredHex;
  alteredColorText.innerText = ` ${alteredHex}`; 
})

// Reset
const reset = () =>{ 
  slider.value = 0;
  sliderText.innerText=`0%`;
  alteredColor.style.backgroundColor = hexInput.value;
  alteredColorText.innerText = `${hexInput.value}`; 

}




