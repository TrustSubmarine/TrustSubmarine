import Header from '../Components/Header.js';
import './AboutPage.css';

function AboutPage() {

    return <div class='verticalflow-justify-flex flexfill'>
        <Header/>
        <div id='about-container' class='verticalflow-medium-flex align-center auto-margin'>
            <p id='about-authors'>Made by Aditya and Zhi hong</p>
            <div class='verticalflow-small-flex align-center'>
                <p>Trust is hard to come by</p>
                <p>In the infinite depths of the internet</p>
                <p>Use TrustSubmarine as your wayfinder today</p>
                <p>And navigate storms with confidence</p>
            </div>
        </div>
    </div>
}

export default AboutPage;