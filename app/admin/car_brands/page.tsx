"use client";

import { useRouter } from "next/navigation";

export default function ViewCarBrands() {
  const router = useRouter();


  const handleAddCarModel = () => {
    console.log("Add Car Model button clicked!");
    router.push('/addCarModel');
  };
  return (
    <div className="">
       <div className="">
            <button type="button" className="btn btn-primary mr-10" onClick={handleAddCarModel} > Add Car Model </button>
        </div>

        <table className="table table-bordered mt-5">
        <thead className="table-light">
          <tr>
            <th>S No</th>
            <th>brandId</th>
            <th>brandName</th>
            {/* <th>Specifications</th>
            <th>Brand ID</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.modelId}>
                <td>{product.modelName}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.specifications}</td>
                <td>{product.carBrandId}</td>
                <td>
                  <FaEdit
                    className="text-warning me-2 action-icon"
                    onClick={() => {
                    }}
                  />
                  <FaTrash
                    className="text-danger action-icon"
                    onClick={() => {                    
                    }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No products available</td>
            </tr>
          )} */}
        </tbody>
      </table>
    </div>
  );
}
