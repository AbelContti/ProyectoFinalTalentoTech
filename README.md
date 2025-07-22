# ProyectoFinalTalentoTech

## Rutas
/           -> principal

/api/productos (requieren token)
/           -> obtener todos los productos (get)
/id         -> obtener un producto a partir de su id (get)
            -> eliminar un producto a partir de su id (delete)
/create     -> ingresar un producto (post)

/auth       -> autenticación 
/login      -> obtener el token a partir de los datos de email y password ingresados (post)
/register   -> registrar un usuaria a partir de los datos de email y password ingresados (post) 


## Objeto producto
id          -> string
nombre      -> string
categoria   -> string (no es obligatorio)
precio      -> number

## Objeto usuario
email       -> string
password    -> string

## Autenticación
Usar el email "user" y la password "pass"

## Swagger (documentación)
Funciona en localhost, no logré hacer que funcione en vercel
/api-docs   -> la ruta para ver la documentación de la API