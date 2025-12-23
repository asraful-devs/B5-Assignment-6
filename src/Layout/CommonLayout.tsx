import type { ReactNode } from 'react';
import Footer from '../components/Components/Footer';
import Navbar from '../components/Components/Navbar';

interface IProps {
    children: ReactNode;
}

export default function CommonLayout({ children }: IProps) {
    return (
        <div className='min-h-screen flex flex-col'>
            {/* Fixed Navbar */}
            <div className='fixed top-0 left-0 right-0 z-50 w-full'>
                <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <Navbar />
                </nav>
            </div>

            {/* Main Content with padding for fixed navbar */}
            <div className='mt-16 flex-grow'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    {children}
                </div>
            </div>

            {/* Footer */}
            <div className='w-full'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
