import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/utils";
import truncateText from "../utils/truncateText";

const accounts = [
  { value: "account1", label: "Account 1" },
  { value: "account2", label: "Account 2" },
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
          className='w-full justify-between pr-2  mx-2'>
          {value
            ? accounts.find((account) => account.value === value)?.label
            : truncateText("orgamiryazdani@gmail.com", 16)}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[230px] p-0'>
        <Command>
          <CommandInput placeholder='جستجو ...' />
          <CommandEmpty>هیچ حسابی پیدا نشد</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {accounts.length > 0 ? (
                accounts.map((account) => (
                  <CommandItem
                    key={account.value}
                    value={account.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}>
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
                <div></div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultipleAccount;
