import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./Proprietario.css";

const ReadProprietario = () => {
    const { id } = useParams();
    const [proprietario, setProprietario] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8081/proprietario/${id}`)
            .then((res) => setProprietario(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    if (!proprietario) return <div className="prop-container text-center">Buscando dados...</div>;

    return (
        <div className="prop-container">
            <div className="prop-form" style={{ maxWidth: '500px' }}>
                <h3 className="prop-title mb-4 text-center">Ficha do Cliente</h3>
                <p><strong>ID Interno:</strong> {proprietario.id_proprietario}</p>
                <p><strong>Nome Completo:</strong> {proprietario.nome}</p>
                <p><strong>CPF Registrado:</strong> {proprietario.cpf}</p>
                <p><strong>Data de Cadastro:</strong> {new Date(proprietario.createdAt).toLocaleString()}</p>
                <hr className="bg-secondary" />
                <div className="text-center">
                    <Link to="/proprietario" className="btn btn-sm btn-secondary">Voltar para Lista</Link>
                </div>
            </div>
        </div>
    );
};

export default ReadProprietario;