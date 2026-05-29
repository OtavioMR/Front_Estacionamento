import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Veiculo.css";

const AddVeiculo = () => {
    const [veiculo, setVeiculo] = useState({
        placa: "",
        ano: "",
        mensalidade: "",
        fk_proprietario: ""
    });
    const [proprietarios, setProprietarios] = useState([]);
    const navigate = useNavigate();

    // Carrega a lista de proprietários para popular o dropdown/select
    useEffect(() => {
        axios.get("http://localhost:8081/proprietario")
            .then(res => setProprietarios(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleChange = (e) => {
        setVeiculo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8081/veiculo", veiculo);
            navigate("/veiculo");
        } catch (err) {
            console.log(err);
            alert("Erro ao cadastrar. Verifique se os campos estão corretos.");
        }
    };

    return (
        <div className="veiculo-container">
            <h2 className="text-center mb-4 veiculo-title">Vincular Novo Veículo</h2>
            <form className="custom-form">
                <div className="mb-3">
                    <label className="form-label">Placa do Veículo</label>
                    <input type="text" className="form-control" name="placa" placeholder="Ex: ABC1D23" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ano</label>
                    <input type="number" className="form-control" name="ano" placeholder="Ex: 2024" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mensalidade (R$)</label>
                    <input type="number" step="0.01" className="form-control" name="mensalidade" placeholder="Ex: 150.00" onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="form-label">Proprietário Responsável</label>
                    <select className="form-select" name="fk_proprietario" onChange={handleChange} required value={veiculo.fk_proprietario}>
                        <option value="">-- Selecione o Proprietário --</option>
                        {proprietarios.map(p => (
                            <option key={p.id_proprietario} value={p.id_proprietario}>
                                {p.nome} (CPF: {p.cpf})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <button type="submit" className="btn btn-custom-primary" onClick={handleClick}>Cadastrar Veículo</button>
                    <Link to="/veiculo" className="text-light">Voltar para Listagem</Link>
                </div>
            </form>
        </div>
    );
};

export default AddVeiculo;