// mockApi.ts
let mockProducts = [
    { modelId: 1, modelName: "Model A", price: 20000, specifications: "Specification A", carBrandId: 1, createdBy: "admin" },
    { modelId: 2, modelName: "Model B", price: 25000, specifications: "Specification B", carBrandId: 2, createdBy: "admin" },
  ];
  
  export const fetchProducts = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProducts);
      }, 1000); // Simulate network delay
    });
  };
  
  export const addProduct = async (product) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct = { ...product, modelId: mockProducts.length + 1 };
        mockProducts.push(newProduct);
        resolve(newProduct);
      }, 1000); // Simulate network delay
    });
  };
  
  export const deleteProduct = async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockProducts = mockProducts.filter((product) => product.modelId !== id);
        resolve();
      }, 1000); // Simulate network delay
    });
  };
  