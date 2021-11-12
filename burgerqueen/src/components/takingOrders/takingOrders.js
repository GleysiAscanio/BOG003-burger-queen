import React from 'react'
import './takingOrders.scss'
import Modal from '../modal/modal.js'
import { useModal } from '../../hooks/useModal'
import { ModalContent } from '../modalContent/modalContent.js'
import '../modal/modal.scss'




const Takingorders = ({state, on_change, handleInputChange, handleCleaner}) => {

    let text=[], subtotal=[], cant, name, table, quants 
        let message = document.getElementById('message')
        name = state.name;
        table = state.table;
        const keys = Object.entries(state.menuState); // Para obtener arreglo con las propiedades
        quants = keys.filter((key)=> key[1] !== '0'); // Para obtener los productos (key) que pidió el cliente
        cant  = quants.map((e)=> e[1]); 
        const letras = quants.map((e)=> e[0]);  // Para obtener solo las keys 
        for (let i=0; i < letras.length; i++){ // ciclo que recorre las keys de los productos seleccionados
            for (let j=0; j< state.menuData.length; j++){  // Ciclo anidado que recorre cada elemento del menú 
                if (state.menuData[j].key === letras[i]){  // Validar si la key actual es igual a alguna de las que tiene el menú
                    text.push(state.menuData[j].producto); // Si se cumple la condición anterior, extraemos el nombre de ese producto
                    subtotal.push(parseInt(quants[i][1])*parseInt(state.menuData[j].precio)); // obtenemos el precio total del producto actual 
                }
            }
        }
        // Se declara la modal en False, para que no se muestre.
        const [isOpenModal, openModal, closeModal] = useModal(false); 
        
        /* se crea condicionales para que se valide si se llenaron todos los campos de orden y se 
         la modal.*/
        const validationOrder =() => {
            if (message === null) {
            alert('No has hecho un pedido')
            handleCleaner();        
            }else if (table === '' || name === ''){
            message.innerHTML= `Por favor rellene todos los campos`        
            } else {
            openModal()
        }
    }

    return (
        <>
        <section>
                <div className="infoTable">
                    {/* Evento del select, toma el nombre y el valor de la mesa. */}
                    <select id='selectTable' onChange= {e => handleInputChange(e)} name='table' value = {state.table}>
                        <option value='0'>Mesas</option>
                        <option value='1'>Mesa 1</option>
                        <option value='2'>Mesa 2</option>
                        <option value='3'>Mesa 3</option>
                        <option value='4'>Mesa 4</option>
                        <option value='5'>Mesa 5</option>
                        <option value='6'>Mesa 6</option>
                    </select>
                    {/* Se toma el valor del nombre del cliente */}
                    <input 
                        className="nameUser"
                        id='nameUser'
                        name='name'
                        type="text"
                        placeholder="Nombre del Cliente"
                        value = {state.name}
                        onChange = {e => handleInputChange(e)}
                    />
                </div>
                <p id='message' data-testid='message' className='message'></p>
                {/* Se recorre la data por cada key y se traen los valores de cada producto del menú*/}
                {state.menuData.map((item, i) => 
                <div key={i} className='orderContainer'>
                    <input 
                            type="number" 
                            id={item["key"] + "_id"}
                            data-testid={item["key"] + "_id"}
                            name={item["key"]} // Se le asigna el valor de la key de la data
                            value={state.menuState[item["key"]]} 
                            step="1" 
                            min="0"
                            onChange = {on_change}
                    />
                    <h6>{item.producto}</h6>
                        {/* Se multiplica el valor de la key, que es la cantidad actual de ese producto 
                        por el precio almacenado en la data*/}
                    <p> $ {parseInt(state.menuState[item["key"]])*parseInt(item["precio"])}</p>
                </div>
                )}
                <div className="totalContainer">
                        <p>Total: </p>
                    <div>
                        <p>$ {state.totalPrices}</p>
                    </div>
                </div>
                <div className="divBton">
                <button className="btnOrders" onClick = { () =>{ validationOrder(); } }>Enviar</button>
                </div>
        </section> 
        {/*Se le envia a Modal las props de abrir y cerrar modal*/}
        <Modal isOpen ={isOpenModal} closeModal={closeModal}>
            {/*Se le envia a ModalContent las props de todos los datos de la orden, cerrar la modal, 
            limpiar todos los campos*/}
                    <ModalContent
                    state={state}
                    table={table}
                    name={name}
                    quants={cant}
                    text={text}
                    subtotal={subtotal}
                    prices={state.totalPrices}
                    comment={state.comment}
                    closeModal={closeModal}
                    handleInputChange={handleInputChange}
                    handleCleaner={handleCleaner}
                    />
        </Modal>
        
        </> 
    )
}

export default Takingorders