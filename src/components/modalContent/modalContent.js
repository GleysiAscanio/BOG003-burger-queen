import { createOrder } from '../firebase/functionsFirebase.js'

export const ModalContent = ({state, name, table, subtotal, quants, text, prices, comment, closeModal, handleInputChange, handleCleaner}) => {
    // Asignamos tiempo del servidor a la variable date
    const date = new Date().getTime();
    // Función que crea la orden (documento en Firebase), cierra la modal y limpia los inputs
    const handleModal = () => {
        createOrder({table}, {name}, {quants}, {text}, {subtotal}, {prices}, {comment},'Enviado', date, '', ''); 
        closeModal();
        handleCleaner();
    }       
    
        return(
            <>
            <div className='client'>
            {/*Renderizamos en la modal la mesa y el nombre del cliente */}
                <h2 className='table'>Mesa: {table}</h2>
                <h2 className='user'> Cliente: {name}</h2> 
            </div>
            {/*Recorremos el arreglo de cantidades y renderizamos cada producto con su respectivo precio y cantidad */ }
            {quants && quants.map((e, i) => {
                return <div key={i} className='productList'>
                            <h2 className='product'> <span>{e}</span>   {text[i]}</h2>
                            <p> ${subtotal[i]} </p>                         
                        </div>
            })}
            {/*Renderizamos el total a pagar */ }
            <div className='totalPrice'>
                <h2 className='total'>Total a pagar</h2>
                <p className='totalNumber'> ${prices} </p>
            </div>
            {/*Renderizamos el área para insertar comentarios y los guardamos en el estado global */}
            <textarea placeholder='¿Tiene comentarios para cocina?' name='comment' value={state.comment} onChange={e => handleInputChange(e)}>
                
            </textarea>
            {/* Le pasamos la función handleModal al botón de confirmar pedido */ }
            <button onClick={handleModal}>Confirmar Pedido</button>           
            </>
        )
}  

