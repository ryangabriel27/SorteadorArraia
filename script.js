const btnSortear =
document.getElementById("btnSortear");

const btnRestart =
document.getElementById("btnRestart");

const shuffleContainer =
document.getElementById("shuffle-container");

const winnerArea =
document.getElementById("winner-area");

const countdown =
document.getElementById("countdown");

let inicioGlobal;
let fimGlobal;
let qtdGlobal;

function trocarTela(id){

    document
        .querySelectorAll(".screen")
        .forEach(screen =>
            screen.classList.remove("active")
        );

    document
        .getElementById(id)
        .classList.add("active");
}

function gerarNumero(min,max){

    return Math.floor(
        Math.random() *
        (max-min+1)
    ) + min;
}

function esperar(ms){

    return new Promise(resolve =>
        setTimeout(resolve,ms)
    );
}

btnSortear.addEventListener(
    "click",
    iniciarSorteio
);

btnRestart.addEventListener(
    "click",
    ()=>{

        winnerArea.innerHTML="";

        trocarTela("screen-config");
    }
);

async function iniciarSorteio(){

    const inicio =
    Number(document.getElementById("inicio").value);

    const fim =
    Number(document.getElementById("fim").value);

    const qtd =
    Number(document.getElementById("quantidade").value);

    if(inicio >= fim){

        alert("Intervalo inválido");
        return;
    }

    if(qtd > (fim-inicio+1)){

        alert("Quantidade inválida");
        return;
    }

    inicioGlobal = inicio;
    fimGlobal = fim;
    qtdGlobal = qtd;

    trocarTela("screen-shuffle");

    await embaralhar();

    trocarTela("screen-countdown");

    await fazerContagem();

    trocarTela("screen-result");

    await revelarVencedores();
}

async function embaralhar(){

    shuffleContainer.innerHTML="";

    const intervalo = setInterval(()=>{

        const ball =
        document.createElement("div");

        ball.className="ball";

        ball.innerText =
        gerarNumero(
            inicioGlobal,
            fimGlobal
        );

        ball.style.left =
        Math.random()*90 + "%";

        ball.style.top =
        Math.random()*85 + "%";

        shuffleContainer.appendChild(ball);

        setTimeout(()=>{
            ball.remove();
        },2000);

    },80);

    await esperar(5000);

    clearInterval(intervalo);
}

async function fazerContagem(){

    for(let i=3;i>=1;i--){

        countdown.innerText=i;

        await esperar(1000);
    }
}

async function revelarVencedores(){

    winnerArea.innerHTML="";

    const sorteados=[];

    while(
        sorteados.length <
        qtdGlobal
    ){

        const numero =
        gerarNumero(
            inicioGlobal,
            fimGlobal
        );

        if(
            !sorteados.includes(numero)
        ){
            sorteados.push(numero);
        }
    }

    for(let i=0;i<sorteados.length;i++){

        const div =
        document.createElement("div");

        div.className="winner";

        div.innerHTML=
        `${sorteados[i]}`;

        winnerArea.appendChild(div);

        confetti({
            particleCount:150,
            spread:100,
            origin:{ y:0.6 }
        });

        await esperar(1500);
    }
}