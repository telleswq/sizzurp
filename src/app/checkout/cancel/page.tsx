import { AlertTriangle, Home,RefreshCw } from "lucide-react";
import Link from "next/link";

export default function OrderFailurePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="mb-4 flex justify-center">
          <AlertTriangle className="h-16 w-16 text-[var(--primary)]" />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-neutral-900">
          Ops! Algo deu errado...
        </h1>

        <p className="mb-6 text-neutral-600">
          Não conseguimos processar seu pedido desta vez. Isso pode ter
          acontecido por instabilidade no pagamento ou na conexão. Mas não se
          preocupe, você pode tentar novamente!
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/checkout/cancel"
            className="flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-white transition hover:opacity-90"
          >
            <RefreshCw className="h-5 w-5"  />
            Tentar Novamente
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-lg bg-neutral-200 px-4 py-2 text-neutral-900 transition hover:bg-neutral-300"
          >
            <Home className="h-5 w-5" />
            Voltar à Loja
          </Link>
        </div>
      </div>
    </div>
  );
}
