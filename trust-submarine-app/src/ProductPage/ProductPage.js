import Header from "../Components/Header";
import axios from 'axios';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";

import './ProductPage.css';

const backendDomain = 'https://djrjzastptdwz2ddabucffyeka0mowff.lambda-url.eu-north-1.on.aws/';

export async function RequestProduct({request, params}) {
    try {
        const thisURL = new URL(request.url);
        const productURL = thisURL.searchParams.get("url");
        console.log(backendDomain + productURL); //todo remove and replace with proper GET function
        //var res = await axios.get();
        //return res.data;
        return processJSONReply(null);
    } catch (error) {
        console.log(error); //todo check if the error is product not found specifically
        return null;
    }
}

/**
 * Takes the JSON reply from backend and converts it 
 * to a standardized internal format
 */
function processJSONReply(reply) {
    console.log(reply);
    return {
        //rating: 5,
        rating: null,
        name: "Hello, world!",
        lastUpdate: new Date(),
        //description: "This is some sort of sample placeholder description for the Hello, world! product.\nIt isn't a legitimate product, and I don't know why I spent so much effort on this description.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nThis is to simulate a long description."
        description: "This is a sample short description.\nIt's like, really short"
        //description: "This is a sample long description. It's really wide, but really short. In fact, it literally only has one line. How badly do you think this renders? Find out soon once I render this bad boy. Ohhhhhhh boy."
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
    return <div id='about-container' className='verticalflow-small-flex align-center auto-margin'>
        <p id='product-title'>{productInfo.name}</p>
        <ProductDescription productInfo={productInfo}/>
        <ScoreDisplay productInfo={productInfo}/>
        <UpdateRequester productInfo={productInfo}/>
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

    let score = productInfo.rating;
    if (score === null) {
        score = "?";
    }

    return <div style={{position: 'relative'}}>
        <RenderScoreSVGLarge score={productInfo.rating}/>
        <p className='scoredisplay-text' style={{position: 'absolute', top: '50%', left: '50%', zIndex: '2', transform: 'translate(-50%, -55%)'}}>
            {score}
        </p>
    </div>
}

function processScoreColor(score) {

    if (score==null) {
        return '#ffffff50'
    }

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

    return '#ffffff50'
}

function RenderScoreSVGLarge({score}) {
    return <RenderScoreSVG score={score} strokeWidth={35} sideLength={200} color={processScoreColor(score)}/>
}

function RenderScoreSVGSmall({score}) {
    return <RenderScoreSVG score={score} strokeWidth={20} sideLength={150}/>
}

function RenderScoreSVG({score, strokeWidth, sideLength, color}) {
    const MAXSCORE = 5.0;

    if (score===null || score === MAXSCORE) { //specifically handle the case of full circle
        const radius = (sideLength-strokeWidth)/2.0;
        const center = sideLength/2.0;

        return <svg width={sideLength} height={sideLength}>
            <circle cx={center} cy={center} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}/>
        </svg>
    }

    // determine coordinates
    const radius = (sideLength-strokeWidth)/2.0;
    const center = sideLength/2.0;
    const endRadians = Math.PI * 2 * score/MAXSCORE;

    const startX = center + radius; const startY = center;
    const path_startM = `M ${startX} ${startY}`;

    const rx = radius, ry = radius;
    const x_axis_rotation = 0; // perfect ellipse, so rotation doesn't matter
    const large_arc_flag = (score > MAXSCORE/2.0)? 1:0;
    const sweep_flag = 1; //clockwise rotation always
    const endX = center + radius * Math.cos(endRadians);
    const endY = center + radius * Math.sin(endRadians);
    const path_arc = `A ${rx} ${ry} ${x_axis_rotation} ${large_arc_flag} ${sweep_flag} ${endX} ${endY}`;

    const arcPath = `${path_startM} ${path_arc}`;

    return <svg width={sideLength} height={sideLength}>
        <path d={arcPath} fill="none" stroke={color} strokeWidth={strokeWidth} />
    </svg>
}

function UpdateRequester({productInfo}) {
    let updateDate = productInfo.lastUpdate;
    let stringDate = `${String(updateDate.getDate()).padStart(2, '0')}/${String(updateDate.getMonth() + 1).padStart(2, '0')}/${updateDate.getFullYear()}`;
    return <div>
        <p id='last-updated'>Last Updated: {stringDate}</p>
        <UpdateButton/>
    </div>
}

function UpdateButton() {
    const [isPushed, setIsPushed] = useState(false);
    const handleClick = (event) => {
        event.preventDefault();
        setIsPushed(true);
        console.log("This is supposed to eventually send a HTTP request to the backend."); //todo replace with API request
    }
    let text = isPushed? "Update Requested Recently":"Request Update";
    return <button id='request-button' onClick={handleClick} disabled={isPushed}>{text}</button>
}

export default ProductPage;