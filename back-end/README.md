BACK-END 

### `npm run start`

Breve explicación: 

-Carpeta “config” contiene los archivos “default” y “production” para manejar variables de entorno. Esta carpeta no se debería subir al repositorio,
 al igual que “node_modules”. 

-Carpeta “db” contiene en “comandos” los comandos sql utilizados (bien pocos), en “index” la configuración de sequelize que utiliza las variables 
de entorno de “config” y el archivo “insertMusicas” que contiene la información a almacenar (IMPORTANTE: Este archivo se dejó pronto para ser 
ejecutado y guardar la información de la música que está en la carpeta “public/music” solo se necesita desmarcar una vez para que corra el 
programa y volver a marcar para que no se siga guardando cada vez que el programa se actualice). 

-Carpeta “models” encontramos tres archivos “contacto”, “musica” y “usuario” que son los modelos que utiliza sequelize para crear las tablas en la 
base de datos postgresql. 

-Carpeta “src/mail” contiene el archivo “mailer” donde está la configuración de nodemailer, utilizado para el envío de correos electrónicos. 

-Carpeta “src/passport” contiene tres archivos con la configuración general de passport en “index”, la configuración de la estrategia local en 
“local” y la configuración de la estrategia con json web token en “jwt”, para la autenticación de los usuarios y la protección de rutas. 

-Carpeta “src/public/music” tenemos 17 archivos mp3 con un tema musical por género como ejemplo (disponibilizados en el front-end para escuchar y 
descargar). 

-Carpeta “src/routers” contiene 5 archivos, “buscarCancion” con 4 rutas POST para buscar canción por título, artista, género o año. Archivo 
“download” con una ruta GET protegida para descargar música. Archivo “get” con una ruta GET que suministra la información de la música que está 
almacenada en la base de datos. Archivo “post” con 5 rutas POST para contacto, signup, login, forgot_password y reset_password. Archivo “index” 
rector de los archivos anteriores y de “insertMusicas”. 

-Archivo principal “app”. 

Módulos usados: 

1.	Internos de Nodejs 

    path (Para unir caminos en diferentes sistemas operativos path.join) 

    crypto (Generar token de recuperación de password) 

2.	Externos (de terceros) 

    express (Crear servidor) 

    cookie-parser (Manejo de cookies) 

    express-session (Manejo de sesiones) 

    passport (Manejo de login) 

    passport-local (Estrategia Local) 

    passport-jwt (Estrategia JWT) 

    jsonwebtoken (Generar token para autenticación) 

    bcryptjs (Para encriptar las claves de usuarios) 

    config (Para manejar variables de entorno) 

    chalk (Colores para la consola a nivel de dependencia de desarrollo) 

    nodemailer (Enviar correos electrónicos) 

    pg (Conectores para Postgres) 

    pg-hstore (Conectores para Postgres) 

    sequelize (ORM (Object Relational Mapper)) 

    cors (Permitir acceso a API) 