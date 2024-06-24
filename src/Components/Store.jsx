import { useContext, useEffect, useState } from "react";
import { HiOutlineHeart } from "react-icons/hi2";
import { FaFilter, FaSortAmountDown } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainContext from "../MainContext";

export default function Store() {
    const [priceRange, setPriceRange] = useState(["0 - 5000", "5000 - 10,000", "10,000 and above"]);
    const [sortBy, setSortBy] = useState(["Price - Low to High", "Price - High to Low"]);
    const [filter, setFilter] = useState(0);// 0 = category, 1 = price filter, 2 = sort by
    const { categories, products, productList, setProductList, productList2, catFilter, shortByName, selectedCat, setSelectedCat,
        selectedPriceRange, setSelectedPriceRange, selectedSortBy, setSelectedSortBy, loadItems, setLoadItems, searchParams } = useContext(MainContext);
    const { category } = useParams();
    const navigate = useNavigate();


    function loadMore() {
        if (productList.length > loadItems) {
            setLoadItems(loadItems + 20);
        }
    }

    function shortByPrice(order) {
        // 0= low to high ascending order
        // 1= high to low descending order
        // 2= recommended
        let list;
        if (order === 0) {
            //ascending order
            list = productList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (order === 1) {
            //descending order
            list = productList.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        } else {
            //short by name
            list = shortByName(productList);
        }
        setProductList([...list]);
    }

    function priceFilter(p1, p2) {
        let list = productList2.filter(
            (d) => {
                return d.price >= p1 && d.price <= p2;
            }
        );
        setProductList([...list]);
    }

    useEffect(
        () => {
            if (category !== undefined) {
                setSelectedCat(category);
            }
        }, [category]
    )

    useEffect(
        () => {
            if (products.length !== 0) {
                catFilter(selectedCat);
                setLoadItems(28);
                setSelectedSortBy(2);
                setSelectedPriceRange(3);
            }
            if (selectedCat !== '') {
                navigate('/' + selectedCat);
            } else {
                navigate('/');
            }
        }, [selectedCat]
    )

    useEffect(
        () => {
            if (selectedPriceRange !== 3) {
                if (selectedPriceRange === 0) {
                    priceFilter(0, 5000);
                } else if (selectedPriceRange === 1) {
                    priceFilter(5000, 10000);
                } else if (selectedPriceRange === 2) {
                    priceFilter(10000, 100000000);
                }
            } else {
                priceFilter(0, 100000000);
            }
            setSelectedSortBy(2);
        }, [selectedPriceRange]
    )

    useEffect(
        () => {
            if (productList.length !== 0) {
                shortByPrice(selectedSortBy);
            }
        }, [selectedSortBy]
    )

    useEffect(
        () => {
            if (searchParams.get('q') !== null) {
                setFilter(2);
            }
        }, [searchParams]
    )

    return (
        <section className="sm:py-12 py-8 relative">

            <div className="mx-auto container px-4 sm:px-6 lg:px-8">

                <div className={`flex justify-between mb-8 max-xl:text-center py-4 border-b`}>
                    <h2 className={`${searchParams.get('q') !== null ? 'hidden' : 'flex'} font-manrope font-bold items-end lg:text-4xl text-3xl text-dark-brown`}>
                        Explore
                    </h2>
                    <h3 className={`${searchParams.get('q') == null ? 'hidden' : 'flex'} font-manrope font-semibold items-end lg:text-xl text-dark-brown`}>
                        showing {productList.length} results for '{searchParams.get('q')}'
                    </h3>
                    <div className={`lg:flex hidden flex-col items-end gap-2`}>
                        <div className="flex items-center gap-2">
                            <Link onClick={() => setFilter(0)} className={`${filter === 0 ? 'bg-light-brown text-white' : 'bg-gray-100 text-gray-600'} ${searchParams.get('q') == null ? '' : 'hidden'} px-6 py-2 rounded-3xl`}>Categories</Link>
                            <Link onClick={() => setFilter(1)} className={`${filter === 1 ? 'bg-light-brown text-white' : 'bg-gray-100 text-gray-600'} px-6 py-2 rounded-3xl`}>Price</Link>
                            <Link onClick={() => setFilter(2)} className={`${filter === 2 ? 'bg-light-brown text-white' : 'bg-gray-100 text-gray-600'} px-6 py-2 rounded-3xl`}>Short By</Link>
                        </div>
                        <div className={`${filter == 3 ? 'h-[0px]' : 'h-[50px]'} duration-300 w-[600px] flex justify-between items-center relative overflow-hidden`}>
                            <div className={`${filter !== 0 ? '-translate-x-[120%] invisible' : 'visible'} absolute right-0 md:flex items-center lg:gap-2 gap-1 hidden overflow-hidden duration-300`}>
                                <Link to={'/'} onClick={() => setSelectedCat("")} className={`${selectedCat === "" ? 'bg-light-brown text-white' : 'bg-gray-100 text-gray-600'} px-6 py-2 rounded-3xl`}>All</Link>
                                {
                                    categories.map(
                                        (cat, i) => {
                                            return <div key={i} onClick={() => setSelectedCat(cat)} className={`${selectedCat === cat ? 'bg-light-brown text-white' : 'bg-gray-100 text-gray-600'} px-6 py-2 rounded-3xl cursor-pointer`} >{cat}</div>
                                        }
                                    )
                                }
                            </div>
                            <div className={`${filter !== 1 ? 'translate-x-[120%] invisible' : 'visible'} absolute right-0 md:flex items-center lg:gap-2 gap-1 hidden overflow-hidden duration-300`}>
                                <Link onClick={() => setSelectedPriceRange(3)} className={`${selectedPriceRange === 3 ? 'bg-light-brown text-white' : 'bg-gray-100 text-gray-600'} px-6 py-2 rounded-3xl`}>All</Link>
                                {
                                    priceRange.map(
                                        (range, i) => {
                                            return <Link key={i} onClick={() => setSelectedPriceRange(i)} className={`${selectedPriceRange === i ? 'bg-light-brown text-white' : 'bg-gray-100 text-gray-600'} px-6 py-2 rounded-3xl`} >{range}</Link>
                                        }
                                    )
                                }
                            </div>
                            <div className={`${filter !== 2 ? 'translate-x-[120%] invisible' : 'visible'} absolute right-0 md:flex items-center lg:gap-2 gap-1 hidden overflow-hidden duration-300`}>
                                <Link onClick={() => setSelectedSortBy(2)} className={`${selectedSortBy === 2 ? 'bg-light-brown text-white' : 'bg-gray-100 text-gray-600'} px-6 py-2 rounded-3xl`}>Recommended</Link>
                                {
                                    sortBy.map(
                                        (s, i) => {
                                            return <Link key={i} onClick={() => setSelectedSortBy(i)} className={`${selectedSortBy === i ? 'bg-light-brown text-white' : 'bg-gray-100 text-gray-600'} px-6 py-2 rounded-3xl`} >{s}</Link>
                                        }
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <select value={selectedCat} onChange={(e) => setSelectedCat(e.target.value)} className={`${searchParams.get('q') !== null ? 'hidden' : 'block'} lg:hidden w-[50%] px-4 py-2 rounded-3xl outline-none bg-gray-100`}>
                        <option value={""}>All</option>
                        {
                            categories.map(
                                (cat, i) => {
                                    return <option key={i} value={cat}>{cat}</option>
                                }
                            )
                        }
                    </select>
                </div>
                {
                    productList.length !== 0 ? '' : <div className="text-gray-500 text-center text-2xl lg:py-8 pt-4">No data to show.</div>
                }
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-12">
                    {
                        productList.slice(0, loadItems).map(
                            (data, index) => {
                                return <Item key={index} data={data} />
                            }
                        )

                    }
                </div>
                <div className={`${productList.length < loadItems ? 'hidden' : ''} text-center`}>
                    <button onClick={loadMore} className={`mt-16 px-12 py-2 border-2 cursor-pointer border-gray-200 rounded text-choco-brown duration-300 hover:rounded-tl-2xl hover:rounded-br-2xl text-center font-semibold text-xl`}>
                        LOAD MORE
                    </button>
                </div>
            </div>


            <div className="lg:hidden fixed bottom-0 z-50 w-full bg-light-brown text-white grid grid-cols-2 font-semibold">
                <div onClick={() => setFilter(2)} className="p-4 flex items-center justify-center gap-2 cursor-pointer">
                    <FaSortAmountDown />
                    SORT BY
                </div>
                <div onClick={() => setFilter(1)} className="p-4 flex items-center justify-center gap-2 cursor-pointer">
                    <FaFilter />
                    FILTER
                </div>
            </div>

            <div className="lg:hidden realtive">
                <div onClick={() => setFilter(3)} className={`${filter == 1 || filter == 2 ? 'opacity-100' : 'invisible opacity-0'} fixed top-0 left-0 z-50 w-full h-full bg-black/50 duration-300 `}>
                    <div className={`${filter == 1 || filter == 2 ? '' : 'translate-y-full'} bg-gray-200 py-2 absolute bottom-0 left-0 w-full z-50 duration-200`}>
                        <h4 className="mb-2 p-2 font-semibold text-xl text-gray-700 border-b border-gray-400">{`${filter == 2 ? 'Sort By :' : 'Filter by Price'}`} </h4>
                        <div className={`${filter == 2 ? 'grid' : 'hidden'} gap-3 px-4`}>
                            <Link onClick={() => setSelectedSortBy(2)} className={`${selectedSortBy === 2 ? 'text-light-brown font-semibold' : 'text-gray-700'} px-2 rounded-3xl`}>Recommended</Link>
                            {
                                sortBy.map(
                                    (s, i) => {
                                        return <Link key={i} onClick={() => setSelectedSortBy(i)} className={`${selectedSortBy === i ? 'text-light-brown font-semibold' : ' text-gray-700'} px-2 rounded-3xl`} >{s}</Link>
                                    }
                                )
                            }
                        </div>
                        <div className={`${filter == 1 ? 'grid' : 'hidden'} grid gap-3 px-4`}>
                            <Link onClick={() => setSelectedPriceRange(3)} className={`${selectedPriceRange === 3 ? 'text-light-brown font-semibold' : 'text-gray-700'} px-2 rounded-3xl`}>All</Link>
                            {
                                priceRange.map(
                                    (range, i) => {
                                        return <Link key={i} onClick={() => setSelectedPriceRange(i)} className={`${selectedPriceRange === i ? 'text-light-brown font-semibold' : 'text-gray-700'} px-2 rounded-3xl`} >{range}</Link>
                                    }
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}



function Item({ data }) {
    const { getImgs, showToast } = useContext(MainContext);
    const random = Math.floor(Math.random() * 9);
    var img;
    if (getImgs(random) !== undefined) {
        img = getImgs(random)[4]
    }

    return (

        <div className={`relative bg-cover row-span-3 p-0 bg-gray-100 group rounded-3xl bg-center overflow-hidden mx-auto sm:mr-0 xl:mx-auto`} >
            <Link to={'/product/' + data.id + '/' + random}>
                <img src={img} alt="Shoes" className="z-20 sm:group-hover:scale-110 sm:group-hover:-translate-y-4 duration-500" />
            </Link>
            <div className="absolute z-10 top-3 left-0 mx-3 p-3 bg-white/85 w-[calc(100%-24px)] rounded-xl shadow-sm shadow-transparent transition-all duration-400 sm:group-hover:-translate-y-24">
                <div className="flex items-center justify-between gap-2 mb-2">
                    <h6 className="font-semibold text-base leading-7 text-choco-brown truncate">
                        {data.title}
                    </h6>
                    <h6 className="font-semibold text-base leading-7 text-brown text-right">
                        ₹{data.price}
                    </h6>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-xs leading-5 text-light-brown">{data.category}</p>
                </div>
            </div>
            <div className="sm:flex hidden absolute z-10 top-3 left-0 w-full duration-500 group-hover:translate-y-0 translate-y-24 px-4 gap-4">
                <button className="rounded-full p-1.5 bg-white/90 hover:bg-light-brown text-brown hover:text-white duration-200">
                    <HiOutlineHeart onClick={() => showToast('Login first!')} className='sm:w-7 w-5 sm:h-7 h-5 cursor-pointer' />
                </button>
            </div>
        </div>
    )
}