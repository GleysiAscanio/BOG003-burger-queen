import React, {useState, useEffect} from 'react'
import './tableStatus.scss'
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import db  from "../firebase/firebaseConfig"
import { updateOrder } from '../firebase/functionsFirebase';

const Tablestatus = () => {
    // Se inicializa el estado de las mesas
        const [table, setTable] = useState()
    // Cuando se recarga la página, el useEffect conecta al app con Firestore y extrae los documentos
        useEffect(() => {         
            const callOrders = () => { 
                const orderRef = collection(db, "orders");
                // Llama los documentos en tiempo real y llena un arreglo con los mismos
                onSnapshot(query(orderRef, orderBy("table")),{includeMetadataChanges:true},(querySnapshot) => {
                    let clients = [];
                    let orders
                        querySnapshot.forEach((doc) => {
                        clients.push({...doc.data(), id: doc.id});
                    });
                    // se filtra las ordenes según el estado, se descartan los estados "Entregado"
                    orders = clients.filter((e)=> e.state !== "Entregado")
                    setTable(orders);  //se envian todas las ordenes al value del useState
                // verifica de donde se extraen los datos, de la cache o del servidor
                    const source = querySnapshot.metadata.fromCache ? "local cache" : "server";
                    console.log("Data came from " + source);  
                });           
            }
            callOrders()
        }, []); 
        
        return(
            <>
                <div className='tablesContainer'>
                    {/* Si table existe, lo  recorre y renderiza la mesa y el estado del pedido */ }
                    {table && table.map(item => 
                        <div key={item.id} className='state'>
                            <h3>Mesa {item.table.table}</h3>                            
                            <h4>Estado: {item.state}</h4>
                            {/* Se le pasa la función que actualiza el campo de estado en la orden*/}
                            <button onClick={() => updateOrder(item.id, {state:"Entregado"})}>Entregar</button>                 
                        </div>
                    )}
                </div>
            </>  
        )
    }
export default Tablestatus