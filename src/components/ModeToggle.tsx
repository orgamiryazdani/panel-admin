import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useTheme } from "../context/ThemeProvider";
import { sizeType } from "../types/GlobalTypes";
import { memo } from "react";

export const ModeToggle = memo(({ size }: sizeType) => {
  const { theme, setTheme } = useTheme();
  const handleSwitchChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  
  return (
    <div
      className={`flex items-center space-x-2 px-3 border-t pt-3 md:pt-0 w-full h-[7%] min-h-10 ${
        size < 15 ? "justify-center" : "justify-between"
      }`}
      dir='ltr'>
      <Switch
        onToggle={handleSwitchChange}
        isDarkMode={theme === "dark"}
        checked={theme !== "dark" ? true : false}
      />
      {size > 15 && <Label htmlFor='airplane'>تغییر تم برنامه</Label>}
    </div>
  );
});