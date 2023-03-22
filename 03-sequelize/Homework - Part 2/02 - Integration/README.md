# **💪 HW3 | Sequelize Part 2 - Integration**

## **🕒 DURACIÓN ESTIMADA**

XX minutos

<br />

---

<div align="center">

## **💻 RICK AND MORTY APP 💻**

</div>

## **📝 INTRODUCCIÓN**

En esta homework nos encargaremos de terminar de integrar una base de datos en nuestro proyecto de Rick and Morty componiendo nuevos controladores.

</br >

---

## **📋 INSTRUCCIONES**

### **👩‍💻 EJERCICIO 01 | POST USER**

Dirígete a tu carpeta **controllers**. Aquí deberás eliminar tus archivos **`handleFavorites.js`** y **`login.js`**.

Si bien dentro del Front-End no tenemos un formulario para crear usuarios, crearemos una ruta con este objetivo para que podamos guardar (aunque sea desde el código) un nuevo usuario.

1. Crea un nuevo archivo con el nombre **`postUser.js`**.

2. Dentro de este archivo tendrás que importar tu modelo **User**.

> [**NOTA**]: deberás importar este modelo de tu archivo **`DB_connection`** ya que desde allí está activo dentro de tu base de datos.

3. Crea una función llamada **`postUser`** y expórtala. Esta función debe recibir por parámetro los objetos **`req`** y **`res`**. Además, esta función es asincrónica, ¡por lo que deberás trabajar con promesas o async await!

4. Dentro de la función deberás recibir un **email** y una **password** por **`Body`**.

5. Una vez recibido, deberás validar que realmente hayas recibido ambos y que no sean, por ejemplo, un string vacío. En el caso de no recibir alguno de los dos deberás responder con un **`status 400`** y devolver un mensaje que diga: **"_Faltan datos_"**.

6. En el caso de si recibir ambos datos deberás guardarlos dentro de tu modelo. Una vez realizado responde con el usuario guardado.

> [**NOTA**]: puedes utilizar el método **`findOrCreate`**.

</br>

---

### **👩‍💻 EJERCICIO 02 | LOGIN**

Ahora si crearemos un controlador que valide la información de nuestra base de datos. Elimina por completo la carpeta **utils**.

1. Crea un archivo llamado **`login.js`**. Dentro de este archivo deberás importar tu modelo **User**.

2. Crea una función llamada **`login`** la cual reciba por parámetro los objetos **`req`** y **`res`**. No olvides exportarla.

3. Recibiras por **`Query`** los datos **email** y **password**.

4. En el caso de no recibir alguno de los datos, responde con un **`status 400`** y el mensaje **"_Faltan datos_"**.

5. Si ambos datos llegan correctamente tendrás que buscar aquel usuario que tenga el mismo email que recibiste anteriormente. En el caso de no encontrarlo responde con un **`status 404`** y el mensaje **"_Usuario no encontrado_"**.

6. En el caso de encontrar a un usuario con ese mismo email solo tendrás ahora que comparar si su **password** es igual a la **password** que recibiste anteriormente. En el caso de no serlo responde con un **`status 403`** y un mensaje que diga **"_Contraseña incorrecta_"**.

7. En el caso de que las contraseñas si coincidan, responde con el objeto:

```js
{
   access: true;
}
```

</br>

---

### **👩‍💻 EJERCICIO 03 | POST FAV**

1. Crea un nuevo archivo llamado **`postFav.js`**. Dentro de este archivo deberás importar tu modelo **Favorite**.

2. Crea una función llamada **`postFav`** la cual reciba por parámetro los objetos **`req`** y **`res`**.

3. Deberás recibir las propiedades **id**, **name**, **origin**, **status**, **image**, **species** y **gender** por **`Body`**.

4. Ahora tendrás que postear este personaje dentro de tu base de datos.

5. Una vez guardado, busca todos los personajes favoritos guardados en tu base de datos y responde con ese arreglo.

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

// // // // // // // // // // CREAR EN EL FRONT UN FORM PARA CREAR USUARIOS // // // // // // // // //
