import { Link } from "react-router-dom";
import MultipleAccount from "../components/MultipleAccount";
import {
  Layers3,
  SquareGanttChart,
  Users,
  UserPlus,
  PackagePlus,
  ListPlus,
} from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../components/ui/command";
import { ModeToggle } from "../components/mode-toggle";

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
    path: "/create-users",
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

const Menu = () => {
  return (
    <div className='w-full h-full flex flex-col justify-between'>
      <div>
        {/* Multiple Account */}
        <div
          dir='ltr'
          className='flex items-center justify-center py-[10px] border-b'>
          <MultipleAccount />
        </div>
        {/* menu item */}
        <Command className='rounded-lg h-auto'>
          <CommandList>
            <CommandGroup>
              {menuItem.map((item: menuItem) => (
                <Link
                  key={item.id}
                  to={item.path}>
                  <CommandItem className='mx-1 my-3'>
                    {item.icon}
                    {item.name}
                  </CommandItem>
                  {item.id === 3 && <CommandSeparator />}
                </Link>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
      {/* switch */}
      <ModeToggle />
    </div>
  );
};

export default Menu;