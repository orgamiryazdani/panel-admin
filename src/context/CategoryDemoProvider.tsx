import { createContext, useState, ReactNode, useContext } from "react";

export type categoryDataType = {
  name: string;
  image: string | string[];
};

type CategoryDemoContextType = {
  categoryDemoData: categoryDataType;
  setCategoryDemoData: React.Dispatch<React.SetStateAction<categoryDataType>>;
  updateCategoryDemoField: (
    field: keyof categoryDataType,
    value: string | string[],
  ) => void;
};

const CategoryDemoContext = createContext<CategoryDemoContextType | undefined>(
  undefined,
);

export const CategoryDemoProvider = ({ children }: { children: ReactNode }) => {
  const [categoryDemoData, setCategoryDemoData] = useState<categoryDataType>({
    name: "",
    image: "",
  });

  const updateCategoryDemoField = (
    field: keyof categoryDataType,
    value: string | string[],
  ) => {
    setCategoryDemoData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <CategoryDemoContext.Provider
      value={{
        categoryDemoData,
        setCategoryDemoData,
        updateCategoryDemoField,
      }}>
      {children}
    </CategoryDemoContext.Provider>
  );
};

export const useCategoryDemo = () => {
  const context = useContext(CategoryDemoContext);

  if (context === undefined)
    throw new Error(
      "useCategoryDemo must be used within a CategoryDemoProvider",
    );

  return context;
};
