import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "../../lib/utils";
import { Moon, Sun } from "lucide-react";

const Switch = ({
  className,
  isDarkMode,
  onToggle,
  checked,
  ...props
}: {
  className?: string;
  isDarkMode: boolean;
  onToggle: () => void;
  checked: boolean;
}) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className,
    )}
    {...props}
    onClick={onToggle} checked={checked}>
    <SwitchPrimitives.Thumb
      className={cn(
        "relative block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}>
      <span className='absolute inset-0 flex items-center justify-center'>
        {isDarkMode ? (
          <Moon
            className=''
            size={15}
          />
        ) : (
          <Sun
            className='transition-opacity duration-200 data-[state=unchecked]:opacity-0'
            size={16}
          />
        )}
      </span>
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
);

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
