import { render, screen, getByText } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Welcome from './index';

const mockStore = configureMockStore();
const store = mockStore({ userType:"" });

describe('Welcome page renders correctly',()=>{

    it('should contain join chat button',()=>{
        render(<Provider store={store}><Welcome/></Provider>);
        expect(screen.getByText('JOIN CHAT')).toBeInTheDocument();
    });
    it('should contain Welcome in the dcument',()=>{
        render(<Provider store={store}><Welcome/></Provider>);
        expect(screen.getByText('Welcome, to public chat room.')).toBeInTheDocument();
    });

})