import React from 'react';
import Sidebar from '../ui/sidebar';
import Lend from '../ui/lend';

const Main = () => {
    return (
        <div>
            <Sidebar />
            <div className=' ml-96'>
                <Lend />
            </div>
        </div>
    );
};

export default Main;