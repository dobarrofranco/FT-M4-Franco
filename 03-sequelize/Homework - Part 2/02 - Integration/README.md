# HW 03: Sequelize part 2 | Integration

## **🕒 Duración estimada**

x minutos

---

<br />

## **📌 INTRO**

En esta homework nos encargaremos de terminar de integrar una base de datos en nuestro proyecto de Rick and Morty.

---

<br />

<h1 align="center">📋 INSTRUCCIONES</h1>

</br >

## **👩‍💻 EJERCICIO 1**

### **MODELO - FAVS**

1. Dentro de tu carpeta **models** crea un nuevo modelo llamado **`Favorite`**. Este modelo debe tener las mismas propiedades que el modelo **Character**.

2. Importa este nuevo modelo dentro de tu archivo **`DB_connection`** y ejectútalo pasándole como argumento la instancia de Sequelize ya creada.

</br>

---

## **👩‍💻 EJERCICIO 2**

### **POST /FAV**

Ahora si conectaremos esta ruta con nuestra base de datos. Para esto, elimina la carpeta **utils** junto con todo lo que tenga dentro.

1. Ve a tu controlador **`postFav`**.

2. Elimina la importación que ya no es necesario, e importa tu nuevo modelo dentro de este archivo:

```javascript
const { favorite } = require('../DB_connection');
```

3. Este controlador debe guardar en esta tabla el personaje que llega por **`req.body`**.

---

</br >

## **👩‍💻 EJERCICIO 3**

Ahora ve a tu controlador **`getChatById`**. Aquí deberás:

1. Elimina la importación que ya no es necesario, e importa tu nuevo modelo dentro de este archivo:

```javascript
const { favorite } = require('../DB_connection');
```

2. Este controlador debe obtener todos los personajes de la tabla de favoritos y devolverlos.

</br >

---

## **👩‍💻 EJERCICIO 4**

Por último, ve a tu controlador **`getChatDetail`**. Aquí deberás:

1. Elimina la importación que ya no es necesario, e importa tu nuevo modelo dentro de este archivo:

```javascript
const { favorite } = require('../DB_connection');
```

2. Este controlador debe eliminar al personaje de la base de datos que tenga el mismo ID que recibes por parámetro.

> [**NOTA**]: puedes utilizar el query: destroy.

---

</br >

<div>

😁 ¡FELICITACIONES! 😁 Has finalizado la última homework de el último módulo.

😏No alegra que haya podido completar este proyecto. ¡Ahora te invitamos a que lo deployes! Para esto te compartimos nuestra cápsula de deploy...

<div align="center">
   <a href="https://rise.articulate.com/share/YKtorcVy0_ch_T7ETfudX4olPcYcXE6o#/">
      <img src="./logo.png" alt="" width="70%" />
   </a>
</div>

<br />

---

### **👩‍💻 EJERCICIO 06 | POST USER**

Dirígete a tu carpeta controllers

### **Controlador**

Dirígete a la carpeta **`controllers`** y crea un archivo llamado **`saveApiData`**. Dentro de este archivo deberás:

1. Crea una función llamada **`getApiData`**.

2. El objetivo de esta función es hacer un request a la API de Rick & Morty ("**`https://rickandmortyapi.com/api/character`**") y obtener los primeros 100 personajes.

> [**NOTA**]: no olvides de manejar el error.

3. Cada personaje viene con información que no nos interesa, por lo que es importante que todos los personajes de tu array solo tengan las propiedades:

-  Id
-  Name
-  Species
-  Status
-  Origin
-  Gender
-  Image

4. Finalmente, esta función debe retornar el arreglo con los primeros 100 personajes.

> [**PISTA**]: ¡hay muchas formas de resolver esto! Te desafíamos a que utilices recursión, pero puedes hacerlo como más prefieras.

---

</br >

## **👩‍💻 EJERCICIO 5**

Una vez que tu función cumpla con su objetivo tendremos que guardar a los personajes en la base de datos. En el mismo archivo de antes crea una función llamada **`saveApiData`** y expórtala.

1. Ejecuta a la función **`getApiData`** y guarda la información que retorna dentro de una variable.

2. Importa en este archivo a tu modelo de la siguiente forma:

```javascript
const { character } = require('../models/Character');
```

3. Esta función debe guardar cada uno de los personajes en la base de datos. Puedes utilizar la query **`findOrCreate`**.

---

<br />

## **👩‍💻 EJERCICIO 6**

Ve al archivo **`server`**. Aquí deberás importar la función creada en el ejercicio anterior, y el objeto **`sequelize`** del archivo **`DB_connection`**.

1. Sincroniza la base de datos, pasándole como argumento la propiedad **force** en true.

2. Ejecuta la función **`saveApiData`**.

3. Luego de los dos pasos anteriores debe levantarse el servidor.

---

<br />

## **👩‍💻 EJERCICIO 7**

Para validar que todo salió correctamente vamos a crear nuestra primera ruta GET, y obtener a todos nuestros personajes. Para esto:

1. Dirígete a la carpeta **`controllers`** y crea un nuevo controlador llamado **`getAllChars`** que se encargue de buscar todos los personajes guardados en la base de datos.

> [**NOTA**]: puedes utilizar la query: findAll.

2. Crea la route en el archivo **`index`** de tu carpeta **routes**. El path de esta ruta debe ser: "_/rickandmorty/all_".

Una vez que hayas construido esta función puede compobar en tu iterador de APIs favorita (thunder, postman, insomnia, etc...) que esta ruta funcione correctamente. El endponit al que tienes que apuntar el request es:

```javascript
'http://localhost:3001/rickandmorty/allCharacters';
```
