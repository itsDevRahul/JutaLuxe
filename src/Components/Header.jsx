import logo from '../images/logo.svg';
import { useContext, useEffect, useRef, useState } from "react";
import MainContext from "../MainContext";
import { Link, useNavigate } from 'react-router-dom';
import { HiMagnifyingGlass, HiOutlineUser, HiOutlineShoppingBag, HiOutlineHeart } from "react-icons/hi2";

function Header() {
    const { setIsOpen, search, searchParams, showToast, cartProducts } = useContext(MainContext);
    const inputRef = useRef();
    const [searchVisible, setSearchVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(
        () => {
            if (searchVisible) {
                inputRef.current?.focus();
            }
        }, [searchVisible]
    )

    function timeOut() {
        setTimeout(() => {
            setSearchVisible(false);
        }, 100);
    }

    return (
        <div className="w-full shadow flex justify-center bg-white/95 z-50 sticky top-0">
            <div className="container sm:px-8 px-2 flex items-center justify-between relative">
                <Link to={''}>
                    <img src={logo} alt='logo' className='sm:h-[70px] h-[50px] cursor-pointer' />
                </Link>
                <div className={`lg:w-[600px] w-8/12 lg:flex ${searchVisible ? '' : 'hidden'} lg:relative absolute top-full lg:top-auto z-50`}>
                    <div className="relative w-full">
                        <input
                            ref={inputRef}
                            defaultValue={searchParams.get('q')}
                            type="search"
                            className="block p-2.5 ps-4 w-full text-sm text-choco-brown bg-gray-100 rounded-3xl outline-none lg:shadow-none shadow-lg"
                            placeholder="Search Sports shoes, Sneakers, Cleats..."
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    search((e.target.value).trim().toLowerCase())
                                }
                            }}
                            onBlur={timeOut}
                        />
                        <button onClick={() => search((inputRef.current.value).trim().toLowerCase())}
                            type="submit"
                            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-light-brown lg:shadow-none shadow-md rounded-3xl outline-none hover:bg-brown duration-300"
                        >
                            <HiMagnifyingGlass className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className='flex sm:gap-4 gap-2'>
                    <HiMagnifyingGlass onClick={() => {
                        setSearchVisible(true);
                    }} className='sm:w-7 w-5 sm:h-7 h-5 lg:hidden cursor-pointer text-brown' />
                    <HiOutlineHeart onClick={() => showToast('Login to check your wishlist!')} className='sm:w-7 w-5 sm:h-7 h-5 lg:block hidden cursor-pointer text-brown' />
                    <div className='relative '>
                        <HiOutlineShoppingBag onClick={() => setIsOpen(true)} className='sm:w-7 w-5 sm:h-7 h-5 cursor-pointer text-brown' />
                        {
                            cartProducts.length !== 0 ?
                                <div className='absolute -top-4 -right-2 rounded-full text-brown bg-white border sm:px-2 sm:text-md px-1 text-sm'>{cartProducts.length}</div>
                                : ''
                        }

                    </div>
                    <HiOutlineUser onClick={() => navigate('/login')} className='sm:w-7 w-5 sm:h-7 h-5 cursor-pointer text-brown' />
                </div>

            </div>
        </div>
    )
}

export default Header;