import Agenda from "../../components/agenda/index";
import AppNavbar from "../../components/top navbar";

export default function AgendaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#D9D9D9]">
      {/* Navbar com botão do menu incluso */}
      <AppNavbar />

      {/* Conteúdo central que cresce conforme necessário */}
      <div className="flex-grow p-4">
        <Agenda />
      </div>

      {/* Rodapé fixado no final */}
      <footer className="bg-[#76884E] text-white text-center py-4">
        <p>&copy; 2023 MedSync. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
