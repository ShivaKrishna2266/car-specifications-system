import "./aboutUs.css";

export default function AboutUs() {
    return (
        <div className="about-us-container">
            <div className="image-container">
                <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/053/733/179/small_2x/every-detail-of-a-sleek-modern-car-captured-in-close-up-photo.jpg"
                    className="d-block w-100 img-fluid"
                    alt="Lamborghini Detail"
                />
                <h1 className="centered-text">About Lamborghini</h1>
            </div>

            <div className="text mt-5 mb-5">
                <h1 className="text-center"><b>Performance Beyond Limits</b></h1>
                <p className="text-center">
                    At Automobili Lamborghini, we don’t just build cars—we shape dreams, forge legacies, and engineer the extraordinary.
                    Founded in 1963 by visionary Ferruccio Lamborghini, our brand was born from a bold desire: to create a vehicle that could outperform the finest offerings from Italy’s most elite automakers. What followed was a revolution in design, speed, and philosophy—one that reshaped the concept of luxury performance.
                    <br /><br />
                    Every Lamborghini is a masterpiece, a symphony of raw power and sculpted beauty. From the sharp lines of the Aventador to the futuristic silhouette of the Revuelto, our vehicles ignite the senses and command attention across continents.
                    This is not transportation. This is emotion, art, and engineering at their peak.
                </p>
            </div>

            <div className="text-container">
                <div className="row">
                    <div className="col-md-6 mt-4 mb-4">
                        <img
                            src="https://storage.googleapis.com/pod_public/1300/176804.jpg"
                            className="d-block w-100 img-fluid"
                            alt="Lamborghini Headquarters"
                        />
                    </div>
                    <div className="text-center col-md-6 mt-5">
                        <h1>The Spirit of Sant’Agata</h1><br />
                        <p>
                            Nestled in the heart of Italy, our global headquarters in Sant'Agata Bolognese is where art meets automation. Every vehicle that leaves our factory is assembled by artisans—masters of their craft—who uphold a tradition of excellence and attention to detail that dates back over six decades.
                            <br /><br />
                            We are not defined by what is possible. We are driven by what is not yet imagined. Our legacy began with the iconic Miura, matured through the Countach and Diablo, and lives on through today’s Urus, Huracán, and the all-new Revuelto. Each model carries a heartbeat that echoes the roaring V12s that once defined the roads of Europe.
                            <br /><br />
                            As we transition into a new era, our commitment to innovation remains unwavering. Lamborghini’s roadmap includes bold steps into hybrid technology, full electrification, and sustainable design—without compromising the emotional connection and power that define us.
                        </p>
                    </div>
                </div>
            </div>

            <div className="text-center mt-5">
                <h1 className="text-center">Beyond the Car: A Way of Life</h1>
                <p className="mt-3">
                    Lamborghini is more than a brand—it is a statement. An expression of fearless ambition, unparalleled performance, and exquisite style.
                    Our owners, drivers, and enthusiasts are united by a shared belief: that life should be lived without limits.
                    <br /><br />
                    Whether it's a thunderous engine rev on a quiet mountain road, a private viewing of a bespoke model, or a VIP track experience on the world’s finest circuits—Lamborghini is a lifestyle. One driven by adrenaline, defined by aesthetics, and guided by precision.
                </p>
            </div>

            <div className="mt-5 text-color">
                <div className="row">
                    <h1>Lamborghini News</h1>
                    <div className="text-center col-md-4 mt-5">
                        <p>
                            <strong>Lamborghini Unveils Lanzador, Its First All-Electric Supercar</strong><br />
                            A bold leap into the future, the Lanzador embodies pure electric thrill, aggressive lines, and the brand’s unwavering DNA. The future roars—silently.<br />
                            <em>October 24, 2024</em>
                        </p>
                    </div>
                    <div className="text-center col-md-4 mt-5">
                        <p>
                            <strong>Record Q3 Sales Amidst Global Demand Surge</strong><br />
                            Lamborghini achieves its highest-ever third-quarter sales, driven by strong demand for Urus and Huracán across Europe, Asia, and the Middle East.<br />
                            <em>October 21, 2024</em>
                        </p>
                    </div>
                    <div className="text-center col-md-4 mt-5">
                        <p>
                            <strong>Revuelto Shatters Nürburgring Lap Time Record</strong><br />
                            The Revuelto sets an astonishing new lap time at the world’s most challenging track, cementing its place in motorsport history.<br />
                            <em>September 19, 2024</em>
                        </p>
                    </div>
                </div>
            </div>

            <div className="text-center mt-5">
                <h1>Visit the Heart of the Raging Bull</h1>
                <p>
                    Our legacy begins where every detail is sculpted by hand and every engine is born with a roar. The Lamborghini headquarters in Sant’Agata Bolognese is not only a factory—it is a sanctuary for visionaries and creators.
                    <br /><br />
                    Guests from around the world visit the Lamborghini Museum and production facility to experience firsthand the passion that fuels our legacy. Every rivet, stitch, and spark tells the story of dedication, legacy, and innovation.
                    <br /><br />
                    <b>Automobili Lamborghini S.p.A.</b><br />
                    Via Modena, 12<br />
                    40019 Sant'Agata Bolognese, Bologna, Italy<br />
                    Tel: +39 051 6817611
                </p>
            </div>
        </div>
    );
}
