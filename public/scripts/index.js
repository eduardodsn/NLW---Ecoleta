// pega os icones de sol e lua e adiciona um EventListener ao label do switcher
iconSun = document.querySelector("#label-switcher .fa-sun")
iconMoon = document.querySelector("#label-switcher .fa-moon")
document.querySelector("#label-switcher").addEventListener("click", changeTheme)


// verifica tema atual
var theme = localStorage.getItem("theme") || 'light';

if(theme === 'dark') {
    changeTheme()
}

iconSun.addEventListener('click', setThemeLocalStorage)
iconMoon.addEventListener('click', setThemeLocalStorage)

function setThemeLocalStorage() {
    theme = theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem("theme", theme)
}


// função para trocar de tema
function changeTheme() {
    const body = document.querySelector("body")
    const texts = document.querySelectorAll("h1, h3, p, a")

    // adiciona classe dark-theme-black-background para o body
    body.classList.toggle("dark-theme-black-background")

    // adiciona class dark-theme-white para os textos
    texts.forEach(text => {
        text.classList.toggle("dark-theme-white")
    })

    //troca de icones do tema
    iconSun.classList.toggle("hide-theme-icon")
    iconMoon.classList.toggle("hide-theme-icon")
}


// pegar botão, modal e tag a para fazer o modal
const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

close.addEventListener("click", () => {
    modal.classList.add("hide")
})