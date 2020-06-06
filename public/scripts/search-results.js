// pega os icones de sol e lua e adiciona um EventListener ao label do switcher
const backDiv = document.querySelector("#page-search-results .back-div")
iconSun = document.querySelector("#label-switcher .fa-sun")
iconMoon = document.querySelector("#label-switcher .fa-moon")
document.querySelector("#label-switcher").addEventListener("click", changeTheme)

// função para trocar de tema
function changeTheme() {
    const body = document.querySelector("body")
    const textsToWhite = document.querySelectorAll("header h3, main h1, main h4, main span, main p, header a")
    const textsToBlack = document.querySelectorAll("form h1, form h2, form li span")

    // adiciona classe dark-theme-black-background para o body
    body.classList.toggle("dark-theme-black-background")

    // adiciona ou retira back-div do fundo
    backDiv.classList.toggle("back-div")

    // adiciona class dark-theme-white para os textos
    textsToWhite.forEach(text => {
        text.classList.toggle("dark-theme-white")
    })

    // adiciona class dark-theme-black para os textos
    textsToBlack.forEach(text => {
        text.classList.toggle("dark-theme-black")
    })

    //troca de icones do tema
    iconSun.classList.toggle("hide-theme-icon")
    iconMoon.classList.toggle("hide-theme-icon")
}
