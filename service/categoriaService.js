var pool = require('./db');


async function getCategoriaById(Id){
    try {
        var query = "select c.idCategoria, c.nombre, c.color, c.idUsuario " +
        "from categorias as c " +
        "where c.idCategoria = ?"
        var rows = await pool.query(query, Id);
        return rows[0];
    }catch(error){
        console.log(error);
    }
}

async function getCategoriasByUserId(userId){
    try {
        var query = "select c.idCategoria, c.nombre, c.color, c.idUsuario " +
        "from categorias as c " +
        "where c.idUsuario = ?"
        var rows = await pool.query(query, userId);
        if(rows == null){
            throw new Error("No se encontraron categorias")
        }
        return rows;
    }catch(error){
        throw error;
    }
}

async function createCategoria(obj){
    try{
        var query = "insert into categorias set ?";
        var rows= await pool.query(query,[obj])
    }catch(error){
        console.log(error);
        throw error;
    }
}

async function modificarCategoria(obj, id) {
    try{
        var query = "update categorias set ? where idCategoria = ?"
        var rows = await pool.query(query, [obj, id]);
        return rows;
    }catch(error){
        throw error;
    }
}

async function deleteCategoria(id){
    try{
        var query = "delete from categorias where idCategoria = ?";
        var rows = await pool.query(query, id);
        return rows;
    }catch(error){
        console.log(error);
        throw error;
    }
}

module.exports = { getCategoriaById, getCategoriasByUserId, createCategoria,modificarCategoria, deleteCategoria }