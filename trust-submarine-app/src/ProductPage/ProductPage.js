import Header from "../Components/Header";
import axios from 'axios';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { useEffect } from "react";

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
    //const productInfo = useLoaderData();
    const [ search ] = useSearchParams();
    const productURL = search.get('url');

    useEffect(() => {
        try {
            axios.get(`/amazon/${productURL}`).then((res) => console.log(res)).catch((error) => console.log(error));
        } catch (err) {
            console.log(err);
        }
    }, null);

    return <div class='verticalflow-justify-flex flexfill'>
        <Header/>
        <div id='about-container' class='verticalflow-medium-flex align-center auto-margin'>
            <p id='product-title'>This is a product</p>
            <p id='score'>4 submarines out of 5 sandwiches</p>
        </div>
    </div>
}

export default ProductPage;