import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function CheckOut() {
    const [cartData, setCartData] = useState([]);
    const [shippingPrice, setShippingPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('online');
    const [status, setStatus] = useState(2);// 1-shop, 2-shipping, 3-payment, 0-complete
    const navigate = useNavigate();

    useEffect(
        () => {
            let lsData = localStorage.getItem('cart');
            if (lsData !== null) {
                setCartData([...JSON.parse(lsData)]);
            } else {
                navigate('/');
            }
            calculatePrice();
        }, []
    )

    useEffect(
        () => {
            if (cartData.length !== 0) {
                calculatePrice();
            }
        }, [cartData]
    )



    function toastOpt(data) {
        const toastHandle = (id, flag) => {
            toast.dismiss(id);
            toast.loading('Requesting to the server...', { position: "top-center" });
            setTimeout(() => {
                toast.dismiss();
                if (flag == 0) {
                    toast.error('Payment Failed!', { position: "top-center" });
                } else {
                    toast.success('Payment Done!', { position: "top-center" });
                    setStatus(0);
                    navigateToOrderSummary(data);
                }
            }, 3000);
        }

        toast((t) => (
            <span className="flex flex-col gap-4 text-center">
                <b>Payment Status</b>
                <div className="grid grid-cols-2 gap-2">
                    <button className="bg-red-500 text-white p-2 rounded shadow" onClick={() => toastHandle(t.id, 0)}>
                        Fail
                    </button>
                    <button className="bg-green-500 text-white p-2 rounded shadow" onClick={() => toastHandle(t.id, 1)}>
                        Success
                    </button>

                </div>
            </span>
        ), {
            position: "top-center"
        });
    }

    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function submitHandler(e) {
        e.preventDefault();
        setStatus(3);
        const { first_name, last_name, email, mobile, address_line, city, state, zip_code } = e.target.elements;
        var d = {
            personal_details: { first_name: first_name.value, last_name: last_name.value, email: email.value, mobile: mobile.value },
            address: { address_line: address_line.value, city: city.value, state: state.value, zip_code: zip_code.value },
            order_details: {
                products: cartData,
                shipping_charge: shippingPrice,
                subtotal_price: totalPrice,
                total_price: totalPrice + shippingPrice,
                payment_method: paymentMethod,
                order_id: randomNumberInRange(10000000, 99999999)
            },
        }

        if (paymentMethod == 'online') {
            toastOpt(d);
        } else {
            navigateToOrderSummary(d);
        }
    }

    function navigateToOrderSummary(data) {
        // just a fake wait
        toast.loading('Wait...', { position: "top-center" });
        setTimeout(() => {
            toast.dismiss();
            navigate('/order-summary', { state: data });
        }, 2000);
    }

    function calculatePrice() {
        var total = 0;
        cartData?.forEach(item => { total += item.product.price * item.qty })
        if (total > 20000) {
            setShippingPrice(100);
        }
        setTotalPrice(total);
    }

    return (
        <>
            <div className="flex flex-col sticky top-0 z-50 items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                <img onClick={() => navigate('/')} src={logo} alt='logo' className='sm:h-[60px] h-[50px] cursor-pointer' />
                <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                    <div className="relative">
                        <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <a
                                    className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </a>
                                <span className="font-semibold text-gray-900">Shop</span>
                            </li>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>

                            <li className="flex items-center space-x-3 text-left sm:space-x-4">

                                {
                                    status == 3 || status == 0 ?
                                        <a
                                            className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </a>
                                        :
                                        <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2">
                                            2
                                        </a>

                                }
                                <span className="font-semibold text-gray-900">Shipping</span>
                            </li>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">


                                {
                                    status == 0 ?
                                        <a
                                            className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </a>
                                        :
                                        <a
                                            className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                                        >
                                            3
                                        </a>
                                }
                                <span className="font-semibold text-gray-500">Payment</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="grid sm:px-10 lg:grid-cols-2 lg:gap-2 gap-16 lg:px-20 xl:px-32 h-full">
                <div className="px-4 pt-8 h-full">
                    <p className="text-xl font-medium">Order Summary</p>
                    <p className="text-gray-400">
                        Check your items. And select a suitable shipping method.
                    </p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 sm:h-3/6 overflow-y-auto">

                        {
                            cartData?.map(
                                (d, i) => {
                                    return <div key={i} className="flex flex-col rounded-lg bg-white sm:flex-row">
                                        <img
                                            className="m-2 w-28 rounded-md border object-cover object-center"
                                            src={d.product.image}
                                            alt=""
                                        />
                                        <div className="flex w-full flex-col px-4 py-4">
                                            <span className="font-semibold">
                                                {d.product.title}
                                            </span>
                                            <span className="float-right text-gray-400">Size : {d.size} &nbsp; Quantity : {d.qty}</span>
                                            <p className="text-lg font-bold">₹{d.product.price * d.qty}</p>
                                        </div>
                                    </div>
                                }
                            )
                        }

                    </div>
                    <p className="mt-8 text-lg font-medium">Payment Methods</p>
                    <form onChange={(e) => setPaymentMethod(e.target.value)} id='payment_methods' className="mt-5 grid gap-6">
                        <div className="relative">
                            <input
                                className="peer hidden"
                                id="radio_1"
                                type="radio"
                                name="radio"
                                value='cod'
                                defaultChecked={false}
                            />
                            <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                            <label
                                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                htmlFor="radio_1"
                            >
                                <div className="ml-5">
                                    <span className="mt-2 font-semibold">Cash on Delivery</span>
                                </div>
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                className="peer hidden"
                                id="radio_2"
                                type="radio"
                                name="radio"
                                value='online'
                                defaultChecked={true}
                            />
                            <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                            <label
                                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                htmlFor="radio_2"
                            >
                                <div className="ml-5">
                                    <span className="mt-2 font-semibold">Online</span>
                                </div>
                            </label>
                        </div>
                    </form>
                </div>
                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Payment Details</p>
                    <p className="text-gray-400">
                        Complete your order by providing your payment details.
                    </p>

                    <form onSubmit={submitHandler} className="mt-8">
                        <div>
                            <h3 className="text-base font-semibold text-gray-800 mb-4">
                                Personal Details
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        required={true}
                                        name='first_name'
                                        placeholder="First Name"
                                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#bbb"
                                        stroke="#bbb"
                                        className="w-[18px] h-[18px] absolute right-4"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle cx={10} cy={7} r={6} data-original="#000000" />
                                        <path
                                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                            data-original="#000000"
                                        />
                                    </svg>
                                </div>
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        name='last_name'
                                        placeholder="Last Name"
                                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#bbb"
                                        stroke="#bbb"
                                        className="w-[18px] h-[18px] absolute right-4"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle cx={10} cy={7} r={6} data-original="#000000" />
                                        <path
                                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                            data-original="#000000"
                                        />
                                    </svg>
                                </div>
                                <div className="relative flex items-center">
                                    <input
                                        type="email"
                                        required={true}
                                        name='email'
                                        placeholder="Email"
                                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#bbb"
                                        stroke="#bbb"
                                        className="w-[18px] h-[18px] absolute right-4"
                                        viewBox="0 0 682.667 682.667"
                                    >
                                        <defs>
                                            <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                                <path d="M0 512h512V0H0Z" data-original="#000000" />
                                            </clipPath>
                                        </defs>
                                        <g
                                            clipPath="url(#a)"
                                            transform="matrix(1.33 0 0 -1.33 0 682.667)"
                                        >
                                            <path
                                                fill="none"
                                                strokeMiterlimit={10}
                                                strokeWidth={40}
                                                d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                                data-original="#000000"
                                            />
                                            <path
                                                d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                                data-original="#000000"
                                            />
                                        </g>
                                    </svg>
                                </div>
                                <div className="relative flex items-center">
                                    <input
                                        type="number"
                                        required={true}
                                        name='mobile'
                                        placeholder="Phone No."
                                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                    />
                                    <svg
                                        fill="#bbb"
                                        className="w-[18px] h-[18px] absolute right-4"
                                        viewBox="0 0 64 64"
                                    >
                                        <path
                                            d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                                            data-original="#000000"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-base font-semibold text-gray-800 mb-4">
                                Shipping Address
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    required={true}
                                    name='address_line'
                                    placeholder="Address Line"
                                    className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                />
                                <input
                                    type="text"
                                    required={true}
                                    name='city'
                                    placeholder="City"
                                    className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                />
                                <input
                                    type="text"
                                    required={true}
                                    name='state'
                                    placeholder="State"
                                    className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                />
                                <input
                                    type="text"
                                    name='zip_code'
                                    required={true}
                                    placeholder="Zip Code"
                                    className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                />
                            </div>
                        </div>
                        {/* Total */}
                        <div className="mt-6 border-t border-b py-2">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                                <p className="font-semibold text-gray-900">₹{totalPrice}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Shipping</p>
                                <p className="font-semibold text-gray-900">₹{shippingPrice}</p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Total</p>
                            <p className="text-2xl font-semibold text-gray-900">₹{new Intl.NumberFormat('en-IN').format(totalPrice + shippingPrice)}</p>
                        </div>

                        <div className="flex gap-4 max-md:flex-col my-8">
                            <button onClick={() => navigate('/')}
                                type="button"
                                className="rounded-md px-4 py-3 w-full text-sm font-semibold bg-transparent hover:bg-gray-100 border-2 text-gray-800 max-md:order-1"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md px-4 py-3 w-full text-sm font-semibold bg-gray-800 text-white hover:bg-gray-900"
                            >
                                Complete Purchase
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>

    )
}
