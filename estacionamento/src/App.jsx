import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importações do Proprietário (Direto da pasta components)
import ListProprietario from "./components/ListProprietario.jsx";
import AddProprietario from "./components/AddProprietario.jsx";
import ReadProprietario from "./components/ReadProprietario.jsx";
import UpdateProprietario from "./components/UpdateProprietario.jsx";

// Importações do Veículo (Direto da pasta components)
import ListVeiculo from "./components/ListVeiculo.jsx";
import AddVeiculo from "./components/AddVeiculo.jsx";
import ReadVeiculo from "./components/ReadVeiculo.jsx";
import UpdateVeiculo from "./components/UpdateVeiculo.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Rotas de Gerenciamento do Proprietário */}
          <Route path="/proprietario" element={<ListProprietario />} />
          <Route path="/addProprietario" element={<AddProprietario />} />
          <Route path="/readProprietario/:id" element={<ReadProprietario />} />
          <Route path="/updateProprietario/:id" element={<UpdateProprietario />} />

          {/* Rotas de Gerenciamento do Veículo */}
          <Route path="/veiculo" element={<ListVeiculo />} />
          <Route path="/addVeiculo" element={<AddVeiculo />} />
          <Route path="/readVeiculo/:id" element={<ReadVeiculo />} />
          <Route path="/updateVeiculo/:id" element={<UpdateVeiculo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;