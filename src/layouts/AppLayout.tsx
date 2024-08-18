import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizable";
import { ReactNode, useEffect, useState } from "react";
import Menu, { MenuMobile } from "./Menu";
import AccountMenu from "../components/account/AccountMenu";
import ProductDetails from "../components/products/ProductDetails";

type props = {
  children: ReactNode;
};

const AppLayout = ({ children }: props) => {
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
    <div className='w-[100svw] h-[100svh] flex items-center justify-center'>
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
          <Menu size={size} />
        </ResizablePanel>
        <ResizableHandle
          withHandle
          className='md:flex hidden'
        />
        {/* menu mobile */}
        <MenuMobile />
        {/* account menu */}
        <div className='w-full h-16 border-b md:hidden'>
          <AccountMenu />
        </div>
        {/* content */}
        <ResizablePanel
          defaultSize={75}
          minSize={38}>
          <div className='h-full'>{children}</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        {/* sidebar */}
        <ResizablePanel
          defaultSize={60}
          minSize={29}
          className='md:min-w-80'>
          <div className='w-full h-[10%] border-b hidden md:flex'>
            <AccountMenu />
          </div>
          <div className='flex h-[90%] items-start justify-center p-6 overflow-y-scroll overflow-x-hidden'>
            <ProductDetails />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default AppLayout;
