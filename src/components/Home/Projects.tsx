import Card from '../Elements/Card'
import Xmoney from '../../assets/images/xmon.png'
import Solana from '../../assets/images/solana.png'
import {Link} from 'react-router-dom';


const Projects = () => {
    return (
        <>
            <section className='container mt-5 pt-lg-5'>

                <h1 className="text-center text-white mb-5 pb-lg-4 pt-3 ">
                    Projects

                </h1>

                <div className="row mx-0" style={{ gap: "30px 0px" }}>
                    <div className="col-lg-6">
                        <Link to="/swap" className="text-decoration-none">
                        <Card brandimg={Xmoney} increasevalue='' brand='xMoney' caps='UTK' tagline='The solution to make Open-Source as Competitive as Closed Source.' marketvalue='$0.05227' decreasevalue='- 4.17' />

                        </Link>
                    </div>
                    <div className="col-lg-6">
                        <Link to="/swap" className="text-decoration-none">
                        <Card brandimg={Solana} decreasevalue='' brand='Solana' caps='CAPS' tagline='The solution to make Open-Source as Competitive as Closed Source.' marketvalue='$0.05227' increasevalue="+4.17" />

                        </Link>
                    </div>
                    <div className="col-lg-6">
                        <Link to="/swap" className="text-decoration-none">
                            <Card brandimg={Xmoney} increasevalue='' brand='xMoney' caps='UTK' tagline='The solution to make Open-Source as Competitive as Closed Source.' marketvalue='$0.05227' decreasevalue='- 4.17' />

                        </Link>
                    </div>
                    <div className="col-lg-6">
                        <Link to="/swap" className="text-decoration-none">
                            <Card brandimg={Solana} decreasevalue='' brand='Solana' caps='CAPS' tagline='The solution to make Open-Source as Competitive as Closed Source.' marketvalue='$0.05227' increasevalue="+4.17" />

                        </Link>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Projects