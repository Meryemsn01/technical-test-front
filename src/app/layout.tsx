import type { ReactNode } from "react";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import Guard from "@/components/Guard";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <QueryProvider>
          <CartProvider>
            <Header/>
            <main className="container py-6">
              <Guard>{children}</Guard>
            </main>
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
