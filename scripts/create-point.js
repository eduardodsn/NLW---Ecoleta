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


// change theme
function changeTheme(event) {
    const body = document.querySelector("body")
    const headerTexts = document.querySelectorAll("#logo h3, #page-create-point header a, #label-switcher i")
    const formTexts = document.querySelectorAll("form h1, form h2, form h3")
    
    // body
    if(body.classList.contains("darkness")) {
        body.classList.remove("darkness")
    }else {
        body.classList.add("darkness")
    }

    // texts
    headerTexts.forEach(function(headerText) {
        if(headerText.classList.contains("light-theme")){
            headerText.classList.remove("light-theme")
        }else{
            headerText.classList.add("light-theme")
        }
    })

    // texts
    formTexts.forEach(function(formText) {
        if(formText.classList.contains("darkness-theme")){
            formText.classList.remove("darkness-theme")
        }else{
            formText.classList.add("darkness-theme")
        }
    })
}

document.querySelector("#label-switcher").addEventListener("click", changeTheme)


// itens de coleta

const itemsToColect = document.querySelectorAll('.items-grid li')

for (const item of itemsToColect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]')

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    const itemId = event.target.dataset.id

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