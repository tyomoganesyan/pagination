import { useEffect, useState } from "react";
import './App.css';

export const Pagination = ({ limit }) => {
    const [products, setProducts] = useState([]);
    const [btn, setBtn] = useState([]);
    const [page, setPage] = useState([]);
    const [count, setCount] = useState(1);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((response) => response.json())
            .then((result) => {
                setBtn(new Array(Math.ceil(result.length / limit)).fill(0));
                setProducts(result);
                setPage(result.slice(0, limit));
            });
    }, []);

    const handleNext = () => {
        setCount(count + 1);
        setPage(products.slice(page[page.length - 1].id, page[page.length - 1].id + limit));
    };

    const handlePrev = () => {
        setCount(count - 1);
        setPage(products.slice(page[0].id - limit - 1, page[0].id - 1));
    };

    const handlePage = (index) => {
        setCount(index);
        setPage(products.slice((limit * index) - limit, (index * limit)));
    };

    return (
        <div className="container">
            {page.map(product => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt="" />
                    <p className="product-title">{product.title}</p>
                    <p className="product-price">{product.price}$</p>
                </div>
            ))};

            <div className="pagination-controls">
                {page[0] && page[0].id == 1 ? <button disabled={true} onClick={() => handlePrev()}>Prev</button> :
                    <button onClick={() => handlePrev()}>Prev</button>
                }
                <div className="pagination">
                    {btn.map((_, index) => (
                        index + 1 == count ? <button key={index} className="pagination-button active" onClick={() => handlePage(index + 1)}>{index + 1}</button> :
                            <button key={index} className="pagination-button" onClick={() => handlePage(index + 1)}>{index + 1}</button>
                    ))}
                </div>

                {
                    page.length && page.at(-1).id == products.length ?
                        <button disabled={true} onClick={() => handleNext()}>Next</button> :
                        <button onClick={() => handleNext()}>Next</button>
                }

            </div>
        </div>
    )
};
