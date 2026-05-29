import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./Veiculo.css";

const UpdateVeiculo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [veiculo, setVeiculo] = useState({ placa: "", ano: "", mensalidade: "", fk_proprietario: "" });
    const [proprietarios, setProprietarios] = useState([]);

    useEffect(() => {
        // Busca os dados atuais do veículo
        axios.get(`http://localhost:8081/veiculo/${id}`)
            .then(res => setVeiculo(res.data))
            .catch(err => console.log(err));

        // Busca os proprietários para o select
        axios.get("http://localhost:8081/proprietario")
            .then(res => setProprietarios(res.data))
            .catch(err => console.log(err));
    }, [id]);

    const handleChange = (e) => {
        setVeiculo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/veiculo/${id}`, veiculo);
            navigate("/veiculo");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="veiculo-container">
            <h2 className="text-center mb-4 veiculo-title">Modificar Registro do Veículo</h2>
            <form className="custom-form">
                <div className="mb-3">
                    <label className="form-label">Placa</label>
                    <input type="text" className="form-control" name="placa" value={veiculo.placa} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ano</label>
                    <input type="number" className="form-control" name="ano" value={veiculo.ano} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mensalidade (R$)</label>
                    <input type="number" step="0.01" className="form-control" name="mensalidade" value={veiculo.mensalidade} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Proprietário Associado</label>
                    <select className="form-select" name="fk_proprietario" value={veiculo.fk_proprietario} onChange={handleChange}>
                        {proprietarios.map(p => (
                            <option key={p.id_proprietario} value={p.id_proprietario}>
                                {p.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <button type="submit" className="btn btn-success" onClick={handleUpdate}>Salvar Alterações</button>
                    <Link to="/veiculo" className="text-light">Cancelar</Link>
                </div>
            </form>
        </div>
    );
};

export default UpdateVeiculo;