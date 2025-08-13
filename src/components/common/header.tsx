"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, Separator } from "@radix-ui/react-dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import {
  ChevronDown,
  ClockIcon,
  LogInIcon,
  LogOutIcon,
  Mail,
  MailIcon,
  MenuIcon,
  MessageCircle,
  MessageSquareIcon,
  Package,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Cart } from "./cart";



export const Header = () => {
  const { data: session } = authClient.useSession();
const navigationItems = [
  { name: "Camisetas", href: "/camisetas" },
  { name: "Bermudas & Shorts", href: "/bermudas-shorts" },
  { name: "Calças", href: "/calcas" },
  { name: "Jaquetas & Moletons", href: "/jaquetas-moletons" },
  { name: "Tênis", href: "/tenis" },
  { name: "Acessórios", href: "/acessorios" },
];

  return (
    <header className="bg-white">
      <div className="hidden md:block">
        <div className="bg-primary flex items-center justify-center gap-2 py-1 text-sm text-white">
          <Package className="h-4 w-4" />
          <span>Frete grátis para o Brasil todo.</span>
        </div>

        {/* Linha principal */}
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-[44px] py-3">
          {/* Busca */}
          <div className="flex flex-1 items-center">
            <div className="flex w-full max-w-[320px] items-center rounded-full bg-gray-100 px-3 py-2">
              <input
                type="text"
                placeholder="Digite o que você procura"
                className="flex-1 bg-transparent text-sm outline-none"
              />
              <SearchIcon className="h-4 w-4 text-gray-500" />
            </div>
          </div>

          {/* Logo centralizada */}
          <div className="mx-8 flex-shrink-0">
            <Link href="/">
              <Image src="/logo.png" alt="SIZZURP" width={150} height={26.14} />
            </Link>
          </div>

          {/* Ícones e login */}
          <div className="flex flex-1 items-center justify-end gap-6">
            <HoverCard>
              <HoverCardTrigger className="flex cursor-pointer items-center gap-1">
                <Image
                  src="/bate-papo-online.png"
                  alt="Central de Atendimento"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />{" "}
                Central de Atendimento
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </HoverCardTrigger>

              <HoverCardContent className="w-64 rounded-md border border-gray-200 bg-white p-4 shadow-lg">
                {/* WhatsApp */}
                <div className="mb-3 flex items-center gap-2">
                  <Image
                    src="/whatsapp.png"
                    alt="WhatsApp"
                    width={20}
                    height={20}
                  />
                  <div>
                    <p className="text-sm font-semibold">Estamos no WhatsApp</p>
                    <a
                      href="https://wa.me/5548988214440"
                      className="text-lg font-bold text-green-600"
                    >
                      (48) 98821-4440
                    </a>
                    <p className="text-xs text-gray-500">Suporte WhatsApp</p>
                  </div>
                </div>

                <hr className="my-2 border-gray-200" />

                {/* Email */}
                <div className="mb-3 flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  <div>
                    <p className="text-sm font-semibold">Envie uma mensagem</p>
                    <a
                      href="mailto:atendimento@sizzurp.com"
                      className="font-medium text-black"
                    >
                      atendimento@gmail.com
                    </a>
                    <p className="text-xs text-gray-500">Suporte E-mail</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            {/* Login / Olá */}
            <div className="flex items-center gap-1">
              <UserIcon className="h-4 w-4" />
              {session?.user ? (
                <span className="text-sm font-semibold">
                  Olá, {session.user.name?.split(" ")[0] || "Usuário"}!
                </span>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-sm font-normal text-gray-600"
                  asChild
                >
                  <Link href="/authentication">Faça login</Link>
                </Button>
              )}
            </div>

            {/* Carrinho */}
            <Cart />
          </div>
        </div>
        {/* Menu de categorias */}
        <div className="border-t border-gray-200">
          <div className="mx-auto flex w-full max-w-[1440px] justify-center gap-6 px-[44px] py-2 text-sm">
            {navigationItems.map((item) => (
              <span
                key={item.name}
                className="cursor-pointer text-gray-600 hover:text-black"
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-5 md:hidden">
        <Link href="/">
          <Image src="/logo.png" alt="SIZZURP" width={100} height={26.14} />
        </Link>

        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="max-h-screen w-[300px] overflow-y-auto p-0"
            >
              <div className="p-5">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                <div className="mt-4 flex-1 space-y-4 overflow-y-auto px-3">
                  {session?.user ? (
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={session?.user?.image as string | undefined}
                          />
                          <AvatarFallback>
                            {session?.user?.name?.split(" ")?.[0]?.[0]}
                            {session?.user?.name?.split(" ")?.[1]?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">
                            {session?.user?.name}
                          </h3>
                          <span className="text-muted-foreground block text-xs">
                            {session?.user?.email}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => authClient.signOut()}
                      >
                        <LogOutIcon />
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-4 flex items-center justify-between">
                      <h2 className="font-semibold">Olá. Faça seu login!</h2>
                      <Button size="sm" className="gap-2" asChild>
                        <Link href="/authentication">
                          <LogInIcon size={16} />
                          Login
                        </Link>
                      </Button>
                    </div>
                  )}

                  <hr className="my-4" />

                  <nav className="space-y-3">
                    <Link
                      href="/"
                      className="hover:text-primary flex items-center gap-2"
                    >
                      <Image
                        src="/house.svg"
                        alt="Início"
                        width={20}
                        height={20}
                      />
                      Início
                    </Link>
                    <Link
                      href={session?.user ? "/my-orders" : "/authentication"}
                      className="hover:text-primary flex items-center gap-2"
                    >
                      <Image
                        src="/truck.svg"
                        alt="Meus Pedidos"
                        width={20}
                        height={20}
                      />
                      Meus Pedidos
                    </Link>
                  </nav>

                  <hr className="my-4" />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Cart />
        </div>
      </div>
    </header>
  );
};

export default Header;
