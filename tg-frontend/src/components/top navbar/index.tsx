import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    Avatar,
  } from "@heroui/react";
  import { LogOut } from "lucide-react";
  
  export const MedSyncLogo = () => {
    return (
      <div className="text-white font-semibold text-sm pl-2">
        MEDSYNC
      </div>
    );
  };
  
  export default function AppNavbar() {
    const userEmail = "hidezebest@yakuza.com";
  
    return (
      <Navbar
        isBordered
        isBlurred={false}
        className="bg-[#76884E] text-white"
      >
        <NavbarBrand>
          {/* Logo da empresa */}
          <MedSyncLogo />
        </NavbarBrand>
  
        <NavbarContent justify="end" className="items-center gap-4">
          {/* Email do usuário */}
          <NavbarItem className="text-white text-sm hidden sm:flex">
            {userEmail}
          </NavbarItem>
  
          {/* Ícone do perfil */}
          <NavbarItem>
            <Avatar
              name="D"
              size="sm"
              className="bg-white text-[#76884E] font-bold"
            />
          </NavbarItem>
  
          {/* Botão de logout */}
          <NavbarItem>
            <Button
              isIconOnly
              variant="light"
              className="text-white"
              onClick={() => console.log("Logout")}
            >
              <LogOut size={20} />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    );
  }
  