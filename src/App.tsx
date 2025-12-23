import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import './App.css';
import CommonLayout from './Layout/CommonLayout';

function App() {
    return (
        <div className=''>
            <CommonLayout>
                <Outlet />
            </CommonLayout>
            <Toaster position='top-right' />
        </div>
    );
}

export default App;
