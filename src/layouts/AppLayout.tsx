import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizable";
import { ReactNode } from "react";

type props = {
  children: ReactNode;
};

const AppLayout = ({ children }: props) => {
  return (
    <div className='w-[100svw] h-[100svh] flex items-center justify-center'>
      <ResizablePanelGroup
        direction='horizontal'
        className='h-full w-full bg-red-500'>
        <ResizablePanel
          defaultSize={25}
          minSize={6}
          maxSize={18}>
          <div className='flex h-full items-center justify-center p-6 bg-purple-500'>
            <span className='font-semibold'>menu</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={75}
          minSize={30}>
          <div className='flex h-full items-center justify-center p-6 bg-blue-500'>
            <span className='font-semibold'>Content </span>
            {children}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={60}
          minSize={25}>
          <div className='flex h-full items-center justify-center p-6 bg-green-500'>
            <span className='font-semibold'>Sidebar</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default AppLayout;