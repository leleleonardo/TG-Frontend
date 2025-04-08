// components/SidebarMenu.tsx
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    Avatar,
    Button,
  } from "@heroui/react";
  
  interface SidebarMenuProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  export default function SidebarMenu({ isOpen, onClose }: SidebarMenuProps) {
    return (
      <Drawer isOpen={isOpen} onOpenChange={onClose} placement="left" size="xs">
        <DrawerContent className="bg-white z-[9999]">
          <>
            <div className="flex justify-end p-2">
              <Button isIconOnly variant="light" onPress={onClose}>
                {/* Ícone de fechar comentado por enquanto */}
                {/* <X className="w-5 h-5" /> */}
                X
              </Button>
            </div>
  
            <DrawerHeader className="flex flex-col items-center gap-3 pb-2">
              <Avatar
                src="https://i.imgur.com/Zr8fLNd.jpeg"
                alt="Avatar"
                className="w-24 h-24"
                isBordered
              />
            </DrawerHeader>
  
            <DrawerBody className="px-6 pb-6">
              <ul className="flex flex-col gap-4 text-sm">
                <li className="font-medium">Hide Zebest</li>
                <li>Consultas do Dia</li>
                <li>Agenda</li>
                <li>Pacientes</li>
                <hr />
                <li>Meu Perfil</li>
                <li>Configurações</li>
              </ul>
            </DrawerBody>
          </>
        </DrawerContent>
      </Drawer>
    );
  }
  