// get UFs from API
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( response => response.json() )
    .then( states => {

        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()


// get cities from API
function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    // passar uf para input "state"
    stateInput.value = event.target.options[event.target.selectedIndex].text
    
    // resetar select
    citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`
    citySelect.disabled = true

    fetch(url)
    .then( response => response.json() )
    .then ( cities => {
        for(city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })

}

document.querySelector("select[name=uf]").addEventListener("change", getCities)


// itens de coleta
const itemsToColect = document.querySelectorAll('.items-grid li')

for (const item of itemsToColect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]')
let selectedItems = []

// adiciona ou remove itens clicados
function handleSelectedItem(event) {
    const itemLi = event.target
    const itemId = itemLi.dataset.id

    itemLi.classList.toggle("selected")

    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        return item === itemId
    } )

    // se ja estiver selecionado
    if(alreadySelected >= 0) {
        // tirar da selecao
        const filteredItems = selectedItems.filter( item => {
            return false 
        })
        selectedItems = filteredItems
    }else {
        // se nao estiver selecionado, adicionar a seleção
        selectedItems.push(itemId)
    }

    // atualizar o input escondido com os itens selecionados
    collectedItems.value = selectedItems
}

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
    const textsToWhite = document.querySelectorAll("header h3, header a")
    const textsToBlack = document.querySelectorAll("form h1, form h2, form li span")

    // adiciona classe dark-theme-black-background para o body
    body.classList.toggle("dark-theme-black-background")

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