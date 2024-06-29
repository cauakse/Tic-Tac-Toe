const playBtn = document.getElementById("play");
const switchTheme = document.getElementById("themeSwitcher");
const p1 = document.getElementById("playerOne");
const p2 = document.getElementById("playerTwo");
let player = 1


switchTheme.addEventListener("click", () => {
    const root = document.querySelector(":root");
    const body = document.querySelector("body");
    if (body.dataset.theme === "dark") {
        root.style.setProperty('--bg-color', "#f1f5f9");
        root.style.setProperty("--border-color", "#aaa");
        root.style.setProperty("--font-color", "#212529");
        root.style.setProperty("--primary-color", "#26834a");
        body.dataset.theme = "light";
    }
    else {
        root.style.setProperty('--bg-color', "#212529");
        root.style.setProperty('--border-color:', '#9B89B3');
        root.style.setProperty("--font-color", "#f1f5f9");
        root.style.setProperty("--primary-color", "#4dff91");
        body.dataset.theme = "dark";
    }
})

playBtn.addEventListener("click", () => {
    const tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.style.display = 'flex';
    p1.setAttribute("disabled", "true");
    p2.setAttribute("disabled", "true");
    playGame();
});

function playGame() {
    let matriz = [[3, 4, 5],
    [6, 7, 8],
    [10, 9, 11]];
    let numJogadas = 0;
    const winner = document.getElementById("winnerName");
    winner.innerText = "Vez de " + p1.value;
    playBtn.style.display = "none";
    document.querySelectorAll("button[class='gameBtn']").forEach((bt) => {
        bt.addEventListener("click", () => {
            const val = JSON.parse(bt.value);
            numJogadas++;
            bt.setAttribute("disabled", "disabled");
            bt.classList.toggle("gameBtn");
            bt.classList.toggle("gameBtnClicked");
            if (player == 1) {
                winner.innerText = "Vez de " + p2.value;
                bt.innerText = "O";
            }
            else {
                winner.innerText = "Vez de " + p1.value;
                bt.innerText = "X";
            }
            matriz[val.l][val.c] = player;
            if (verifica(matriz)) {
                document.querySelectorAll("button[class='gameBtn']").forEach((bt) => {
                    bt.setAttribute("disabled", "disabled");
                    bt.classList.toggle("gameBtn");
                    bt.classList.toggle("gameBtnClicked");
                    if (player == 1) {
                        winner.innerText = p1.value + " Venceu!!!";
                    }
                    else {
                        winner.innerText = p2.value + " Venceu!!!";
                    }

                    fim();
                    return;
                });
            }
            else {
                if (numJogadas < 9) {
                    if (player == 1) {
                        player = 2;
                    }
                    else {
                        player = 1;
                    }
                }
                else {
                    winner.innerText = "Empate!!";
                    fim();
                    return;
                }

            }


        });
    });

}

function verifica(matriz) 
{
    let boll = false;
    const l = matriz.length;
    const c = matriz[0].length;
    var i, j;
    for (i = 0; i < l && !boll; i++) {
        for (var j = 0; j < c - 1 && matriz[i][j] == matriz[i][j + 1]; j++);

        if (j == c - 1)
            boll = true;
    }

    if (!boll) {
        for (i = 0; i < c && !boll; i++) {
            for (j = 0; j < l - 1 && matriz[j][i] == matriz[j + 1][i]; j++);

            if (j == l - 1)
                boll = true;
        }

        if (!boll) {
            for (i = 0; i < c - 1 && matriz[i][i] == matriz[i + 1][i + 1] && !boll; i++);

            if (i == c - 1)
                boll = true;

            if (!boll) {
                for (i = 0, j = c - 1; i < l - 1 && matriz[i][j] == matriz[i + 1][j - 1] && !boll; i++, j--);
                if (i == l - 1)
                    boll = true;

                if (boll) {
                    for (i = 0, j = c - 1; i < c; i++, j--){
                        document.getElementById("c"+i+"l"+j).style.backgroundColor="#ff0043";
                    }
                }
            }
            else {
                for (i = 0; i < c; i++) {
                    document.getElementById("c" + i + "l" + i).style.backgroundColor = "#ff0043";
                }
            }
        }
        else
        {
            for(j=0;j<c;j++)
                {
                    document.getElementById("c"+(i-1)+"l"+j).style.backgroundColor="#ff0043";
                }
        }
    }
    else
    {
        for(j=0;j<c;j++)
            {
                document.getElementById("c"+j+"l"+(i-1)).style.backgroundColor="#ff0043";
            }
    }

    return boll;
}

function fim() 
{
    const playSpan = document.querySelector(".playSpan");
    playSpan.innerHTML = "<button id='replay'>Jogar Novamente?</button>";
    const replayBtn = document.getElementById("replay");
    replayBtn.setAttribute("class", "replay");
    replayBtn.addEventListener("click", () => {

        location.reload();

    });
}
