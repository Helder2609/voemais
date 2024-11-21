import { useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();

        useEffect(() => {
            const usuarioLogado = localStorage.getItem("usuarioLogado");
            if (!usuarioLogado) {
                router.push("/login"); // Redireciona para a página de login se não estiver autenticado
            }
        }, []);

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
