function magnify(imgID, zoom) {
    let img, glass, w, h;
    img = document.getElementById(imgID);

    // Crear el elemento de lupa
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");

    img.parentElement.insertBefore(glass, img);

    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;

    // Eventos para mover la lupa
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);

    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);

    function moveMagnifier(e) {
        let pos, x, y;
        e.preventDefault();
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;

        // Restringir el área de la lupa dentro de la imagen
        if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
        if (x < w / zoom) { x = w / zoom; }
        if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
        if (y < h / zoom) { y = h / zoom; }

        // Posición de la lupa
        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";

        // Ajustar el zoom de la imagen en la lupa
        glass.style.backgroundPosition = "-" + ((x * zoom) - w) + "px -" + ((y * zoom) - h) + "px";

        // Mostrar la descripción correcta
        showDescription(x / img.width * 100, y / img.height * 99);
    }

    function getCursorPos(e) {
        let a, x = 0, y = 0;
        e = e || window.event;
        a = img.getBoundingClientRect();
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }

    function showDescription(xPercent, yPercent) {
        // Ocultar todas las descripciones
        const descriptions = document.querySelectorAll('.description');
        descriptions.forEach(desc => desc.style.display = 'none');

        // Mostrar la descripción correspondiente basada en el porcentaje de la posición del cursor
        if (xPercent > 0 && xPercent < 60 && yPercent > 0 && yPercent < 20) {
            document.getElementById("description1").style.display = "block";
        } else if (xPercent > 60 && xPercent < 102 && yPercent > 0 && yPercent < 20) {
            document.getElementById("description2").style.display = "block";
        } else if (xPercent > 0 && xPercent < 40 && yPercent > 50 && yPercent < 65) {
            document.getElementById("description3").style.display = "block";
        } else if (xPercent > 40 && xPercent < 102 && yPercent > 21 && yPercent < 50) {
            document.getElementById("description4").style.display = "block";
        } else if (xPercent > 0 && xPercent < 40 && yPercent > 65 && yPercent < 70) {
            document.getElementById("description5").style.display = "block";
        } else if (xPercent > 40 && xPercent < 102 && yPercent > 70 && yPercent < 80) {
            document.getElementById("description6").style.display = "block";
        } else if (xPercent > 0 && xPercent < 90 && yPercent > 80 && yPercent < 101) {
            document.getElementById("description7").style.display = "block";
        }
    }
}

magnify("imagen", 2);
