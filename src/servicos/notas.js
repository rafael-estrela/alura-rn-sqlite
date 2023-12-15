import { db } from './sqlite'

export function createTable() {
    db.transaction((transaction) => {
        const sql = "CREATE TABLE IF NOT EXISTS notas (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);"
        transaction.executeSql(sql)
    })
}

export async function createNote(note) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            const sql = "INSERT INTO notas (titulo, categoria, texto) VALUES (?, ?, ?);"
            const values = [note.titulo, note.categoria, note.texto]
            const callback = () => { resolve("Nota criada com sucesso!") }
            const errorCallback = () => { resolve("Erro ao criar nota.") }
            transaction.executeSql(sql, values, callback, errorCallback)
        })
    })
}

export async function retrieveNotes() {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            const sql = "SELECT * FROM notas;"
            const callback = (_, result) => { resolve(result.rows._array) }
            const errorCallback = () => { resolve([]) }
            transaction.executeSql(sql, [], callback, errorCallback)
        })
    })
}

export async function retrieveNotesWithFilter(category) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            const sql = "SELECT * FROM notas WHERE categoria LIKE ?;"
            const values = [category]
            const callback = (_, result) => { resolve(result.rows._array) }
            const errorCallback = () => { resolve([]) }
            transaction.executeSql(sql, values, callback, errorCallback)
        })
    })
}

export async function updateNote(note) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            const sql = "UPDATE notas SET titulo = ?, categoria = ?, texto = ? WHERE id = ?;"
            const values = [note.titulo, note.categoria, note.texto, note.id]
            const callback = () => resolve('Nota atualizada com sucesso!')
            const errorCallback = () => resolve('Erro ao atualizar nota.')
            transaction.executeSql(sql, values, callback, errorCallback)
        })
    })
}

export async function deleteNote(id) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            const sql = "DELETE FROM notas WHERE id = ?"
            const values = [id]
            const callback = () => resolve("Nota excluída com sucesso!")
            const errorCallback = () => resolve("Erro ao excluir nota.")
            transaction.executeSql(sql, values, callback, errorCallback)
        })
    })
}