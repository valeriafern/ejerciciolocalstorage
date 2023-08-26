const formulario = document.querySelector("#formulario");
const listatweets = document.querySelector("#lista-tweets");
let tweets = [];

addEventListeners();

function addEventListeners() {
  formulario.addEventListener("submit", agregarTweet);
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    console.log(tweets);
    crearhtml();
  });
}

function agregarTweet(e) {
  e.preventDefault();
  const nombre = document.querySelector("#nombre").value;
  const asignatura = document.querySelector("#asignatura").value;
  const imagen = document.querySelector("#imagen").files[0];

  if (nombre === "" || asignatura === "" || !imagen) {
    mostrarError("Debe completar todos los campos");
    return;
  }

  const tweetObj = {
    id: Date.now(),
    nombre,
    asignatura,
    liked: false,
    likeCount: 0,
    imagenURL: URL.createObjectURL(imagen),
  };

  tweets.push(tweetObj);
  crearhtml();
  formulario.reset();
}

function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");
  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  setTimeout(() => mensajeError.remove(), 3000);
}

function crearhtml() {
  limpiarhtml();
  tweets.forEach((tweet) => {
    const li = document.createElement("li");

    if (tweet.imagenURL) {
      const img = document.createElement("img");
      img.src = tweet.imagenURL;
      img.alt = "Imagen subida";
      img.style.maxWidth = "200px";
      li.appendChild(img);
    }

    const infoContainer = document.createElement("div");
    infoContainer.textContent = `Nombre: ${tweet.nombre} | Asignatura: ${tweet.asignatura}`;

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");
    buttonsContainer.style.display = "flex";

    const botonlike = createButton(
      tweet.liked ? "fas fa-heart red" : "far fa-heart",
      () => toggleLike(tweet),
      "",
      `like-button-${tweet.id}`
    );

    const likeCountText = document.createElement("span");
    likeCountText.style.cursor = "pointer";
    likeCountText.addEventListener("click", () => incrementarLikes(tweet));
    likeCountText.style.verticalAlign = "middle"; 
    
    const likeIcon = document.createElement("i");
    likeIcon.classList.add("fas", "fa-thumbs-up"); 
    likeCountText.appendChild(likeIcon); 
    likeCountText.appendChild(
      document.createTextNode(` Likes: ${tweet.likeCount}`)
    ); 

    const botonborrar = createButton(
      "borrar-tweet",
      () => borrarTweet(tweet.id),
      "X"
    );

    botonborrar.style.verticalAlign = "middle"; 

    buttonsContainer.appendChild(botonlike);
    buttonsContainer.appendChild(likeCountText);
    buttonsContainer.appendChild(botonborrar);
    infoContainer.appendChild(buttonsContainer);

    li.appendChild(infoContainer);

    listatweets.appendChild(li);
  });
  agregarStorage();
}

function createButton(iconClass, onClick, text = "", id = "") {
  const button = document.createElement("button");
  button.innerHTML = `<i class="${iconClass}"></i> ${text}`;
  button.onclick = onClick;
  button.style.verticalAlign = "middle";
  button.id = id;
  return button;
}

function agregarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  crearhtml();
  agregarStorage();
}

function limpiarhtml() {
  listatweets.innerHTML = "";
}

function toggleLike(tweet) {
  tweet.liked = !tweet.liked;
  crearhtml();
  agregarStorage();
}

function incrementarLikes(tweet) {
  tweet.likeCount += 1;
  crearhtml();
  agregarStorage();
}

//todo esto son versionesanteriores solo que como es mucho decidi colocar el codigo final al inicio

