import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import db  from "../firebase/firebaseConfig"
import { useEffect, useState} from "react";
import '../kitchen/kitchen.scss'
import { updateOrder } from "../firebase/functionsFirebase";

const Kitchen = () => {
        //Se actualiza el documento en su estado y el tiempo inicial de preparación de la orden
    const handleUpdateInit = (id, state_, temp1) => {
        updateOrder(id, {
            state: state_,
            tempInit: temp1
        });
    }
        //Se actualiza el documento en su estado y el tiempo final de preparación de la orden
    const handleUpdateEnd = (id, state_, temp2) => {
        updateOrder(id, {
            state: state_,
            tempEnd: temp2
        });
    }
    const [value, setValue] = useState();
    useEffect(() => {         
        const callOrders = () => {
            const orderRef = collection(db, "orders"); 
            /* se ordena los documentos por fecha en orden descendente y se activa el escucha de algún 
            cambio, cuando no hay conexión a internet*/
            onSnapshot(query(orderRef, orderBy("date", "desc")),{includeMetadataChanges:true},(querySnapshot) => {
                let clients = []
                let orders
                    querySnapshot.forEach((doc) => {
                    clients.push({...doc.data(), id: doc.id});
                });
                // se filtra las ordenes según el estado, se descartan los estados "Entregado"
                orders = clients.filter((e) =>  e.state !== "Entregado");
                setValue(orders); //se envian todas las ordenes al value del useState
                // verifica de donde se extraen los datos, de la cache o del servidor
                const source = querySnapshot.metadata.fromCache ? "local cache" : "server";
                console.log("Kitchen Data came from " + source);
            });           
        }
        callOrders()
    }, []);  
    return(
        <>
            <div className='orderkitchens'>
                {/*Si hay un valor en el estado, se procede a recorrerlo y se extraen los valores*/}
                {value && value.map(item => 
                    <div key={item.id} className='orderSummary'> {/*la key es el id del documento*/}
                        <h1>Mesa {item.table.table}: {item.name.name}</h1>{/*se extrae la mesa y el 
                        nombre del cliente*/}
                        {item.quant.quants.map((quant, i )=> //se recorre el arreglo de quants
                            <div key={i} className='products'>
                                <h4>{quant}</h4> {/*Se extrae la cantidad*/}
                                <h3>{item.product.text[i]}</h3> {/*Se extrae el producto*/}
                            </div>
                            )}
                            <div className='kitchenComment'>
                                *{item.comment.comment} {/*Se extrae el comentario a la cocina*/}
                            </div> 
                            <div className="btnKitchen"> 
                        {/*Según el estado del Pedido se actualiza los botones ó el mensaje de preparación*/}
                    {(() => {switch (item.state) {
                        case 'Enviado':
                            //Botón de "en proceso" toma el tiempo en que se comienza a preparar la orden
                            return <button className='btnReceived' onClick={()=> handleUpdateInit(item.id, 'En proceso', new Date().getMinutes())}>Preparar</button>
                        case 'En proceso':
                            //Botón de "Listo" toma el tiempo en que se termina de preparar la orden
                            return <button className='btnReady' onClick={()=> handleUpdateEnd(item.id, 'Listo', new Date().getMinutes())}>Listo</button>
                        case 'Listo':
                            //Se agrega un mensaje donde de toma el tiempo final y se le resta al tiempo de inicio.
                            return <p>¡Tardaste {Math.abs(item.tempEnd-item.tempInit)} Minutos en preparar la orden!</p>
                        default:
                            break;
                    }})()}    
                        </div>          
                    </div>
                )}
            </div>
        </>  
    )
}

export default Kitchen