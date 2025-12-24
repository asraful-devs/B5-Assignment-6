import { Outlet } from 'react-router';
import FAQ from '../Modules/FAQ';
import { Available } from '../Modules/Home/Available';
import Choose from '../Modules/Home/Choose';
import EasyPayment from '../Modules/Home/EasyPayment';
import { HeroSection } from '../Modules/Home/HeroSection';
import HowItWork from '../Modules/Home/HowItWork';
import LoginSection from '../Modules/Home/LoginSection';
import Review from '../Modules/Home/Review';

const HomePage = () => {
    return (
        <div className='space-y-10 '>
            <Outlet />
            <HeroSection />
            <Choose />
            <LoginSection />
            <HowItWork />
            <EasyPayment />
            <Available />
            <FAQ />
            <Review />
        </div>
    );
};

export default HomePage;
