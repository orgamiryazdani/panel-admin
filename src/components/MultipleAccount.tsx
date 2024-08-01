import { useState, useEffect } from "react";
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
import { Check, ChevronsUpDown, Mail } from "lucide-react";
import { cn } from "../lib/utils";
import truncateText from "../utils/truncateText";
import { UserAccount } from "../types/Auth";
import { cleanupOldAccounts } from "../utils/cleanupOldAccounts";

const MultipleAccount = () => {
  const [open, setOpen] = useState(false);
  const [allUserAccount, setAllUserAccount] = useState<UserAccount[]>([]);
  const [selectedEmail, setSelectedEmail] = useState("");

  useEffect(() => {
    cleanupOldAccounts(); // فراخوانی تابع پاکسازی
    const accounts = JSON.parse(
      localStorage.getItem("AllEmailAccount") || "[]",
    );
    setAllUserAccount(accounts);
    const selectedAccount = accounts.find(
      (account: UserAccount) => account.selected === true,
    );
    if (selectedAccount) {
      setSelectedEmail(selectedAccount.email);
    }
  }, []);

  const handleSelect = (email: string) => {
    const updatedAccounts = allUserAccount.map((account) => ({
      ...account,
      selected: account.email === email,
    }));

    setAllUserAccount(updatedAccounts);
    setSelectedEmail(email);
    localStorage.setItem("AllEmailAccount", JSON.stringify(updatedAccounts));
    setOpen(false);
    window.location.reload();
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between pr-2 mx-2'>
          <span className='flex items-center'>
            <Mail className='w-5 h-5 mr-2 mb-1' />
            {selectedEmail
              ? truncateText(selectedEmail, 16)
              : "لطفا یک اکانت اضافه کنید"}
          </span>
          <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[230px] p-0'>
        <Command>
          <CommandInput placeholder='جستجو ...' />
          <CommandEmpty>هیچ حسابی پیدا نشد</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {allUserAccount.length > 0 ? (
                allUserAccount.map((account) => (
                  <CommandItem
                    key={account.email}
                    value={account.email}
                    onSelect={() => handleSelect(account.email)}>
                    <Check
                      className={cn(
                        "ml-2 h-4 w-4",
                        account.selected ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {account.email}
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