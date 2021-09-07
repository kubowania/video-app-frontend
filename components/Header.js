import Image from 'next/image'
import logo from '../public/logo.png'
const Header = () => {

    return (
        <div className="header">
            <Image src={logo} alt="Ania's Logo" width={80} height={60}/>
        </div>
    )
}

export default Header