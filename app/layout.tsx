import "./globals.css";
import type { Metadata } from "next";
import Providers from "././components/Providers";

export const metadata: Metadata = {
  title: "Prakriti",
  description: "Your Path to Authentic Panchakarma Healing",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
       <Providers>
       
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
