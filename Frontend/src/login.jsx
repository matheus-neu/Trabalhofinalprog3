import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const [success, setSuccess] = useState(""); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Todos os campos são obrigatórios.");
            return;
        }

        try {
            console.log("Sending login request:", { email, password }); 

            const response = await axios.post('http://localhost:3001/login', { email, password });
            console.log("Response:", response); 

            if (response.data === "Logado com Sucesso") {
                setSuccess("Login realizado com sucesso!");
                setError("");
                navigate('/principal');
            } else {
                setError("Email ou senha incorretos.");
                setSuccess("");
            }
        } catch (err) {
            console.error("Error during login:", err); 
            setError("Falha ao fazer login. Verifique suas credenciais e tente novamente.");
            setSuccess(""); 
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
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
                        Login
                    </button>
                </form>
                <p>Não tem uma conta?</p>
                <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Registro
                </Link>
            </div>
        </div>
    );
}

export default Login;