/*const formulario = document.querySelector('#formulario');
const listatweets = document.querySelector("#lista-tweets");
let tweets =[];


//aqui voy a crear los liseners


addEventListeners();
function addEventListeners(){
formulario.addEventListener('submit', agregartweet);

document.addEventListener('DOMContentLoaded', ()=>{
tweets=JSON.parse(localStorage.getItem('tweets')) || [];
console.log(tweets);
crearhtml();
});
}




//aqui voy a crear las funciones 

function agregartweet(e){
e.preventDefault();

const tweet = document.querySelector("#tweet").value;
console.log(tweet);

if(tweet===''){
mostrarerror('El mensaje no puede ir vacio')
return;
}

const tweetobj={
id: Date.now(),
tweet
}

tweets=[...tweets, tweetobj];
crearhtml();

formulario.reset();

tweets = [...tweets, tweet];
console.log(tweets);
}




function mostrarerror(error){
const mensajeerror=document.createElement('p');
mensajeerror.textContent=error;
mensajeerror.classList.add('error');

const contenido=document.querySelector('#contenido');
contenido.appendChild(mensajeerror);

setTimeout(()=>{
mensajeerror.remove();
},  3000);
}



function crearhtml(){
limpiarhtml();
if(tweets.length>0){
tweets.forEach((tweet)=>{
const botonborrar=document.createElement('a');
botonborrar.classList='borrar-tweet';
botonborrar.innerText='Eliminar';

botonborrar.onclick=()=>{
borrartweet(tweet.id);
}

const li=document.createElement('li');
li.textContent=tweet.tweet;
listatweets.appendChild(li);
li.appendChild(botonborrar);
});
}
agregarstorage();
}



function agregarstorage(){
localStorage.setItem('tweets', JSON.stringify(tweets));
}



function borrartweet(id){
tweets=tweets.filter(tweet=>tweet.id !== id);
crearhtml();
}



function limpiarhtml(){
while(listatweets.firstChild){
listatweets.removeChild(listatweets.firstChild);
}
}
*/
/*
const formulario = document.querySelector("#formulario");
const listaImagenes = document.querySelector("#lista-Imagenes");
let imagenes = [];

eventListeners();
function eventListeners() {
  formulario.addEventListener("submit", subirImagen );

  document.addEventListener("DOMContentLoaded", () => {
    imagenes = JSON.parse(localStorage.getItem("imagenes")) || [];
    console.log(imagenes);
    crearHTML();
  });
}

function subirImagen(e) {
  e.preventDefault();
  const inputImagen = document.querySelector("#imagen");
  const imagen = inputImagen.files[0];

  if (!imagen) {
    mostrarError("Selecciona una imagen.");
    return;
  }

  const imagenObj = {
    id: Date.now(),
    imagen: URL.createObjectURL(imagen), // Convertir imagen a URL
  };

  imagenes = [...imagenes, imagenObj];
  console.log(imagenes);
  crearHTML();
  formulario.reset();
}

function mostrarError(error) {
  const mensajeEerror = document.createElement("p");
  mensajeEerror.textContent = error;
  mensajeEerror.classList.add("error");

  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeEerror);

  setTimeout(() => {
    mensajeEerror.remove();
  }, 3000);
}

function crearHTML() {
  limpiarHTML();
  imagenes.forEach((imagen) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = imagen.imagen; // Usar la URL de objeto de la imagen
    li.appendChild(img);
    listaImagenes.appendChild(li);
  });
  agregarStorage();
}

//Elimina un comentario o tweet
function borrarTweet(id) {
  //  console.log('Eliminando tweet', id);
  tweets = tweets.filter((tweet) => tweet.id !== id);
  //console.log(tweets);
  crearHTML();
}

function limpiarHTML() {
  while (listaImagenes.firstChild) {
    listaImagenes.removeChild(listaImagenes.firstChild);
  }
}

function agregarStorage() {
  localStorage.setItem("imagenes", JSON.stringify(imagenes));
}
*/

