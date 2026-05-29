import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Veiculo.css";

const ListVeiculo = () => {
    const [veiculos, setVeiculos] = useState([]);

    useEffect(() => {
        const fetchAllVeiculos = async () => {
            try {
                const res = await axios.get("http://localhost:8081/veiculo");
                setVeiculos(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllVeiculos();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Deseja realmente deletar este veículo?")) {
            try {
                await axios.delete(`http://localhost:8081/veiculo/${id}`);
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="veiculo-container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="veiculo-title m-0">Painel de Veículos</h2>
                <Link to="/addVeiculo" className="btn btn-custom-primary">
                    + Cadastrar Veículo
                </Link>
            </div>

            <div className="veiculo-grid">
                {veiculos.map((veiculo) => (
                    <div className="veiculo-card" key={veiculo.id_veiculo}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="badge-placa">{veiculo.placa}</span>
                            <small className="text-muted">ID: {veiculo.id_veiculo}</small>
                        </div>
                        <p><strong>Ano:</strong> {veiculo.ano}</p>
                        <p><strong>Mensalidade:</strong> R$ {parseFloat(veiculo.mensalidade).toFixed(2)}</p>
                        <p><strong>ID Proprietário:</strong> {veiculo.fk_proprietario}</p>
                        
                        <div className="d-flex justify-content-end mt-4">
                            <Link to={`/readVeiculo/${veiculo.id_veiculo}`} className="btn btn-sm btn-success me-2">Visualizar</Link>
                            <Link to={`/updateVeiculo/${veiculo.id_veiculo}`} className="btn btn-sm btn-info me-2">Editar</Link>
                            <button onClick={() => handleDelete(veiculo.id_veiculo)} className="btn btn-sm btn-danger">Deletar</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 text-center">
                <Link to="/proprietario" className="text-info">Gerenciar Proprietários</Link>
            </div>
        </div>
    );
};

export default ListVeiculo;