# HW 02: Sequelize | Ejercicios

## **🕒 Duración estimada**

x minutos

---

<br />

## **📌 INTRO**

En esta Homework crearás un CRUD con algunas rutas interesantes que ayudarán a filtrar información, además de crear relaciones entre los modelos.

---

<br />

## **📍 CONSIGNA**

La idea de esta homework será simular la estructura de datos de un juego al estilo League of Legends (si no lo conoces, no te preocupes; no es necesario conocerlo para completar la homework).

Lee atentamente este **README** y realiza cada uno de los ejercicios.

---

<br />

## **📖 Pasos básicos para realizar la homework**

🔹 Para poder ejecutar los `test` de esta homework, es necesario que abramos la terminal ubicados dentro de la carpeta `01 - Exercises`.

-  Cuando te encuentres en esta carpeta, debes ejecutar el comando

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

-  Una carpeta llamada `db`.
-  Una carpeta llamada `img`.
-  Una carpeta llamada `middlewares`.
-  Una carpeta llamada `test`.
-  Un archivo `index.js`.
-  Un archivo `package.json`.
-  Un archivo `server.js`.
-  Y el archivo **README.md** que ahora mismo estás leyendo. 😙

---

<br />

## **👩‍💻 EJERCICIO 1**

### **Conexión a la BD**

📍 Comenzaremos creando la base de datos. Esto debemos hacerlo desde alguna interfaz a PostgreSQL, ya sea por consola o desde PGAdmin. Deberás ejecutar el comando:

```sql
  CREATE DATABASE henrydatabase;
```

📍 Ahora que ya tenemos creada la base de datos procederemos a conectarla desde nuestro ORM (Sequelize) para poder interactuar con ella. Dentro de la carpeta `db` verás que en el archivo `index.js` tiene lo siguiente:

```js
const db = new Sequelize(
   'postgres://user:password@localhost:5432/henrydatabase',
   {
      logging: false,
   }
);
```

📍Deberás reemplazar donde dice **`user`** y **`password`** por tu usuario y contraseña de Postgres para que la conexión sea exitosa. Sino, al correr el servidor te arrojará un error informando dónde está fallando el intento de conexión. Si por algún motivo al instalar Postgres cambiaste el puerto default también tendrás que modificar donde dice **`5432`**.

---

<br />

## **👩‍💻 EJERCICIO 2**

### **Modelo Character**

Este modelo va a representar la plantilla de un personaje que podrías seleccionar del juego y tendrá las siguientes propiedades:

<details>
   <summary>code</summary>
   <ul>
      <li>String</li>
      <li>5 caracteres máximo</li>
      <li>Primary Key</li>
   </ul>
</details>
<details>
   <summary>name</summary>
   <ul>
      <li>String</li>
      <li>Debe ser único</li>
   </ul>
</details>
<details>
   <summary>age</summary>
   <ul>
      <li>Integer</li>
      <li>No puede ser null</li>
   </ul>
</details>
<details>
   <summary>age</summary>
   <ul>
      <li>Enum ('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other') | Default 'Other'</li>
      <li>No puede ser null</li>
   </ul>
</details>
<details>
   <summary>hp</summary>
   <ul>
      <li>Float</li>
      <li>No puede ser null</li>
   </ul>
</details>
<details>
   <summary>mana</summary>
   <ul>
      <li>Float</li>
      <li>No puede ser null</li>
   </ul>
</details>

</br>

> [**NOTA**]: adicionalmente debes quitar los timestamps automáticos de createdAt y updatedAt.

</br>

### **Modelo Ability**

<details>
   <summary>name</summary>
   <ul>
      <li>String</li>
   </ul>
</details>
<details>
   <summary>description</summary>
   <ul>
      <li>Text</li>
   </ul>
</details>
<details>
   <summary>mana_cost</summary>
   <ul>
      <li>Float</li>
   </ul>
</details>

</br>

> ⚠️ **[IMPORTANTE]**: la combinación "name" + "mana_cost" debe ser única.

</br>

### **Modelo Role**

<details>
   <summary>name</summary>
   <ul>
      <li>String</li>
      <li>Debe ser único</li>
   </ul>
</details>
<details>
   <summary>description</summary>
   <ul>
      <li>String</li>
   </ul>
</details>

---

<br />

## **👩‍💻 EJERCICIO 3**

### **Validaciones**

📍 Vamos a agregar algunas validaciones a nivel base de datos:

-  **Ability | mana_cost**: el valor debe estar entre 10.0 y 250.0.
-  **Character | name**: el valor no puede ser "Henry", "SoyHenry" o "Soy Henry".
-  **Character | code**: similar al anterior, vamos a hacer que no pueda ser "HENRY", incluyendo cualquier variación/combinación de mayúsculas y minísculas (Armar un custom validator).

---

<br />

## **👩‍💻 EJERCICIO 4**

📍 Debes ir al archivo [**server.js**](./server.js) y revisar cómo están configuradas las rutas principales antes de continuar. De esa manera entenderás el flujo del programa.

