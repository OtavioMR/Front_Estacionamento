import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./Proprietario.css";

const UpdateProprietario = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [proprietario, setProprietario] = useState({ nome: "", cpf: "" });

    useEffect(() => {
        axios.get(`http://localhost:8081/proprietario/${id}`)
            .then(res => setProprietario(res.data))
            .catch(err => console.log(err));
    }, [id]);

    const handleChange = (e) => {
        setProprietario((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/proprietario/${id}`, proprietario);
            navigate("/proprietario");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="prop-container">
            <h2 className="text-center mb-4 prop-title">Editar Dados do Proprietário</h2>
            <form className="prop-form">
                <div className="mb-3">
                    <label className="form-label">Nome Completo</label>
                    <input type="text" className="form-control" name="nome" value={proprietario.nome} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="form-label">CPF</label>
                    <input type="text" className="form-control" name="cpf" value={proprietario.cpf} onChange={handleChange} />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <button type="submit" className="btn btn-success" onClick={handleUpdate}>Atualizar</button>
                    <Link to="/proprietario" className="text-light">Cancelar</Link>
                </div>
            </form>
        </div>
    );
};

export default UpdateProprietario;