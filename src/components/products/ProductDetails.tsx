import { useSearchParams } from "react-router-dom";
import { useSingleProduct } from "../../hooks/useProducts";
import Loading from "../common/Loading";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const ProductDetails = () => {
  const [searchParams] = useSearchParams();
  const productActive = searchParams.get("productactive") || 1;

  const { data, isLoading } = useSingleProduct(Number(productActive));

  if (isLoading) return <Loading />;

  return (
    <div className='w-full h-auto flex items-center justify-start flex-col' dir='ltr'>
      {/* Carousel */}
      <Carousel className='w-auto relative' dir='ltr'>
        <CarouselContent>
          {data?.images.map((image, index) => (
            <CarouselItem key={index}>
              <Card className='min-h-60 overflow-hidden'>
                <CardContent className='p-0 h-full w-full'>
                  <img
                    className='h-full w-full object-cover'
                    src={image}
                    alt={data?.title}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='absolute right-20 bottom-8'>
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
      {/* info */}
      <div>
        <p className='text-xl font-bold mt-3'>{data?.title}</p>
        <p className='text-sm my-2'>{data?.description}</p>
        <div className='full flex items-end justify-between mt-4'>
          <div className='w-auto bg-accent h-auto rounded-md flex items-center'>
            <img
              className='w-10 h-10 rounded-md'
              src={data?.category.image}
              alt={data?.category.name}
            />
              <p className='px-2 text-sm text-muted-foreground'># {data?.category.name}</p>
          </div>
          <p className='text-green-500 text-xl'>$ {data?.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;