import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { useTheme } from "../context/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const handleSwitchChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div
      className='flex items-center space-x-2 justify-between px-3 border-t py-3'
      dir='ltr'>
      <Switch
        onToggle={handleSwitchChange}
        isDarkMode={theme === "dark"}
      />
      <Label htmlFor='airplane-mode'>تغییر تم برنامه</Label>
    </div>
  );
}
