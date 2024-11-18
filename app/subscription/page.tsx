import { auth } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import AcquirePlanButton from "./_components/acquire-plan-button";

const SubscriptionPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold">Assinatura</h1>
      </div>
      <div className="flex gap-6">
        <Card className="w-[450px]">
          <CardHeader className="border-b border-solid py-8">
            <h2 className="text-center text-2xl font-semibold">Plano Básico</h2>
            <div className="item-center flex justify-center gap-3">
              <span className="text-4xl">R$</span>
              <span className="text-6xl font-semibold">0</span>
              <span className="text-2xl text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 py-8">
            <div className="flex items-center gap-2">
              <CheckIcon className="text-income" />
              <p>Apenas 10 transações por mês (7/10)</p>
            </div>

            <div className="flex items-center gap-3">
              <XIcon />
              <p>Relatórios de IA</p>
            </div>
          </CardContent>
        </Card>

        <Card className="w-[450px]">
          <CardHeader className="border-b border-solid py-8">
            <h2 className="text-center text-2xl font-semibold">Plano Pro</h2>
            <div className="item-center flex justify-center gap-3">
              <span className="text-4xl">R$</span>
              <span className="text-6xl font-semibold">10</span>
              <span className="text-2xl text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 py-8">
            <div className="flex items-center gap-2">
              <CheckIcon className="text-income" />
              <p>Transações ilimitada</p>
            </div>

            <div className="flex items-center gap-3">
              <CheckIcon className="text-income" />
              <p>Relatórios de IA</p>
            </div>

            <AcquirePlanButton />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SubscriptionPage;
