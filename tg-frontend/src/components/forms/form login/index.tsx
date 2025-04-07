import React from "react";
import { Form, Input, Button } from "@heroui/react";
import BlankCard from "../../cards/blank-card/card";

export default function LoginForm() {
  const [action, setAction] = React.useState<string | null>(null);

  return (
    <BlankCard>
      <Form
        className="flex flex-col items-center gap-6 w-full max-w-sm px-4" // centraliza tudo dentro do Card
        onReset={() => setAction("reset")}
        onSubmit={(e) => {
          e.preventDefault();
          const data = Object.fromEntries(new FormData(e.currentTarget));
          setAction(`submit ${JSON.stringify(data)}`);
        }}
      >
        <div className="w-full">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email:
          </label>
          <Input
            isRequired
            id="email"
            name="email"
            type="email"
            placeholder="Digite seu email"
            className="bg-white rounded-lg w-full"
            classNames={{
              input: "bg-white rounded-lg",
            }}
          />
        </div>

        <div className="w-full">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Senha:
          </label>
          <Input
            isRequired
            id="password"
            name="password"
            type="password"
            placeholder="Digite sua senha"
            className="bg-white rounded-lg w-full"
            classNames={{
              input: "bg-white rounded-lg",
            }}
          />
        </div>

        <Button
          type="submit"
          className="bg-[#76884E] text-white w-full rounded-lg"
        >
          Acessar
        </Button>

        {action && (
          <div className="text-sm text-default-500 text-center">
            Action: <code>{action}</code>
          </div>
        )}
      </Form>
    </BlankCard>
  );
}
