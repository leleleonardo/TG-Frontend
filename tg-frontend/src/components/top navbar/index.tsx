// components/AppNavbar.tsx
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Avatar,
} from "@heroui/react";
import { useState } from "react";
import SidebarMenu from "../side-drawer";

export const MedSyncLogo = () => {
  return (
    <div className="text-white font-semibold text-sm">
      MEDSYNC
    </div>
  );
};

export default function AppNavbar() {
  const userEmail = "hidezebest@yakuza.com";
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openMenu = () => {
    console.log("Abrir menu clicado"); // 👈 Debug
    setIsDrawerOpen(true);
  };

  const closeMenu = () => {
    console.log("Fechar menu clicado"); // 👈 Debug
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* Navbar principal */}
      <Navbar
        isBordered
        isBlurred={false}
        className="bg-[#76884E] text-white px-4"
      >
        {/* Lado esquerdo: Logo + Botão do menu */}
        <NavbarContent justify="start" className="items-center gap-4">
          <NavbarBrand>
            <MedSyncLogo />
          </NavbarBrand>
          <Button variant="light" onPress={openMenu} className="text-white">
            Abrir Menu
          </Button>
        </NavbarContent>

        {/* Lado direito: Email + Avatar */}
        <NavbarContent justify="end" className="items-center gap-4">
          <NavbarItem className="text-white text-sm hidden sm:flex">
            {userEmail}
          </NavbarItem>

          <NavbarItem>
            <Avatar
              name="D"
              size="sm"
              className="bg-white text-[#76884E] font-bold"
            />
          </NavbarItem>

          <NavbarItem>
            <Button
              isIconOnly
              variant="light"
              className="text-white"
              onClick={() => console.log("Logout")}
            >
              {/* <LogOut size={20} /> */}
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Menu Lateral */}
      <SidebarMenu isOpen={isDrawerOpen} onClose={closeMenu} />
    </>
  );
}
