import type { Metadata } from "next";
import { Montserrat, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

import { ptBR } from "date-fns/locale";

import { TawkTo } from "@/components/globals/site/TawkTo";
import { SmoothScroll } from "@/components/globals/site/SmoothScroll";

import { CookiesProvider } from "next-client-cookies/server";
import { Toaster } from "@/components/ui/toaster";
import { setDefaultOptions } from "date-fns";
import Script from "next/script";

const montserrat = Montserrat({
	subsets: ["latin"],
	display: "swap",
});

const sora = Sora({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-sora",
});

export const metadata: Metadata = {
	title: "Up Boost - Mais FPS em Jogos e Desempenho Extremo no seu PC",
	description:
		"Nós aumentamos o desempenho do seu computador para você jogar ou trabalhar com mais velocidade e eficiência. Atendimento especializado, remoto, para garantir FPS mais altos, menor input lag e temperaturas reduzidas. Seja você gamer ou profissional, estamos aqui para turbinar sua máquina.",
};

setDefaultOptions({
	locale: ptBR,
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<CookiesProvider>
			<html lang="pt-br">
				<Script id="fb-pixel" strategy="afterInteractive">
					{`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '772105574925428');
              fbq('track', 'PageView');
            `}
				</Script>
				<head>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/images/favicon/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/images/favicon/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/images/favicon/favicon-16x16.png"
					/>
					<link rel="manifest" href="/images/favicon/site.webmanifest" />
					<link
						rel="mask-icon"
						href="/images/favicon/safari-pinned-tab.svg"
						color="#ffd300"
					/>
					<meta name="msapplication-TileColor" content="#0c1019" />
					<meta name="theme-color" content="#0c1019" />
					<meta
						name="facebook-domain-verification"
						content="w3all7wufpaerij65zuy0rd8mpehxx"
					/>
				</head>
				<body className={`${montserrat.className} ${sora.variable}`}>
					<SmoothScroll>
					{children}
					</SmoothScroll>
					<Toaster />
					<noscript>
						<img
							height="1"
							width="1"
							style={{ display: "none" }}
							alt={"facebook pixel no script image"}
							src="https://www.facebook.com/tr?id=1002246091049642&ev=PageView&noscript=1"
						/>
					</noscript>
				</body>
				<Analytics />
				<TawkTo />
			</html>
		</CookiesProvider>
	);
}
