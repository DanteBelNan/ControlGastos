var pool = require('./db');

async function getUserByUserNameAndPassword(user, password){
    try {
        var query = "select u.idUsuario as idUsuario, u.username as username, u.password as password, r.nombre as rol, u.mail as mail from usuarios as u "+
        "inner join rol as r on r.idRol = u.idRol " +
        "where (u.username = ? OR u.mail = ?) and password = ? limit 1";
        var rows = await pool.query(query, [user,user, password]);
        return rows[0];
    }catch(error){
        console.log(error);
    }
}

async function getUserById(Id){
    try {
        var query = "select u.idUsuario as idUsuario, u.username as username, u.password as password, r.nombre as rol, u.mail as mail from usuarios as u " + 
        "inner join rol as r on r.idRol = u.idRol " +
        "where idUsuario = ? ";
        var rows = await pool.query(query, Id);
        return rows[0];
    }catch(error){
        console.log(error);
    }
}

async function changePasswordById(id, password){
    try {
        var query = "update usuarios set password = ? where idUsuario = ?";
        var rows = await pool.query(query, [password,id]);
        return rows;
    }catch(error){
        console.log(error);
    }
}

async function createUser(obj){
    try{
        var query = "insert into usuarios set ?";
        var rows= await pool.query(query,[obj])
    }catch(error){
        console.log(error);
        throw error;
    }
}

async function deleteUser(id){
    try{
        var query = "delete from usuarios where idUsuario = ?";
        var rows = await pool.query(query, [id]);
        return rows;
    }catch(error){
        console.log(error);
        throw error;
    }
}

async function getCantMovimientos(id){
    try{
        var query = "select count(m.idMovimiento) as cantMovimientos from movimientos as m " + 
        "where m.idUsuario = ?"
        var rows = await pool.query(query, id);
        return rows[0];
    }catch(error){
        console.log(error);
        throw error;
    }
}

module.exports = { getUserByUserNameAndPassword,getUserById, createUser, changePasswordById, deleteUser, getCantMovimientos }