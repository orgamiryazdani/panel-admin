import React, { Dispatch, SetStateAction, useState } from "react";
import { useUploadFile } from "../hooks/useUploadFile";
import { X } from "lucide-react";
import defaultImg from "../../public/images/imageUploader.webp";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Loading from "./common/Loading";
import { useToast } from "./ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ImageUploader = ({
  images,
  setImages,
  minImage = 1,
  maxImage = 3,
  height,
}: {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
  minImage?: number;
  maxImage?: number;
  height?: string;
}) => {
  const { mutateAsync, isPending } = useUploadFile();
  const { toast } = useToast();
  const [newImage, setNewImage] = useState("");

  // remove image handler
  const handleRemoveImage = (img: string) => {
    if (images.length > minImage) {
      const imageSelected = images.filter((image) => image !== img);
      setImages(imageSelected);
    } else {
      toast({
        title: "حداقل یک تصویر ضروری است",
        variant: "destructive",
      });
    }
  };

  // image uploader handler
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);

      if (selectedFiles.length > maxImage) {
        toast({
          title: `شما فقط می‌توانید حداکثر ${maxImage} تصویر انتخاب کنید`,
          variant: "destructive",
        });
        return;
      }

      // ابتدا تعداد تصاویر انتخاب شده و تعداد تصاویر فعلی را با هم چک می‌کنیم
      if (images.length + selectedFiles.length > maxImage) {
        toast({
          title: `شما فقط می‌توانید حداکثر ${maxImage} تصویر انتخاب کنید`,
          variant: "destructive",
        });
        return;
      }

      for (const file of selectedFiles) {
        const fileType = file.type.split("/")[0];

        if (fileType !== "image") {
          toast({
            title: "فقط میتوانید تصویر انتخاب کنید",
            variant: "destructive",
          });
          return;
        }

        const tempImageUrl = URL.createObjectURL(file);
        setNewImage(tempImageUrl);

        const formData = new FormData();
        formData.append("file", file);

        const uploadResult = await mutateAsync(formData);

        if (uploadResult?.location) {
          setImages((prevImages) => [...prevImages, uploadResult.location]);
        }

        setNewImage("");
      }
    }
  };

  // get image position
  const getImagePos = (img: string) =>
    images.findIndex((image) => image === img);

  // handle dragging
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setImages((imageList) => {
      const originalPos = getImagePos(active.id as string);
      const newPos = getImagePos(over.id as string);

      return arrayMove(imageList, originalPos, newPos);
    });
  };

  // sensor dnd-kit (mobile)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}>
      <div className='flex items-end flex-col'>
        {/* select image ==> input */}
        <div className='flex w-full flex-col items-end'>
          <div
            className={`relative ${
              height && height
            } flex items-center justify-center border rounded-md overflow-hidden w-full h-56 my-3`}>
            <input
              type='file'
              id='image'
              multiple
              onChange={handleFileChange}
              className='absolute w-full h-full opacity-0 cursor-pointer'
              accept='image/*'
            />
            <img
              src={newImage || defaultImg}
              className='w-full h-full object-contain'
              alt='Selected preview'
            />
            {isPending ? (
              <>
                <span className='absolute z-10'>
                  <Loading />
                </span>
                <div className='absolute w-full h-full bg-accent bg-opacity-70 opacity-55 flex items-center justify-center'></div>
              </>
            ) : null}
          </div>
          {/* image and image selected */}
          <div className='flex flex-wrap gap-x-4 pr-4 w-full justify-start items-center'>
            <SortableContext
              items={images}
              strategy={horizontalListSortingStrategy}>
              {images?.map((img) => (
                <ImageSorted
                  id={img}
                  image={img}
                  key={img}
                  handleRemoveImage={handleRemoveImage}
                />
              ))}
            </SortableContext>
          </div>
        </div>
        {images.length > 1 && (
          <span className='text-xs w-full mt-2'>
            میتوانید با گرفتن و کشیدن عکس , اولویت هر عکس را تغییر دهید
          </span>
        )}
      </div>
    </DndContext>
  );
};

export default ImageUploader;

const ImageSorted = ({
  id,
  image,
  handleRemoveImage,
}: {
  id: string;
  image: string;
  handleRemoveImage: (img: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ ...style, touchAction: "none" }} // جلوگیری از تداخل جابجایی
      className='relative pointer-events-auto w-20 h-20 my-2 rounded-md border overflow-hidden'>
      <div
        onPointerUp={() => handleRemoveImage(image)}
        className='w-5 h-5 bg-accent absolute flex items-center z-20 justify-center rounded-full m-1'>
        <X className='w-4' />
      </div>
      <Avatar className='w-full h-full z-10 rounded-none'>
        <AvatarImage
          src={image}
          alt={image}
        />
        <AvatarFallback className='text-sm bg-muted-foreground text-black rounded-none'>
          بدون تصویر
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
