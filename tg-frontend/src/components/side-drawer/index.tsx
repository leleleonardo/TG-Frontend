// components/SidebarMenu.tsx
import {
  Modal,
  ModalContent,
  Avatar,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom"; // ← IMPORTANTE

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SidebarMenu({ isOpen, onClose }: SidebarMenuProps) {
  const navigate = useNavigate(); // ← INSTÂNCIA DO HOOK

  const handleGoToAgenda = () => {
    onClose();           // Fecha o menu
    navigate("/agenda"); // Navega para a página de agenda
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      backdrop="opaque"
      classNames={{
        wrapper: "fixed top-0 left-0 h-screen w-[260px] z-[1000] p-0 m-0",
        backdrop: "bg-black/40 z-[900]",
      }}
      motionProps={{
        variants: {
          enter: {
            x: 0,
            opacity: 1,
            transition: {
              duration: 0.25,
              ease: "easeOut",
            },
          },
          exit: {
            x: -260,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent className="h-full rounded-none bg-[#f4f4f4] p-4 flex flex-col justify-start items-start gap-6">
        <>
          {/* Botão de fechar */}
          <div className="self-end">
            <Button isIconOnly variant="light" onPress={onClose} className="bg-[#76884E]">
              ✕
            </Button>
          </div>

          {/* Avatar */}
          <div className="w-full flex justify-center">
            <Avatar
              isBordered
              radius="full"
              className="w-20 h-20"
              src="https://ui-avatars.com/api/?name=Hide+Zebest&background=0D8ABC&color=fff"
            />
          </div>

          {/* Menu */}
          <ul className="flex flex-col w-full gap-3 text-base px-2 text-zinc-800">
            <li className="font-semibold">Hide Zebest</li>
            <li className="hover:font-semibold cursor-pointer">Consultas do Dia</li>
            <li
              onClick={handleGoToAgenda}
              className="hover:font-semibold cursor-pointer"
            >
              Agenda
            </li>
            <li className="hover:font-semibold cursor-pointer">Pacientes</li>
            <hr className="my-2" />
            <li className="hover:font-semibold cursor-pointer">Meu Perfil</li>
            <li className="hover:font-semibold cursor-pointer">Configurações</li>
          </ul>
        </>
      </ModalContent>
    </Modal>
  );
}
