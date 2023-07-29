import Header from "../Components/Header";
import axios from 'axios';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useState } from "react";

import './ProductPage.css';

const backendDomain = 'https://durable-pulsar-388017.as.r.appspot.com/';

export async function RequestProduct({request, params}) {
    const thisURL = new URL(request.url);
    const productURL = thisURL.searchParams.get("url");
    const backend = getBackendURL(productURL);
    try {
        let res = await axios.get(backend);
        console.log(res);
        //let json = res.data[0];
        let json = JSON.parse(JSON.stringify(res.data[0])); //copy for debug purposes
        processJSONReply(json);
        json["backend"] = backend;
        json["render"] = true;
        return json;
    } catch (error) {
        console.log(error);
        return {
            "rating": null,
            "backend": backend,
            "name": "Invalid URL",
            "render": false,
          };
    }
}

function getBackendURL(url) {
    const obj = new URL(url);
    let company = "unknown"
    if (obj.host.match(/amazon\.[a-z]{2,3}$/g)) {
        company = "amazon";
    }
    let productURL = `${obj.origin}${obj.pathname}`.replace(/[&?/]?[\w-+%]+=[\w-+%]+/g, '');
    productURL = encodeURIComponent(productURL);
    return `${backendDomain}${company}/${productURL}`;
}

function keymap(json, key1, key2) {
    json[key2] = json[key1];
    delete json[key1];
}

function jsonmap(json, key, fn) {
    json[key] = fn(json[key]);
}

/**
 * Takes the JSON reply from backend and converts it 
 * to a standardized internal format
 */
function processJSONReply(reply) {
    console.log('from processJSONReply');
    console.log(reply);

    //jsonmaps
    keymap(reply, "product_desc", "description");
    keymap(reply, "score", "rating");
    keymap(reply, "product_name", "name");
    keymap(reply, "updated_at", "lastUpdate");
    keymap(reply, "img", "image");
    
    //processing
    jsonmap(reply, "description", (str) => str.replace(/^{"(.*)"}$/g, "$1"))
    jsonmap(reply, "lastUpdate", (str) => new Date(str));
    if (!reply["is_calc"]) {
        reply["rating"] = null;
    }
    console.log(reply);
    return reply;
}

function ProductPage() {
    const productInfo = useLoaderData();

    return <div className='verticalflow-justify-flex flexfill'>
        <Header/>
        <ProductDetails productInfo = {productInfo}/>
    </div>
}

function ProductDetails({productInfo}) {
    return <div id='about-container' className='verticalflow-small-flex align-center auto-margin'>
        <p id='product-title'>{productInfo.name}</p>
        { productInfo.render? <ProductDescription productInfo={productInfo}/> : null}
        <ScoreDisplay productInfo={productInfo}/>
        { productInfo.render? <UpdateRequester productInfo={productInfo}/> : <p>Internal server error, or perhaps a URL typo.</p>}
    </div>
}

function ProductDescription({productInfo}) {//'./TrustSubmarine Full Icon.png'
    return <div className='horizontalflow-small-flex'>
        <div id='product-image-container'>
            <img src={productInfo.image} alt="Product goes here" className='image-small' id='product-image'/> 
        </div>
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

/*function RenderScoreSVGSmall({score}) {
    return <RenderScoreSVG score={score} strokeWidth={20} sideLength={150}/>
}*/

function RenderScoreSVG({score, strokeWidth, sideLength, color}) {
    const MAXSCORE = 5.0;

    if (score===null || score == MAXSCORE) { //specifically handle the case of full circle
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
        <UpdateButton productInfo={productInfo} />
    </div>
}

function UpdateButton({productInfo}) {
    const [isPushed, setIsPushed] = useState(false);
    const [text, setText] = useState("Request Score Recalculation");
    const nav = useNavigate();
    const handleClick = async (event) => {
        event.preventDefault();
        setIsPushed(true);
        setText("Please wait a few minutes");
        console.log("PUT req sent");
        try {
            console.log(await axios.put(productInfo["backend"]));
            nav(0);
        } catch (error) {
            console.log(error);
            setText("Unexpected Error Occurred");
        }
    }
    return <button id='request-button' onClick={handleClick} disabled={isPushed}>{text}</button>
}

export default ProductPage;
