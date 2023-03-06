
var ver = {};
var word = "angel"
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
            let id = ((word.length*i)+j);
            tile.id = id+"tile";
            tile.classList.add("tile");
            tile.type = "text";
            tile.addEventListener("keydown",(e)=>{
                if(ab.includes(e.key.toLocaleLowerCase())){
                    if(e.target.value)e.preventDefault();
                    else if(id<((6*word.length)-1)) setTimeout(()=>{
                        ver={...ver,[id]:e.key}
                        document.getElementById((id+1)+"tile").focus();
                        console.log(id)
                        if(id>0 && id===(i*word.length)+(word.length-1)) {
                            console.log("ver",id)
                            verify(i)
                        }
                    },1)
                }
                else if(id>=1 && e.key==="Backspace"){
                    if(id!==i*word.length)document.getElementById((id-1)+"tile").focus();
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

let verify = (i)=>{
    let correct = 0
    let indP = 0
    for (let ind = i*word.length; ind <= (i*word.length)+(word.length-1); ind++) {
        let el = document.getElementById(ind+"tile")
        if(ver[ind]===word[indP]){
            el.classList.add("correct")
        }else if(word.includes(ver[ind])){
            el.classList.add("present")
        }else{
            el.classList.add("absent")
        }
        
        indP++
    }
}