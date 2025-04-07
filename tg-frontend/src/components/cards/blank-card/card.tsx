import { Card, CardBody } from "@heroui/react";
import { ReactNode } from "react";

type BlankCardProps = {
  children: ReactNode;
};

export default function BlankCard({ children }: BlankCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto shadow-md bg-white rounded-lg p-6">
      <CardBody>
        {children}
      </CardBody>
    </Card>
  );
}
