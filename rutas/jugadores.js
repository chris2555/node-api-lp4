const express = require('express')
const routes = express.Router()




// Ruta para obtener todos los jugadores usando el procedimiento almacenado
routes.get('/jugadores', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query = "CALL SEL_DATOSM3('JUGADORES', NULL)";

        conn.query(query, (err, results) => {
            if (err) return res.status(500).send(err);

            res.json(results[0]);
        });
    });
});

// Ruta para obtener un partido por ID usando el procedimiento almacenado
routes.get('/jugadores/:id', (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query = "CALL SEL_DATOSM3('JUGADORES',?)";

        conn.query(query, [id], (err, results) => {
            if (err) return res.status(500).send(err);

            res.json(results[0][0]); // results[0][0] contiene el primer resultado del procedimiento almacenado
        });
    });
});

// Ruta para insertar un nuevo equipo usando el procedimiento almacenado
routes.post('/jugadores', (req, res) => {
    const { NOM_JUGADOR,POSICION,EDAD,NACIONALIDAD,COD_EQUIPO,FEC_REGISTRO,USR_REGISTRO} = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query = 'CALL INS_REGISTROSM3(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        // Los parámetros para llamar a INS_REGISTROSM3
        const params = [
            'JUGADORES', // Tipo de tabla
            null, // Nombre del equipo
            null, // Ciudad del equipo
            null, // País del equipo
            NOM_JUGADOR, // Nombre del jugador
            POSICION, // Posición del jugador
            NACIONALIDAD, // Nacionalidad del jugador
            COD_EQUIPO, // Código de equipo local
            null, // Código de equipo visitante
            null, // Fecha del partido
            null, // Lugar del partido
            null, // Estado del partido
            null, // Resultado del partido
            null, // Código del partido
            null, // Código del equipo predicho como ganador
            null, // Código del equipo predicho como perdedor
            EDAD, // Porcentaje de ganar
            null, // Goles anotados
            null, // Goles concedidos
            null, // Posesión del balón
            null, // Tiros a puerta
            null, // Tiros fuera
            null, // Corners
            null, // Tarjetas amarillas
            null, // Tarjetas rojas
            USR_REGISTRO // Usuario que realiza el registro
        ];

        conn.query(query, params, (err, results) => {
            if (err) return res.status(500).send(err);

            res.send('Jugador insertado exitosamente');
        });
    });
});


// Ruta para eliminar un jugador usando el procedimiento almacenado
routes.delete('/jugadores/:id', (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query =  "CALL SEL_DATOSM3('DEL_JUGADOR',?)";

        conn.query(query, [id], (err, results) => {
            if (err) return res.status(500).send(err);

            res.send('Jugador eliminado exitosamente');
        });
    });
});

// Ruta para actualizar un jugador usando el procedimiento almacenado
routes.put('/jugadores/:id', (req, res) => {
    const { id } = req.params;
    const {NOM_JUGADOR,POSICION,EDAD,NACIONALIDAD,COD_EQUIPO,FEC_REGISTRO,USR_REGISTRO } = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query = 'CALL UPD_REGISTROSM3(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        // Los parámetros para llamar a INS_REGISTROSM3
        const params = [
            'JUGADORES', // Tipo de tabla
            null, // Nombre del equipo
            null, // Ciudad del equipo
            null, // País del equipo
            NOM_JUGADOR, // Nombre del jugador
            POSICION, // Posición del jugador
            NACIONALIDAD, // Nacionalidad del jugador
            COD_EQUIPO, // Código de equipo local
            null, // Código de equipo visitante
            null, // Fecha del partido
            null, // Lugar del partido
            null, // Estado del partido
            null, // Resultado del partido
            null, // Código del partido
            null, // Código del equipo predicho como ganador
            null, // Código del equipo predicho como perdedor
            EDAD, // Porcentaje de ganar
            null, // Goles anotados
            null, // Goles concedidos
            null, // Posesión del balón
            null, // Tiros a puerta
            null, // Tiros fuera
            null, // Corners
            null, // Tarjetas amarillas
            null, // Tarjetas rojas
            USR_REGISTRO,// Usuario que realiza el registro
            id
        ];

        conn.query(query, params, (err, results) => {
            if (err) return res.status(500).send(err);

            res.send('Jugador actualizado exitosamente');
        });
    });
});


module.exports = routes