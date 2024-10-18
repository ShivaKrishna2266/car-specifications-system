export default function HomePage() {
  return (
    <div className="container mt-5">
      <h1>Welcome to the Car Specification System</h1>
      <p>Please <a href="/login">login</a> to view the products.</p>
      <div className="row">
        <div className="col-12">
          <img 
            src="https://t3.ftcdn.net/jpg/08/68/87/14/240_F_868871426_pbtuxaZrRsBgAeCaZQbTAKFNnuXucZvd.jpg" 
            className="img-fluid w-100" 
            alt="Car"
          />
        </div>
      </div>
    </div>
  );
}

