'use client'
import Image from "next/image";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

// Adicione sua chave de API aqui
const API_KEY = 'YOUR_TOMTOM_API_KEY'; // substitua pela sua chave de API

export default function Home() {
    const mapRef = useRef(null); // Ref para o mapa
    const [mapLoaded, setMapLoaded] = useState(false); // Estado para verificar se o mapa foi carregado

    useEffect(() => {
        // Função para carregar o script do TomTom
        const loadTomTomScript = () => {
            const script = document.createElement("script");
            script.src = "https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.25.0/maps/maps-web.min.js";
            script.onload = () => setMapLoaded(true); // Define o estado como carregado quando o script termina de carregar
            document.body.appendChild(script);
        };

        loadTomTomScript();
    }, []);

    useEffect(() => {
        // Inicializa o mapa quando o script é carregado
        if (mapLoaded && window.tt) {
            const map = window.tt.map({
                key: API_KEY,
                container: mapRef.current,
                center: [-46.6333, -23.5505], // Coordenadas iniciais (São Paulo)
                zoom: 12,
            });

            return () => map.remove(); // Limpa o mapa ao desmontar
        }
    }, [mapLoaded]);

    return (
        <div >
            <Head>
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.25.0/maps/maps.css"
                />
            </Head>
            <main >
                <Image

                    src="https://nextjs.org/icons/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
                <ol>
                    <li>
                        Get started by editing <code>src/app/page.js</code>.
                    </li>
                    <li>Save and see your changes instantly.</li>
                </ol>

                <div>
                    <a
                        
                        
                        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image

                            src="https://nextjs.org/icons/vercel.svg"
                            alt="Vercel logomark"
                            width={20}
                            height={20}
                        />
                        Deploy now
                    </a>
                    <a
                        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"

                    >
                        Read our docs
                    </a>
                </div>

                <div style={{ height: '400px', width: '100%', marginTop: '20px' }} ref={mapRef} /> {/* Mapa TomTom */}
            </main>
            <footer >
                <a
                    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/file.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                    />
                    Learn
                </a>
                <a
                    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/window.svg"
                        alt="Window icon"
                        width={16}
                        height={16}
                    />
                    Examples
                </a>
                <a
                    href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/globe.svg"
                        alt="Globe icon"
                        width={16}
                        height={16}
                    />
                    Go to nextjs.org →
                </a>
            </footer>
        </div>
    );
}
