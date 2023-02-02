## **🕒 Duración estimada**

x minutos

---

<br />

## **📌 INTRO**

Esta Homework está dividida en 2 partes.

En la primera parte la idea es que crees una base de datos, los modelos y guardes allí la informacion de una API.

En la segunda parte crearás un CRUD con algunas rutas interesantes que ayudarán a filtrar información, además de crear relaciones entre los modelos.

---

<br />

## **📍 CONSIGNA**

La idea de esta homework será simular la estructura de datos de un juego al estilo League of Legends (Si no lo conoces, no te preocupes; no es necesario conocerlo para completar la homework).

Lee atentamente este **README** y realiza cada uno de los ejercicios.

---

<br />

## **📖 Pasos básicos para realizar la homework**

🔹 Para poder ejecutar los `test` de esta homework, es necesario que abramos la terminal ubicados dentro de la carpeta `01 - Exercises`.

- Cuando te encuentres en esta carpeta, debes ejecutar el comando

```bash
npm install
```

¡Listo! Para correr los tests de los ejercicios utiliza el comando:

```bash
npm run test
```

---

<br />

## **ESTRUCTURA**

🔹 Dentro de la carpeta `01 - Exercises`, vas a encontrar la siguiente estructura:

- Una carpeta llamada `db`.
- Una carpeta llamada `img`.
- Una carpeta llamada `middlewares`.
- Una carpeta llamada `test`.
- Un archivo `index.js`.
- Un archivo `package.json`.
- Un archivo `server.js`.
- Y el archivo **README.md** que ahora mismo estás leyendo. 😙

---

<br />

## **👩‍💻 EJERCICIO 1**

### **Conexión a la BDD**

1. Base de Datos

📍 Ya se encuentra instalado `sequelize`, `pg` y `pg-hstore` por lo que comenzaremos directamente creando la base de datos. Esto debemos hacerlo desde alguna interfaz a PostgreSQL, ya sea por consola o desde PGAdmin.

Para realizarlo por consola ingresar a la consola de PostgreSQL con el comando ya visto `psql` y luego ejecutar:

```sql
  CREATE DATABASE henry_sequelize;
```

📍 Ahora que ya tenemos creada la base de datos procederemos a conectarla desde nuestro ORM (Sequelize) para poder interactuar con ella. Dentro de la carpeta `db` verás que en el archivo `index.js` tiene lo siguiente:

```js
const db = new Sequelize('postgres://user:password@localhost:5432/henry_sequelize', {
  logging: false,
});
```

📍Deberás reemplazar donde dice `user` y `password` por tu usuario y contraseña de Postgres para que la conexión sea exitosa, sino al correr el servidor te arrojará un error informando donde está fallando el intento de conexión. Si por algun motivo al instalar Postgres cambiaste el puerto default también tendrás que modificar donde dice `5432`.

Ahora vamos con los modelos. 😄

2. Modelos

    a. _Character_:

    Este modelo va a representar la plantilla de un personaje que podrías seleccionar del juego y tendrá las siguientes propiedades:

    ***Nota***: Las propiedades marcadas con asterístico (*) son obligatorias.

    * __code__*: string (Máximo 5 caracteres) [PK].
    * __name__*: string (Debe ser único).
    * __age__: integer.
    * __race__: enum. (Posibles valores: 'Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other').
    En el caso de no setear una raza ("race") por default debes asignarle "Other". 
    * __hp__*: float.
    * __mana__*: float.
    * __date_added__: timestamp without time.
    Si no existe valor para "date_added" debería tomar la fecha actual.
    *  Adicionalmente debes quitar los timestamps automáticos de createdAt y updatedAt.

    b. _Ability_:

    * __name__*: string.
    * __description__: text.
    * __mana_cost__*: float.

      ***Nota***: La   combinación "name" +  "mana_cost" debe ser única.

    c. _Role_: 

    * __name__*: string (Debe ser único).
    * __description__: string.

3. Validaciones

📍 Vamos a agregar algunas validaciones a nivel base de datos:

   * __Ability - mana_cost__: el valor debe estar entre 10.0 y 250.0.
   * __Character - name__: el valor no puede ser "Henry", "SoyHenry" o "Soy Henry".
   * __Character - code__: similar al anterior, vamos a hacer que no pueda ser "HENRY", incluyendo cualquier variación/combinación de mayúsculas y minísculas (Armar un custom validator).
---

<br />

## **👩‍💻 EJERCICIO 2**

### **Rutas**

📍 Debes ir a `server.js` y notar como estan configuradas las rutas principales antes de continuar, de esa manera entenderás el flujo del programa. 

📍 Además, si observas la carpeta middlewares, verás que ya tienes archivos para cada modelo con su respectivo esqueleto. Te encargarás de completarlas de la siguiente manera:

1. POST /character

    a. Esta ruta debe recibir por body los datos del modelo de `Character` y crear una instancia del mismo en la base de datos. 

    b. De no recibir todos los parámetros necesarios, debería devolver un status 404 con el mensaje "Falta enviar datos obligatorios".

    c. Si alguna validación interna de la base de datos falla, debe devolver un status 404 con el mensaje "Error en alguno de los datos provistos".

    d. Si todos los datos son provistos, debe devolver un status 201 y el objeto del personaje.