//aqui solo me falta el like,los dos cuadros de texto y que el texto aparezca abajo de la foto
/*
const formulario = document.querySelector("#formulario");
const listatweets = document.querySelector("#lista-tweets");
let tweets = [];

addEventListeners();
function addEventListeners() {
  formulario.addEventListener("submit", agregarTweet);

  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    console.log(tweets);
    crearhtml();
  });
}

function agregarTweet(e) {
  e.preventDefault();

  const tweet = document.querySelector("#tweet").value;
  console.log(tweet);

  if (tweet === "") {
    mostrarError("El mensaje no puede ir vacío");
    return;
  }

  const inputImagen = document.querySelector("#imagen");
  const imagen = inputImagen.files[0];
  const imagenURL = imagen ? URL.createObjectURL(imagen) : null;

  const tweetObj = {
    id: Date.now(),
    tweet,
    imagen: imagenURL,
  };

  tweets = [...tweets, tweetObj];
  crearhtml();

  formulario.reset();
}

function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

function crearhtml() {
  limpiarhtml();
  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      const botonborrar = document.createElement("a");
      botonborrar.classList = "borrar-tweet";
      botonborrar.innerText = "X";

      botonborrar.onclick = () => {
        borrarTweet(tweet.id);
      };

      const li = document.createElement("li");
      li.textContent = tweet.tweet;

      if (tweet.imagen) {
        const img = document.createElement("img");
        img.src = tweet.imagen;
        img.alt = "Imagen subida";
        img.style.maxWidth = "200px"; 
        li.appendChild(img);
      }

      listatweets.appendChild(li);
      li.appendChild(botonborrar);
    });
  }
  agregarStorage();
}

function agregarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  crearhtml();
}

function limpiarhtml() {
  while (listatweets && listatweets.firstChild) {
    // Verificar si listatweets es nulo antes de acceder a firstChild
    listatweets.removeChild(listatweets.firstChild);
  }
}*/

//este ya es para el resto de cosas que faltan
//ya tengo el resto solo falta un campo para escribir asignatura y otro para el nombre y  algunos detalles de css

/*
const formulario = document.querySelector("#formulario");
      const listatweets = document.querySelector("#lista-tweets");
      let tweets = [];

      addEventListeners();
      function addEventListeners() {
        formulario.addEventListener("submit", agregarTweet);

        document.addEventListener("DOMContentLoaded", () => {
          tweets = JSON.parse(localStorage.getItem("tweets")) || [];
          console.log(tweets);
          crearhtml();
        });
      }

      function agregarTweet(e) {
        e.preventDefault();

        const tweet = document.querySelector("#tweet").value;
        console.log(tweet);

        if (tweet === "") {
          mostrarError("El mensaje no puede ir vacío");
          return;
        }

        const inputImagen = document.querySelector("#imagen");
        const imagen = inputImagen.files[0];
        const imagenURL = imagen ? URL.createObjectURL(imagen) : null;

        const tweetObj = {
          id: Date.now(),
          tweet,
          imagen: imagenURL,
          liked: false, 
        };

        tweets = [...tweets, tweetObj];
        crearhtml();

        formulario.reset();
      }

      function mostrarError(error) {
        const mensajeError = document.createElement("p");
        mensajeError.textContent = error;
        mensajeError.classList.add("error");

        const contenido = document.querySelector("#contenido");
        contenido.appendChild(mensajeError);

        setTimeout(() => {
          mensajeError.remove();
        }, 3000);
      }

      function crearhtml() {
        limpiarhtml();
        if (tweets.length > 0) {
          tweets.forEach((tweet) => {
            const botonborrar = document.createElement("button");
            botonborrar.classList = "borrar-tweet";
            botonborrar.innerText = "X";
      
            botonborrar.onclick = () => {
              borrarTweet(tweet.id);
            };
      
           
            const botonlike = document.createElement("button");
            botonlike.innerHTML = `<i class="far fa-heart"></i>`;
            if (tweet.liked) {
              botonlike.innerHTML = `<i class="fas fa-heart" style="color: red;"></i>`;
            }
      
            botonlike.onclick = () => {
              toggleLike(tweet);
            };
      
            const li = document.createElement("li");
            li.textContent = tweet.tweet;
      
            if (tweet.imagen) {
              const img = document.createElement("img");
              img.src = tweet.imagen;
              img.alt = "Imagen subida";
              img.style.maxWidth = "200px";
              li.appendChild(img);
            }
      
            const buttonsContainer = document.createElement("div");
            buttonsContainer.classList.add("buttons-container");
            buttonsContainer.style.display = "flex"; 
      
           
            botonlike.style.verticalAlign = "middle";
            botonborrar.style.verticalAlign = "middle";
      
            buttonsContainer.appendChild(botonlike);
            buttonsContainer.appendChild(botonborrar);
      
            li.appendChild(buttonsContainer);
      
            listatweets.appendChild(li);
          });
        }
        agregarStorage();
      }
           
      function agregarStorage() {
        localStorage.setItem("tweets", JSON.stringify(tweets));
      }

      function borrarTweet(id) {
        tweets = tweets.filter((tweet) => tweet.id !== id);
        crearhtml();
      }

      function limpiarhtml() {
        while (listatweets && listatweets.firstChild) {
          listatweets.removeChild(listatweets.firstChild);
        }
      }

      function toggleLike(tweet) {
        tweet.liked = !tweet.liked;
        crearhtml();
}
*/

