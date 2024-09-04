import { createContext, useState, ReactNode, useContext } from "react";
import { createProductType } from "../types/Product";

type ProductDemoContextType = {
    productDemoData: createProductType;
    setProductDemoData: React.Dispatch<React.SetStateAction<createProductType>>;
    updateProductDemoField: (field: keyof createProductType, value: string | string[]) => void;
};

const ProductDemoContext = createContext<ProductDemoContextType | undefined>(undefined);

export const ProductDemoProvider = ({ children }: { children: ReactNode }) => {
  const [productDemoData, setProductDemoData] = useState<createProductType>({
    title: "",
    price: "",
    categoryId: "",
    description: "",
    images: [],
  });

  const updateProductDemoField = (field: keyof createProductType, value: string | string[]) => {
    setProductDemoData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <ProductDemoContext.Provider value={{ productDemoData, setProductDemoData, updateProductDemoField }}>
      {children}
    </ProductDemoContext.Provider>
  );
};

export const useProductDemo = () => {
  const context = useContext(ProductDemoContext);

  if (context === undefined)
    throw new Error("useProductDemo must be used within a ProductDemoProvider");

  return context;
};