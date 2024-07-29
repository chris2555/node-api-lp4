const express = require('express')
const routes = express.Router()



// Ruta para obtener todos los partidos usando el procedimiento almacenado
routes.get('/partidos', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query = "CALL SEL_DATOSM3('PARTIDOS', NULL)";

        conn.query(query, (err, results) => {
            if (err) return res.status(500).send(err);

            res.json(results[0]);
        });
    });
});

// Ruta para obtener un partido por ID usando el procedimiento almacenado
routes.get('/partidos/:id', (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query = "CALL SEL_DATOSM3('PARTIDOS',?)";

        conn.query(query, [id], (err, results) => {
            if (err) return res.status(500).send(err);

            res.json(results[0][0]); // results[0][0] contiene el primer resultado del procedimiento almacenado
        });
    });
});


// Ruta para eliminar un partido usando el procedimiento almacenado
routes.delete('/partidos/:id', (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query =  "CALL SEL_DATOSM3('DEL_PARTIDO',?)";

        conn.query(query, [id], (err, results) => {
            if (err) return res.status(500).send(err);

            res.send('Partido eliminado exitosamente');
        });
    });
});


// Ruta para insertar un nuevo equipo usando el procedimiento almacenado
routes.post('/partidos', (req, res) => {
    const { COD_EQUIPO_LOCAL,COD_EQUIPO_VISITANTE, FEC_PARTIDO, LUGAR,ESTADO,RESULTADO,USR_REGISTRO} = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query = 'CALL INS_REGISTROSM3(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        // Los parámetros para llamar a INS_REGISTROSM3
        const params = [
            'PARTIDOS', // Tipo de tabla
            null, // Nombre del equipo
            null, // Ciudad del equipo
            null, // País del equipo
            null, // Nombre del jugador
            null, // Posición del jugador
            null, // Nacionalidad del jugador
            COD_EQUIPO_LOCAL, // Código de equipo local
            COD_EQUIPO_VISITANTE, // Código de equipo visitante
            FEC_PARTIDO, // Fecha del partido
            LUGAR, // Lugar del partido
            ESTADO, // Estado del partido
            RESULTADO, // Resultado del partido
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

            res.send('Partido insertado exitosamente');
        });
    });
});


// Ruta para actualizar un partido usando el procedimiento almacenado
routes.put('/partidos/:id', (req, res) => {
    const { id } = req.params;
    const {COD_EQUIPO_LOCAL,COD_EQUIPO_VISITANTE, FEC_PARTIDO, LUGAR,ESTADO,RESULTADO,USR_REGISTRO } = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query = 'CALL UPD_REGISTROSM3(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        // Los parámetros para llamar a INS_REGISTROSM3
        const params = [
            'PARTIDOS', // Tipo de tabla
            null, // Nombre del equipo
            null, // Ciudad del equipo
            null, // País del equipo
            null, // Nombre del jugador
            null, // Posición del jugador
            null, // Nacionalidad del jugador
            COD_EQUIPO_LOCAL, // Código de equipo local
            COD_EQUIPO_VISITANTE, // Código de equipo visitante
            FEC_PARTIDO, // Fecha del partido
            LUGAR, // Lugar del partido
            ESTADO, // Estado del partido
            RESULTADO, // Resultado del partido
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

            res.send('Partido actualizado exitosamente');
        });
    });
});

module.exports = routes