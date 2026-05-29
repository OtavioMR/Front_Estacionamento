import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Proprietario.css";

const ListProprietario = () => {
    const [proprietarios, setProprietarios] = useState([]);

    useEffect(() => {
        const fetchAllProprietarios = async () => {
            try {
                const res = await axios.get("http://localhost:8081/proprietario");
                setProprietarios(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllProprietarios();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Atenção: Ao deletar este proprietário, todos os veículos vinculados a ele também serão excluídos! Deseja continuar?")) {
            try {
                await axios.delete(`http://localhost:8081/proprietario/${id}`);
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="prop-container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="prop-title m-0">Painel de Proprietários</h2>
                <Link to="/addProprietario" className="btn btn-prop-primary">
                    + Novo Proprietário
                </Link>
            </div>

            <div className="prop-grid">
                {proprietarios.map((prop) => (
                    <div className="prop-card" key={prop.id_proprietario}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="avatar-icon">
                                {prop.nome ? prop.nome.charAt(0).toUpperCase() : "P"}
                            </div>
                            <small className="text-muted">ID: {prop.id_proprietario}</small>
                        </div>
                        <h4 className="text-info mb-2">{prop.nome}</h4>
                        <p className="mb-1"><strong>CPF:</strong> {prop.cpf}</p>
                        
                        <div className="d-flex justify-content-end mt-4">
                            <Link to={`/readProprietario/${prop.id_proprietario}`} className="btn btn-sm btn-success me-2">Ver</Link>
                            <Link to={`/updateProprietario/${prop.id_proprietario}`} className="btn btn-sm btn-info me-2">Editar</Link>
                            <button onClick={() => handleDelete(prop.id_proprietario)} className="btn btn-sm btn-danger">Deletar</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 text-center">
                <Link to="/veiculo" className="text-warning">Ir para Painel de Veículos</Link>
            </div>
        </div>
    );
};

export default ListProprietario;