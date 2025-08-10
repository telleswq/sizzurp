"use client";

import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { authClient } from "@/lib/auth-client";

import Clothes from "../menu/clothes";
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
  return (
    <header className="flex items-center justify-between p-5">
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
                        <h3 className="font-semibold">{session?.user?.name}</h3>
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
                    href="/orders"
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
                  <Link
                    href="/cart"
                    className="hover:text-primary flex items-center gap-2"
                  >
                    <Image
                      src="/shopping-bag.svg"
                      alt="Sacola"
                      width={20}
                      height={20}
                    />
                    Sacola
                  </Link>
                </nav>

                <hr className="my-4" />

                {/* Categorias */}
                <Accordion type="multiple" className="w-full font-medium">
                  {/* Roupas */}
                  <AccordionItem value="roupas">
                    <AccordionTrigger>Roupas</AccordionTrigger>
                    <AccordionContent className="space-y-2 pl-4">
                      <Link
                        href="/camisetas"
                        className="hover:text-primary block"
                      >
                        Camisetas
                      </Link>
                      <Link
                        href="/jaquetas"
                        className="hover:text-primary block"
                      >
                        Jaquetas & Moletons
                      </Link>
                      <Link href="/shorts" className="hover:text-primary block">
                        Shorts
                      </Link>
                      <Link href="/calcas" className="hover:text-primary block">
                        Calças
                      </Link>
                      <Link
                        href="/cuecas-meias"
                        className="hover:text-primary block"
                      >
                        Cuecas / Meias
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                  {/* Sneakers */}
                  <AccordionItem value="sneakers">
                    <AccordionTrigger>Sneakers</AccordionTrigger>
                    <AccordionContent className="pl-4">
                      {/* Nike */}
                      <AccordionItem value="nike">
                        <AccordionTrigger>Nike</AccordionTrigger>
                        <AccordionContent className="space-y-2 pl-4">
                          <Link
                            href="/nike/air-force"
                            className="hover:text-primary block"
                          >
                            Air Force
                          </Link>
                          <Link
                            href="/nike/air-max-tn-plus"
                            className="hover:text-primary block"
                          >
                            Air Max TN Plus
                          </Link>
                          <Link
                            href="/nike/air-max-95"
                            className="hover:text-primary block"
                          >
                            Air Max 95
                          </Link>
                          <Link
                            href="/nike/air-max-dn"
                            className="hover:text-primary block"
                          >
                            Air Max DN
                          </Link>
                          <Link
                            href="/nike/dunk"
                            className="hover:text-primary block"
                          >
                            Dunk
                          </Link>
                          <Link
                            href="/nike/nike-shox"
                            className="hover:text-primary block"
                          >
                            Nike Shox
                          </Link>
                          <Link
                            href="/nike/nike-shox-tl"
                            className="hover:text-primary block"
                          >
                            Nike Shox TL (12 Molas)
                          </Link>
                          <Link
                            href="/nike/uptempo"
                            className="hover:text-primary block"
                          >
                            Uptempo
                          </Link>
                          <Link
                            href="/nike/vomero-5"
                            className="hover:text-primary block"
                          >
                            Vomero 5
                          </Link>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Jordan */}
                      <AccordionItem value="jordan">
                        <AccordionTrigger>Jordan</AccordionTrigger>
                        <AccordionContent className="space-y-2 pl-4">
                          <Link
                            href="/jordan/jordan-1-low"
                            className="hover:text-primary block"
                          >
                            Jordan 1 Low
                          </Link>
                          <Link
                            href="/jordan/jordan-1-high"
                            className="hover:text-primary block"
                          >
                            Jordan 1 High
                          </Link>
                          <Link
                            href="/jordan/jordan-3"
                            className="hover:text-primary block"
                          >
                            Jordan 3
                          </Link>
                          <Link
                            href="/jordan/jordan-4"
                            className="hover:text-primary block"
                          >
                            Jordan 4
                          </Link>
                          <Link
                            href="/jordan/jordan-6"
                            className="hover:text-primary block"
                          >
                            Jordan 6
                          </Link>
                          <Link
                            href="/jordan/jordan-11"
                            className="hover:text-primary block"
                          >
                            Jordan 11
                          </Link>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Adidas */}
                      <AccordionItem value="adidas">
                        <AccordionTrigger>Adidas</AccordionTrigger>
                        <AccordionContent className="space-y-2 pl-4">
                          <Link
                            href="/adidas/yeezy-350-v2"
                            className="hover:text-primary block"
                          >
                            Yeezy 350 v2
                          </Link>
                          <Link
                            href="/adidas/yeezy-380"
                            className="hover:text-primary block"
                          >
                            Yeezy 380
                          </Link>
                          <Link
                            href="/adidas/yeezy-500"
                            className="hover:text-primary block"
                          >
                            Yeezy 500
                          </Link>
                          <Link
                            href="/adidas/yeezy-700"
                            className="hover:text-primary block"
                          >
                            Yeezy 700
                          </Link>
                          <Link
                            href="/adidas/foam-runner"
                            className="hover:text-primary block"
                          >
                            Foam Runner
                          </Link>
                          <Link
                            href="/adidas/yeezy-slide"
                            className="hover:text-primary block"
                          >
                            Yeezy Slide
                          </Link>
                          <Link
                            href="/adidas/campus-00"
                            className="hover:text-primary block"
                          >
                            Campus 00
                          </Link>
                          <Link
                            href="/adidas/bad-bunny"
                            className="hover:text-primary block"
                          >
                            Bad Bunny
                          </Link>
                        </AccordionContent>
                      </AccordionItem>

                      {/* New Balance */}
                      <AccordionItem value="new-balance">
                        <AccordionTrigger>New Balance</AccordionTrigger>
                        <AccordionContent className="space-y-2 pl-4">
                          <Link
                            href="/new-balance/9060"
                            className="hover:text-primary block"
                          >
                            New Balance 9060
                          </Link>
                          <Link
                            href="/new-balance/530"
                            className="hover:text-primary block"
                          >
                            New Balance 530
                          </Link>
                          <Link
                            href="/new-balance/550"
                            className="hover:text-primary block"
                          >
                            New Balance 550
                          </Link>
                          <Link
                            href="/new-balance/1000"
                            className="hover:text-primary block"
                          >
                            New Balance 1000
                          </Link>
                          <Link
                            href="/new-balance/1906a"
                            className="hover:text-primary block"
                          >
                            New Balance 1906A
                          </Link>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Golden Goose */}
                      <AccordionItem value="golden-goose">
                        <AccordionTrigger>Golden Goose</AccordionTrigger>
                        <AccordionContent className="space-y-2 pl-4">
                          <Link
                            href="/golden-goose/super-star"
                            className="hover:text-primary block"
                          >
                            Super-Star
                          </Link>
                          <Link
                            href="/golden-goose/ball-star"
                            className="hover:text-primary block"
                          >
                            Ball Star
                          </Link>
                          <Link
                            href="/golden-goose/stardan"
                            className="hover:text-primary block"
                          >
                            Stardan
                          </Link>
                          <Link
                            href="/golden-goose/purestar"
                            className="hover:text-primary block"
                          >
                            Purestar
                          </Link>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Marcas sem submenu */}
                      <div className="mt-2 space-y-2">
                        <Link
                          href="/balenciaga"
                          className="hover:text-primary block"
                        >
                          Balenciaga
                        </Link>
                        <Link
                          href="/louis-vuitton"
                          className="hover:text-primary block"
                        >
                          Louis Vuitton
                        </Link>
                        <Link
                          href="/off-white"
                          className="hover:text-primary block"
                        >
                          Off-White
                        </Link>
                        <Link
                          href="/amiri"
                          className="hover:text-primary block"
                        >
                          Amiri
                        </Link>
                        <Link href="/bape" className="hover:text-primary block">
                          Bape
                        </Link>
                        <Link
                          href="/maison-mihara"
                          className="hover:text-primary block"
                        >
                          Maison Mihara
                        </Link>
                        <Link href="/dior" className="hover:text-primary block">
                          Dior
                        </Link>
                        <Link
                          href="/lanvin-curb"
                          className="hover:text-primary block"
                        >
                          Lanvin Curb
                        </Link>
                        <Link
                          href="/gucci"
                          className="hover:text-primary block"
                        >
                          Gucci
                        </Link>
                        <Link
                          href="/alexander-mcqueen"
                          className="hover:text-primary block"
                        >
                          Alexander McQueen
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Acessórios */}
                  <AccordionItem value="acessorios">
                    <AccordionTrigger>Acessórios</AccordionTrigger>
                    <AccordionContent>
                      <Link href="#" className="hover:text-primary block">
                        Acessórios Colecionáveis
                      </Link>
                      <Link href="#" className="hover:text-primary block">
                        Bags / Bolsas / Mochilas
                      </Link>
                      <Link href="#" className="hover:text-primary block">
                        Bonés
                      </Link>
                      <Link href="#" className="hover:text-primary block">
                        Carteiras
                      </Link>
                      <Link href="#" className="hover:text-primary block">
                        Cintos
                      </Link>
                      <Link href="#" className="hover:text-primary block">
                        Óculos
                      </Link>
                      <Link href="#" className="hover:text-primary block">
                        Jóias
                      </Link>
                      <Link href="#" className="hover:text-primary block">
                        Toucas
                      </Link>
                      <Link href="#" className="hover:text-primary block">
                        Balaclavas
                      </Link>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Conjuntos */}
                  <AccordionItem value="conjuntos">
                    <AccordionTrigger>Conjuntos</AccordionTrigger>
                  </AccordionItem>

                  {/* Relógios */}
                  <AccordionItem value="relogios">
                    <AccordionTrigger>Relógios</AccordionTrigger>
                  </AccordionItem>

                  {/* Marcas */}
                  <AccordionItem value="marcas">
                    <AccordionTrigger>Marcas</AccordionTrigger>
                    <AccordionContent>
                      {[
                        "Adidas",
                        "Amiri",
                        "Arc'teryx",
                        "Balenciaga",
                        "Bape",
                        "Cactus Jack",
                        "Casablanca",
                        "Chrome Hearts",
                        "Corteiz",
                        "Denim Tears",
                        "Essentials / Fear of God",
                        "Gucci",
                        "Hellstar",
                        "Jordan",
                        "Lacoste",
                        "Louis Vuitton",
                        "Minus Two",
                        "Moncler",
                        "Nike",
                        "Nocta",
                        "Oakley",
                        "Off-White",
                        "Palm Angels",
                        "Rhude",
                        "Supreme",
                        "SP5DER",
                        "Stussy",
                        "Syna World",
                        "Trapstar",
                        "Vlone",
                      ].map((marca) => (
                        <Link
                          key={marca}
                          href="#"
                          className="hover:text-primary block"
                        >
                          {marca}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <Cart />
      </div>
    </header>
  );
};
