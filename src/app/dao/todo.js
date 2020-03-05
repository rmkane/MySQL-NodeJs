const DbConnection = require("../utils/db-connection");
const queries = require("../queries/todo");

const TransactionStatement = Object.freeze({
  START : "START TRANSACTION",
  COMMIT : "COMMIT",
  ROLLBACK : "ROLLBACK"
});

class TodoDao {
  async saveEntity(entity) {
    let con = await DbConnection();
    try {
      await con.query(TransactionStatement.START);
      let savedTodo = await con.query(
          queries.todo.insert,
          [entity.title, entity.completed]
      );
      await con.query(TransactionStatement.COMMIT);
      entity.id = savedTodo.insertId;
      return entity;
    } catch (ex) {
      await con.query(TransactionStatement.ROLLBACK);
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  }

  async updateEntity(entity) {
    let con = await DbConnection();
    try {
      await con.query(TransactionStatement.START);
      await con.query(queries.todo.update, [
        entity.title,
        entity.completed,
        entity.id
      ]);
      await con.query(TransactionStatement.COMMIT);
      return true;
    } catch (ex) {
      await con.query(TransactionStatement.ROLLBACK);
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  }

  async deleteEntity(id) {
    let con = await DbConnection();
    try {
      await con.query(TransactionStatement.START);
      await con.query(queries.todo.delete, [id]);
      await con.query(TransactionStatement.COMMIT);
      return true;
    } catch (ex) {
      await con.query(TransactionStatement.ROLLBACK);
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  }

  async readEntities() {
    let con = await DbConnection();
    try {
      await con.query(TransactionStatement.START);
      let todo = await con.query(queries.todo.read);
      await con.query(TransactionStatement.COMMIT);
      todo = JSON.parse(JSON.stringify(todo));
      return todo;
    } catch (ex) {
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  }

  async truncateAndResetTable() {
    let con = await DbConnection();
    try {
      await con.query(TransactionStatement.START);
      await con.query(queries.todo.truncate);
      await con.query(queries.todo.reset);
      await con.query(TransactionStatement.COMMIT);
      return true;
    } catch (ex) {
      await con.query(TransactionStatement.ROLLBACK);
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  }
};

module.exports = TodoDao;