//aqui ya estara el codigo casi completo despues de casi morir por el dolor de cabeza
/*
const formulario = document.querySelector("#formulario");
const listatweets = document.querySelector("#lista-tweets");
let tweets = [];

addEventListeners();
function addEventListeners() {
  formulario.addEventListener("submit", agregarTweet);

  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    console.log(tweets);
    crearhtml();
  });
}

function agregarTweet(e) {
  e.preventDefault();
  const nombre = document.querySelector("#nombre").value;
  const asignatura = document.querySelector("#asignatura").value;

  if (nombre === "" || asignatura === "") {
    mostrarError("El mensaje no puede ir vacío");
    return;
  }

  const inputImagen = document.querySelector("#imagen");
  const imagen = inputImagen.files[0];
  const imagenURL = imagen ? URL.createObjectURL(imagen) : null;

  const tweetObj = {
    id: Date.now(),
    nombre,
    asignatura,
    imagen: imagenURL,
    liked: false, 
  };

  tweets = [...tweets, tweetObj];
  crearhtml();

  formulario.reset();
}

function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

function crearhtml() {
  limpiarhtml();
  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      const botonborrar = document.createElement("button");
      botonborrar.classList = "borrar-tweet";
      botonborrar.innerText = "X";

      botonborrar.onclick = () => {
        borrarTweet(tweet.id);
      };

      const botonlike = document.createElement("button");
      botonlike.innerHTML = `<i class="far fa-heart"></i>`;
      if (tweet.liked) {
        botonlike.innerHTML = `<i class="fas fa-heart" style="color: red;"></i>`;
      }

      botonlike.onclick = () => {
        toggleLike(tweet);
      };

      const li = document.createElement("li");
      li.textContent = tweet.tweet;

      if (tweet.imagen) {
        const img = document.createElement("img");
        img.src = tweet.imagen;
        img.alt = "Imagen subida";
        img.style.maxWidth = "200px";
        li.appendChild(img);
      }

      const buttonsContainer = document.createElement("div");
      buttonsContainer.classList.add("buttons-container");
      buttonsContainer.style.display = "flex"; 

      botonlike.style.verticalAlign = "middle";
      botonborrar.style.verticalAlign = "middle";

      const infoContainer = document.createElement("div");
      infoContainer.textContent = `Nombre: ${tweet.nombre} | Asignatura: ${tweet.asignatura}`;

      buttonsContainer.appendChild(botonlike);
      buttonsContainer.appendChild(botonborrar);

      li.appendChild(infoContainer);

      li.appendChild(buttonsContainer);

      listatweets.appendChild(li);

      
      
    });
  }
  agregarStorage();
}

function agregarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  crearhtml();
}

function limpiarhtml() {
  while (listatweets && listatweets.firstChild) {
    listatweets.removeChild(listatweets.firstChild);
  }
}

function toggleLike(tweet) {
  tweet.liked = !tweet.liked;
  crearhtml();
}*/

//aqui ya finalizo con esto ya esta bien todo

