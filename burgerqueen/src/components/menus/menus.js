import React, {useState} from 'react'
import Hamburguesa from './img/Hamburguesa.webp'
import Sandwich from './img/Sandwich.webp'
import './menus.scss'

const Menus = ({dispatch, actionA, actionB}) => {
    // Se iniacializa el useState
    const [style, setStyle] = useState(true);
    // Se declaran dos estilos según el caso
    const bgStyle = {color: '#62EFFF'}
    const bgStyle2 = { boxShadow: 'inset 2px 4px 50px 50px rgba(255,255,255,0.52)'}
    return (
    <div className='menuContainer'>
        {/* A los botones  se les asigna un evento click que llama el dispatch con el caso ActionA o ActionB
         y alterna el estilo, aplicando el bgStyle o bgStyle2 según el operador ternario */}
        <img src={Sandwich} alt='Sandwich' onClick = { (e) => { dispatch({type:actionA}) ; setStyle(!style) }}style={style ? bgStyle2 : bgStyle}/>

        <img src={Hamburguesa} alt='burguer' onClick = { (e) => { dispatch({type:actionB}) ; setStyle(!style) }}style={style ? bgStyle : bgStyle2}/>
    </div>
    )
}

export default Menus