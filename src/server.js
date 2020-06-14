const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db.js")


//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))


//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar rotas da aplicacao
//página inicial
//req: Request
//res: Response
server.get("/", (req, res) => {
    return res.render("index.html")
})

// rota
server.get("/create-point", (req, res) => {
    //req.query: Query strings da url
    // console.log(req.query)
    return res.render("create-point.html")
})

//salvar dados do form
server.post("/save-point", (req, res) => {
    //req.body: corpo do formulario
    
    //inserir dados na tabela
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            return res.render("create-point.html", { saved: false })
        }
        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)
})

// puxar os dados do db
server.get("/search", (req, res) => {
    const search = req.query.search

    if(search == "") {
        // verifica que não tem nada relacionado no db
        return res.render("search-results.html", { total: 0 })
    }

    //pegar os dados do db
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        //formatar rows do db
        rows.forEach(row => {
            row.items = row.items.split(",").join(", ")
        })
        
        //mostrar a pagina html com os dados do db
        return res.render("search-results.html", { places: rows, total: total })
    })
})

//ligar o servidor
var porta = process.env.PORT || 3000;
server.listen(porta);