
var word = "angelb"
var ab = ['a','b','c','d','e','f','g','h','i','j','k','l', 'ñ','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
window.onload = ()=>{
    initialize();
}

let initialize = () =>{
    for (let i = 0; i < 6; i++) {
        let col = document.createElement("div");
        col.style = "display:flex";
        for (let j = 0; j < word.length; j++) {
            let tile = document.createElement("input");
            let id = ((6*i)+j);
            tile.id = id+"tile";
            tile.classList.add("tile");
            tile.type = "text";
            tile.addEventListener("keydown",(e)=>{
                if(ab.includes(e.key.toLocaleLowerCase())){
                    if(e.target.value)e.preventDefault();
                    else if(id<((6*word.length)-1)) setTimeout(()=>{
                        document.getElementById((id+1)+"tile").focus();
                    },1)
                }
                else if(id>=1 && e.key==="Backspace"){
                    document.getElementById((id-1)+"tile").focus();
                }
                else{
                    e.preventDefault();
                }
            })
            col.appendChild(tile);
        
        }
        document.getElementById("board").appendChild(col)
        
    }

    document.getElementById("0tile").focus();
}