import { Link, useLocation } from "react-router-dom";
import MultipleAccount from "../components/MultipleAccount";
import {
  Layers3,
  SquareGanttChart,
  Users,
  UserPlus,
  PackagePlus,
  ListPlus,
  MenuIcon,
} from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../components/ui/command";
import { ModeToggle } from "../components/ModeToggle";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "../components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { sizeType } from "../types/GlobalTypes";

const menuItem = [
  {
    id: 1,
    path: "/",
    name: "محصولات",
    icon: <SquareGanttChart className='ml-2 h-[18px] w-[18px]' />,
  },
  {
    id: 2,
    path: "/categories",
    name: "دسته بندی ها",
    icon: <Layers3 className='ml-2 h-[18px] w-[18px]' />,
  },
  {
    id: 3,
    path: "/users",
    name: "کاربران",
    icon: <Users className='ml-2 h-[18px] w-[18px]' />,
  },
  {
    id: 4,
    path: "/create-product",
    name: "اضافه کردن محصول",
    icon: <ListPlus className='ml-2 h-[18px] w-[18px]' />,
  },
  {
    id: 5,
    path: "/create-category",
    name: "اضافه کردن دسته بندی",
    icon: <PackagePlus className='ml-2 h-[18px] w-[18px]' />,
  },
  {
    id: 6,
    path: "/create-user",
    name: "اضافه کردن کاربر",
    icon: <UserPlus className='ml-2 h-[18px] w-[18px]' />,
  },
];

type menuItem = {
  id: number;
  path: string;
  name: string;
  icon: JSX.Element;
};

const renderMenuItem = (item: menuItem, size: number, location: string) => (
  <Tooltip key={item.id}>
    <TooltipTrigger asChild>
      <Link
        to={item.path}>
        <CommandItem
          className={`mx-1 my-3 ${size < 15.1 ? "pr-[7px] mx-2" : "pr-2"} ${
            location == item.path && "bg-accent"
          } text-xs lg:text-sm `}>
          <span>{item.icon}</span>
          {size < 15.1 ? null : item.name}
        </CommandItem>
        {item.id === 3 && <CommandSeparator />}
      </Link>
    </TooltipTrigger>
    {size > 15 ? null : (
      <TooltipContent>
        <p>{item.name}</p>
      </TooltipContent>
    )}
  </Tooltip>
);

const Menu = ({size}:sizeType) => {
  const { pathname } = useLocation();

  return (
    <div className='flex h-full items-center justify-center'>
      <div className='w-full h-full flex flex-col justify-between'>
        <div>
          {/* Multiple Account */}
          <div
            dir='ltr'
            className='flex items-center justify-center py-[10px] border-b'>
            <MultipleAccount size={size} />
          </div>
          {/* menu item */}
          <Command className='h-auto'>
            <CommandList>
              <CommandGroup>
                {menuItem.map((item) => renderMenuItem(item, size, pathname))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
        {/* switch */}
        <ModeToggle size={size} />
      </div>
    </div>
  );
};

export default Menu;

export const MenuMobile = () => {
  const { pathname } = useLocation();

  return (
    <div className='md:hidden m-5 absolute'>
      <Sheet>
        <SheetTrigger asChild>
          <MenuIcon className='cursor-pointer left-11' />
        </SheetTrigger>
        <SheetContent className='transition-all duration-300 ease-in-out w-fit'>
          <SheetHeader className='mt-5 mb-1 ml-4 pl-[14px] w-full'>
            <MultipleAccount size={16} />
          </SheetHeader>
          <Command className='h-auto'>
            <CommandList>
              <CommandGroup>
                {menuItem.map((item) => renderMenuItem(item, 16, pathname))}
              </CommandGroup>
            </CommandList>
          </Command>
          <SheetFooter>
            <ModeToggle size={16} />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