📍 Además, si observas la carpeta middlewares, verás que ya tienes archivos para cada modelo con su respectivo esqueleto. Te encargarás de completarlas de la siguiente manera:

</br>

### **POST /character**

1. Esta ruta debe recibir por body los datos del modelo de `Character` y crear una instancia del mismo en la base de datos.

2. De no recibir todos los parámetros necesarios, debería devolver un status 404 con el mensaje "Falta enviar datos obligatorios".

3. Si alguna validación interna de la base de datos falla, debe devolver un status 404 con el mensaje "Error en alguno de los datos provistos".

4. Si todos los datos son provistos, debe devolver un status 201 y el objeto del personaje.

</br>

### **GET /character**

1. Esta ruta debe retornar todos los personajes que se encuentren creados en la base de datos. Además, este endpoint debe aceptar por query un valor de una raza para filtrar los resultados, por ejemplo: GET /character?race=human

2. Vamos a agregarle a nuestra ruta la posibilidad que pueda recibir un age por query, de manera que se puedan combinar ambos filtros, el que ya estaba (race) y el que acabamos de crear (age).

> [**NOTA**]: como ejercicio extra, puedes hacer el filtro de forma dinamica, es decir, que la ruta sirva para cualquiera de los atributos del modelo Character y no solo para age y race.

</br>

### **GET /character/:code**

1. Esta ruta debe retornar aquel personaje que coincida con el código enviado.

2. En el caso de no encontrarlo debe responder con status code 404 y el mensaje "El código ${codigo} no corresponde a un personaje existente".

</br>

### **PUT /character/:attribute?value=...**

1. Vamos a crear un PUT el cual va a recibir un atributo como param y un value como query.

2. Deberá modificar todos los valores de dicho atributo con el valor dado para todas las instancias de personajes que existan en la base de datos y cuyo valor de ese atributo sea null, es decir, si se hace un request PUT a /character/age?value=40 deberá buscar todos los personajes cuya edad sea null y a esos reemplazarlos por el valor 40.

3. Debe devolver simplemente un mensaje que diga 'Personajes actualizados'.

📍 Ya tenemos todos los modelos creados y funcionando correctamente pero cada uno por su cuenta, deberíamos relacionarlos de la siguiente forma: 😁

<p align="center">
  <img src="./img/DER.png" width="800px" />
</p>

4. Relaciones entre modelos

   a. Debes asociar los modelos dentro del archivo `index.js` de la carpeta `db`. Para ello primero deberán obtener los modelos desde la instancia de Sequelize creada:

   ```js
   const { Character, Ability, Role } = db.models;
   ```

   b. Ahora si debes usar los métodos `hasOne`, `belongsTo`, `hasMany` o `belongsToMany` según corresponda.

   c. Una vez que hayas completado exitosamente las asociaciones vas a tener que descomentar las lineas que se encuentran dentro del `beforeAll` del archivo `character-routes.spec.js` (Lineas 52 a 58):

   ```js
   await Promise.all([
      p1.createRole({ name: 'Tank' }),
      p1.createRole({ name: 'Top' }),
      p2.createRole({ name: 'Jungle' }),
      p3.createRole({ name: 'Mid' }),
      p3.createRole({ name: 'Support' }),
   ]);
   ```

---

<br />

## **🧠 Ejercicios Extra...**

### **Getter**

Vamos a definir un getter para el atributo age de los personajes, lo que queremos es que nos devuelva el valor de su edad pero concatenado con la frase 'years old' por lo que para un personaje que tenga 27 años nos debería devoler '27 years old'.

> [**Nota**]: posiblemente esto hará que rompan algunos tests anteriores que esperaban solamente el valor, anímate a arreglarlos. 😎

</br>

### **Virtual Field**

Ahora crearemos un campo virtual para el modelo de Ability que será como un mini resumen de la habilidad y lo llamaremos "summary", deberá retornar "${name} (${mana_cost} points of mana) - Description: ${description}" (La mana tienen que ser solo la parte entera).

</br>

### **POST /ability**

Debe recibir por body los datos del modelo de `Ability` y crear una instancia del mismo en la base de datos.

-  De no recibir todos los parámetros necesarios debería devolver un status 404 con el mensaje "Falta enviar datos obligatorios"
-  Si todos los datos son provistos debera devolver un status 201 y el objeto de la habilidad

</br>

### **PUT /ability/setCharacter**

Recibirá por body `idAbility` y `codeCharacter` y deberá asociarlos a partir del modelo de Ability y devolver el objeto de habilidad con `name`, `description`, `mana_cost` y `CharacterCode`.

</br>

### **PUT /character/addAbilities**

Similar al enpodint anterior pero ahora queremos poder desde el lado del personaje agregar una o mas habilidades en simultaneo que las recibiremos como un array dentro del body del request:

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

</br>

### **GET /characters/roles/:code**

Crearemos otro endpoint para obtener todos los datos del personajes pero incluyendo también la información asociada a sus roles. Por ejemplo debería devolver algo así:

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