/*const formulario = document.querySelector("#formulario");
const listatweets = document.querySelector("#lista-tweets");
let tweets = [];

addEventListeners();
function addEventListeners() {
  formulario.addEventListener("submit", agregarTweet);

  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    console.log(tweets);
    crearhtml();
  });
}

function agregarTweet(e) {
  e.preventDefault();
  const nombre = document.querySelector("#nombre").value;
  const asignatura = document.querySelector("#asignatura").value;
  const imagen = document.querySelector("#imagen").files[0]; 

  if (nombre === "" || asignatura === "") {
    mostrarError("El mensaje no puede ir vacío");
    return;
  }

  if (!imagen) {
    mostrarError("Debe agregar una imagen");
    return;
  }

  const tweetObj = {
    id: Date.now(),
    nombre,
    asignatura,
    liked: false,
    imagenURL: URL.createObjectURL(imagen), 
  };

  tweets = [...tweets, tweetObj];
  crearhtml();

  formulario.reset();
}

function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

function crearhtml() {
  limpiarhtml();
  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      const li = document.createElement("li");

      
      if (tweet.imagenURL) {
        const img = document.createElement("img");
        img.src = tweet.imagenURL;
        img.alt = "Imagen subida";
        img.style.maxWidth = "200px";
        li.appendChild(img);
      }

      const infoContainer = document.createElement("div");
      infoContainer.textContent = `Nombre: ${tweet.nombre} | Asignatura: ${tweet.asignatura}`;

      const buttonsContainer = document.createElement("div");
      buttonsContainer.classList.add("buttons-container");
      buttonsContainer.style.display = "flex";

      const botonlike = document.createElement("button");
      botonlike.innerHTML = tweet.liked
        ? `<i class="fas fa-heart" style="color: red;"></i>`
        : `<i class="far fa-heart"></i>`;

      botonlike.onclick = () => {
        toggleLike(tweet);
      };

      const botonborrar = document.createElement("button");
      botonborrar.classList = "borrar-tweet";
      botonborrar.innerText = "X";

      botonborrar.onclick = () => {
        borrarTweet(tweet.id);
      };

      botonlike.style.verticalAlign = "middle";
      botonborrar.style.verticalAlign = "middle";

      buttonsContainer.appendChild(botonlike);
      buttonsContainer.appendChild(botonborrar);

      li.appendChild(infoContainer);
      li.appendChild(buttonsContainer);

      listatweets.appendChild(li);
    });
  }
  agregarStorage();
}


function agregarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  crearhtml();
  agregarStorage();
}

function limpiarhtml() {
  while (listatweets.firstChild) {
    listatweets.removeChild(listatweets.firstChild);
  }
}

function toggleLike(tweet) {
  tweet.liked = !tweet.liked;
  crearhtml();
  agregarStorage();
}
*/

//CODIGO LISTOOOO!!!!!!!!
/*
const formulario = document.querySelector("#formulario");
const listatweets = document.querySelector("#lista-tweets");
let tweets = [];

addEventListeners();
function addEventListeners() {
  formulario.addEventListener("submit", agregarTweet);
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    console.log(tweets);
    crearhtml();
  });
}

function agregarTweet(e) {
  e.preventDefault();
  const nombre = document.querySelector("#nombre").value;
  const asignatura = document.querySelector("#asignatura").value;
  const imagen = document.querySelector("#imagen").files[0]; 

  if (nombre === "" || asignatura === "" || !imagen) {
    mostrarError("Debe completar todos los campos");
    return;
  }

  const tweetObj = {
    id: Date.now(),
    nombre,
    asignatura,
    liked: false,
    likeCount: 0,
    imagenURL: URL.createObjectURL(imagen),
  };

  tweets.push(tweetObj);
  crearhtml();
  formulario.reset();
}

function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");
  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  setTimeout(() => mensajeError.remove(), 3000);
}

function crearhtml() {
  limpiarhtml();
  tweets.forEach((tweet) => {
    const li = document.createElement("li");

    if (tweet.imagenURL) {
      const img = document.createElement("img");
      img.src = tweet.imagenURL;
      img.alt = "Imagen subida";
      img.style.maxWidth = "200px";
      li.appendChild(img);
    }

    const infoContainer = document.createElement("div");
    infoContainer.textContent = `Nombre: ${tweet.nombre} | Asignatura: ${tweet.asignatura}`;

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");
    buttonsContainer.style.display = "flex";

    const botonlike = createButton(tweet.liked ? "fas fa-heart red" : "far fa-heart", () => toggleLike(tweet));
    const botonborrar = createButton("borrar-tweet", () => borrarTweet(tweet.id), "X");

    buttonsContainer.appendChild(botonlike);
    buttonsContainer.appendChild(botonborrar);

    li.appendChild(infoContainer);
    li.appendChild(buttonsContainer);

    listatweets.appendChild(li);
  });
  agregarStorage();
}


function createButton(iconClass, onClick, text = "") {
  const button = document.createElement("button");
  button.innerHTML = `<i class="${iconClass}"></i> ${text}`;
  button.onclick = onClick;
  button.style.verticalAlign = "middle";
  return button;
}

function agregarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  crearhtml();
  agregarStorage();
}

function limpiarhtml() {
  listatweets.innerHTML = "";
}

function toggleLike(tweet) {
  tweet.liked = !tweet.liked;
  crearhtml();
  agregarStorage();
}
*/

