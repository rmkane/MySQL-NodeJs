module.exports = {
    todo: {
        insert: "INSERT INTO tbl_todo (title, completed) VALUES (?, ?)",
        read: "SELECT * FROM tbl_todo",
        update: "UPDATE tbl_todo SET tbl_todo.title = ?, tbl_todo.completed = ? WHERE tbl_todo.id = ?",
        delete: "DELETE FROM tbl_todo WHERE tbl_todo.id = ?",
        truncate: "TRUNCATE TABLE tbl_todo",
        reset: "ALTER TABLE tbl_todo AUTO_INCREMENT=1"
    }
}