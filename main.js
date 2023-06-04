let portes = document.getElementById('portes');
let quantité = document.getElementById('quantité');
let prix = document.getElementById('prix');
let totale = document.getElementById('totale');
let create = document.getElementById('create');
let totaleTous = document.getElementById('totaleTous');
let champs = document.getElementById('champs');
let input = document.getElementById('input');
let ddd = 0;
let mood = "create"
let ii;




function Totale () {
  
    let x = (+quantité.value * +prix.value)
    totale.innerHTML = x

}


let data = [];
if (localStorage.producte != ''){
    data = JSON.parse(localStorage.producte)
}else{
    
    data = [];
}

function TotaleTous () {
    let dd = 0
    for (let d = 0; d<data.length; d++){
        dd += +data[d].totale
    }
   ddd = dd
   Lire () 
} TotaleTous () 

function Créer (){

    let obj = {
        portes : portes.value,
        quantité : quantité.value,
        prix : prix.value,
        totale : totale.innerHTML,
    }

    if (portes.value != ''& quantité.value != ''& prix.value != '') {
        if (mood === 'create'){
            data.push (obj)
        }else{
            data[ii] = obj
            create.innerHTML = 'Créer'
            create.style.backgroundColor = "rgb(151, 98, 7)"
            mood = 'create'
        }
       
        localStorage.setItem ('producte', JSON.stringify(  data ))
    }else{
        input.style.display = 'none'
        champs.style.display = "block"
        
        setInterval(function (){
            champs.style.display = "none"
            input.style.display = 'block'
        },5000)
    }
    Clear ()
    Lire ()
    TotaleTous () 
   totale.innerHTML = 'Totale'
   
}



function Clear () { 
    portes.value = "";
    quantité.value = "";
    prix.value = "";
    totale.innerHTML = "";
}




function Lire () {
    let x = '';
    let a;
    for (let i = 0; i<data.length; i++) {
        x += ` 
        <tr>
        <td>${data[i].portes}</td>
        <td>${data[i].quantité}</td>
        <td>${data[i].prix}</td>
        <td>${data[i].totale} EUR</td>
        <td><button id = 'supprimer' onclick = 'Supprimer (${i})'>supprimer</button></td>
        <td><button id = 'changement' onclick = 'Changement(${i})'>changement</button></td>
    </tr>
        ` 
        a = data[i].totale + +data[i].totale
    }
   
if (data.length > 0){
    let tybody = document.getElementById ('tbody').innerHTML = `${x}    <tr><td align = "center" colspan = '4' id = 'totaleTous'>Totale :  ${ddd} EUR</td></tr>`
}else{
    let tybody = document.getElementById ('tbody').innerHTML = x  
}
}Lire ()


function Supprimer (i) {
    data.splice(i,1)
    localStorage.producte = (JSON.stringify(data))
    Lire ()
    TotaleTous () 
}

function Changement (i) {
    create.innerHTML = 'Changement'
    create.style.background = 'blue'
    for (let i= 0; i<data.length; i++){     
        portes.value = data[i].portes;
        prix.value = data[i].prix;
        quantité.value = data[i].quantité;
    }
    mood = 'update'
    ii = i
    Totale ()
}

