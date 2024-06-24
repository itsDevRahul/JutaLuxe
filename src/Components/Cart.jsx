import { useContext } from "react";
import MainContext from "../MainContext";
import { IoClose, IoCloseCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const { isOpen, setIsOpen, cartProducts, setCartProducts } = useContext(MainContext);
    const navigate = useNavigate();

    function calculatePrice() {
        var total = 0;
        cartProducts?.forEach(item => { total += item.product.price * item.qty });
        return total;
    }

    function delCart(pId, size) {
        if (cartProducts.length == 1) {
            localStorage.removeItem("cart");
        }
        let a = cartProducts.filter(
            (d) => {
                return d.product.id !== pId || d.size !== size;
            }
        )
        setCartProducts([...a])
    }


    function incQty(pId, size) {
        cartProducts?.map(
            (d) => {
                if (d.product.id == pId && d.size == size) {
                    d.qty++
                }
            }
        )
        setCartProducts([...cartProducts]);
    }

    function decQty(pId, size) {
        cartProducts?.map(
            (d) => {
                if (d.product.id == pId && d.size == size && d.qty > 1) {
                    d.qty--
                }
            }
        )
        setCartProducts([...cartProducts]);
    }

    function navigateToPage(page) {
        setIsOpen(false);
        setTimeout(() => {
            navigate(page);
        }, 10);
    }


    return (

        <div className={`${isOpen ? 'opacity-100' : 'invisible opacity-0'} fixed top-0 z-[60] h-full w-full bg-black/50 duration-300 `}>
            <div className={`${isOpen ? '' : 'translate-x-full'} relative bg-white h-full px-7 pt-7 sm:w-[400px] w-[350px] float-right duration-300 overflow-auto`}>
                <button onClick={() => setIsOpen(false)} className="p-2 text-3xl text-gray-500 absolute top-0 right-0"><IoClose /></button>
                <h1 className="text-2xl text-center text-gray-500 pt-2 pb-3 border-b-4 rounded">SHOPPING CART</h1>

                {
                    cartProducts.length == 0 ?
                        <div className="py-4 flex flex-col gap-4 items-center justify-center">
                            <IconBxShoppingBag className="text-gray-200 " />
                            <div className="text-gray-400 text-lg">No products in the cart.</div>
                        </div>
                        :
                        <div>
                            <div className="py-4 grid grid-cols-1 divide-y">
                                {/* Products list goes here.. */}

                                {
                                    cartProducts?.map(
                                        (d, i) => {
                                            return <Item key={i} data={d.product} qty={d.qty} size={d.size} delCart={delCart} incQty={incQty} decQty={decQty} />
                                        }
                                    )
                                }

                            </div>
                            <div className="bg-white sticky bottom-0 py-6">
                                <div className="flex justify-between items-center pb-2 border-b-2 mb-4">
                                    <h2 className="font-semibold text-xl text-gray-500">Subtotal :</h2>
                                    <h2 className="font-semibold text-lg text-gray-700">₹{calculatePrice()}
                                    </h2>
                                </div>
                                <button onClick={() => {
                                    navigateToPage('/checkout')
                                }} className="p-2 w-full bg-light-brown text-white font-semibold text-xl rounded-sm">CHECKOUT</button>
                            </div>
                        </div>
                }

                <div onClick={() => navigateToPage('/Running Shoes')} className="opacity-70 hover:opacity-100 duration-200 cursor-pointer pb-4">
                    <img src="https://i.ytimg.com/vi/IEmlz_uqXbc/maxresdefault.jpg" alt="" />
                </div>
            </div>
        </div>
    )
}

function Item({ data, qty, size, delCart, incQty, decQty }) {
    const { setIsOpen } = useContext(MainContext);
    const navigate = useNavigate();

    function navigateToProduct(id, index) {
        setIsOpen(false);
        navigate('/product/' + id + '/' + index);
    }

    return (
        <div className="flex h-[75px] my-4 pt-4">
            <div onClick={() => navigateToProduct(data.id, data.imgIndex)} className="relative cursor-pointer group h-full">
                <img src={data.image} alt="" className="h-full" />
                <div className="absolute top-0 h-full w-full bg-white/80 text-sm flex items-center justify-center group-hover:opacity-100 opacity-0 duration-300">S : {size}</div>
            </div>
            <div className="w-full ps-4 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                    <div onClick={() => navigateToProduct(data.id, data.imgIndex)} className="text-light-brown max-h-[40px] w-10/12 text-sm overflow-hidden cursor-pointer">{data.title}</div>
                    <button onClick={() => delCart(data.id, size)} className="text-3xl text-gray-400"><IoCloseCircleOutline /></button>
                </div>
                <div className="flex justify-between items-end">
                    <div className="flex items-center h-full">
                        <button onClick={() => decQty(data.id, size)} className="group rounded-l py-1 px-3 font-semibold text-gray-500 border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                            -
                        </button>
                        <input
                            type="text"
                            className="border-y border-gray-200 py-1 outline-none text-gray-500 max-w-[50px] placeholder:text-gray-500 text-center bg-transparent"
                            placeholder={qty}
                        />
                        <button onClick={() => incQty(data.id, size)} className="group rounded-r py-1 px-3 font-semibold text-gray-500 border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                            +
                        </button>
                    </div>
                    <div className="font-semibold text-gray-500">₹{data.price * qty}</div>
                </div>
            </div>
        </div>
    )
}

function IconBxShoppingBag(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="120px"
            width="120px"
            {...props}
        >
            <path d="M5 22h14c1.103 0 2-.897 2-2V9a1 1 0 00-1-1h-3V7c0-2.757-2.243-5-5-5S7 4.243 7 7v1H4a1 1 0 00-1 1v11c0 1.103.897 2 2 2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-4 3h2v2h2v-2h6v2h2v-2h2l.002 10H5V10z" />
        </svg>
    );
}

