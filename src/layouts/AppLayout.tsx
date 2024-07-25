import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizable";
import { ReactNode } from "react";
import Menu from "./Menu";

type props = {
  children: ReactNode;
};

const AppLayout = ({ children }: props) => {
  return (
      <div className='w-[100svw] h-[100svh] flex items-center justify-center'>
        <ResizablePanelGroup
          direction='horizontal'
          className='h-full w-full'>
          <ResizablePanel
            defaultSize={30}
            minSize={6}
            maxSize={18}>
            <div className='flex h-full items-center justify-center'>
              <Menu />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={75}
            minSize={30}>
            <div className='flex h-full items-center justify-center p-6'>
              <span className='font-semibold'>Content </span>
              {children}
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
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
