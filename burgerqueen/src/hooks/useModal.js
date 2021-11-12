import { useState } from 'react';

export const useModal = (initialValue=false) => {
    // Se personaliza un useState para manipular el estado de la modal (permite mostrarla y ocultarla)
    const [isOpen, setIsOpen] = useState(initialValue);
    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)
    return[isOpen, openModal, closeModal]
}