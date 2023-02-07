// Actividad 6
var express = require('express')
var app = express()
var bodyParse = require('body-parser')

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended:true}))
const mongoose = require('mongoose')
global.config = require(__dirname + '/config.js').config


app.all('*',function(request,response,next){

        var listablanca  = request.headers.origin; //lista blanca

        response.header('Access-Control-Allow-Origin', config.listablanca)
        response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
        response.header('Access-Control-Allow-Headers', " authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
        response.header("Access-Control-Allow-Credentials", "true");
        next()
     })

app.listen(config.puerto,function(){
    console.log('Servidor conectado por el puerto: ' + config.puerto)
    })

//Dar acceso
var cors = require('cors')//recursos compartidos
app.use(cors({origin:function(origin,callback){
        console.log(origin)
        if(origin) return callback(null,true)
        if(config.listablanca.indexOf(origin) === -1){
            return callback('error cors',false)
        }
        return callback (null,true)
    }
    }))

//create
var datos = [];
app.post("/Actividad6/usuarios/guardar",function(request,response){
    var post = {
        cedula:request.body.cedula,
        nombre:request.body.nombre,
        apellido:request.body.apellido,
        direccion:request.body.direccion,
        edad:request.body.edad,
        estado_c:request.body.estado_c}

    if(post.cedula == "" || post.cedula == null || post.cedula == undefined){
       response.json({state:false,mensaje:"ingrese numero de cédula"})
        return false
    }

    if(post.nombre == "" || post.nombre == null || post.nombre == undefined){
        response.json({state:false,mensaje:"Ingrese nombre"})
        return false
    }

        datos.push({cedula:request.body.cedula,
        nombre:request.body.nombre,
        apellido:request.body.apellido,
        direccion:request.body.direccion,
        edad:request.body.edad,
        estado_c:request.body.estado_c})
        response.json({state:true,mensaje:"Registro exitoso"})
        console.log(datos)
    })
    
//listar
        app.post("/Actividad6/usuarios/listar", function(request,response){
        response.json({state:true,datos:datos})

    })

//Modificar
app.post("/Actividad6/usuarios/modificar",function(request,response){
    var post = { cedula:request.body.cedula,
                 edad:request.body.edad
                }

        if(post.cedula == "" || post.cedula == undefined || post.cedula == null){
            response.json({state:false,mensaje:"Ingrese numero de documento"}) 
            return false
        }

        if (post.edad == "" || post.edad == undefined || post.edad == null){
            response.json({state:false,mensaje:"Ingrese la edad a actualizar"}) 
            return false
        }

        var posicion = datos.findIndex((item)=> item.cedula == post.cedula)
        datos[posicion].edad = post.edad     
        response.json ({state:true,mensaje:"Actualización exitosa"})
    })

//Eliminar
app.post("/Actividad6/usuarios/eliminar",function(request,response){
    var post = { cedula:request.body.cedula}

        if(post.cedula == "" || post.cedula == undefined || post.cedula == null){
            response.json({state:false,mensaje:"Ingrese numero de documento"}) 
            return false
        }

        var posicion = data.findIndex((item)=> item.cedula == post.cedula)
        if (posicion == -1){
            response.json({state:false,mensaje:"Usurio no encontrado"})
            return false
        }
        datos.splice(posicion,1)
        response.json({state:true,mensaje:"Se eliminó correctamente"})
    })
