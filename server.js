const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')


const app = express()

app.set('port', process.env.PORT || 3000)
const dbOptions = {
    host: process.env.DB_HOST || "142.44.161.115",
    port: process.env.DB_PORT || "3306",
    user: process.env.DB_USER || "1700Pac2Equ2",
    password: process.env.DB_PASSWORD || "1700Pac2Equ2#65",
    database: process.env.DB_NAME || "1700Pac2Equ2"
}

app.use(myconn(mysql,dbOptions,'single'))
app.use(express.json())

// Rutas
app.use(require('./rutas/equipos'))
app.use(require('./rutas/partidos'))
app.use(require('./rutas/jugadores'))
app.use(require('./rutas/estadisticas'))
app.use(require('./rutas/predicciones'))
app.use(require('./rutas/estadisticas_equipos'))


app.listen(app.get('port'), () =>{
    console.log('Servidor ejecutándose en el puerto',app.get('port'))

})
