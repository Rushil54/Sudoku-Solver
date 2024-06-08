const board= document.querySelector('#puzzle')
const solvebutton=document.querySelector('#solve-button')
const solutionDisplay= document.querySelector('#solution')
const squares=81
const submission=[]

for(let i=0; i<squares;i++){
    const inputelement = document.createElement('input')
    inputelement.setAttribute('type','number')
    inputelement.setAttribute('min',1)
    inputelement.setAttribute('max',9)
    if(
        ((i%9==0 ||i%9==1 ||i%9==2)  && i<21)||
        ((i%9==6 ||i%9==7 ||i%9==8)  && i<27)||
        ((i%9==3 ||i%9==4 ||i%9==5 ) && (i>27 && i<53))||
        ((i%9==0 ||i%9==1 ||i%9==2)  && i>53)||
        ((i%9==6 ||i%9==7 ||i%9==8 ) && i>53)
    ){
        inputelement.classList.add('odd-section')
    }
    board.appendChild(inputelement)


}

const joinValues = ()=>{
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input =>{
        if(input.value){
            submission.push(parseInt(input.value))
        }else{
            submission.push(0)
        }
    })
    console.log(submission)
}


let k=0;

const outputvalues = (data)=>{
    const inputs = document.querySelectorAll('input')
    for( k;k<81;k++){
      inputs[k].value=data[k];
    }     
    
    console.log(submission)
}


const solve = async ()=>{
    joinValues()
const data=submission.join('')
console.log('data',data)

const options = {
  method: 'POST',
  url: 'https://sudoku-solver3.p.rapidapi.com/sudokusolver/',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '6b9ffd069bmsh9fe8859b33573e0p1adf3ajsn5d96c79cbcc2',
    'X-RapidAPI-Host': 'sudoku-solver3.p.rapidapi.com'
  },
  data: {
    input:submission 
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
    outputvalues(response.data.answer)
} catch (error) {
	console.error(error);
}
}




solvebutton.addEventListener('click',solve)







