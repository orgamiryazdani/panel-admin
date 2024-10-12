import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizable";
import { ReactNode, Suspense, useEffect, useState } from "react";
import Menu, { MenuMobile } from "./Menu";
import { ProfileSkeleton } from "../components/common/Skeleton";
import Navbar from "./Navbar";

type props = {
  children: ReactNode;
  sidebar: ReactNode;
};

const AppLayout = ({ sidebar, children }: props) => {
  const [size, setSize] = useState(0);

  const [direction, setDirection] = useState<"horizontal" | "vertical">(
    "horizontal",
  );

  // Update direction based on screen size
  useEffect(() => {
    const updateDirection = () => {
      if (window.innerWidth < 768) {
        setDirection("vertical");
      } else {
        setDirection("horizontal");
      }
    };

    // Initial check
    updateDirection();

    // Add event listener to handle window resize
    window.addEventListener("resize", updateDirection);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateDirection);
    };
  }, []);

  return (
    <div className='w-[100svw] h-[100svh] max-w-[1800px] flex items-center justify-center'>
      <ResizablePanelGroup
        direction={direction}
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
          {direction === "horizontal" && <Menu size={size} />}
        </ResizablePanel>
        <ResizableHandle
          withHandle
          className='md:flex hidden'
        />
        {/* menu mobile */}
        {direction === "horizontal" && <MenuMobile />}
        {/* account menu */}
        <div className='w-full h-16 border-b md:hidden'>
          <Suspense fallback={<ProfileSkeleton />}>
            <Navbar />
          </Suspense>
        </div>
        {/* content */}
        <ResizablePanel
          defaultSize={75}
          minSize={38}>
          <div className='h-full relative'>{children}</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        {/* sidebar */}
        <ResizablePanel
          defaultSize={60}
          minSize={29}
          className='md:min-w-80'>
          <div className='w-full h-[10%] min-h-12 border-b hidden md:flex max-h-16'>
            <Suspense fallback={<ProfileSkeleton />}>
              <Navbar />
            </Suspense>
          </div>
          <div className='flex h-[90%] items-start justify-center p-6 overflow-y-auto overflow-x-hidden'>
            {sidebar}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default AppLayout;
