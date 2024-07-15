const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu-navegacion');

//console.log(menu)
//console.log(hamburger)

hamburger.addEventListener('click', ()=>{
    menu.classList.toggle("spread") //Cada vez que se toque el icono del menu se agrega o se quita la clase
})

window.addEventListener('click', e=>{
    /*Pongo el e para que cada que de click en la pantalla se ejecute */
   // console.log(e.target) 
   if(menu.classList.contains('spread') && //Devuelve T si el menu esta O F si el menu no esta
        e.target != menu && e.target != hamburger){
            
            menu.classList.toggle("spread")
   } 
})