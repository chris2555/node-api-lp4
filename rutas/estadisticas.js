const express = require('express')
const routes = express.Router()



routes.get('/totales', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query = "CALL SEL_DATOSM3('TOTALES', NULL)";

        conn.query(query, (err, results) => {
            if (err) return res.status(500).send(err);

            res.json(results[0]);
        });
    });
});
routes.get('/eq', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const query = "CALL SEL_DATOSM3('EQ', NULL)";

        conn.query(query, (err, results) => {
            if (err) return res.status(500).send(err);

            res.json(results[0]);
        });
    });
});


module.exports = routes