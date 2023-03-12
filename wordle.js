var ver = {};
var word = "";
var list_teams = null;
var data_base = null;
var ab = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ñ', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '_'];
var current = -1;
window.onload = () => {
    fetch('/base_datos.json').then(res => res.json()).then(init);
}
let init = (db) => {
    data_base = db;
    setInterval(initialize(),1);
    
}
let initialize = () => {

    imp_table();
    removeAll(document.getElementById("board"));

    (current===6)?current=0:current++;
    i = Math.floor(Math.random() * Object.keys(data_base).length);
    let obj = Object.entries(data_base);
    word = obj[i][0];
    console.log(word.length,word);
    for (let i = 0; i < 3; i++) {
        let col = document.createElement("div");
        col.style = "display:flex";
        for (let j = 0; j < word.length; j++) {
            let tile = document.createElement("input");
            let id = ((word.length * i) + j);
            tile.id = id + "tile";
            tile.classList.add("tile");
            tile.type = "text";
            tile.addEventListener("keydown", (e) => {
                if (ab.includes(e.key.toLocaleLowerCase())) {
                    if (e.target.value) e.preventDefault();
                    else if (id < ((3 * word.length))) setTimeout(() => {
                        ver = { ...ver, [id]: e.key.toUpperCase() }
                        console.log(id)
                        if (id > 0 && id === (i * word.length) + (word.length - 1)) verify(i)
                        document.getElementById((id + 1) + "tile")?.focus();
                    }, 1)

                }
                else if (id >= 1 && e.key === "Backspace") {
                    if (id !== i * word.length && id != word.length * 6 - 1) document.getElementById((id - 1) + "tile").focus();
                }
                else {
                    e.preventDefault();
                }
            })
            col.appendChild(tile);

        }
        document.getElementById("board").appendChild(col)

    }

    document.getElementById("0tile").focus();
}

let verify = (i) => {
    correct = 0
    let aux = word
    let indP = 0
    for (let ind = i * word.length; ind <= (i * word.length) + (word.length - 1); ind++) {
        let el = document.getElementById(ind + "tile")
        // console.log(ver,word)
        if (ver[ind] === word[indP]) {
            aux = aux.slice(0, indP) + " " + aux.slice(indP + 1)
            el.classList.add("correct")
            correct++
            if (correct === word.length) {
                window.confirm("¡correcta!");
                console.log(list_teams,current);
                list_teams[current][1]++;
            }

        } else if (aux.includes(ver[ind])) {
            aux = aux.slice(0, indP) + aux.slice(indP + 1)
            el.classList.add("present")
        } else {
            el.classList.add("absent")
        }

        indP++
    }
}

let button_guardar = () => {
    list_teams = new Array();
    let result_inputs = document.getElementsByClassName("inputs");

    let item = [].map.call(result_inputs, (data) => {
        list_teams.push(Array("Team " + data.value, 0));
    })

    var close_popUp = document.getElementById("main_emergente").style.display = "none";
    var close_popUp = document.getElementById("main_game").style.display = "block";
    console.log(list_teams);

    imp_table();
}


let removeAll = (el) => {
    if(el&&el.children )[...el.children].forEach(child => {
        el.removeChild(child);
        console.log(777,el.children);
    });

}

let imp_table = () => {
    list_teams.forEach((data, in_fila) => {
        data.forEach((valor, in_columna) => {
            let id = String('f'+in_fila+'c'+in_columna).valueOf()
            let change_text = document.getElementById(id).innerHTML = valor;
        });
    });
}