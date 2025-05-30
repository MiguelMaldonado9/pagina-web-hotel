const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 3001;

//intermediario de conexion
app.use(cors());
app.use(express.json());

// mapeo tipo -> id_habitacion
const tipoToIdHabitacion = {
    "Estándar": 1,
    "Doble": 2,
    "Suite": 3
};

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'hotel_lacascada'
});

db.connect(err => {
    if (err) {
        console.error('Error de conexión:', err);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Backend del Hotel funcionando');
});


app.post('/reservas', (req, res) => {
    console.log('Datos recibidos:', req.body);

    const { tipo, nombre, fecha_inicio, fecha_fin } = req.body;

    if (!tipo || !nombre || !fecha_inicio || !fecha_fin) {
        return res.status(400).json({ error: 'Faltan datos en la solicitud' });
    }

    const fechaInicio = new Date(fecha_inicio);
    const fechaFin = new Date(fecha_fin);

    // Validación de fechas
    if (fechaFin <= fechaInicio) {
        return res.status(400).json({ error: 'La fecha de salida debe ser posterior a la fecha de entrada' });
    }

    const id_habitacion = tipoToIdHabitacion[tipo];
    if (!id_habitacion) {
        return res.status(400).json({ error: 'Tipo de habitación inválido' });
    }

    // Verificar ocupación existente
    const sqlOcupadas = `
        SELECT COUNT(*) AS ocupadas
        FROM reservas
        WHERE id_habitacion = ?
        AND (
            fecha_inicio < ? AND fecha_fin > ?
        )
    `;

    db.query(sqlOcupadas, [id_habitacion, fecha_fin, fecha_inicio], (err1, result1) => {
        if (err1) {
            console.error('Error al verificar disponibilidad:', err1);
            return res.status(500).json({ error: 'Error al verificar disponibilidad' });
        }

        const ocupadas = result1[0].ocupadas;

        // Consultar total de habitaciones
        const sqlTotal = 'SELECT cantidad_total FROM habitaciones WHERE id = ?';
        db.query(sqlTotal, [id_habitacion], (err2, result2) => {
            if (err2) {
                console.error('Error al obtener cantidad total:', err2);
                return res.status(500).json({ error: 'Error al obtener cantidad total' });
            }

            const cantidad_total = result2[0].cantidad_total;
            const disponibles = cantidad_total - ocupadas;

            console.log(`Ocupadas: ${ocupadas}`);
            console.log(`Cantidad total: ${cantidad_total}`);
            console.log(`Disponibles: ${disponibles}`);

            if (disponibles <= 0) {
                return res.status(400).json({ error: 'No hay habitaciones disponibles para las fechas seleccionadas' });
            }

            // Insertar la reserva
            const sqlInsert = `
                INSERT INTO reservas (id_habitacion, nombre_cliente, fecha_inicio, fecha_fin)
                VALUES (?, ?, ?, ?)
            `;
            db.query(sqlInsert, [id_habitacion, nombre, fecha_inicio, fecha_fin], (err3, result3) => {
                if (err3) {
                    console.error('Error al registrar reserva:', err3);
                    return res.status(500).json({ error: 'Error al registrar la reserva', detalle: err3.message });
                }
                res.status(201).json({ message: 'Reserva registrada correctamente' });
            });
        });
    });
});



// Importar y usar la ruta de disponibilidad
const disponibilidadRoute = require('./routes/disponibilidad')(db);
app.use('/api', disponibilidadRoute);

// Obtener todas las reservas con nombre del tipo de habitación
app.get('/api/reservas', (req, res) => {
    const sql = `
        SELECT r.id, r.nombre_cliente, h.tipo AS tipo_habitacion, r.fecha_inicio, r.fecha_fin
        FROM reservas r
        JOIN habitaciones h ON r.id_habitacion = h.id
    `;
    
    db.query(sql, (error, results) => {
        if (error) {
            console.error('Error al obtener reservas:', error);
            res.status(500).json({ error: 'Error al obtener reservas' });
        } else {
            res.json(results);
        }
    });
});


// Eliminar una reserva por ID
app.delete('/api/reservas/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM reservas WHERE id = ?', [id], (error, result) => {
        if (error) {
            console.error('Error al eliminar la reserva:', error);
            res.status(500).json({ error: 'Error al eliminar la reserva' });
        } else if (result.affectedRows > 0) {
            res.json({ mensaje: 'Reserva eliminada correctamente' });
        } else {
            res.status(404).json({ error: 'Reserva no encontrada' });
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
