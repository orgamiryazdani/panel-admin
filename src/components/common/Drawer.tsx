import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { UiComponentType } from "../../types/GlobalTypes";

const DrawerComponent = ({
  trigger,
  title,
  children,
}: Omit<
  UiComponentType,
  "cancelBtn" | "description" | "acceptBtn" | "onClick"
>) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <div className='mx-auto w-full max-w-sm flex flex-col items-center md:items-end'>
          <DrawerHeader className='w-full flex flex-col items-center md:px-0 mt-3'>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;