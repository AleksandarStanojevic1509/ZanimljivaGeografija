export const writeEvent = (text) =>{
    const parent = document.querySelector ('#display-chat ul')
    const el =  document.createElement('li');
    el.innerHTML = text;
    parent.appendChild(el)
}