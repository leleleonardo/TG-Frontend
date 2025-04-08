import Footer from '../../components/footer/footer';
import LoginForm from '../../components/forms/form login';

function LoginPage() {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/src/assets/fundo-tela.jpg')" }}
    >
      {/* Conteúdo centralizado */}
      <div className="flex-grow flex items-center justify-center">
        <LoginForm />
      </div>

      {/* Rodapé na parte de baixo */}
      <Footer />
    </div>
  );
}

export default LoginPage;