//aumento del boton like contable
/*
const formulario = document.querySelector("#formulario");
const listatweets = document.querySelector("#lista-tweets");
let tweets = [];

addEventListeners();

function addEventListeners() {
  formulario.addEventListener("submit", agregarTweet);
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    console.log(tweets);
    crearhtml();
  });
}

function agregarTweet(e) {
  e.preventDefault();
  const nombre = document.querySelector("#nombre").value;
  const asignatura = document.querySelector("#asignatura").value;
  const imagen = document.querySelector("#imagen").files[0];

  if (nombre === "" || asignatura === "" || !imagen) {
    mostrarError("Debe completar todos los campos");
    return;
  }

  const tweetObj = {
    id: Date.now(),
    nombre,
    asignatura,
    liked: false,
    likeCount: 0,
    imagenURL: URL.createObjectURL(imagen),
  };

  tweets.push(tweetObj);
  crearhtml();
  formulario.reset();
}

function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");
  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  setTimeout(() => mensajeError.remove(), 3000);
}

function crearhtml() {
  limpiarhtml();
  tweets.forEach((tweet) => {
    const li = document.createElement("li");

    if (tweet.imagenURL) {
      const img = document.createElement("img");
      img.src = tweet.imagenURL;
      img.alt = "Imagen subida";
      img.style.maxWidth = "200px";
      li.appendChild(img);
    }

const infoContainer = document.createElement("div");
    infoContainer.textContent = `Nombre: ${tweet.nombre} | Asignatura: ${tweet.asignatura}`;

const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");
    buttonsContainer.style.display = "flex";

const botonlike = createButton(
      tweet.liked ? "fas fa-heart red" : "far fa-heart",
      () => toggleLike(tweet),
      "",
      `like-button-${tweet.id}`
);

const likeCountText = document.createElement("span");
    likeCountText.style.cursor = "pointer";

    
const likeIcon = document.createElement("i");
    likeIcon.classList.add("fas", "fa-thumbs-up"); 

    
const space = document.createTextNode(" ");

    likeCountText.appendChild(likeIcon); 
    likeCountText.appendChild(space); 
    likeCountText.appendChild(
      document.createTextNode(`Likes: ${tweet.likeCount}`)
); 

    likeCountText.addEventListener("click", () => {
      incrementarLikes(tweet);
      likeCountText.lastChild.textContent = `Likes: ${tweet.likeCount}`; 
    });

const botonborrar = createButton(
      "borrar-tweet",
      () => borrarTweet(tweet.id),
      "X"
);

    buttonsContainer.appendChild(botonlike);
    buttonsContainer.appendChild(likeCountText);
    buttonsContainer.appendChild(botonborrar);
    infoContainer.appendChild(buttonsContainer);

    li.appendChild(infoContainer);

    listatweets.appendChild(li);
  });
  agregarStorage();
}

function createButton(iconClass, onClick, text = "", id = "") {
  const button = document.createElement("button");
  button.innerHTML = `<i class="${iconClass}"></i> ${text}`;
  button.onclick = onClick;
  button.style.verticalAlign = "middle";
  button.id = id;
  return button;
}

function agregarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  crearhtml();
  agregarStorage();
}

function limpiarhtml() {
  listatweets.innerHTML = "";
}

function toggleLike(tweet) {
  tweet.liked = !tweet.liked;
  crearhtml();
  agregarStorage();
}

function incrementarLikes(tweet) {
  tweet.likeCount += 1;
  crearhtml();
  agregarStorage();
}
*/