2. GET /character

   a. Esta ruta debe retornar todos los personajes que se encuentren creados en la base de datos. Además, este endpoint debe aceptar por query un valor de una raza para filtrar los resultados, por ejemplo: GET /character?race=human

   b. Vamos a agregarle a nuestra ruta la posibilidad que pueda recibir un age por query, de manera que se puedan combinar ambos filtros, el que ya estaba (race) y el que acabamos de crear (age).

   ***Nota***: Como ejercicio extra, puedes hacer el filtro de forma dinamica, es decir, que la ruta sirva para cualquiera de los atributos del modelo Character y no solo para age y race. 

3. GET /character/:code

   a. Esta ruta debe retornar aquel personaje que coincida con el código enviado. 

   b. En el caso de no encontrarlo debe responder con status code 404 y el mensaje "El código ${codigo} no corresponde a un personaje existente".

4. PUT /character/:attribute?value=...

   a. Vamos a crear un PUT el cual va a recibir un atributo como param y un value como query. 
   
   b. Deberá modificar todos los valores de dicho atributo con el valor dado para todas las instancias de personajes que existan en la base de datos y cuyo valor de ese atributo sea null, es decir, si se hace un request PUT a /character/age?value=40 deberá buscar todos los personajes cuya edad sea null y a esos reemplazarlos por el valor 40.

   c. Debe devolver simplemente un mensaje que diga 'Personajes actualizados'.

📍 Ya tenemos todos los modelos creados y funcionando correctamente pero cada uno por su cuenta, deberíamos relacionarlos de la siguiente forma: 😁

<p align="center">
  <img src="./img/DER.png" />
</p>

4. Relaciones entre modelos

   a. Debes asociar los modelos dentro del archivo `index.js` de la carpeta `db`. Para ello primero deberán obtener los modelos desde la instancia de Sequelize creada:

    ```js
    const { Character, Ability, Role} = db.models;
    ```

   b. Ahora si debes usar los métodos `hasOne`, `belongsTo`, `hasMany` o `belongsToMany` según corresponda.

   c. Una vez que hayas completado exitosamente las asociaciones vas a tener que descomentar las lineas que se encuentran dentro del `beforeAll` del archivo `character-routes.spec.js` (Lineas 52 a 58): 

    ```js
    await Promise.all([
      p1.createRole({name: 'Tank'}),
      p1.createRole({name: 'Top'}),
      p2.createRole({name: 'Jungle'}),
      p3.createRole({name: 'Mid'}),
      p3.createRole({name: 'Support'})
    ]);
    ```
---

<br />

## **🧠 Ejercicios Extra...**

### Getter

📍 Vamos a definir un getter para el atributo age de los personajes, lo que queremos es que nos devuelva el valor de su edad pero concatenado con la frase 'years old' por lo que para un personaje que tenga 27 años nos debería devoler '27 years old'.

   ***Nota***: Posiblemente esto hará que rompan algunos tests anteriores que esperaban solamente el valor, anímate a arreglarlos. 😎

### Virtual Field

📍 Ahora crearemos un campo virtual para el modelo de Ability que será como un mini resumen de la habilidad y lo llamaremos "summary", deberá retornar "${name} (${mana_cost} points of mana) - Description: ${description}" (La mana tienen que ser solo la parte entera).

### POST /ability

📍 Debe recibir por body los datos del modelo de `Ability` y crear una instancia del mismo en la base de datos. 
  * De no recibir todos los parámetros necesarios debería devolver un status 404 con el mensaje "Falta enviar datos obligatorios"
  * Si todos los datos son provistos debera devolver un status 201 y el objeto de la habilidad

### PUT /ability/setCharacter

📍 Recibirá por body `idAbility` y `codeCharacter` y deberá asociarlos a partir del modelo de Ability y devolver el objeto de habilidad con `name`, `description`, `mana_cost` y `CharacterCode`.

### PUT /character/addAbilities

📍 Similar al enpodint anterior pero ahora queremos poder desde el lado del personaje agregar una o mas habilidades en simultaneo que las recibiremos como un array dentro del body del request:

```js
{
  codeCharacter: 'TWO',
  abilities: [
    { name: 'abilityOne', mana_cost: 17.0 },
    { name: 'abilityTwo', mana_cost: 84.0 },
    { name: 'abilityThree', mana_cost: 23.0 }
  ]
}
```

Todas estas habilidades aun no existen en la base de datos... 

### GET /characters/roles/:code

📍 Crearemos otro endpoint para obtener todos los datos del personajes pero incluyendo también la información asociada a sus roles. Por ejemplo debería devolver algo así:

```js
{
      age: '27 years old',
      code: 'ONE',
      name: 'First',
      race: 'Human',
      hp: 90,
      mana: 150,
      date_added: '2022-03-27',
      Roles: [
        {
          id: 1,
          name: 'Tank',
          description: null
        },
        {
          id: 2,
          name: 'Top',
          description: null
        }
      ]
    }

```


<br />

😁😄 ¡Listo! Aprendiste a crear una base de datos, llenarla y hacerle peticiones modificando sus datos. ✨🚀

Dirígete a la carpeta 📂 "02 - Integration" y continúa desarrollando la app de Rick & Morty 🤩 ---
