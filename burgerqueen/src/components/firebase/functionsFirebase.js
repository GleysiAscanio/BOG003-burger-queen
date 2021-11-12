import { collection, addDoc, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import db from './firebaseConfig';

// función que crea los documentos  de las ordenes.
export const createOrder = async (table, name, quant, product, subtotal, prices, comment, state, date, tempInit, tempEnd) => {
    return await addDoc(collection(db, 'orders'), {
        table,
        name,
        quant,
        product,
        subtotal,
        prices,
        comment,
        state,
        date,
        tempInit,
        tempEnd,
    })
}
// función que obtiene la colección de documentos.
export const getOrders =  async () => {
    return await getDocs(collection(db, 'orders'));
}
// función que obtiene el id de cada documento.
export const getOrder = async (id) => {
    const docRef = doc(db, "orders", id);
    return await getDoc(docRef);
}
// función que obtiene el id y el estado de el documento.
export const updateOrder = async (id, state) => {
    const docRef = doc(db, "orders", id);
    return await updateDoc(docRef, state)
} 

