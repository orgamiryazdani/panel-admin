import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import truncateText from "../utils/truncateText";

const accounts = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const MultipleAccount = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'>
          {value
            ? accounts.find((account) => account.value === value)?.label
            : truncateText("orgamiryazdani@gmail.com", 16)}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='جستجو حساب...' />
          <CommandEmpty>هیچ حسابی پیدا نشد.</CommandEmpty>
          <CommandGroup>
            {accounts.length > 0 ? (
              accounts.map((account) => (
                <CommandItem
                  key={account.value}
                  value={account.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === account.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {account.label}
                </CommandItem>
              ))
            ) : (
              <div>حساب مورد نظر پیدا نشد.</div>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultipleAccount;
