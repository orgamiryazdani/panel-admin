import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { useTheme } from "../context/theme-provider";
import { sizeType } from "../types/GlobalTypes";

export function ModeToggle({ size }: sizeType) {
  const { theme, setTheme } = useTheme();
  const handleSwitchChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div
      className={`flex items-center space-x-2 px-3 border-t py-3 w-full ${size < 15 ? "justify-center" : "justify-between"}`}
      dir='ltr'>
      <Switch
        onToggle={handleSwitchChange}
        isDarkMode={theme === "dark"}
      />
      {size > 15 && <Label htmlFor='airplane-mode'>تغییر تم برنامه</Label>}
    </div>
  );
}