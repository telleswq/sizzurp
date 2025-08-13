"use client";

import {
  Calendar,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Package,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { orderTable } from "@/db/schema";

interface OrdersProps {
  orders: Array<{
    id: string;
    totalPriceInCents: number;
    status: (typeof orderTable.$inferSelect)["status"];
    createdAt: Date;
    items: Array<{
      id: string;
      imageUrl: string;
      productName: string;
      productVariantName: string;
      priceInCents: number;
      quantity: number;
    }>;
  }>;
}

function formatCentsToBRL(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

const Orders = ({ orders = [] }: OrdersProps) => {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(
    new Set(["1"]),
  ); // First order expanded by default

  const toggleOrderExpansion = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const getStatusBadge = (
    status: (typeof orderTable.$inferSelect)["status"],
  ) => {
    if (status === "paid")
      return (
        <Badge className="border-emerald-200 bg-emerald-50 px-3 py-1 font-medium text-emerald-700 hover:bg-emerald-50">
          Pago
        </Badge>
      );
    if (status === "pending")
      return (
        <Badge className="border-amber-200 bg-amber-50 px-3 py-1 font-medium text-amber-700 hover:bg-amber-50">
          Pendente
        </Badge>
      );
    if (status === "canceled")
      return (
        <Badge className="border-red-200 bg-red-50 px-3 py-1 font-medium text-red-700 hover:bg-red-50">
          Cancelado
        </Badge>
      );
    return null;
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
          <Package className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          Nenhum pedido encontrado
        </h3>
        <p className="text-gray-500">
          Seus pedidos aparecerão aqui quando você fizer uma compra.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* MOBILE VERSION */}
      <div className="block space-y-4 md:hidden">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="border-0 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            <CardContent className="p-0">
              <Accordion type="single" collapsible>
                <AccordionItem value={`item-${order.id}`} className="border-0">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex flex-col gap-3 text-left">
                      <div className="flex items-center gap-3">
                        {getStatusBadge(order.status)}
                        <span className="text-sm font-semibold text-gray-900">
                          #{String(orders.indexOf(order) + 1).padStart(3, "0")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(order.createdAt).toLocaleDateString(
                            "pt-BR",
                          )}{" "}
                          às{" "}
                          {new Date(order.createdAt).toLocaleTimeString(
                            "pt-BR",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-4">
                      {order.items.map((product) => (
                        <div
                          className="flex items-center gap-4"
                          key={product.id}
                        >
                          <div className="relative">
                            <Image
                              src={product.imageUrl || "/placeholder.svg"}
                              alt={product.productName}
                              width={64}
                              height={64}
                              className="rounded-xl object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="truncate text-sm font-semibold text-gray-900">
                              {product.productName}
                            </h4>
                            <p className="mt-1 text-xs text-gray-500">
                              {product.productVariantName} • Qtd:{" "}
                              {product.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-gray-900">
                              {formatCentsToBRL(
                                product.priceInCents * product.quantity,
                              )}
                            </p>
                          </div>
                        </div>
                      ))}

                      <Separator className="my-4" />

                      <div className="space-y-3 rounded-xl bg-gray-50 p-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium text-gray-900">
                            {formatCentsToBRL(order.totalPriceInCents)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Frete</span>
                          <span className="font-medium text-emerald-600">
                            GRÁTIS
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-900">
                            Total
                          </span>
                          <span className="font-bold text-gray-900">
                            {formatCentsToBRL(order.totalPriceInCents)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* DESKTOP VERSION */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100/50 px-8 py-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Package className="h-4 w-4" />
              Número do Pedido
            </div>
            <div className="text-sm font-semibold text-gray-700">Status</div>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Calendar className="h-4 w-4" />
              Data
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <CreditCard className="h-4 w-4" />
              Pagamento
            </div>
            <div className="text-center text-sm font-semibold text-gray-700">
              Ações
            </div>
          </div>

          {/* Orders */}
          {orders.map((order, index) => (
            <div key={order.id} className="group">
              {/* Order Row */}
              <div className="grid grid-cols-5 items-center gap-4 border-b border-gray-100 px-8 py-6 transition-colors duration-200 hover:bg-gray-50/50">
                <div className="text-lg font-bold text-gray-900">
                  #{String(index + 1).padStart(3, "0")}
                </div>
                <div>{getStatusBadge(order.status)}</div>
                <div className="font-medium text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                </div>
                <div className="font-medium text-gray-600">Cartão</div>
                <div className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleOrderExpansion(order.id)}
                    className="rounded-lg px-4 py-2 font-semibold text-indigo-600 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-800"
                  >
                    Detalhes do Pedido
                    {expandedOrders.has(order.id) ? (
                      <ChevronUp className="ml-2 h-4 w-4 transition-transform duration-200" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-200" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Expanded Order Details */}
              {expandedOrders.has(order.id) && (
                <div className="animate-in slide-in-from-top-2 bg-gradient-to-b from-indigo-50/20 to-white px-8 pb-8 duration-300">
                  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    {/* Products */}
                    <div className="mb-6 space-y-4">
                      {order.items.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-4 transition-colors duration-200 hover:bg-gray-50/50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <Image
                                src={product.imageUrl || "/placeholder.svg"}
                                alt={product.productName}
                                width={80}
                                height={80}
                                className="rounded-xl border border-gray-200 object-cover shadow-sm"
                              />
                            </div>
                            <div>
                              <h4 className="mb-1 text-lg font-semibold text-gray-900">
                                {product.productName}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {product.productVariantName} • Quantidade:{" "}
                                {product.quantity}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-gray-900">
                              {formatCentsToBRL(
                                product.priceInCents * product.quantity,
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100/50 p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between text-base">
                          <span className="font-medium text-gray-600">
                            Subtotal
                          </span>
                          <span className="text-lg font-semibold text-gray-900">
                            {formatCentsToBRL(order.totalPriceInCents)}
                          </span>
                        </div>
                        <div className="flex justify-between text-base">
                          <span className="font-medium text-gray-600">
                            Transporte e Manuseio
                          </span>
                          <span className="font-semibold text-emerald-600">
                            Grátis
                          </span>
                        </div>
                        <div className="flex justify-between text-base">
                          <span className="font-medium text-gray-600">
                            Taxa Estimada
                          </span>
                          <span className="font-semibold text-gray-900">-</span>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex justify-between pt-2">
                          <span className="text-xl font-bold text-gray-900">
                            Total
                          </span>
                          <span className="text-2xl font-bold text-indigo-600">
                            {formatCentsToBRL(order.totalPriceInCents)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
