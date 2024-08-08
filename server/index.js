const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const GatoModel = require("./models/cat");

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = "mongodb+srv://@cluster0.ibrlgid.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((error) => console.error("Error connecting to MongoDB:", error));

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await GatoModel.findOne({ email });

        if (!user) {
            console.log('Usuário não encontrado');
            return res.status(401).json("Falha no Login");
        }

        const isMatch = await user.comparePassword(password);
        console.log('Senha comparada:', isMatch);

        if (isMatch) {
            return res.json("Logado com Sucesso");
        } else {
            return res.status(401).json("Falha no Login");
        }
    } catch (err) {
        console.error('Erro:', err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/cadastro', async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await GatoModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "E-mail já está em uso" });
        }


        const user = await GatoModel.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        if (err.code === 11000) { 
            return res.status(400).json({ error: "E-mail já está em uso" });
        }
        res.status(400).json({ error: err.message });
    }
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
