
var ver = {};
var word = "ZAPATA"
var ab = ['a','b','c','d','e','f','g','h','i','j','k','l', 'ñ','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
window.onload = ()=>{
    initialize();
}

let initialize = () =>{
    for (let i = 0; i < 5; i++) {
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
                    if(id>0 && id===(i*word.length)+(word.length-1)) {
                        console.log(id)
                        verify(i)
                    }
                    if(e.target.value)e.preventDefault();
                    else if(id<((6*word.length)-1)) setTimeout(()=>{
                        ver={...ver,[id]:e.key}
                        
                        console.log(id)
                        document.getElementById((id+1)+"tile").focus();
                    },1)
                }
                else if(id>=1 && e.key==="Backspace"){
                    if(id!==i*word.length && id!=word.length*6-1)document.getElementById((id-1)+"tile").focus();
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
    let aux = word
    let indP = 0
    for (let ind = i*word.length; ind <= (i*word.length)+(word.length-1); ind++) {
        let el = document.getElementById(ind+"tile")
        if(ver[ind]===word[indP]){
            aux = aux.slice(0,indP)+" "+aux.slice(indP+1)
            el.classList.add("correct")
            
        }else if(aux.includes(ver[ind])){
            aux = aux.slice(0,indP)+aux.slice(indP+1)
            el.classList.add("present")
        }else{
            el.classList.add("absent")
        }
        indP++
    }
}