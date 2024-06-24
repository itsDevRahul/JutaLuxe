import { useContext, useEffect, useState } from "react";
import MainContext from "../MainContext";
import { Link } from "react-router-dom";

export default function RecommendedProducts() {
    const [items, setItems] = useState([]);
    const { products } = useContext(MainContext);

    function filter() {
        let a = products?.filter(
            (d) => { return d.recommended == "true" }
        );
        setItems([...a]);
    }

    useEffect(
        () => {
            if (products.length != 0) {
                filter();
            }
        }, [products]
    )

    return (
        <section className={`${products.length == 0 ? 'hidden' : ''} sm:py-12 py-8 bg-creamy`}>
            <h2 className="font-semibold text-center md:text-2xl md:pb-2">RECOMMENDED PRODUCTS</h2>
            <div onClick={() => filter()} className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 md:grid-cols-2 gap-9 my-9">
                {
                    items?.map(
                        (d, i) => {
                            return <Item key={i} {...d} />
                        }
                    )
                }
            </div>
        </section>
    )
}

function Item({ id, title, price, category, images }) {
    const { getImgs } = useContext(MainContext);
    const random = Math.floor(Math.random() * 9);
    var img;
    if (getImgs(random) !== undefined) {
        img = getImgs(random)[4]
    }

    return (
        <Link to={'/product/' + id + '/' + random} className="rounded-md flex items-center gap-4 px-8 py-10 hover:shadow-lg duration-300 relative bg-white overflow-hidden">
            <div className="bg-light-brown rounded-br-lg text-white text-sm font-semibold py-1 px-3 absolute top-0 left-0">NEW</div>
            <div className="">
                <img src={img} className="rounded " width={100} />
            </div>
            <div>
                <div className="font-semibold text-[14px]">{title} </div>
                <div className="text-light-brown my-2">{category} </div>
                <div className="flex justify-start gap-2">
                    <span className="text-brown font-semibold">₹{price}</span>
                </div>
            </div>
        </Link>
    )
}