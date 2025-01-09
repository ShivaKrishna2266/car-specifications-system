import "./aboutUs.css"

export default function AboutUs() {
    return (
        <div className="about-us-container">
            <div className="image-container">
                <img
                    src="https://www.mbusa.com/content/dam/mb-nafta/us/myco/my20/cls/class-page/non-amg/2020-CLS-COUPE-CH-2-1-DR.jpg"
                    className="d-block w-100 img-fluid"
                    alt="Car 1"
                />
                <h1 className="centered-text">About Us</h1>
            </div>
            <div className="text mt-5 mb-5">
                <h1 className="text-center"><b>Who We Are?</b></h1>
                <p className="text-center">Cars.com is the No. 1 most recognized automotive marketplace visited by more than 25 million in-market consumers each month. Launched in 1998 and headquartered in Chicago, Cars.com empowers shoppers with the data, resources and digital tools needed to make informed buying decisions and seamlessly connect with automotive retailers.
                    Cars.com is the flagship offering from Cars.com Inc. d/b/a Cars Commerce, an audience-driven technology company empowering automotive that simplifies everything about buying and selling cars. Learn more at www.carscommerce.inc.</p>
            </div>
            <div className="text-container">
                <div className="row">
                    <div className="col-md-6 mt-4 mb-4">
                        <img
                            src="https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=600"
                            className="d-block w-100 img-fluid"
                            alt="Car 1"
                        />
                    </div>
                    <div className="text-center col-md-6 mt-5 ">
                        <h1>Our roots</h1><br />
                        <p>
                            Cars.com invented car search. Our site and innovative solutions connect buyers and sellers to match people with their perfect car. With our people spread across the U.S., we still maintain a startup culture with innovation and passion for our people at the core of everything we do.
                            <br /><br />
                            Cars.com has an award-winning brand, leadership team, and the best and brightest employees in the industry. We’ve been featured as one of the top places to work by The Chicago Tribune, Built in Chicago, Chicago Innovation, and U.S. News & World Report.
                            <br /><br />
                            Alex Vetter, President and CEO, Cars.com
                        </p>
                    </div>
                </div>
            </div>
            <div className="text-center mt-5">
                <h1>Our people</h1>
            </div>

            <div className=" mt-5 text-color">
                <div className="row">
                    <h1>From the Pressroom</h1>
                    <div className="text-center col-md-4 mt-5">
                        <p>CARS to Announce Third Quarter 2024 Financial Results <br /><br />
                            Oct 24, 2024</p>
                    </div>
                    <div className="text-center col-md-4 mt-5">
                        <p>Surplus Inventory Slightly Drives Down New-Car Prices as Used-Car Market Stabilizes, According to Cars Commerce’s September Industry Insights Report <br /><br />
                            Oct 21, 2024</p>
                    </div>
                    <div className="text-center col-md-4 mt-5">
                        <p>Cars Commerce’s Industry Insights Report Shows a Stabilizing Market; Ford, Chevrolet and Honda Drive Balanced New-Car Inventory Levels in August <br /><br />
                            Sep 19, 2024</p>
                    </div>
                </div>
            </div>
            <div className=" text-center mt-5 mb-5">
                <h1>Our office</h1>
                <p>Cars.com is located at 300 South Riverside, a 23-story Class A, LEED Gold Certified office tower. LEED Gold Certificate <br /><br />
                    <b> Cars.com</b>
                    <span> </span>300 S. Riverside Plaza, Suite 1000
                    Chicago, IL 60606</p>
            </div>


        </div>


    );
};