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

const Menu = () => {
  return (
    <div className='w-full h-full'>
      {/* Multiple Account */}
      <div
        dir='ltr'
        className='flex items-center justify-center py-[10px] border-b'>
        <MultipleAccount />
      </div>
      {/* menu item */}
      <Command className='rounded-lg shadow-md !text-white'>
        <CommandList>
          <CommandGroup>
            <CommandItem className='my-3 mx-1'>
              <SquareGanttChart  className='ml-2 h-[18px] w-[18px]' />
              <Link
                className='!text-white'
                to='/'>
                محصولات
              </Link>
            </CommandItem>
            <CommandItem className='my-3 mx-1'>
              <Layers3 className='ml-2 h-[18px] w-[18px]' />
              <Link to='/categories'>دسته بندی ها</Link>
            </CommandItem>
            <CommandItem className='my-3 mx-1'>
              <Users className='ml-2 h-[18px] w-[18px]' />
              <Link to='/users'>کاربران</Link>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem className='my-3 mx-1'>
              <ListPlus className='ml-2 h-[18px] w-[18px]' />
              <Link to='/create-product'>اضافه کردن محصول</Link>
            </CommandItem>
            <CommandItem className='my-3 mx-1'>
              <PackagePlus className='ml-2 h-[18px] w-[18px]' />
              <Link to='/create-category'>اضافه کردن دسته بندی</Link>
            </CommandItem>
            <CommandItem className='mx-1'>
              <UserPlus className='ml-2 h-[18px] w-[18px]' />
              <Link to='/create-users'>اضافه کردن کاربر</Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default Menu;
