import MainContext from "../MainContext";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from 'react-loader-spinner';
import RecommendedProducts from "../Components/RecommendedProducts";

export default function ProductView() {
    const [selectedImg, setSelectedImg] = useState(3);
    const [selectedSize, setSelectedSize] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(2);
    const [imageList, setImageList] = useState([]);
    const { products, getImgs, images, addToCart, showToast } = useContext(MainContext);
    const [data, setData] = useState({});
    const { id, img } = useParams();

    function sendToCart() {
        if (selectedSize !== null) {
            let d = { product: data, qty: 1, size: selectedSize }
            addToCart(d);
        } else {
            showToast('Please select the shoe size!');
        }
    }

    useEffect(
        () => {
            if (products.length !== 0) {
                let product = products.find((d) => d.id == id);
                setData({ ...product });
            }
        }, [products]
    )

    useEffect(
        () => {
            if (products) {
                let product = products.find((d) => d.id == id);
                setData(product);
            }
            if (images.length !== 0) {
                setImageList([...getImgs(img)]);
            }
        }, [id, img]
    )

    useEffect(
        () => {
            if (images.length !== 0) {
                setImageList([...getImgs(img)]);
            }
        }, [images]
    )

    useEffect(
        () => {
            if (imageList.length !== 0) {
                let image = imageList[4];
                let d = { ...data };
                d.image = image;
                d.imgIndex = img;
                setData({ ...d });
            }
        }, [imageList]
    )

    return (
        <>
            <div className="mx-auto container py-12 md:py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row -mx-4">
                        <div className="lg:flex-1 px-4 lg:w-6/12">
                            <div className={`${imageLoaded == 2 ? 'h-[400px]' : ''} relative w-full rounded-lg bg-gray-300 mb-4 overflow-hidden`}>
                                <img
                                    className="w-full h-full object-cover"
                                    src={`${imageList != undefined && imageList?.length > 0 ? imageList[selectedImg] : ''}`}
                                    alt="Loading Image.."
                                    onLoad={() => setImageLoaded(true)}
                                />
                                <div className={`${imageLoaded ? 'hidden' : 'flex'} absolute size-full top-0 items-center justify-center bg-slate-200/50`}>
                                    <ThreeDots
                                        height="50"
                                        width="50"
                                        radius="9"
                                        color="#b07533"
                                        ariaLabel="loading" />
                                </div>
                            </div>
                            <div className="overflow-x-auto flex">

                                <div className="flex gap-4 grow">
                                    {
                                        imageList?.map(
                                            (d, i) => {
                                                return <div key={i} onClick={() => {
                                                    if (selectedImg !== i) {
                                                        setSelectedImg(i);
                                                        setImageLoaded(false);
                                                    }
                                                }} className={`${selectedImg == i ? 'border-2 border-light-brown/50' : ''} lg:size-[100px] size-[70px] rounded-lg bg-gray-300 mb-4 overflow-hidden hover:opacity-90 cursor-pointer`}>
                                                    <img
                                                        className="w-full h-full object-cover"
                                                        src={imageList[i]}
                                                        alt="Loading Image.."
                                                    />
                                                </div>
                                            }
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="lg:flex-1 px-4">
                            <h2 className="text-2xl font-bold text-gray-800  mb-2">
                                {data?.title}
                            </h2>
                            <p className="text-light-brown text-sm mb-4">
                                {data?.category}
                            </p>
                            <div className="flex mb-4">
                                <div className="mr-4 ">
                                    <span className="font-bold text-gray-700 lg:text-xl">
                                        Price:
                                    </span>
                                    <span className="text-gray-600 lg:text-2xl text-xl"> ₹{data?.price}</span>
                                </div>
                                <div>
                                    <span className="font-bold text-gray-700 lg:text-xl">
                                        Availability:
                                    </span>
                                    <span className="text-gray-600 lg:text-2xl text-xl"> In Stock</span>
                                </div>
                            </div>
                            <div className="mb-4">
                                <span className="font-bold text-gray-700">
                                    Select Size:
                                </span>
                                {/* <p className={`${selectedSize == null ? '' : 'hidden'} text-red-400 my-2`}> Please select the shoe size! </p> */}
                                <div className="grid grid-cols-6 gap-2 items-center mt-2">
                                    {
                                        data?.sizes?.map(
                                            (d, i) => {
                                                return <button onClick={() => setSelectedSize(d)} key={i} className={`${selectedSize == d ? 'border-2 border-gray-400' : ''} bg-gray-300 text-gray-700 p-2 rounded-full font-bold hover:bg-gray-400`}>{d}</button>
                                            }
                                        )

                                    }
                                </div>

                            </div>
                            <div className="flex -mx-2 mb-4 py-4">
                                <div className="lg:w-1/2 w-full px-2">
                                    <button onClick={sendToCart} className="w-full bg-gray-900 text-white py-2.5 px-4 rounded-full font-bold hover:bg-gray-800 ">
                                        Add to Bag
                                    </button>
                                </div>
                                <div className="lg:block hidden w-1/2 px-2">
                                    <button onClick={() => showToast('Please login!')} className="w-full bg-gray-200 text-gray-800 py-2.5 px-4 rounded-full font-bold hover:bg-gray-300">
                                        Add to Wishlist
                                    </button>
                                </div>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700">
                                    Product Description:
                                </span>
                                <p className="text-gray-600 text-sm mt-2">
                                    {data?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RecommendedProducts />
        </>

    )
}