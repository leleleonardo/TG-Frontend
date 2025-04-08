import Footer from '../../components/footer/footer';


function Home() {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/src/assets/fundo-tela.jpg')" }}
    >
      

      {/* Rodapé na parte de baixo */}
      <Footer />
    </div>
  );
}

export default Home;
