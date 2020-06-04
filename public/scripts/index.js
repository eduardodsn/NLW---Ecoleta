document.querySelector("#label-switcher").addEventListener("click", changeTheme)

// change theme
function changeTheme(event) {
    const body = document.querySelector("body")
    const headerTexts = document.querySelectorAll("#logo h3, #page-home header a, #label-switcher i")
    const bodyTexts = document.querySelectorAll("main h1, main p")
    
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
    bodyTexts.forEach(function(bodyText) {
        if(bodyText.classList.contains("light-theme")){
            bodyText.classList.remove("light-theme")
        }else{
            bodyText.classList.add("light-theme")
        }
    })
}

const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

close.addEventListener("click", () => {
    modal.classList.add("hide")
})