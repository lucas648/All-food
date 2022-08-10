import { Routes, Route } from 'react-router-dom';
import PaginaAdmin from './paginas/administracao/PaginaAdmin';
import AdministracaoPratos from './paginas/administracao/Pratos';
import FormularioPrato from './paginas/administracao/Pratos/FormularioPratos';
import AdministracaoRestaurantes from './paginas/administracao/Restaurantes';
import FormularioRestaurante from './paginas/administracao/Restaurantes/FormularioRestaurante';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path='/admin' element={<PaginaAdmin/>}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />

        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/novo" element={<FormularioPrato />} />
        <Route path="pratos/:id" element={<FormularioPrato />} />
      </Route>
    </Routes>
  );
}

export default App;
