import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Menu from './menus'

test('renders content', () => {
    const component = render(<Menu />)
    component.getAllByAltText('Sandwich');
})