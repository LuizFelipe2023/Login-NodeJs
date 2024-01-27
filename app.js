import express from 'express';
import User from './models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verificaToken from './authMiddleware.js';
import conn from './database_connection/conexao.js';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/register', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Preencha todos os campos obrigatórios!' });
        }
        if (password !== confirmPassword) {
            return res.status(422).json({ error: 'As senhas não conferem!' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Já existe um usuário usando este email! Tente outro email.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email,
            password: hashedPassword
        });

        return res.status(201).json({ message: 'Usuário registrado com sucesso!', user: newUser });
    } catch (error) {
        console.error('Erro durante o registro:', error);
        return res.status(500).json({ error: 'Erro durante o registro. Tente novamente mais tarde.' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(401).json({ error: 'Usuário não existe!' });
        }
        
        const verificaPassword = await bcrypt.compare(password, user.password);
        
        if (!verificaPassword) {
            return res.status(401).json({ error: 'Senha Inválida!' });
        }
        
        const token = jwt.sign({ userId: user.id }, 'your-secret', {
            expiresIn: '1h'
        });
        
        res.status(200).json({ token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ error: 'Erro ao fazer login. Tente novamente mais tarde.' });
    }
});
app.get('/',verificaToken,(req,res)=>{
    res.status(200).json({message: 'Rota Autenticada com sucesso!'});
})
app.post('/logout', (req, res) => {
    res.status(200).json({ message: 'Logout bem-sucedido!' });
});

const syncModels = async () => {
    try {
        await conn.sync();
        console.log("Todos os modelos estão sincronizados com o banco de dados");
    } catch (err) {
        console.error("Erro ao sincronizar os modelos com o banco de dados:", err);
    }
};
syncModels();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
