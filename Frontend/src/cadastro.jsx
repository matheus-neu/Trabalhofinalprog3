import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Cadastro() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const [success, setSuccess] = useState(""); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("Todos os campos são obrigatórios.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/cadastro', { name, email, password });
            console.log(response);
            setSuccess("Cadastro realizado com sucesso!");
            setError(""); 
            navigate('/login');
        } catch (err) {
            console.error(err);
            setError("Falha ao cadastrar. Verifique os dados e tente novamente.");
            setSuccess(""); 
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Registro</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Nome</strong>
                        </label>
                        <input
                            type="text"
                            autoComplete="off"
                            name="name"
                            className="form-control rounded-0"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Senha</strong>
                        </label>
                        <input
                            type="password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Cadastro
                    </button>
                </form>
                <p>Você já possui uma conta?</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Cadastro;
