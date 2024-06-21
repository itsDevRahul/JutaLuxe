import { HiOutlineMail, HiOutlineClock } from "react-icons/hi";
import { FaCheckSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <section className=" text-dark-brown border-t mt-16">
            <div className="container mx-auto sm:px-8 px-2 py-16 grid lg:grid-cols-4 grid-cols-1 lg:gap-20 gap-10">
                <div>
                    <h1 className="font-bold sm:text-xl sm:ps-3 ps-2 border-s-4 border-dark-brown rounded-s">COMPANY</h1>
                    <ul className="grid gap-2 ms-1 my-6 font-semibold">
                        <Link to={'/'} className=" border-b py-2">About Us</Link>
                        <Link to={'/privacy-policy'} className=" border-b py-2">Privacy Policy</Link>
                        <Link to={'/terms-conditions'} className=" border-b py-2">Terms & Conditions</Link>
                        <Link to={'/'} className=" border-b py-2">Payments & Returns</Link>
                        <Link to={'/'} className="py-2">Printing Terms & Cancellation Policy</Link>
                    </ul>
                </div>
                <div>
                    <h1 className="font-bold sm:text-xl sm:ps-3 ps-2 border-s-4 border-dark-brown rounded-s">CONTACT US</h1>
                    <ul className="grid gap-4 ms-1 my-6 font-semibold">
                        <li className="cursor-pointer flex gap-2 items-center"><HiOutlineMail className="text-xl" /> help@jutaluxe.com</li>
                        <li className="cursor-pointer flex gap-2 items-center"><FaCheckSquare className="text-xl" /> Guaranteed Response Time Within 3 to 6 Hours</li>
                        <li className="cursor-pointer flex gap-2 items-center"><HiOutlineClock className="text-xl" /> Mon – Sat / 9:30AM – 6:30PM</li>
                    </ul>
                </div>
                <div>
                    <h1 className="font-bold sm:text-xl sm:ps-3 ps-2 border-s-4 border-dark-brown rounded-s">CUSTOMER SERVICE</h1>
                    <ul className="grid gap-2 ms-1 my-6 font-semibold">
                        <Link to={'/'} className=" border-b py-2">About Us</Link>
                        <Link to={'/privacy-policy'} className=" border-b py-2">Privacy Policy</Link>
                        <Link to={'/terms-conditions'} className=" border-b py-2">Terms & Conditions</Link>
                        <Link to={'/'} className="py-2">Payments & Returns</Link>
                    </ul>
                </div>
                <div>
                    <h1 className="font-bold sm:text-xl sm:ps-3 ps-2 border-s-4 border-dark-brown rounded-s">REGISTERED WAREHOUSE ADDRESS</h1>
                    <ul className="grid gap-2 ms-1 my-6 font-semibold">
                        <li className="cursor-pointer">23-24 4th Floor Girivar Industrial Park, Khirod Village, Near Nawalgarh, Nawalgarh Road, Jhunjhunu, Rajastjan – 333042</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}