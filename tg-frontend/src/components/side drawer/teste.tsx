import { Button, Drawer, DrawerContent } from "@heroui/react";
import { useDisclosure } from "@heroui/react";

export default function TestDrawer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Abrir Drawer</Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="left">
        <DrawerContent className="bg-white z-[9999] p-4">
          <p>Olá, sou um menu lateral</p>
        </DrawerContent>
      </Drawer>
    </>
  );
}
