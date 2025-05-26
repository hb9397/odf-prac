import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Script from "next/script";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ODF Prac",
    description: "ODF Prac",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <link href="https://developer.geon.kr/js/oui/oui.css" rel="stylesheet"/>
            <link href="https://developer.geon.kr/smt/css/common_toolbar.css" rel="stylesheet"/>
            <link href="https://developer.geon.kr/smt/css/widgets/basemap.css" rel="stylesheet"/>
            <link href="https://developer.geon.kr/js/odf/odf.css" rel="stylesheet"/>
            <Script src="https://developer.geon.kr/js/odf/odf.min.js" strategy="beforeInteractive"/>
            <Script src="https://developer.geon.kr/js/oui/oui.min.js" strategy="beforeInteractive"/>

            {/*** 카카오, 네이버, 구글 ***/}
            {/*<Script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=9c150a88a95ea6a64ce4d8f6d383ada6" strategy="beforeInteractive"></Script>
            <Script src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=vlf2u84az9" strategy="beforeInteractive"></Script>
            <Script
                id="google-maps-loader"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: `(g => {
                                var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window;
                                b = b[c] || (b[c] = {});
                                var d = b.maps || (b.maps = {}), r = new Set(), e = new URLSearchParams(), u = () => h || (h = new Promise(async (f, n) => {
                                    await (a = m.createElement("script"));
                                    e.set("libraries", [...r] + "");
                                    for (k in g)
                                        e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
                                    e.set("callback", c + ".maps." + q);
                                    a.src = "https://maps.googleapis.com/maps/api/js?" + e;
                                    d[q] = f;
                                    a.onerror = () => h = n(Error(p + " could not load."));
                                    a.nonce = m.querySelector("script[nonce]")?.nonce || "";
                                    m.head.append(a);
                                }));
                                d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n));
                            })({
                                key: "AIzaSyCHW_Vs6mcwzRZWYpFxe1EgQ46DNDAPxeA",
                                v: "weekly"
                            });`,
                }}
            > </Script>*/}
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
