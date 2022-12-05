const express = require('express')
const cors = require('cors')
require('dotenv').config({ path: './config.env' })
const { Server } = require('socket.io')
const { createServer } = require('http')
//* Database connected
const MysqlConnection = require('./Server/Database')


const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const server = createServer(app)
MysqlConnection.connect(() => console.log('Connected to MySQL'))


const io = new Server(server, {
    cors: {
        origin: 'http://localhost:1008',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
})






io.on("connection", (socket) => {
    console.log(socket.id)

    socket.on('userjoined', (username) => {
        socket.join(username)


        socket.on('login', (user) => {
            MysqlConnection.query(`SELECT * FROM person WHERE username = '${user.username}' AND password = '${user.password}'`, (error, rows, result) => {
                if (error) throw error
                if (rows.length === 0) {
                    io.in(username).emit('resultLogin', [{ error: 'کاربری با این یوزرنیم و پسورد پیدا نشد' }])
                } else if (rows.length !== 0) {
                    io.in(username).emit('resultLogin', rows)
                }
            })
        })


        socket.on('haveChatWith', (from) => {
            MysqlConnection.query(`SELECT * FROM person p WHERE p.id IN (SELECT DISTINCT c.to FROM chat c WHERE c.from = ${from} AND c.time > (SELECT date FROM removeChatOneUser WHERE user_id = ${from})) UNION SELECT * FROM person p WHERE p.id IN (SELECT DISTINCT c.from FROM chat c WHERE c.to = ${from} AND c.time > (SELECT date FROM removeChatOneUser WHERE user_id = ${from}))`, (error, rows, result) => {
                if (error) throw error
                io.in(username).emit('ResultHavechatwith', rows)
            })
        })


        socket.on('logout', (status, from) => {
            const query = 'UPDATE person ' + 'SET status = ? ' + 'WHERE id = ?'
            const value = [status, from]

            MysqlConnection.query(query, value, (error, rows, result) => {
                if (error) throw error
                io.in(from).emit('logout_user', rows)
            })
        })


        socket.on('signin', (parameter) => {
            MysqlConnection.query('INSERT INTO person SET ?', parameter, (error, rows, result) => {
                if (error) {
                    return io.in(username).emit('resultSignin', { error: 'این کاربر قبلا ثبت نام کرده است' })
                }
                else {
                    io.in(username).emit('resultSignin', { success: 'کاربر با موفقیت ثبت نام شد' })
                }
            })
        })


        socket.on('chatstwouser', (from, to) => {
            MysqlConnection.query(`SELECT * FROM chat c WHERE c.from IN (${from}, ${to}) AND c.to IN (${from}, ${to}) AND c.time > (SELECT date FROM removeChatOneUser WHERE user_id = ${from} AND user_id_removeChat = ${to}) ORDER BY c.time ASC`, (error, rows, result) => {
                if (error) throw error
                else {
                    io.in(username).emit('resultChatstwouser', rows)
                }
            })
        })


        socket.on('sendchat', (from, to, status, text) => {
            MysqlConnection.query('INSERT INTO chat SET ?', { from, to, status, text }, (error, rows, result) => {
                if (error) throw error
            })
        })


        socket.on('statuschats', (status, from, to) => {
            MysqlConnection.query(`SELECT c.id FROM chat c WHERE c.from IN (${from}, ${to}) AND c.to IN(${from}, ${to}) AND c.from = ${to} AND c.status = 0`, (error, rows, result) => {
                if (error) throw error
                if (rows.length > 0) {
                    const ChatsID = []

                    for (let i of rows) { ChatsID.push(i.id) }

                    const query = 'UPDATE chat ' + 'SET status = ? ' + 'WHERE id IN ( ? )'
                    const value = [Number(status), ChatsID]

                    MysqlConnection.query(query, value, (error, rows, result) => {
                        if (error) throw error
                        io.in(username).emit('resultStatuschats', rows)
                    })
                }
            })
        })


        socket.on('findone', (findUser) => {
            MysqlConnection.query(`SELECT * FROM person WHERE username = '${findUser}'`, (error, rows, result) => {
                if (error) throw error
                io.in(username).emit('resultFindone', rows)
            })
        })


        socket.on('count_messages_not_read', (userIDLogin) => {
            MysqlConnection.query(`SELECT c.from, c.to, COUNT(c.status) AS CountMsgNotRead FROM chat c WHERE c.status = 0 GROUP BY c.from HAVING c.from != ${userIDLogin} AND c.to = ${userIDLogin}`, (error, rows, result) => {
                if (error) throw error
                io.in(username).emit('Result_count_messages_not_read', rows)
            })
        })


        socket.on('block_user', (user_id, user_blocked) => {
            let data = [user_id, user_blocked]
            MysqlConnection.query(`INSERT INTO blockk (user_id, user_id_blocked) VALUES (?,?)`, data, (error, rows, result) => {
                if (error) throw error
            })
        })


        socket.on('user_blocked', (user_login_id) => {
            MysqlConnection.query(`SELECT * FROM blockk WHERE user_id = ${user_login_id} OR user_id_blocked = ${user_login_id}`, (error, rows, result) => {
                if (error) throw error
                io.in(username).emit('Result_user_blocked', rows)
            })
        })


        socket.on('delete_user_blocked', (user_login_id, user_unblocked) => {
            MysqlConnection.query(`SELECT * FROM blockk WHERE user_id = ${user_login_id} AND user_id_blocked = ${user_unblocked}`, (error, rows, result) => {
                if (error) throw error
                else if (rows.find(item => item)?.id) {
                    return MysqlConnection.query(`DELETE FROM blockk WHERE id = ${rows.find(item => item)?.id}`, (error, rows, result) => {
                        if (error) throw error
                    })
                }
            })
        })


        socket.on('removeChat_Update', (from, to) => {
            MysqlConnection.query(`UPDATE removeChatOneUser SET date = NOW() WHERE id = (SELECT id FROM (SELECT id FROM removeChatOneUser WHERE user_id = ${from} AND user_id_removeChat = ${to}) AS id)`, (error, rows, result) => {
                if (error) throw error
            })
        })
    })




})










const PORT = process.env.PORT || 1001
server.listen(PORT, () => console.log(`server run on port ${PORT}`)).on('error', error => console.log(error))