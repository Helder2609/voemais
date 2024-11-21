import { NextResponse } from "next/server";

export function middleware(req) {
    const usuarioLogado = req.cookies.get("usuarioLogado");

    if (!usuarioLogado && req.nextUrl.pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/comprar/:path*", "/vendas/:path*"], // Páginas protegidas
};
