import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizable";
import { ReactNode, useState } from "react";
import useProfile from "../hooks/useUsers";
import Loading from "../components/common/Loading";
import Menu, { MenuMobile } from "./Menu";

type props = {
  children: ReactNode;
};

const AppLayout = ({ children }: props) => {
  const [size, setSize] = useState(0);
  const { data, isLoading } = useProfile();
  if (isLoading) return <Loading />;

  return (
    <div className='w-[100svw] h-[100svh] flex items-center justify-center'>
      <ResizablePanelGroup
        direction='horizontal'
        className='h-full w-full flex flex-col'>
        {/* menu */}
        <ResizablePanel
          className={`md:flex flex-col hidden  ${size < 15.1 ? "transition-all duration-300 ease-in-out min-w-14" : "min-w-44"}`}
          defaultSize={30}
          minSize={15.1}
          maxSize={18}
          collapsible
          onResize={(size) => setSize(size)}>
          <Menu size={size} />
        </ResizablePanel>
        <ResizableHandle
          withHandle
          className='md:flex hidden'
        />
        {/* menu mobile */}
        <MenuMobile />
        {/* content */}
        <ResizablePanel
          defaultSize={75}
          minSize={30}>
          <div className='flex flex-col h-full items-center justify-center p-6'>
            <span>{data?.id}</span>
            <span>{data?.name}</span>
            <span>{data?.email}</span>
            {children}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        {/* sidebar */}
        <ResizablePanel
          defaultSize={60}
          minSize={25}>
          <div className='flex h-full items-center justify-center p-6'>
            <span className='font-semibold'>Sidebar</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default AppLayout;