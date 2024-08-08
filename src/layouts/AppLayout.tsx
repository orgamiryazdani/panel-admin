import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizable";
import { ReactNode, useState } from "react";
import Menu, { MenuMobile } from "./Menu";
import AccountMenu from "../components/account/AccountMenu";

type props = {
  children: ReactNode;
};

const AppLayout = ({ children }: props) => {
  const [size, setSize] = useState(0);

  return (
    <div className='w-[100svw] h-[100svh] flex items-center justify-center'>
      <ResizablePanelGroup
        direction='horizontal'
        autoSaveId='example'
        className='h-full w-full flex flex-col'>
        {/* menu */}
        <ResizablePanel
          className={`md:flex flex-col hidden  ${
            size < 15.1
              ? "transition-all duration-300 ease-in-out min-w-14"
              : "min-w-44"
          }`}
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
          <div className="h-full">
            {children}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        {/* sidebar */}
        <ResizablePanel
          defaultSize={60}
          minSize={29}>
            <div className="w-full h-[10%] border-b">
              <AccountMenu/>
            </div>
          <div className='flex h-[90%] items-center justify-center p-6'>
            <span className='font-semibold'></span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default AppLayout;
