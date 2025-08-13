import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

const Authentication = async () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header fixo no topo */}
      <Header />

      {/* Conteúdo cresce para empurrar o footer */}
      <main className="flex flex-1 flex-col gap-6 p-5">
        <Tabs defaultValue="sign-in" className="mx-auto w-full max-w-md">
          <TabsList className="bg-muted grid w-full grid-cols-2 rounded-lg">
            <TabsTrigger
              value="sign-in"
              className="data-[state=active]:bg-background data-[state=active]:text-primary w-full"
            >
              Entrar
            </TabsTrigger>
            <TabsTrigger
              value="sign-up"
              className="data-[state=active]:bg-background data-[state=active]:text-primary w-full"
            >
              Criar conta
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sign-in" className="w-full">
            <SignInForm />
          </TabsContent>
          <TabsContent value="sign-up" className="w-full">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer sempre no fim */}
      <Footer />
    </div>
  );
};

export default Authentication;
