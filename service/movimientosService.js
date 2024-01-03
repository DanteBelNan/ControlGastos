var pool = require('./db');


async function getMovimientoById(Id){
    try {
        var query = "select m.idMovimiento, c.nombre as Categoria,   m.monto, m.detalle, m.fecha " +
        "from Movimientos as m " +
        "inner join Categorias as C on C.idCategoria = M.idCategoria " +
        "where m.idCategoria = ?"
        var rows = await pool.query(query, Id);
        return rows[0];
    }catch(error){
        console.log(error);
    }
}

async function getMovimientosByUserId(userId){
    try {
        var query = "select m.idMovimiento, c.nombre as Categoria,c.idCategoria as idCategoria,   m.monto, m.detalle, m.fecha " +
        "from Movimientos as m " +
        "inner join Categorias as C on C.idCategoria = M.idCategoria " +
        "inner join Usuarios as U on  C.idUsuario = u.idUsuario " +
        "WHERE u.idUsuario = ?"
        var rows = await pool.query(query, userId);
        if(rows == null){
            throw new Error("No se encontraron Movimientos")
        }
        return rows;
    }catch(error){
        throw error;
    }
}

async function getMovimientosByidCategoria(idCategoria){
    try {
        var query = "select m.idMovimiento, c.nombre as Categoria, c.idCategoria as idCategoria, m.monto, m.detalle, m.fecha " +
        "from Movimientos as m " +
        "inner join Categorias as c on c.idCategoria = m.idCategoria " +
        "WHERE c.idCategoria = ?"
        var rows = await pool.query(query, idCategoria);
        if(rows == null){
            throw new Error("No se encontraron Movimientos")
        }
        return rows;
    }catch(error){
        throw error;
    }
}

async function createMovimiento(obj){
    try{
        var query = "insert into Movimientos set ?";
        var rows= await pool.query(query,[obj])
    }catch(error){
        console.log(error);
        throw error;
    }
}

async function modificarMovimiento(obj, id) {
    try{
        var query = "update Movimientos set ? where idMovimiento = ?"
        var rows = await pool.query(query, [obj, id]);
        return rows;
    }catch(error){
        throw error;
    }
}

async function deleteMovimiento(id){
    try{
        var query = "delete from Movimientos where idMovimiento = ?";
        var rows = await pool.query(query, id);
        return rows;
    }catch(error){
        console.log(error);
        throw error;
    }
}

async function getMovimientosByUserIdAndMes(userId, Month, Year) {
    try {
      var query = "SELECT m.idMovimiento, c.nombre as Categoria, c.idCategoria as idCategoria,   m.monto, m.detalle, m.fecha " +
        "FROM Movimientos as m " +
        "INNER JOIN Categorias as c ON c.idCategoria = m.idCategoria " +
        "INNER JOIN Usuarios as u ON c.idUsuario = u.idUsuario " +
        "WHERE u.idUsuario = ? AND MONTH(m.fecha) = ? AND YEAR(m.fecha) = ?";
  
      var rows = await pool.query(query, [userId, Month, Year]);
  
      if (rows == null) {
        throw new Error("No se encontraron Movimientos");
      }
  
      return rows;
    } catch (error) {
      throw error;
    }
  }

module.exports = { getMovimientoById, getMovimientosByUserId,getMovimientosByidCategoria, createMovimiento,modificarMovimiento, deleteMovimiento, getMovimientosByUserIdAndMes}