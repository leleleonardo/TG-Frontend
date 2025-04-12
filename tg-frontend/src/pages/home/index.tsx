import AppNavbar from "../../components/top navbar";


export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-cover bg-center bg-no-repeat bg-[#D9D9D9]">
      {/* Navbar com botão do menu incluso */}
      <AppNavbar />

      {/* Conteúdo centralizado */}
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">Bem-vindo à MedSync!</h1>
       
      </div>

      {/* Rodapé */}
      <footer className="bg-[#76884E] text-white text-center py-4">
        <p>&copy; 2023 MedSync. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
