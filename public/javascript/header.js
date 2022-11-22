
  window.onload = function () {
    let menuH = document.querySelector(".menuH");
    let menu = document.querySelector(".nadvarH");
    let salir =document.querySelector("#salirH")
  
  
    menuH.addEventListener("click", () => {
      menu.classList.toggle("mostrar");
    });
  
    menu.addEventListener('mouseout',()=>{
      menu.classList.remove('mostrar')
    })
  
    menu.addEventListener('mouseover',()=>{
      menu.classList.add('mostrar')
    })
    salir.addEventListener("click", () => {
        menu.classList.remove("mostrar");
      });
    
}