import { Link } from "react-router-dom";
import MultipleAccount from "../components/MultipleAccount";

const Menu = () => {
  return (
    <div className='w-full h-full'>
      {/* Multiple Account */}
      <div className='flex items-center justify-center py-4 border-b'>
        <MultipleAccount />
      </div>
      {/* menu item */}
      <div className='flex flex-col [&>*]:p-5'>
        <Link to='/'>محصولات</Link>
        <Link to='/create-product'>اضافه کردن محصول</Link>
        <Link to='/categories'>دسته بندی ها</Link>
        <Link to='/create-category'>اضافه کردن دسته بندی</Link>
        <Link to='/users'>کاربران</Link>
        <Link to='/create-users'>اضافه کردن کاربر</Link>
      </div>
    </div>
  );
};

export default Menu;
