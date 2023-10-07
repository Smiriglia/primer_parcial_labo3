class Vehiculo
{
    constructor(id, modelo, anoFab, velMax)
    {
        this.id = id;
        this.modelo = modelo;
        this.anoFab = anoFab;
        this.velMax = velMax;
    }

    toString()
    {
        var mensaje = "Id: " + this.id.toString() + "\n";
        mensaje += "modelo: " + this.modelo + "\n";
        mensaje += "anoFab: " + this.anoFab + "\n";
        mensaje += "velMax: " + this.velMax.toString();
        return mensaje;
    }
}

class Aereo extends Vehiculo
{
    constructor(id, modelo, anoFab, velMax, altMax, autonomia)
    {
        super(id, modelo, anoFab, velMax);
        this.altMax = altMax;
        this.autonomia = autonomia;
    }
    toString()
    {
        var mensaje = super.toString();
        mensaje += "\naltMax: " + this.altMax.toString() +  "\n";
        mensaje += "autonomia: " + this.autonomia.toString();
        return mensaje;
    }

}

class Terrestre extends Vehiculo
{
    constructor(id, modelo, anoFab, velMax, cantPue, cantRue)
    {
        super(id, modelo, anoFab, velMax);
        this.cantPue = cantPue;
        this.cantRue = cantRue;
    }
    toString()
    {
        var mensaje = super.toString();
        mensaje += "\ncantPue: " + this.cantPue.toString() +  "\n";
        mensaje += "cantRue: " + this.cantRue.toString();
        return mensaje;
    }
}

let dataJSON = '[{"id":14, "modelo":"Ferrari F100", "anoFab":1998, "velMax":400, "cantPue":2, "cantRue":4},{"id":51, "modelo":"DodgeViper", "anoFab":1991, "velMax":266, "cantPue":2, "cantRue":4},{"id":67, "modelo":"Boeing CH-47 Chinook","anoFab":1962, "velMax":302, "altMax":6, "autonomia":1200},{"id":666, "modelo":"Aprilia RSV 1000 R","anoFab":2004, "velMax":280, "cantPue":0, "cantRue":2},{"id":872, "modelo":"Boeing 747-400", "anoFab":1989,"velMax":988, "altMax":13, "autonomia":13450},{"id":742, "modelo":"Cessna CH-1 SkyhookR", "anoFab":1953,"velMax":174, "altMax":3, "autonomia":870}]';

let data_parsed = JSON.parse(dataJSON);

let vehiculos = [];

let nuevaVehiculo;

let claves = ["id", "modelo", "anoFab", "velMax", "autonomia", "altMax", "cantPue", "cantRue"];

for (let dato of data_parsed)
{
    
    if (dato.autonomia)
    {
        nuevaVehiculo = new Aereo(dato.id, dato.modelo, dato.anoFab, dato.velMax, dato.altMax, dato.autonomia);
    }
    else if (dato.cantPue)
    {
        nuevaVehiculo = new Terrestre(dato.id, dato.modelo, dato.anoFab, dato.velMax, dato.cantPue, dato.cantRue);
    }
    vehiculos.push(nuevaVehiculo);
}

