import React, { useEffect, useState } from "react";
import { useUploadFile } from "../hooks/useUploadFile";
import { X } from "lucide-react";
import { useSingleProduct } from "../hooks/useProducts";
import defaultImg from "../assets/images/imageUploader.png";
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
import { parseImages } from "../utils/parseImages";
import { CSS } from "@dnd-kit/utilities";
import Loading from "./common/Loading";

const ImageUploader = ({ id }: { id: number }) => {
  const { mutateAsync, isPending, data } = useUploadFile();
  const { data: singleData, isLoading } = useSingleProduct(id);

  const [images, setImages] = useState<string[]>(
    parseImages(singleData?.images || []),
  );

  const [test, setTest] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      setTest(file);

      const formData = new FormData();
      formData.append("file", event.target.files[0]);

      mutateAsync(formData);
    }
  };

  useEffect(() => {
    if (data?.location) {
      setImages([...images, data?.location]);
      setTest("");
    }
  }, [data]);

  const getImagePos = (img: string) =>
    images.findIndex((image) => image === img);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setImages((imageList) => {
      const originalPos = getImagePos(active.id as string);
      const newPos = getImagePos(over.id as string);

      return arrayMove(imageList, originalPos, newPos);
    });
  };

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
      <div className='flex flex-col items-end'>
        <div className='relative w-full h-36 flex items-center justify-center mb-3 border rounded-md overflow-hidden'>
          <input
            type='file'
            id='image'
            multiple
            onChange={handleFileChange}
            className='absolute w-full h-full opacity-0 cursor-pointer'
          />
          <img
            src={test || defaultImg}
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
        <div className='flex items-center justify-start gap-x-4 w-full'>
          <SortableContext
            items={images}
            strategy={horizontalListSortingStrategy}>
            {isLoading ? (
              <Loading />
            ) : (
              images?.map((img) => (
                <ImageSorted
                  id={img}
                  image={img}
                  key={img}
                />
              ))
            )}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
};

export default ImageUploader;

const ImageSorted = ({ id, image }: { id: string; image: string }) => {
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
      style={style}
      className='relative w-20 h-20 rounded-md border overflow-hidden'>
      <div className='w-5 h-5 bg-black absolute flex items-center justify-center rounded-full m-1'>
        <X className='w-4' />
      </div>
      <img
        src={image}
        className='w-full h-full object-cover'
        alt={image}
      />
    </div>
  );
};
