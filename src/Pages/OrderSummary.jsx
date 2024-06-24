import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderSummary() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [address, setAddress] = useState('');
    const [orderDeatils, setOrderDetails] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(
        () => {
            if (location.state !== null) {
                setUser(location.state.personal_details);
                setAddress(location.state.address);
                setOrderDetails(location.state.order_details);
                setProducts(location.state.order_details.products);
            } else {
                navigate('/');
            }

        }, [location]
    )

    function getDate() {
        var day = new Date();
        var nextDay = new Date();
        nextDay.setDate(day.getDate() + 2);
        return nextDay.toDateString();
    }

    return (
        <section className="py-12 lg:py-24 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                <h2 className="font-manrope font-bold text-3xl sm:text-4xl leading-10 text-black mb-6 lg:mb-11">
                    Your Order Confirmed
                </h2>
                <h6 className="font-medium text-xl leading-8 text-black mb-3">
                    Hello, {user.first_name}
                </h6>
                <p className="font-normal text-lg leading-8 text-gray-500 mb-11">
                    Your order has been completed and be delivery in only two days .
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 py-6 border-y border-gray-100 mb-6">
                    <div className="box group">
                        <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                            Delivery Date
                        </p>
                        <h6 className="font-semibold font-manrope text-2xl leading-9 text-black">
                            {getDate()}
                        </h6>
                    </div>
                    <div className="box group">
                        <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                            Order
                        </p>
                        <h6 className="font-semibold font-manrope text-2xl leading-9 text-black">
                            #{orderDeatils.order_id}
                        </h6>
                    </div>
                    <div className="box group">
                        <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                            Payment Method
                        </p>
                        <h6 className="font-semibold font-manrope text-2xl leading-9 text-black">
                            {orderDeatils.payment_method}
                        </h6>
                    </div>
                    <div className="box group">
                        <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                            Address
                        </p>
                        <h6 className="font-semibold font-manrope text-xl leading-9 text-black">
                            {address.address_line}
                        </h6>
                    </div>
                </div>
                <div className="overflow-y-auto">
                    {
                        products.map(
                            (d, i) => {
                                return <div key={i} className="grid grid-cols-7 w-full pb-6 border-b border-gray-100">
                                    <div className="col-span-7 min-[500px]:col-span-2 md:col-span-1">
                                        <img
                                            src={d.product.image}
                                            alt="Shoes image"
                                        />
                                    </div>
                                    <div className="col-span-7 min-[500px]:col-span-5 md:col-span-6 min-[500px]:pl-5 max-sm:mt-5 flex flex-col justify-center">
                                        <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center justify-between">
                                            <div className="">
                                                <h5 className="font-manrope font-semibold lg:text-2xl text-lg leading-9 text-black lg:mb-6 mb-3">
                                                    {d.product.title}
                                                </h5>
                                                <div className="flex gap-4">
                                                    <p className="font-normal text-xl leading-8 text-gray-500">
                                                        Quantity : <span className="text-black font-semibold">{d.qty}</span>
                                                    </p>
                                                    <p className="font-normal text-xl leading-8 text-gray-500">
                                                        Size : <span className="text-black font-semibold">{d.size}</span>
                                                    </p>

                                                </div>

                                            </div>
                                            <h5 className="font-manrope font-semibold lg:text-3xl text-xl leading-10 text-black sm:text-right mt-3">
                                                ₹{d.product.price * d.qty}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            }
                        )
                    }
                </div>
                <div className="flex items-center justify-center sm:justify-end w-full my-6">
                    <div className=" w-full">
                        <div className="flex items-center justify-between mb-6">
                            <p className="font-normal text-xl leading-8 text-gray-500">
                                Subtotal
                            </p>
                            <p className="font-semibold text-xl leading-8 text-gray-900">
                                ₹{orderDeatils.subtotal_price}
                            </p>
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            <p className="font-normal text-xl leading-8 text-gray-500">
                                Shipping Charge
                            </p>
                            <p className="font-semibold text-xl leading-8 text-gray-900">
                                ₹{orderDeatils.shipping_charge}
                            </p>
                        </div>
                        <div className="flex items-center justify-between py-6 border-y border-gray-100">
                            <p className="font-manrope font-semibold text-2xl leading-9 text-gray-900">
                                Total
                            </p>
                            <p className="font-manrope font-bold text-2xl leading-9 text-light-brown">
                                ₹{orderDeatils.total_price}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="data ">
                    <p className="font-normal text-lg leading-8 text-gray-500 mb-11">
                        We'll be sending a shipping confirmation email when the items shipped
                        successfully.
                    </p>
                    <h6 className="font-manrope font-bold text-2xl leading-9 text-black mb-3">
                        Thank you for shopping with us!
                    </h6>
                </div>
            </div>
        </section>
    )
}