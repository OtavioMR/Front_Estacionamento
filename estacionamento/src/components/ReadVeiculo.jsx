import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./Veiculo.css";

const ReadVeiculo = () => {
    const { id } = useParams();
    const [veiculo, setVeiculo] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8081/veiculo/${id}`)
            .then((res) => setVeiculo(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    if (!veiculo) return <div className="veiculo-container text-center">Carregando detalhes...</div>;

    return (
        <div className="veiculo-container">
            <div className="custom-form" style={{ maxWidth: '500px' }}>
                <h3 className="veiculo-title mb-4 text-center">Ficha do Veículo</h3>
                <p><strong>ID do Registro:</strong> {veiculo.id_veiculo}</p>
                <p><strong>Placa:</strong> <span className="badge-placa ms-2">{veiculo.placa}</span></p>
                <p><strong>Ano de Fabricação:</strong> {veiculo.ano}</p>
                <p><strong>Mensalidade Fixada:</strong> R$ {parseFloat(veiculo.mensalidade).toFixed(2)}</p>
                <p><strong>Código do Proprietário (FK):</strong> {veiculo.fk_proprietario}</p>
                <p><strong>Registrado em:</strong> {new Date(veiculo.createdAt).toLocaleString()}</p>
                <hr className="bg-secondary" />
                <div className="text-center">
                    <Link to="/veiculo" className="btn btn-sm btn-secondary">Voltar</Link>
                </div>
            </div>
        </div>
    );
};

export default ReadVeiculo;