import Header from "../Components/Header";
import axios from 'axios';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { useEffect } from "react";

import './ProductPage.css';

export async function RequestProduct({request, params}) {
    try {
        const url = new URL(request.url);
        const productURL = url.searchParams.get("url");
        console.log(processURL(productURL)); //todo remove and replace with proper GET function
        //var res = await axios.get();
        //return res.data;
        return processJSONReply(null);
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Takes a string that is supposed to represent the URL of the product (amazon page),
 * returns the corresponding sub-URL to GET the product data (without domain), as a string.
 */
function processURL(url) {
    //const url = new URL(params.url);
    //const productURL = url.searchParams.get("url");
    return `/amazon/${url}`;
}

/**
 * Takes the JSON reply from backend and converts it 
 * to a standardized, useful format
 */
function processJSONReply(reply) {
    return {
        rating: 3,
        name: "Hello, world!",
        description: "This is some sort of sample placeholder description for the Hello, world! product.\nIt isn't a legitimate product, and I don't know why I spent so much effort on this description."
    };
}

function ProductPage() {
    const productInfo = useLoaderData();
    // const [ search ] = useSearchParams();
    // const productURL = search.get('url');

    return <div className='verticalflow-justify-flex flexfill'>
        <Header/>
        <ProductDetails productInfo = {productInfo}/>
    </div>
}

function ProductDetails({productInfo}) {
    return <div id='about-container' className='verticalflow-medium-flex align-center auto-margin'>
        <p id='product-title'>{productInfo.name}</p>
        <ProductDescription productInfo={productInfo}/>
        <ScoreDisplay productInfo={productInfo}/>
    </div>
}

function ProductDescription({productInfo}) {
    return <div className='horizontalflow-small-flex'>
        <img src="../TrustSubmarine Full Icon.png" alt="Image" className='image-small'/>
        <p id='product-description'>{productInfo.description}</p>
    </div>
}

function ScoreDisplay({productInfo}) {
    // inline css since the functionality of the score display is arguably visual, and thus intrinsic
    return <div style={{position: 'relative'}}>
        <RenderScoreSVGLarge score={productInfo.rating}/>
        <p className='scoredisplay-text' style={{position: 'absolute', top: '50%', left: '50%', zIndex: '2', transform: 'translate(-50%, -55%)'}}>
            {productInfo.rating}
        </p>
    </div>
}

function processScoreColor(score) {

    let hex = (num) => `0${Math.round(num).toString(16)}`.slice(-2);

    if (score >= 0 && score <= 2) {
        return '#ff0000';
    } else if (score <= 3.25) {
        let ratio = (score-2)/1.25;
        return `#ff${hex(ratio*255)}00`;
    } else if (score <= 4.5) {
        let ratio = (score-3.25)/1.25;
        return `#${hex((1-ratio)*255)}ff00`;
    } else if (score > 4.5) {
        return '#00ff00';
    }

    return '#FFF'
}

function RenderScoreSVGLarge({score, color}) {
    return <RenderScoreSVG score={score} strokeWidth={35} sideLength={200} color={processScoreColor(score)}/>
}

function RenderScoreSVGSmall({score}) {
    return <RenderScoreSVG score={score} strokeWidth={20} sideLength={150}/>
}

function RenderScoreSVG({score, strokeWidth, sideLength, color}) {
    const MAXSCORE = 5.0;

    // determine coordinates
    const radius = (sideLength-strokeWidth)/2.0;
    const endRadians = Math.PI * 2 * score/MAXSCORE;

    const startX = 100 + radius; const startY = 100;
    const path_startM = `M ${startX} ${startY}`;

    const rx = radius, ry = radius;
    const x_axis_rotation = 0; // perfect ellipse, so rotation doesn't matter
    const large_arc_flag = (score > MAXSCORE/2.0)? 1:0;
    const sweep_flag = 1; //clockwise rotation always
    const endX = 100 + radius * Math.cos(endRadians);
    const endY = 100 + radius * Math.sin(endRadians);
    const path_arc = `A ${rx} ${ry} ${x_axis_rotation} ${large_arc_flag} ${sweep_flag} ${endX} ${endY}`;

    const arcPath = `${path_startM} ${path_arc}`;

    return <svg width={sideLength} height={sideLength}>
        <path d={arcPath} fill="none" stroke={color} strokeWidth={strokeWidth} />
    </svg>
}

export default ProductPage;