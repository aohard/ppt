 // Función para crear el efecto lupa
 function magnify(imgID, zoom) {
    let img, glass, w, h, bw;
    img = document.getElementById(imgID);

    /* Crear el elemento lupa: */
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");

    /* Insertar la lupa al contenedor */
    img.parentElement.insertBefore(glass, img);

    /* Establecer las propiedades de la lupa */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;

    /* Ejecutar la función cuando el mouse se mueve sobre la imagen */
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);

    /* Para pantallas táctiles */
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);

    function moveMagnifier(e) {
        let pos, x, y;
        /* Evitar cualquier otra acción que ocurra cuando se mueve el mouse */
        e.preventDefault();
        /* Obtener la posición x e y del cursor: */
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;

        /* Evitar que la lupa se mueva fuera de la imagen */
        if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
        if (x < w / zoom) { x = w / zoom; }
        if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
        if (y < h / zoom) { y = h / zoom; }

        /* Establecer la posición de la lupa */
        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";

        /* Mostrar el zoom en la lupa */
        glass.style.backgroundPosition = "-" + ((x * zoom) - w) + "px -" + ((y * zoom) - h) + "px";

        /* Mostrar la descripción dependiendo de la posición del cursor */
        showDescription(x, y);
    }

    function getCursorPos(e) {
        let a, x = 0, y = 0;
        e = e || window.event;
        /* Obtener las coordenadas x e y de la imagen */
        a = img.getBoundingClientRect();
        /* Calcular la posición del cursor, relativo a la imagen */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* Considerar cualquier desplazamiento de la página */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {x : x, y : y};
    }

    function showDescription(x, y) {
        // Ocultar todas las descripciones inicialmente
        document.getElementById("description1").style.display = "none";
        document.getElementById("description2").style.display = "none";
        document.getElementById("description3").style.display = "none";

        // Mostrar descripciones en áreas específicas
        if (x > 50 && x < 150 && y > 50 && y < 150) {
            let desc = document.getElementById("description1");
            desc.style.display = "block";
            desc.style.left = x + 10 + "px";  // Posición de la descripción
            desc.style.top = y + 10 + "px";
        } else if (x > 300 && x < 400 && y > 100 && y < 200) {
            let desc = document.getElementById("description2");
            desc.style.display = "block";
            desc.style.left = x + 10 + "px";
            desc.style.top = y + 10 + "px";
        } else if (x > 450 && x < 550 && y > 200 && y < 300) {
            let desc = document.getElementById("description3");
            desc.style.display = "block";
            desc.style.left = x + 10 + "px";
            desc.style.top = y + 10 + "px";
        }
    }
}

/* Iniciar la lupa con un zoom de 2 */
magnify("imagen", 2);