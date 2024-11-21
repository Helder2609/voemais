import React, { useRef, forwardRef } from 'react';

// Componente filho que recebe uma ref como parâmetro
const InputElement = forwardRef((props, ref) => {
    return <input ref={ref} {...props} />;
});

const MeuComponente = () => {
    const inputRef = useRef(null); // Ref do input

    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div>
            <InputElement ref={inputRef} placeholder="Digite algo..." />
            <button onClick={handleFocus}>Focar no Input</button>
        </div>
    );
};

export default MeuComponente;
