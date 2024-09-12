// 引入express模块
const express = require('express');
const { Pool } = require('pg');
const helmet = require('helmet');
// 创建express应用
const app = express();
// 定义端口号
const PORT = 3000;

// 配置数据库连接池
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'zanglu573332957',
    port: 5432,
  });

// 初始化数据库连接池
async function initDatabase()
{
    try {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS items (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            completed BOOLEAN DEFAULT false
        )
        `);
    } catch (err) {
        console.error(err);
    }
}

initDatabase().catch(err => console.error(err));

let data = [];
let nextId = 1;

app.use(express.json());

// 对根路由的GET请求进行处理
//SHOW
app.get('/show', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM items');
        res.json(rows);
    } catch (err) {
        res.status(500).json({message: 'Server error'});
    }
});

//ID_SHOW
app.get('/show/:id',async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const { rows } = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
        if(rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({message: 'Not Found'});
        }
    } catch (err) {
        res.status(500).json({message: 'Server error'});
    }
});

//ADD
app.post('/show', async (req, res) => {
    const {title, completed = false} = req.body;
    if(!title) {
        return res.status(400).json({message: 'Title is required'});
    }
    try {
        const { rows } = await pool.query('INSERT INTO items(title, completed) VALUES($1, $2) RETURNING *', [title, completed]);
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({message: 'Server error'});
    }
});

//ID_DELETE
app.delete('/delete/:id',async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const { rowCount } = await pool.query('DELETE FROM items WHERE id = $1', [id]);
        if(rowCount > 0) {
            res.json({message: `Delete ${id} success`});
        } else {
            res.status(404).json({message: 'Not Found'});
        }
    } catch (err) {
        res.status(500).json({message: 'Server error'});
    }
});

// 应用开始监听指定端口，用于接收请求
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});