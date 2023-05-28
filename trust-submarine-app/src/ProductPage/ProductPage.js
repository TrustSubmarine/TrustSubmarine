import Header from "../Components/Header";
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from "react";

import './ProductPage.css';

export async function RequestProduct({params}) {
    console.log(params.url);
    //const url = new URL(params.url);
    //const q = url.searchParams.get("q");
    try {
        var res = await axios.get(`/product?url=${params.url}`);
        return res.data;
    } catch (error) {
        console.log(error);
        return null;
    }
    
}

function ProductPage() {
    const [ search ] = useSearchParams();
    const productURL = search.get('url');
    const [ productInfo, setProductInfo ] = useState(null);

    useEffect(() => {
        try {
            axios.get(`https://durable-pulsar-388017.as.r.appspot.com/amazon/${productURL}`).then((res) => setProductInfo(res.data[0])).catch((error) => console.log(error));
        } catch (err) {
            console.log(err);
        }
    }, [productURL]);

    console.log("query:");
    console.log(productURL);
    console.log("data:");
    console.log(productInfo);

    return <div class='verticalflow-justify-flex flexfill'>
        <Header/>
        <div id='about-container' class='verticalflow-medium-flex align-center auto-margin'>
            <p id='product-title'>{productInfo? productInfo.prod_name:""}</p>
            <p id='score'>{productInfo? productInfo.score:""} out of 5</p>
        </div>
    </div>
}

export default ProductPage;
