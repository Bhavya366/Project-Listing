import React from 'react';
import banner from '../Images/banner.png'

const Banner = () => {
    return (
        <div className='banner'>
            <div>
                <img src={banner} alt="alt" />
            </div>
            <div className='feedback-part'>
                <h1>Add your products and give
                    your valuable feedback</h1><br></br>
                <p style={{color:"#6A6A6A"}}>Easily give your feedback in a matter of minutes. Access your audience on all platforms. Observe result manually in real time</p>
            </div>
        </div>
    );
};

export default Banner;