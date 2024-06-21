import logo from '../images/logo.svg';

export default function Login() {
    return (
        <section className="flex justify-center relative">
            <svg className="w-full h-full object-cover fixed" xmlns="http://www.w3.org/2000/svg" version="1.1" width="1920" height="1080" preserveAspectRatio="none" viewBox="0 0 1920 1080">
                <g mask="url(&quot;#SvgjsMask1012&quot;)" fill="none">
                    <rect width="1920" height="1080" x="0" y="0" fill="rgba(255, 255, 255, 1)"></rect>
                    <path d="M519.4 1161.76C720.22 1054.09 626.73 385.73 992.97 383 1359.21 380.27 1681.14 794.85 1940.11 804.2" stroke="rgba(176, 117, 51, 0.7)" stroke-width="2"></path>
                    <path d="M835.75 1191.88C1024.5 1096.11 868.8 529.12 1287.82 476.03 1706.83 422.94 1954.48 188.01 2191.95 184.43" stroke="rgba(176, 117, 51, 0.7)" stroke-width="2"></path>
                    <path d="M129.93 1145.81C326.05 1114.34 422.03 642.99 741.71 638.91 1061.4 634.83 1047.61 773.91 1353.5 773.91 1659.39 773.91 1808.66 639.71 1965.28 638.91" stroke="rgba(176, 117, 51, 0.7)" stroke-width="2"></path>
                    <path d="M743.54 1130.59C944.61 1121.78 1054.58 809.93 1469.67 782.98 1884.76 756.03 1981.18 337.87 2195.8 318.58" stroke="rgba(176, 117, 51, 0.7)" stroke-width="2"></path>
                    <path d="M686.1 1094.37C828.35 1089.99 947.79 874.56 1211.2 874.49 1474.61 874.42 1473.75 1009.49 1736.3 1009.49 1998.85 1009.49 2125.86 875.56 2261.4 874.49" stroke="rgba(176, 117, 51, 0.7)" stroke-width="2"></path>
                </g>
                <defs>
                    <mask id="SvgjsMask1012">
                        <rect width="1920" height="1080" fill="#ffffff"></rect>
                    </mask>
                </defs>
            </svg>
            <div className="mx-auto max-w-lg px-6 lg:px-8 absolute lg:py-20 py-10">
                <img
                    src={logo}
                    width={200}
                    alt="Juta Luxe"
                    className="mx-auto lg:mb-11 mb-8"
                />
                <div className="rounded-2xl bg-white shadow-xl">
                    <form action="" className="lg:p-11 p-7 mx-auto">
                        <div className="mb-11">
                            <h1 className="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-2">
                                Welcome Back
                            </h1>
                            <p className="text-gray-500 text-center text-base font-medium leading-6">
                                Your Feet Deserve Luxury
                            </p>
                        </div>
                        <input
                            type="text"
                            className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                            placeholder="Username"
                        />
                        <input
                            type="text"
                            className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-1"
                            placeholder="Password"
                        />
                        <a href="javascript:;" className="flex justify-end mb-6">
                            <span className="text-light-brown text-right text-base font-normal leading-6">
                                Forgot Password?
                            </span>
                        </a>
                        <button className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-brown transition-all duration-300 bg-light-brown shadow-sm mb-11">
                            Login
                        </button>
                        <a
                            href="javascript:;"
                            className="flex justify-center text-gray-900 text-base font-medium leading-6"
                        >
                            {" "}
                            Don’t have an account?{" "}
                            <span className="text-light-brown font-semibold pl-3"> Sign Up</span>
                        </a>
                    </form>
                </div>
            </div>
        </section>

    )
}