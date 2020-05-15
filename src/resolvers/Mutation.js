import "babel-polyfill";
import * as uuid from 'uuid';
const Mutation={
    addUser:async(parent,args,ctx,info)=>{
        const{nombre,contrasena} = args;
        const {client} = ctx;

        const db = client.db("TrabajoFinal");
        const collection = db.collection("Usuarios");

        if(await collection.findOne({nombre})){
            throw new Error(`El usuario ya existe`);
        }

        const result = await collection.insertOne({nombre,contrasena});

        return{
            nombre,
            contrasena,
            _id: result.ops[0]._id
        };
        //tambien valdria return result.ops[0];

    },
    login:async(parent,args,ctx,info)=>{
        const{nombre,contrasena} = args;
        const {client} = ctx;

        const db = client.db("TrabajoFinal");
        const collection = db.collection("Usuarios");

        if(!await collection.findOne({nombre,contrasena})){
            throw new Error(`El usuario no existe o no es esa contrasena`);
        }
        await collection.updateOne({nombre},{$set:{"token":uuid.v4()}});
        const result = await collection.findOne({nombre});
        return result;
    },
    logout:async(parent,args,ctx,info)=>{
        const{nombre,token} = args;
        const {client} = ctx;

        const db = client.db("TrabajoFinal");
        const collection = db.collection("Usuarios");

        if(!await collection.findOne({nombre})){
            throw new Error(`EL usuario no existe o no es esa la contrasena`);
        }
        if(await collection.findOne({nombre})){
            if(token === null){
                throw new Error(`El usuario no esta logueado`);
            }
            await collection.updateOne({nombre},{$set:{"token":null}});
            const result = await collection.findOne({nombre});
            return result;
        }
    },
    removeUser:async(parent,args,ctx,info) =>{
        const {nombre,token} = args;
        const{client} = ctx;
        const db = client.db("TrabajoFinal");
        const collection = db.collection("Usuarios");
        
        
        if(!await collection.findOne({nombre,token})){
            throw new Error(`El usuario no esta logueado para realizar esta accion o no existe`);
        }

        const result = await collection.findOneAndDelete({nombre,token});

        return result.value;

    }
}
export {Mutation as default}; 