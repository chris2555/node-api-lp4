const express = require('express')
const routes = express.Router()



routes.get('/predicciones', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query = "CALL SEL_DATOSM3('PREDICCIONES', NULL)";

        conn.query(query, (err, results) => {
            if (err) return res.status(500).send(err);

            res.json(results[0]);
        });
    });
});

// Ruta para obtener un equipo por ID usando el procedimiento almacenado
routes.get('/predicciones/:id', (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query = "CALL SEL_DATOSM3('PREDICCIONES',?)";

        conn.query(query, [id], (err, results) => {
            if (err) return res.status(500).send(err);

            res.json(results[0][0]);
        });
    });
});


// Ruta para insertar un nuevo equipo usando el procedimiento almacenado
routes.post('/predicciones', (req, res) => {
    const { COD_PARTIDO, COD_EQUIPO_PREDICHO, COD_EQUIPO_PERDEDOR,PORCENTAJE_GANAR, USR_REGISTRO } = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query = 'CALL INS_REGISTROSM3(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        // Los parámetros para llamar a INS_REGISTROSM3
        const params = [
            'PREDICCIONES', // Tipo de tabla
            null, // Nombre del equipo
            null, // Ciudad del equipo
            null, // País del equipo
            null, // Nombre del jugador
            null, // Posición del jugador
            null, // Nacionalidad del jugador
            COD_EQUIPO_PREDICHO, // Código de equipo local
            COD_EQUIPO_PERDEDOR, // Código de equipo visitante
            null, // Fecha del partido
            null, // Lugar del partido
            null, // Estado del partido
            null, // Resultado del partido
            COD_PARTIDO, // Código del partido
            PORCENTAJE_GANAR, // Código del equipo predicho como ganador
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

            res.send('Prediccion insertado exitosamente');
        });
    });
});



routes.delete('/predicciones/:id', (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query =  "CALL SEL_DATOSM3('DEL_PREDICCION',?)";

        conn.query(query, [id], (err, results) => {
            if (err) return res.status(500).send(err);

            res.send('Prediccion eliminada exitosamente');
        });
    });
});

// Ruta para actualizar un jugador usando el procedimiento almacenado
routes.put('/predicciones/:id', (req, res) => {
    const { id } = req.params;
    const { COD_PARTIDO, COD_EQUIPO_PREDICHO, COD_EQUIPO_PERDEDOR,PORCENTAJE_GANAR, USR_REGISTRO } = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query = 'CALL UPD_REGISTROSM3(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        // Los parámetros para llamar a INS_REGISTROSM3
        const params = [
            'PREDICCIONES', // Tipo de tabla
            null, // Nombre del equipo
            null, // Ciudad del equipo
            null, // País del equipo
            null, // Nombre del jugador
            null, // Posición del jugador
            null, // Nacionalidad del jugador
            COD_EQUIPO_PREDICHO, // Código de equipo local
            COD_EQUIPO_PERDEDOR, // Código de equipo visitante
            null, // Fecha del partido
            null, // Lugar del partido
            null, // Estado del partido
            null, // Resultado del partido
            COD_PARTIDO, // Código del partido
            PORCENTAJE_GANAR, // Código del equipo predicho como ganador
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

            res.send('Prediccion actualizada exitosamente');
        });
    });
});

module.exports = routes