import { ReactNode } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

type props = {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
};

const DrawerComponent = ({ trigger, title, children }: props) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <div className='mx-auto w-full max-w-sm flex flex-col items-center md:items-end'>
          <DrawerHeader className="w-full flex flex-col items-center md:px-0 mt-3">
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
