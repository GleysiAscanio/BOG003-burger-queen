import React from 'react'
import './modal.scss'
import equis from './img/equis.png'


const Modal = ({children, isOpen, closeModal}) => {
    return(
        <article className={`modal ${isOpen && 'isOpen'}`}>
            <div className='modalContainer'>
                <div className='closeContainer'>                    
                    <img className='close' onClick={closeModal} src={equis} alt='equis'/>
                </div>
                <h1>Resumen del Pedido</h1>
                <div className='childrenContainer'>
                    {/* Prop especial que permite enviarle props a ModalContent directamente desde TakingOrders*/}
                    {children}
                </div>
            </div>
        </article> 
    )
}

export default Modal