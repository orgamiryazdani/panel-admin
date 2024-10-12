const HeaderBuilderPage = ({
  text,
}: {
  text: string;
}) => {
  return (
    <div className='w-full flex justify-between items-center px-4 h-[10%] min-h-12 max-h-16 border-b'>
      <span className='font-bold text-[9px] lg:text-base'>{text}</span>
      <div className='bg-muted p-[10px] text-xs rounded-md lg:text-xs md:text-[7px] flex items-center gap-x-2'>
      مشاهده نتیجه بصورت زنده
        <span className=' w-2 h-2 bg-red-500 rounded-full'></span>
      </div>
    </div>
  );
};

export default HeaderBuilderPage;
