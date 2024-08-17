import { Ellipsis } from "lucide-react";
import { product } from "../../types/Product";
import { isPersian } from "../../utils/isPersian";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import truncateText from "../../utils/truncateText";
import { useSearchParams } from "react-router-dom";

const ProductCard = ({ item }: { item: product }) => {
  const { id, title, description, price, images, category } = item;

  const [searchParams, setSearchParams] = useSearchParams();
  const productActive = searchParams.get("productactive") || 1;

  const activeProductHandler = () => {
    searchParams.set("productactive", id.toString());
    setSearchParams(searchParams);
  };

  return (
    <Card
      onClick={activeProductHandler}
      className={`w-full min-w-72 max-h-32 flex cursor-pointer
        ${isPersian(title) ? "rounded-r-2xl" : "rounded-l-2xl"}
         ${productActive == id && "bg-accent"}`}
      dir={isPersian(title) ? "rtl" : "ltr"}>
      <CardHeader className='md:w-52 w-32 p-0'>
        <img
          src={images[0]}
          alt='Photo by Drew Beamer'
          className={`object-cover h-full w-full rounded-2xl ${
            productActive != id && "p-2"
          }`}
        />
      </CardHeader>
      <CardContent className='w-2/4 p-3 pt-3'>
        <CardTitle className='text-[22px] h-8 overflow-hidden'>
          {truncateText(title, 26)}
        </CardTitle>
        <CardDescription className='mt-1 text-[13px] h-[60px] overflow-hidden'>
          {truncateText(description, 100)}
        </CardDescription>
      </CardContent>
      <CardFooter className='flex justify-between w-1/4 px-2 flex-col items-end pb-2 pt-1'>
        <Ellipsis className='cursor-pointer' />
        <div className='gap-y-1 flex flex-col items-end'>
          <p
            className={`text-sm text-green-500 px-1 flex gap-x-[2px] ${
              isPersian(title) && "flex-row-reverse"
            }`}>
            <span>$</span> {price}
          </p>
          <div
            dir='ltr'
            className='text-[9px] bg-primary-foreground rounded-md p-2 cursor-pointer'>
            # {truncateText(category.name, 20)}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
