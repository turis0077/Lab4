var misiones = [];
var totalXP = 0;

function getRango(xp) {
    if (xp >= 200) {
        return "🔥 Archmage";
    } else if (xp >= 100) {
        return "🧙 Sorcerer";
    } else if (xp >= 50) {
        return "🪄 Wizard";
    } else {
        return "🌱 Novato";
    }
}

function getXPvalor(dificultad) {
    if (dificultad == "Fácil") {
        return 10;
    } else if (dificultad == "Normal") {
        return 25;
    } else {
        return 50;
    }
}

function crearMision() {
    var nombre = document.getElementById("inputNombre").value;
    var desc = document.getElementById("inputDesc").value;
    var dif = document.getElementById("inputDif").value;

    if (nombre == "") {
        alert("Escribe un nombre para la misión.");
        return;
    }

    var mision = {
        id: Date.now(),
        nombre: nombre,
        descripcion: desc,
        dificultad: dif,
        xp: getXPvalor(dif),
        estado: "PENDIENTE"
    };

    misiones.push(mision);

    console.log("Misión creada:", mision);

    document.getElementById("inputNombre").value = "";
    document.getElementById("inputDesc").value = "";
    document.getElementById("inputDif").value = "Fácil";

    renderMisiones();
}

function completarMision(id) {
    for (var i = 0; i < misiones.length; i++) {
        if (misiones[i].id == id) {
            if (misiones[i].estado == "PENDIENTE") {
                misiones[i].estado = "SUCCESFUL";
                totalXP = totalXP + misiones[i].xp;
            }
        }
    }
    actualizarXP();
    renderMisiones();
}

function actualizarXP() {
    document.getElementById("totalXP").textContent = totalXP + " XP";
    document.getElementById("rank").textContent = getRango(totalXP);
}

function renderMisiones() {
    var lista = document.getElementById("listaMisiones");
    lista.innerHTML = "";

    if (misiones.length == 0) {
        lista.innerHTML = "<p class='empty-msg'>No hay misiones todavía. ¡Crea una!</p>";
        return;
    }

    for (var i = 0; i < misiones.length; i++) {
        var m = misiones[i];

        var claseDif = "";
        if (m.dificultad == "Fácil") {
            claseDif = "facil";
        } else if (m.dificultad == "Normal") {
            claseDif = "normal";
        } else {
            claseDif = "dificil";
        }

        var li = document.createElement("li");
        li.className = "mision-item";
        if (m.estado == "SUCCESFUL") {
            li.className = "mision-item completada";
        }

        var boton = "";
        if (m.estado == "PENDIENTE") {
            boton = "<button class='btn-completar' onclick='completarMision(" + m.id + ")'>✓ Completar</button>";
        }

        var estadoTag = "";
        if (m.estado == "SUCCESFUL") {
            estadoTag = "<span class='tag-estado'>✓ SUCCESFUL</span>";
        }

        li.innerHTML = 
            "<div class='mision-info'>" +
                "<div class='mision-nombre'>" + m.nombre + "</div>" +
                "<div class='mision-desc'>" + m.descripcion + "</div>" +
                "<div class='mision-tags'>" +
                    "<span class='tag-dif " + claseDif + "'>" + m.dificultad + "</span>" +
                    "<span class='tag-xp'>+" + m.xp + " XP</span>" +
                    estadoTag +
                "</div>" +
            "</div>" +
            boton;

        lista.appendChild(li);
    }
}
