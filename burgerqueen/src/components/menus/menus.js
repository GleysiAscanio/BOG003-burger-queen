import React, {useState} from 'react'

const Menus = (props) => {
    const {onAction} = props;
    const [style, setStyle] = useState(false);
    const bgStyle = {color: '#62EFFF'}
    const bgStyle2 = { boxShadow: '#FFFFFF'}
    const btnBreakfast = document.getElementById('breakfast');
    const btnLunch = document.getElementById('lunch');
    let saveId = '';
    //console.log('Afuera', saveId);
    
    return(
    <div>
        <button className='button-menu' id='breakfast'>
            <h3 className='menus' onClick={ () => {
                saveId = btnBreakfast.id;
                onAction(saveId);
                setStyle(!style);
            }} style={style ? bgStyle2 : bgStyle}>desayuno</h3>
        </button>
        <button className='button-menu' id='lunch'>
            <h3 className='menus' onClick={ () => {
                saveId = btnLunch.id;
                onAction(saveId);
                setStyle(!style);
            } } style={style ? bgStyle : bgStyle2}>almuerzo</h3>
        </button>
    </div>
    )

 /*    return(
        <div>
            <button className='button-menu' id='breakfast'>
                <h3 className='menus' onClick={() => onAction(name)} >desayuno, {name}</h3>
            </button>
            <button className='button-menu' id='lunch'>
                <h3 className="menus" onClick={() => onAction(name)} >almuerzo, {name} </h3>
            </button>
        </div>
        ) */
}

export default Menus