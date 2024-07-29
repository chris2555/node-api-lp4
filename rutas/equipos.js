const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    req.getConnection((err, conn) => {
     res.send('OK');
    });
});


routes.get('/equipos', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query = "CALL SEL_DATOSM3('EQUIPOS', NULL)";

        conn.query(query, (err, results) => {
            if (err) return res.status(500).send(err);

            res.json(results[0]);
        });
    });
});



routes.get('/equipos/:id', (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query = "CALL SEL_DATOSM3('EQUIPOS',?)";

        conn.query(query, [id], (err, results) => {
            if (err) return res.status(500).send(err);

            res.json(results[0][0]);
        });
    });
});


// Ruta para insertar un nuevo equipo usando el procedimiento almacenado
routes.post('/equipos', (req, res) => {
    const { NOM_EQUIPO, CIUDAD, PAIS, USR_REGISTRO } = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query = 'CALL INS_REGISTROSM3(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        // Los parámetros para llamar a INS_REGISTROSM3
        const params = [
            'EQUIPOS', // Tipo de tabla
            NOM_EQUIPO, // Nombre del equipo
            CIUDAD, // Ciudad del equipo
            PAIS, // País del equipo
            null, // Nombre del jugador
            null, // Posición del jugador
            null, // Nacionalidad del jugador
            null, // Código de equipo local
            null, // Código de equipo visitante
            null, // Fecha del partido
            null, // Lugar del partido
            null, // Estado del partido
            null, // Resultado del partido
            null, // Código del partido
            null, // Código del equipo predicho como ganador
            null, // Código del equipo predicho como perdedor
            null, // Porcentaje de ganar
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

            res.send('Equipo insertado exitosamente');
        });
    });
});




// Ruta para actualizar un equipo usando el procedimiento almacenado
routes.put('/equipos/:id', (req, res) => {
    const { id } = req.params;
    const { NOM_EQUIPO, CIUDAD, PAIS,USR_REGISTRO } = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query = 'CALL UPD_REGISTROSM3(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        // Los parámetros para llamar a INS_REGISTROSM3
        const params = [
            'EQUIPOS', // Tipo de tabla
            NOM_EQUIPO, // Nombre del equipo
            CIUDAD, // Ciudad del equipo
            PAIS, // País del equipo
            null, // Nombre del jugador
            null, // Posición del jugador
            null, // Nacionalidad del jugador
            null, // Código de equipo local
            null, // Código de equipo visitante
            null, // Fecha del partido
            null, // Lugar del partido
            null, // Estado del partido
            null, // Resultado del partido
            null, // Código del partido
            null, // Código del equipo predicho como ganador
            null, // Código del equipo predicho como perdedor
            null, // Porcentaje de ganar
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

            res.send('Equipo actualizado exitosamente');
        });
    });
});

// Ruta para eliminar un equipo usando el procedimiento almacenado
routes.delete('/equipos/:id', (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query =  "CALL SEL_DATOSM3('DEL_EQUIPO',?)";

        conn.query(query, [id], (err, results) => {
            if (err) return res.status(500).send(err);

            res.send('Equipo eliminado exitosamente');
        });
    });
});



module.exports = routes
