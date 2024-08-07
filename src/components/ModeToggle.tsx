import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useTheme } from "../context/ThemeProvider";
import { sizeType } from "../types/GlobalTypes";

export function ModeToggle({ size }: sizeType) {
  const { theme, setTheme } = useTheme();
  const handleSwitchChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div
      className={`flex items-center space-x-2 px-3 border-t py-3 w-full ${
        size < 15 ? "justify-center" : "justify-between"
      }`}
      dir='ltr'>
      <Switch
        onToggle={handleSwitchChange}
        isDarkMode={theme === "dark"}
        checked={theme !== "dark" ? true :false}
      />
      {size > 15 && <Label htmlFor='airplane-mode'>تغییر تم برنامه</Label>}
    </div>
  );
}
