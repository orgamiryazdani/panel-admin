import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { useTheme } from "../context/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const handleSwitchChange = (check: boolean) => {
    setTheme(check ? "light" : "dark");
  };
  return (
    <div className='flex items-center space-x-2 justify-between pr-3 border-t py-3'>
      <Label htmlFor='airplane-mode'>تغییر تم برنامه</Label>
      <Switch
        dir='ltr'
        id='airplane-mode'
        onCheckedChange={handleSwitchChange}
        checked={theme === "light" ? true : false}
      />
    </div>
  );
}
