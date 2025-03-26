const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json()); // Permite recibir JSON en las peticiones
app.use(cors()); // Habilita CORS para permitir llamadas desde la app

let accesos = []; // Simula una base de datos en memoria
let estadoPuerta = "BLOQUEADO"; // Estado inicial de la puerta
let productos = []; 

// Obtener todos los accesos
app.get('/accesos', (req, res) => {
    res.json(accesos);
});

// Agregar uno o varios accesos (POST)
app.post('/accesos', (req, res) => {
    const datos = req.body;

    if (Array.isArray(datos)) {
        // Si es un array, agregar múltiples accesos
        const nuevosAccesos = datos.map((acceso, index) => {
            if (!acceso.fecha || !acceso.hora || !acceso.tipoAcceso) {
                return res.status(400).json({ error: `El acceso en la posición ${index} está incompleto` });
            }
            return {
                idAcceso: accesos.length + 1 + index,
                ...acceso
            };
        });
        accesos = [...accesos, ...nuevosAccesos];
        return res.status(201).json({ mensaje: "Accesos agregados correctamente", accesos: nuevosAccesos });
    } else {
        // Si es un solo objeto, agregar un solo acceso
        
        const { fecha, hora, tipoAcceso } = datos;
        if (!fecha || !hora || !tipoAcceso) {
            return res.status(400).json({ error: "Faltan datos" });
        }
        const nuevoAcceso = {
            idAcceso: accesos.length + 1,
            fecha,
            hora,
            tipoAcceso
        };
        accesos.push(nuevoAcceso);
        return res.status(201).json(nuevoAcceso);
    }
});

// Obtener el estado de la puerta
app.get('/estado', (req, res) => {
    res.json({ estado: estadoPuerta });
});

// Cambiar el estado de la puerta (Abrir/Cerrar)
app.get('/abrir', (req, res) => {
    estadoPuerta = "DESBLOQUEADO";
    res.json({ mensaje: "Puerta abierta", estado: estadoPuerta });
});

app.get('/cerrar', (req, res) => {
    estadoPuerta = "BLOQUEADO";
    res.json({ mensaje: "Puerta cerrada", estado: estadoPuerta });
});

app.get('/productos', (req, res) => {
    res.json(productos);
});

// Agregar uno o varios productos (POST)
app.post('/productos', (req, res) => {
    const datos = req.body;

    if (Array.isArray(datos)) {
        // Si es un array, agregar múltiples productos
        const nuevosProductos = datos.map((producto, index) => {
            if (!producto.imagen || !producto.nombreProducto || !producto.descripcion) {
                return res.status(400).json({ error: `El producto en la posición ${index} está incompleto` });
            }
            return {
                id: productos.length + 1 + index,
                ...producto
            };
        });
        productos = [...productos, ...nuevosProductos];
        return res.status(201).json({ mensaje: "Productos agregados correctamente", productos: nuevosProductos });
    } else {
        // Si es un solo objeto, agregar un solo producto
        const { imagen, nombreProducto, descripcion } = datos;
        if (!imagen || !nombreProducto || !descripcion) {
            return res.status(400).json({ error: "Faltan datos" });
        }
        const nuevoProducto = {
            id: productos.length + 1,
            imagen,
            nombreProducto,
            descripcion,
        };
        productos.push(nuevoProducto);
        return res.status(201).json(nuevoProducto);
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
