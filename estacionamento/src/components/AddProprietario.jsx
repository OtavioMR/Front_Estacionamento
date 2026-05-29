import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Proprietario.css";

const AddProprietario = () => {
    const [proprietario, setProprietario] = useState({ nome: "", cpf: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setProprietario((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8081/proprietario", proprietario);
            navigate("/proprietario");
        } catch (err) {
            console.log(err);
            alert("Erro ao cadastrar proprietário. Verifique os dados.");
        }
    };

    return (
        <div className="prop-container">
            <h2 className="text-center mb-4 prop-title">Cadastrar Proprietário</h2>
            <form className="prop-form">
                <div className="mb-3">
                    <label className="form-label">Nome Completo</label>
                    <input type="text" className="form-control" name="nome" placeholder="Ex: Otávio Silva" onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="form-label">Documento (CPF)</label>
                    <input type="text" className="form-control" name="cpf" placeholder="Ex: 123.456.789-00" onChange={handleChange} required />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <button type="submit" className="btn btn-prop-primary" onClick={handleClick}>Salvar Cadastro</button>
                    <Link to="/proprietario" className="text-light">Voltar</Link>
                </div>
            </form>
        </div>
    );
};

export default AddProprietario;