const express = require('express')
const routes = express.Router()




routes.get('/estadequipos', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query = "CALL SEL_DATOSM3('ESTADISTICAS_EQUIPOS', NULL)";

        conn.query(query, (err, results) => {
            if (err) return res.status(500).send(err);

            res.json(results[0]);
        });
    });
});



routes.get('/estadequipos/:id', (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query = "CALL SEL_DATOSM3('ESTADISTICAS_EQUIPOS',?)";

        conn.query(query, [id], (err, results) => {
            if (err) return res.status(500).send(err);

            res.json(results[0][0]);
        });
    });
});


routes.post('/estadequipos', (req, res) => {
    const { COD_EQUIPO, COD_PARTIDO, GOLES_ANOTADOS, GOLES_CONCEDIDOS,POSESION_BALON,
    TIROS_A_PUERTA,TIROS_FUERA,CORNERS,TARJETAS_AMARILLAS,TARJETAS_ROJAS,FALTAS_COMETIDAS,USR_REGISTRO} = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query = 'CALL INS_REGISTROSM3(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        // Los parámetros para llamar a INS_REGISTROSM3
        const params = [
            'ESTADISTICAS_EQUIPOS', // Tipo de tabla
            null, // Nombre del equipo
            null, // Ciudad del equipo
            null, // País del equipo
            null, // Nombre del jugador
            null, // Posición del jugador
            null, // Nacionalidad del jugador
            null, // Código de equipo local
            null, // Código de equipo visitante
            null, // Fecha del partido
            null, // Lugar del partido
            null, // Estado del partido
            null, // Resultado del partido
            COD_PARTIDO, // Código del partido
            null, // Código del equipo predicho como ganador
            COD_EQUIPO, // Código del equipo predicho como perdedor
            GOLES_ANOTADOS, // Porcentaje de ganar
            GOLES_CONCEDIDOS, // Goles anotados
            POSESION_BALON, // Goles concedidos
            TIROS_A_PUERTA, // Posesión del balón
            TIROS_FUERA, // Tiros a puerta
            CORNERS, // Tiros fuera
            TARJETAS_AMARILLAS, // Corners
            TARJETAS_ROJAS, // Tarjetas amarillas
            FALTAS_COMETIDAS, // Tarjetas rojas
            USR_REGISTRO // Usuario que realiza el registro
        ];

        conn.query(query, params, (err, results) => {
            if (err) return res.status(500).send(err);

            res.send('Estadistica insertada exitosamente');
        });
    });
});

routes.put('/estadequipos/:id', (req, res) => {
    const { id } = req.params;
     const { COD_EQUIPO, COD_PARTIDO, GOLES_ANOTADOS, GOLES_CONCEDIDOS,POSESION_BALON,
    TIROS_A_PUERTA,TIROS_FUERA,CORNERS,TARJETAS_AMARILLAS,TARJETAS_ROJAS,FALTAS_COMETIDAS,USR_REGISTRO} = req.body;


    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query = 'CALL UPD_REGISTROSM3(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        // Los parámetros para llamar a INS_REGISTROSM3
        const params = [
           'ESTADISTICAS_EQUIPOS', // Tipo de tabla
            null, // Nombre del equipo
            null, // Ciudad del equipo
            null, // País del equipo
            null, // Nombre del jugador
            null, // Posición del jugador
            null, // Nacionalidad del jugador
            null, // Código de equipo local
            null, // Código de equipo visitante
            null, // Fecha del partido
            null, // Lugar del partido
            null, // Estado del partido
            null, // Resultado del partido
            COD_PARTIDO, // Código del partido
            null, // Código del equipo predicho como ganador
            COD_EQUIPO, // Código del equipo predicho como perdedor
            GOLES_ANOTADOS, // Porcentaje de ganar
            GOLES_CONCEDIDOS, // Goles anotados
            POSESION_BALON, // Goles concedidos
            TIROS_A_PUERTA, // Posesión del balón
            TIROS_FUERA, // Tiros a puerta
            CORNERS, // Tiros fuera
            TARJETAS_AMARILLAS, // Corners
            TARJETAS_ROJAS, // Tarjetas amarillas
            FALTAS_COMETIDAS, // Tarjetas rojas
            USR_REGISTRO, // Usuario que realiza el registro
            id
        ];

        conn.query(query, params, (err, results) => {
            if (err) return res.status(500).send(err);

            res.send('Estadistica Actualizada exitosamente');
        });
    });
});

// Ruta para eliminar un equipo usando el procedimiento almacenado
routes.delete('/estadequipos/:id', (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query =  "CALL SEL_DATOSM3('DEL_ESTADISTICAEQUI',?)";

        conn.query(query, [id], (err, results) => {
            if (err) return res.status(500).send(err);

            res.send('Estadistica eliminada exitosamente');
        });
    });
});




module.exports = routes