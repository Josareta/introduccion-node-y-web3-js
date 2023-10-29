// Importamos el módulo express
const express = require("express")

//Creamos una instancia de express
const app = express()

//Definimos el puerto en el que se ejecutará el servidor
const PORT = 8000

//Definiendo base de datos
const database = {
    productos: [
        { id: 1, nombre: "Producto 1", cantidad : 5 },
        { id: 2, nombre: "Producto 2", cantidad: 10 },
        { id: 3, nombre: "Producto 3", cantidad: 15 }
    ]
}

// Middleware: Procesa la solicitud HTTP antes de que la aplicación la maneje, esto ocurre después de hacer la llamada y antes de obtener la respuesta.
// En este caso, "express.json()" verifica si la solicitud es JSON.
app.use(express.json())
// Vamos a pedirle en le Middlewere que realice una acción.
app.use((req, res, next) => {
    console.log(`Se ha recibido una petición en: ${req.url} con el método ${req.method}`)
    next()
    
})


//Ruta raíz para comprobar el funcionamoento de la API
app.get("/", (req, res) => {
    res.send({servidor: "¡Hola, mundo!!"})
})

//Ruta para obtener todos los productos
app.get("/api/productos", (req,res) => {
    // Devolvemos los productos en formato JSON con un código de estado 200 (Ok)
    res.json(database.productos)
    
    
})     

// Ruta POST para crear un nuevo producto
app.post("/api/productos/add", (req, res) => {
    //Obtenemos el producto a agregar desde el cuerpo de la solicitud (req.body).
    const nuevoProducto = { id: 5, nombre: "Producto 5", cantidad : 5 }
    // Agregamos el nuevo producto en la base de datos.
    database.productos.push(nuevoProducto)

    // Devolvemos el producto agregado en formato JSON junto con un mensaje de éxito.
    res.json({mesagge: "Producto agregado correctamente", producto: nuevoProducto})
    
})

    //Configuramos la aplicación para escuchar en el puerto especificado.
app.listen(PORT, () => {
    console.log(`La API se está ejecutando en: 🚀🚀🚀 http://localhost:${PORT} 🚀🚀🚀`)
})
