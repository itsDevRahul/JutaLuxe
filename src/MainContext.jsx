import axios from 'axios';
import { useState, createContext, useEffect } from "react";
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

const MainContext = createContext(null);

export const ContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState(["Football Cleats", "Running Shoes", "Basketball Shoes"]);
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);
    const [productList, setProductList] = useState([]);
    const [productList2, setProductList2] = useState([]); //for temp data store
    const [selectedCat, setSelectedCat] = useState("");
    const [selectedPriceRange, setSelectedPriceRange] = useState(3);
    const [selectedSortBy, setSelectedSortBy] = useState(2);
    const [loadItems, setLoadItems] = useState(28);
    const [searchParams, setSearchParams] = useSearchParams();
    const [cartProducts, setCartProducts] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { category } = useParams();


    function getProducts() {
        axios.get('https://namichand.github.io/fakeProduct/data/data.json')
            .then((success) => {
                setProducts(success.data);
            })
            .catch((error) => {
            })

        axios.get('https://namichand.github.io/fakeProduct/data/images.json')
            .then((success) => {
                setImages(success.data);
            })
            .catch((error) => {
            })
    }


    function showToast(msg, flag) {
        // 1 - SUCCESS | 2 - ERROR | 3 - INFO
        let theme = {
            style: {
                color: '#b07533',
            },
            iconTheme: {
                primary: '#b07533',
            },
        }
        if (flag == 1) {
            toast.success(msg, theme);
        } else if (flag == 2) {
            toast.error(msg, theme);
        } else {
            toast(msg, theme);
        }
    }

    function search(str) {
        if (str) {
            searchByKeywords(str);
            navigate('');
            setSearchParams({ "q": str });
            setLoadItems(28);
            setSelectedSortBy(2);
            setSelectedPriceRange(3);
        }
    }

    function searchByKeywords(searchStr) {

        if (searchStr === 'shoes') {

            setProductList([...products]);
            setProductList2([...products]);

        } else if (categories.map((d) => { return d.toLowerCase() }).includes(searchStr)) {

            catFilter(searchStr);

        } else {

            var keywords = searchStr.split(" ");
            // remove shoes keyword from array
            function removeValue(value, index, arr) {
                if (value === 'shoes') {
                    arr.splice(index, 1);
                    return true;
                }
                return false;
            }
            keywords.filter(removeValue);
            let newArr = products.filter(
                (data) => {
                    for (var i = 0; i < keywords.length; i++) {
                        if ((new RegExp("\\b" + keywords[i] + "\\b", "i").test(data.title))) {
                            return true;
                        }
                    }
                }
            )
            setProductList([...newArr]);
            setProductList2([...newArr]);
        }
    }

    function catFilter(category) {
        if (category !== "") {
            let newArr = products.filter(
                (data) => {
                    return data.category.toLowerCase() === category.toLowerCase();
                }
            )
            setProductList(shortByName(newArr));
            setProductList2(shortByName(newArr));
        } else {
            setProductList(shortByName(products));
            if (searchParams.get('q') == null) {
                setProductList2(shortByName(products));
            }
        }

    }

    function shortByName(products) {
        let list = products.sort(function (a, b) {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        });
        return list;
    }

    // Not recommended for commercial use. Use your own Images.
    function getImgs(i) {
        if (images.length !== 0) {
            return images[i];
        }
    }

    function addToCart(data) {
        if (cartProducts?.some((d) => d.product.id === data.product.id && d.size === data.size)) {
            // wanna increase qty when product already in cart
            // cartProducts.map(
            //     (d) => {
            //         if (d.pId == data.pId) {
            //             d.qty++
            //         }
            //     }
            // )
            // setCartProducts([...cartProducts]);
            showToast('already in cart!');
        } else {
            // not in cart
            setCartProducts((cart) => [data, ...cart]);
            showToast('added to cart!', 1);
        }
    }

    useEffect(
        () => {
            if (isOpen) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        }, [isOpen]
    )

    useEffect(
        () => {
            if (searchParams.get('q') !== null) {
                search(searchParams.get('q'));
            } else {
                setSelectedCat("");
            }
        }, [searchParams]
    )

    useEffect(
        () => {
            if (products.length !== 0) {
                if (category !== undefined) {
                    setSelectedCat(category);
                    catFilter(selectedCat);
                } else {
                    setProductList([...products]);
                    setProductList2([...products]);
                    setLoadItems(28);
                }
                if (searchParams.get('q') !== null) {
                    search(searchParams.get('q'));
                }
            }
        }, [products]
    )

    useEffect(
        () => {
            if (cartProducts.length !== 0) {
                localStorage.setItem("cart", JSON.stringify(cartProducts));
            }
        }, [cartProducts]
    )

    useEffect(
        () => {
            window.scrollTo(0, 0);
            if (location.pathname == '/' && location.search == '') {
                setProductList([...products]);
                setSelectedCat("");
            }
        }, [location]
    )


    useEffect(
        () => {
            var ls = localStorage.getItem("cart");
            if (ls !== null) {
                setCartProducts([...JSON.parse(ls)]);
            }
            getProducts();
        }, []
    )

    return (
        <MainContext.Provider value={{
            isOpen, setIsOpen, categories, products, getImgs, images, search, searchParams, productList, setProductList, productList2,
            setProductList2, catFilter, shortByName, selectedCat, setSelectedCat, selectedPriceRange, setSelectedPriceRange, selectedSortBy,
            setSelectedSortBy, loadItems, setLoadItems, cartProducts, setCartProducts, addToCart, showToast
        }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainContext;