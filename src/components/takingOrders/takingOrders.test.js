import { fireEvent, render} from '@testing-library/react';
import TakingOrders from './takingOrders'

import {state, handleCleaner, handleInputChange, on_change } from './mockTakingOrders'

describe('TakingOrders', () => {


    const setup = () => {
        const utils = render(<TakingOrders
            state={state}
            menuData={state.menuData}
            menuState={Object.values(state.menuState)}
            on_change={on_change}
            handleInputChange={handleInputChange}
            prices={state.totalPrices}
            handleCleaner={handleCleaner}
             />)

        const input = utils.getByTestId('a_id')
        const inputName = utils.getByPlaceholderText('Nombre del Cliente');
        const optionOne = utils.getByRole('option', {name: 'Mesas'});
        const sendButton = utils.getByRole('button', {name: 'Enviar'});
        const message = utils.getByTestId('message');
        return {
          input, inputName, optionOne, sendButton, message, utils,
          ...utils,
        }
      }
    test('Debería renderizar el menú', () => {
        const {utils} = setup();
        utils.getByText('Café americano');
        utils.getAllByText('$ 0');
    })
    test('Debería cambiar el estado al cambiar la cantidad', ()=> {
        const {input} = setup();
        fireEvent.change(input, {target: {value: '1'}});
        expect(on_change).toHaveBeenCalledTimes(1);
        expect(input.value).toBe('1');
        console.log(input.value);
        console.log(state.menuState);
    })
    test('Debería guardar el nombre del cliente al escribir en el input', ()=> {
        const {inputName} = setup();
        fireEvent.change(inputName, {target: {value: 'Maria'}});
        expect(handleInputChange).toHaveBeenCalledTimes(1);
        /* expect(inputName.value).toBe('Maria'); */
        console.log(inputName.value)
    })
    test('Debería guardar el número de mesa al seleccionar', ()=> {
        const {optionOne} = setup();
        fireEvent.select(optionOne, 0);
        expect(optionOne.selected).toBe(true);
        /* expect(handleInputChange).toHaveBeenCalledTimes(1);
        expect(inputTable.value).toBe('1');
        console.log(inputTable.value) */
    })
    test('Debería validar los campos al clickear enviar', () => {
        /* const {sendButton} =setup();
        const {message} = setup();
        const {input} = setup();
        fireEvent.change(input, {target: {value: '1'}});
        fireEvent.click(sendButton);
        expect(message.value).toBe('Por favor rellene todos los campos'); */

    })
})

