const express = require('express');
const router = express.Router();

// Exporta una función que recibe la conexión a la base de datos
module.exports = (db) => {
    router.post('/disponibilidad', (req, res) => {
        const { tipoHabitacion, fechaInicio, fechaFin } = req.body;

        const queryTotal = `
            SELECT cantidad_total 
            FROM habitaciones 
            WHERE tipo = ?`;

        const queryOcupadas = `
            SELECT COUNT(*) AS ocupadas
            FROM reservas
            WHERE id_habitacion = (
                SELECT id FROM habitaciones WHERE tipo = ?
            )
            AND (
                (fecha_inicio <= ? AND fecha_fin > ?) OR
                (fecha_inicio < ? AND fecha_fin >= ?) OR
                (fecha_inicio >= ? AND fecha_fin <= ?)
            )
        `;

        db.query(queryTotal, [tipoHabitacion], (err, totalResult) => {
            if (err) return res.status(500).json({ error: err.message });

            const total = totalResult[0]?.cantidad_total || 0;

            db.query(queryOcupadas, [tipoHabitacion, fechaInicio, fechaInicio, fechaFin, fechaFin, fechaInicio, fechaFin], (err2, ocupadasResult) => {
                if (err2) return res.status(500).json({ error: err2.message });

                const ocupadas = ocupadasResult[0]?.ocupadas || 0;
                const disponibles = total - ocupadas;

                res.json({ disponibles });
            });
        });
    });

    return router;
};
