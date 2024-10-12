import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import noImage from "../../assets/images/no-image.webp";

const AvatarComponent = ({
  src,
  alt,
  text,
}: {
  src: string;
  alt: string;
  text: string;
}) => {
  return (
    <Avatar className='rounded-xl w-full h-auto z-10'>
      <AvatarImage
        src={src}
        alt={alt}
        loading="lazy"
      />
      <AvatarFallback className='rounded-none relative'>
        <img
          src={noImage}
          alt={alt}
          className='w-full h-full object-cover'
        />
        <span className='absolute text-accent-foreground bg-accent opacity-50 p-2 rounded-xl'>
          {text}
        </span>
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarComponent;
