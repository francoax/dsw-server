# Poncho Home & Stay

Proyecto creado en la asignatura de Desarrollo de Software 2023.

- [Poncho Home \& Stay](#poncho-home--stay)
  - [Informacion general](#informacion-general)
  - [Tecnologias](#tecnologias)
  - [Metodologia](#metodologia)
  - [Documentacion](#documentacion)
  - [Guia de instalacion](#guia-de-instalacion)
  - [Testing](#testing)
  - [Desarrolladores](#desarrolladores)

## Informacion general
PHS es una aplicacion de reservas, donde vos como usuario tenes la posibilidad de reservar propiedades como tambien paquetes
prearmados, que son el conjunto de una propiedad + auto + asistencia medica.

## Tecnologias
El proyecto fue desarrollado utilizando el stack M.E.A.N.

* MongoDB
* Express
* Angular
* NodeJS

Por parte de estilos, utilizamos [TailwindCSS](https://tailwindcss.com/) a la par de [DaisyUI](https://daisyui.com/),
que ofrece una serie de componentes estilados con Tailwind. Ademas, para formateo de codigo, nos decidimos por utilizar [ESLint](https://eslint.org/).

Por parte de testing, se utilizo la dependencia de [Jest](https://jestjs.io/).

## Metodologia
Para las branches de nuestro proyecto, seguimos la forma:

* master: produccion
* dev: desarrollo

Para cada nueva implementacion, se utilizo la forma de:

* feature/new-feature
* fix/problem

Ademas para no corromper los datos, se generaron dos bases de datos distintas. Una enfocada a produccion y otra a desarrollo, las cuales estan pasadas por
variables de entorno en cada uno.

Ver ```MONGO_DB_URL``` en ```src/index.js```

Para la publicacion de nuestro proyecto, utilizamos [Vercel](https://vercel.com). Tanto frontend como backend estan alojados en dicha pagina.

## Documentacion
* Swagger: Luego de [instalar el servidor](#guia-de-instalacion), navegar a la ruta [http://localhost:4000/api/api-docs](http://localhost:4000/api/api-docs)
* Proposal: [Proposal](https://github.com/tomasbottoni/tp_Poncho-Home-Stay/blob/main/proposal.md)
* Trello: [Trello](https://trello.com/b/MFViuKQH)
* Toda la conversacion/organizacion fue a traves de Discord

## Guia de instalacion
El proyecto fue desarrollado utilizando las siguientes versiones:

* **AngularCLI 16.1.8**
* **NodeJS v18.17.0**

Dicho servidor es la API para nuestro [frontend](https://github.com/francoax/dsw-app).
Pasos:

Clona el repositorio
```
git clone https://github.com/francoax/dsw-server
```

Navega a la carpeta del proyecto
```
cd .\dsw-server\
```

Instala las depedencias
```
npm install
```

Inicia la aplicacion
```
npm run start
```

Y listo, de esta manera ya el servidor estaria levantado. PHS puede realizar peticiones.

## Testing
Los tests implementados cubren las entidades que reconocimos como mas importantes. Estas son:

* Packages
* Properties
* Reserves
* Users

Cada test cubre todos los endpoints disponibles de cada entidad.
Como explicacion, los tests corren con una base de datos de MongoDB en memoria, que se crea y destruye una vez finalizado los tests.
Para esto, creamos seeds de todas nuestras entidades para cargar dicha base. De esta manera evitamos que los test corrompan nuestra base de datos original.

Para correr los test se debe de ejecutar:
```
npm run test
```

## Desarrolladores
* 47308 Franco Duarte <img src="https://avatars.githubusercontent.com/u/87949682?v=4" height="15" width="15"> [@francoax](https://github.com/francoax)
* 46793 Octavio Pereyra <img src="https://avatars.githubusercontent.com/u/82680476?v=4" height="15" width="15"> [@octapereyra](https://github.com/octapereyra)
* 47152 Nicolas Di Dio <img src="https://avatars.githubusercontent.com/u/81826078?v=4" height="15" width="15"> [@NicolasDiDio09](https://github.com/NicolasDiDio09)
* 45757 Tomas Bottoni <img src="https://avatars.githubusercontent.com/u/81845990?v=4" height="15" width="15"> [@tomasbottoni](https://github.com/tomasbottoni)
