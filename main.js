const cartas = document.querySelectorAll('.card-inner');
const npcartas = document.querySelector('.allnpc');
const allcardsInfo = document.querySelectorAll('.info');
const soundSlide = new Audio('cardSlide.mp3');
const glassBreaking = new Audio('glassBreaking.mp3');


repartirCartas();
for(let i = 0; i < cartas.length; i++){
    cartas[i].addEventListener("click", () => {
        if(!cartas[i].classList.contains('.card-move') && !npcartas.contains(cartas[i])){
            cartas[i].classList.add('card-move');
            soundSlide.play();
            let info;
            switch (i) {
                case 0:
                    compararYromper(cartas[3], cartas[0]);
                    break;
                case 1:
                    compararYromper(cartas[4], cartas[1]);
                    break;
                case 2:
                    compararYromper(cartas[5], cartas[2]);
                break;
            }
        }
    })
    if(npcartas.contains(cartas[i])){
        cartas[i].classList.add('card-animation');
    }
}

function repartirCartas(){
    for(let i = 0; i < allcardsInfo.length; i ++){
        let numeroRandom = Math.floor(Math.random() * 5 + 1);
        let h3Child = allcardsInfo[i].querySelector('h3');
        h3Child.innerText = numeroRandom; 
    }
}

function compararYromper(cartaNpc, cartaPlayer){
    info = cartaNpc.querySelector('.info');

    let powernpc = Number(cartaNpc.querySelector('.info').querySelector('h3').innerText);
    let powerplayer = Number(cartaPlayer.querySelector('.info').querySelector('h3').innerText);
    setTimeout(() => {info.classList.remove('npc');}, 1200);
    let glass;
    soundSlide.play();
    if(powernpc > powerplayer){
        glass = cartaPlayer.querySelector('.card-front').querySelector('.brokenGlass');
        setTimeout(() => {glass.classList.remove('npc')}, 1600);
        setTimeout(() => {glassBreaking.play()}, 2300);
    }else{
        glass = cartaNpc.querySelector('.card-front').querySelector('.brokenGlass');
        setTimeout(() => {glass.classList.remove('npc'); }, 1600);
        setTimeout(() => {glassBreaking.play()}, 2300);
    }
    
    let elementosGlass = document.querySelectorAll('.brokenGlass');
/*     for(let i = 0; i < elementosGlass.length; i++){

    } */
    setTimeout(() => {cartaNpc.classList.add('card-move-npc')}, 1200);
/*     if(puntuacionPlayer > puntuacionNpc){
        alert('You win');
    }else if(puntuacionNpc > puntuacionPlayer){
        alert('You lose');
    } */
    checkWin();
}

function checkWin(){
    let rotosPlayer = 0;
    let rotosNpc = 0;   
    let movidos = 0;
    console.log('Funcion');

    const cartasPlayer = document.querySelector('.allplayer');
    const estaRotoPlayers = cartasPlayer.querySelectorAll('.brokenGlass');
    
    const estaRotoNpc = npcartas.querySelectorAll('.brokenGlass');

    for(let j = 0; j < estaRotoPlayers.length; j++){
        if(!estaRotoPlayers[j].classList.contains('npc')){
            rotosPlayer += 1;
        }
    }

    for(let i = 0; i < estaRotoNpc.length; i++){
        if(!estaRotoNpc[i].classList.contains('npc')){
            rotosNpc += 1;
        }
    }

    console.log('rotos npc',rotosNpc);
    console.log('rotosplayer',rotosPlayer);
    for(let i = 0; i < cartas.length; i++){
        if(cartas[i].classList.contains('card-move')){
            console.log('hola');
            movidos++;
            console.log(movidos);
            if(movidos === 3){
                console.log('dentro de movidos');
                if(rotosNpc > rotosPlayer){
                    setTimeout(() => {
                        alert('YOU WON');
                        restartGame();
                    }, 3000);;
                }else{
                    setTimeout(() => {
                        alert('YOU LOSE');
                        restartGame();
                    }, 3000);
                }
            }
        }
    }
}

function restartGame(){
    for(let i = 0; i < cartas.length; i++){
        let brokenglass = cartas[i].querySelector('.brokenGlass');
        brokenglass.classList.add('npc');
        cartas[i].classList.remove('card-move');
        soundSlide.play();
        
        if(npcartas.contains(cartas[i])){
            let info = cartas[i].querySelector('.info');
            info.classList.add('npc');
            cartas[i].classList.remove('card-move-npc');
        }
    }
    repartirCartas();
}