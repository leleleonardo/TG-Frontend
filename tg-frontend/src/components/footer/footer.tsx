export default function Footer() {
    return (
      <footer className="w-full bg-[#76884E] text-white px-6 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* LOGO */}
          <div>
            <img
              src="/src/assets/logo-medsync-nome.png"
              alt="Logo MedSync"
              className="h-10 rounded-md" // ou use "rounded-full" pra ficar circular
            />
          </div>
  
          {/* CONTATO */}
          <div>
            <a href="#" className="text-white hover:underline">
              CONTATO
            </a>
          </div>
  
          {/* AJUDA */}
          <div>
            <a href="#" className="text-white hover:underline">
              AJUDA
            </a>
          </div>
  
          {/* SOBRE */}
          <div>
            <a href="#" className="text-white hover:underline">
              SOBRE
            </a>
          </div>
        </div>
      </footer>
    );
  }
  