function vaciar(elemento)
{
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

function MostrarVehiculos(vehiculos)
{
    row_index = 1
    
    const tabla_vehiculos_body = document.getElementById("t-user-body");
    vaciar(tabla_vehiculos_body);
    let text_col;
    let col;
    let txt_col_node;
    let row;
    for (let usuario of vehiculos)
    {
        row = document.createElement("tr");
        row_head = document.createElement("th");
        text = document.createTextNode(row_index);
        row_head.appendChild(text);
        row.appendChild(row_head);

        for (let clave of claves)
        {
            if(usuario[clave] !== undefined)
            {
                text_col = usuario[clave];
            }
            else
            {
                text_col = "-"
            }
            txt_col_node = document.createTextNode(text_col)
            col = document.createElement("td");
            col.appendChild(txt_col_node);
            row.appendChild(col);
            // console.log(clave);
            // console.log(col);
        }
        tabla_vehiculos_body.appendChild(row);
        row_index += 1;
    }
}

function FiltrarVehiculos(tipo, vehiculos)
{
    if (tipo == "todos"){
        vehiculos_filtrados = vehiculos;
    }
    else if (tipo == "aereos")
    {
        vehiculos_filtrados = vehiculos.filter((usuario) => usuario instanceof Aereo);
    }
    else if (tipo == "terrestres")
    {
        vehiculos_filtrados = vehiculos.filter((usuario) => usuario instanceof Terrestre);
    }
    return vehiculos_filtrados;
}

function CalcularPromedio(vehiculos, clave)
{
    let promedio;
    let suma_velMaxes = vehiculos.reduce((acumulador, usuario) => acumulador + usuario[clave], 0);
    const cantidad_vehiculos = vehiculos.length;
    if (cantidad_vehiculos > 0)
        promedio = suma_velMaxes / cantidad_vehiculos;
    else
        promedio = 0;
    return promedio;
}
function MostrarAgregar()
{
    const formulario_datos = document.getElementById("form-datos");
    const formulario_agregar = document.getElementById("form-agregar");
    formulario_datos.hidden = true;
    formulario_agregar.hidden = false;
}

function MostrarDatos()
{
    const formulario_datos = document.getElementById("form-datos");
    const formulario_agregar = document.getElementById("form-agregar");
    formulario_datos.hidden = false;
    formulario_agregar.hidden = true;
}

function ObtenerProximoId(vehiculos)
{
    let id = 1;
    for (usuario of vehiculos)
    {
        if (usuario.id >= id)
        {
            id = usuario.id += 1;
        }
    }
    return id;
}

function ActualizarTabla()
{
    const select_filtro = document.getElementById("select-filtro");
    let vehiculos_filtrados = FiltrarVehiculos(select_filtro.value, vehiculos);
    MostrarVehiculos(vehiculos_filtrados, vehiculos);
}

// Función para mostrar una columna específica por índice
function MostrarColumna(indiceColumna) {
    const tabla = document.getElementById("table-datos");
    const filas = tabla.getElementsByTagName("tr");
    
    for (let i = 0; i < filas.length; i++) {
      const celdas = filas[i].querySelectorAll("td, th");
      if (celdas.length > indiceColumna) {
        celdas[indiceColumna].style.display = "";
      }
    }
}
  

function OcultarColumna(indiceColumna) {
    const tabla = document.getElementById("table-datos");
    const filas = tabla.getElementsByTagName("tr");
    
    for (let i = 0; i < filas.length; i++) {
      const celdas = filas[i].querySelectorAll("td, th");
      if (celdas.length > indiceColumna) {
        celdas[indiceColumna].style.display = "none";
      }
    }
}


window.addEventListener("load", () => {
    ActualizarTabla();
});

const select_filtro = document.getElementById("select-filtro");
select_filtro.addEventListener("change", (e)=>{
    ActualizarTabla();
});

const btn_calcular = document.getElementById("btn_calcular");
btn_calcular.addEventListener("click", (e) => {
    e.preventDefault();
    const txt_promedio = document.getElementById("txtPromedio");
    const tipo_filtro = document.getElementById("select-filtro").value;
    const vehiculos_filtrados = FiltrarVehiculos(tipo_filtro, vehiculos);
    txt_promedio.value = CalcularPromedio(vehiculos_filtrados, "velMax").toFixed(2);
});

const btn_mostrar_agregar = document.getElementById("btn-mostrar-agregar");
btn_mostrar_agregar.addEventListener("click", (e) => {
    e.preventDefault();
    MostrarAgregar();
});

const formulario_datos = document.getElementById("form-datos");
formulario_datos.addEventListener("dblclick", (e) => {
    MostrarAgregar();
});

const btn_cancelar = document.getElementById("btn-cancelar");
btn_cancelar.addEventListener("click", (e) => {
    e.preventDefault();
    MostrarDatos();
});

const btn_agregar = document.getElementById("btn-agregar");
btn_agregar.addEventListener("click", (e) => {
    e.preventDefault();
    let vehiculo;
    const id = ObtenerProximoId(vehiculos);
    const modelo = document.getElementById("txt-modelo").value;
    let anoFab = document.getElementById("txt-anoFab").value;
    let velMax = document.getElementById("txt-velMax").value;
    let altMax = document.getElementById("txt-altMax").value;
    let autonomia = document.getElementById("txt-autonomia").value;
    let cantPue = document.getElementById("txt-cantPue").value;
    let cantRue = document.getElementById("txt-altMax").value;
    const tipo = document.getElementById("select-tipo").value;
    if (modelo !== "" )
    {
        anoFab = parseInt(anoFab);
        if (anoFab && anoFab > 1885)
        {
            velMax = parseInt(velMax);
            if (velMax && velMax > 0)
            {
                if (tipo === "aereo")
                {
                    altMax = parseInt(altMax);
                    if (altMax && altMax > 0)
                    {
                        autonomia = parseInt(autonomia);
                        if (autonomia && autonomia > 0)
                        {
                            vehiculo = new Aereo(id, modelo, anoFab, velMax, altMax, autonomia);
                            vehiculos.push(vehiculo);
                            mensaje = "vehiculo agregado correctamente";
                            ActualizarTabla();
                            MostrarDatos();
                        }
                        else
                        {
                            mensaje = "Dato invalido en la autonomia";
                        }
                        }
                    else
                    {
                        mensaje = "Dato invalido en la altura maxima";
                    }
                }
                else
                {
                    cantPue = parseInt(cantPue);
                    if (cantPue && cantPue > -1)
                    {
                        cantRue = parseInt(cantRue);
                        if (cantRue && cantRue > 0)
                        {
                            vehiculo = new Terrestre(id, modelo, anoFab, velMax, cantPue, cantRue);
                            vehiculos.push(vehiculo);
                            mensaje = "vehiculo agregado correctamente";
                            ActualizarTabla();
                            MostrarDatos();
                        }
                        else
                        {
                            mensaje = "Dato invalido en la velocidad maxima";
                        }
                    }
                    else
                    {
                        mensaje = "Dato invalido en la cantidad de puertas";
                    }
                }
            }
            else
            {
                mensaje = "Dato invalido en la velocidad maxima";
            }
        }
        else
        {
            mensaje = "Dato invalido en el año de fabricacion";
        }
    }
    else{
        mensaje = "El modelo no puede estar vacio";
    }

    alert(mensaje);

    
});

const btn_eliminar = document.getElementById("btn-eliminar");
btn_eliminar.addEventListener("click", (e) => {
    e.preventDefault()
    let id = document.getElementById("txt-id").value;
    // let indiceVehiculoABorrar = -1;
    let contadorEliminados = 0;
    let modeloVehiculo;
    id = parseInt(id);
    let i = 0;
    if (id)
    {
        
        while (i < vehiculos.length - 1)
        {
            vehiculo = vehiculos[i]
            if (vehiculo.id === id)
            {
                modeloVehiculo = vehiculo.modelo;
                vehiculos.splice(i, 1);
                contadorEliminados++;
                i--;
            }
            i++;
        }
        if (contadorEliminados > 0)
        {
            mensaje = "Se han eliminado " + contadorEliminados + " del modelo " + modeloVehiculo;
            ActualizarTabla();
            MostrarDatos();
        }
        else
        {
            mensaje = "Id no existente";
        }
    }
    else
    {
        mensaje = "El id debe ser un numero"
    }

    alert(mensaje);
    
});

let t_head;
for (let clave of claves)
{
    t_head = document.getElementById("t-head-" + clave);
    t_head.addEventListener("click", () => {
        vehiculos.sort((a, b) => a[clave] - b[clave]);
        ActualizarTabla();
    });
}


for (let i = 0; i < claves.length; i++)
{
    let clave = claves[i];
    let checkbox = document.getElementById(clave + "Check");
    checkbox.checked = true;
    checkbox.addEventListener("change", function() {
        if (this.checked) {
            MostrarColumna(i + 1);
        } else {
            OcultarColumna(i + 1);
        }
    });
}

const btn_modificar = document.getElementById("btn-modificar");
btn_modificar.addEventListener("click", (e) => {
    e.preventDefault();
    let vehiculo;
    let id = document.getElementById("txt-id").value;
    const modelo = document.getElementById("txt-modelo").value;
    let anoFab = document.getElementById("txt-anoFab").value;
    let velMax = document.getElementById("txt-velMax").value;
    let altMax = document.getElementById("txt-altMax").value;
    let autonomia = document.getElementById("txt-autonomia").value;
    let cantPue = document.getElementById("txt-cantPue").value;
    let cantRue = document.getElementById("txt-altMax").value;
    const tipo = document.getElementById("select-tipo").value;
    e.preventDefault()
    // let indiceVehiculoABorrar = -1;
    let contadorModificados = 0;
    let modeloVehiculo;
    let i = 0;
    id = parseInt(id);
    if (id)
    {
        if (modelo !== "" )
        {
            anoFab = parseInt(anoFab);
            if (anoFab && anoFab > 1885)
            {
                velMax = parseInt(velMax);
                if (velMax && velMax > 0)
                {
                    if (tipo === "aereo")
                    {
                        altMax = parseInt(altMax);
                        if (altMax && altMax > 0)
                        {
                            autonomia = parseInt(autonomia);
                            if (autonomia && autonomia > 0)
                            {
                                while (i < vehiculos.length - 1)
                                {
                                    vehiculo = vehiculos[i]
                                    if (vehiculo.id === id)
                                    {
                                        modeloVehiculo = vehiculo.modelo;
                                        vehiculo.modelo = modelo;
                                        vehiculo.anoFab = anoFab;
                                        vehiculo.velMax = velMax;
                                        vehiculo.altMax = altMax;
                                        vehiculo.autonomia = autonomia;
                                        contadorModificados++;
                                    }
                                    i++;
                                }
                                if (contadorModificados > 0)
                                {
                                    mensaje = "Se han modificado " + contadorModificados + " del modelo " + modeloVehiculo;
                                    ActualizarTabla();
                                    MostrarDatos();
                                }
                                else
                                {
                                    mensaje = "Id no existente";
                                }
                            }
                            else
                            {
                                mensaje = "Dato invalido en la autonomia";
                            }
                            }
                        else
                        {
                            mensaje = "Dato invalido en la altura maxima";
                        }
                    }
                    else
                    {
                        cantPue = parseInt(cantPue);
                        if (cantPue && cantPue > -1)
                        {
                            while (i < vehiculos.length - 1)
                                {
                                    vehiculo = vehiculos[i]
                                    if (vehiculo.id === id)
                                    {
                                        modeloVehiculo = vehiculo.modelo;
                                        vehiculo.modelo = modelo;
                                        vehiculo.anoFab = anoFab;
                                        vehiculo.velMax = velMax;
                                        vehiculo.cantPue = cantPue;
                                        vehiculo.cantRue = cantRue;
                                        contadorModificados++;
                                    }
                                    i++;
                                }
                                if (contadorModificados > 0)
                                {
                                    mensaje = "Se han modificado " + contadorModificados + " del modelo " + modeloVehiculo;
                                    ActualizarTabla();
                                    MostrarDatos();
                                }
                                else
                                {
                                    mensaje = "Id no existente";
                                }
                        }
                        else
                        {
                            mensaje = "Dato invalido en la cantidad de puertas";
                        }
                    }
                }
                else
                {
                    mensaje = "Dato invalido en la velocidad maxima";
                }
            }
            else
            {
                mensaje = "Dato invalido en el año de fabricacion";
            }
        }
        else{
            mensaje = "El modelo no puede estar vacio";
        }
    }
    else
    {
        mensaje = "El id debe ser un numero";
    }
    

    alert(mensaje);
});

const select_tipo = document.getElementById("select-tipo");
select_tipo.addEventListener("change", (e)=>{
    const div_altMax = document.getElementById("div-altMax");
    const div_autonomia = document.getElementById("div-autonomia");
    const div_cantPue = document.getElementById("div-cantPue");
    const div_cantRue = document.getElementById("div-cantRue");
    if (select_tipo.value == "aereo")
    {
        div_altMax.hidden = false;
        div_autonomia.hidden = false;
        div_cantPue.hidden = true;
        div_cantRue.hidden = true;
    }
    else
    {
        div_altMax.hidden = true;
        div_autonomia.hidden = true;
        div_cantPue.hidden = false;
        div_cantRue.hidden = false;
    }
});