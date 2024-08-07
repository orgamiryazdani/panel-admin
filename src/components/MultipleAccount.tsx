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
import { Check, ChevronsUpDown, Mail } from "lucide-react";
import { cn } from "../lib/utils";
import truncateText from "../utils/truncateText";
import { sizeType } from "../types/GlobalTypes";
import { useAccount } from "../context/AccountProvider";
import { UserAccount } from "../types/Auth";

const MultipleAccount = ({ size }: sizeType) => {
  const [open, setOpen] = useState(false);
  const { allUserAccount, changeAccount } = useAccount();
  const selectedAccount = allUserAccount.find(
    (account: UserAccount) => account.selected === true,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`${
            size < 15.1 ? "!w-10 justify-center" : "lg:w-full justify-between"
          } pr-2 mx-2 md:w-40 w-full md:text-xs text-sm lg:text-sm`}
        >
          <span className="flex items-center">
            <Mail className="w-5 h-5 md:mr-2 md:mb-1 mx-2 md:mx-0" />
            {size < 15.1
              ? null
              : selectedAccount
              ? truncateText(selectedAccount.email, 12)
              : "لطفا یک اکانت اضافه کنید"}
          </span>
          {size < 15.1 ? null : (
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="!w-fit md:w-52 p-0">
        <Command>
          <CommandInput placeholder="جستجو ..." />
          <CommandEmpty>هیچ حسابی پیدا نشد</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {allUserAccount.length > 0 ? (
                allUserAccount.map((account) => (
                  <CommandItem
                    key={account.email}
                    value={account.email}
                    className={`mt-2 ${account.selected && "bg-accent"}`}
                    onSelect={() => changeAccount(account.email)}
                  >
                    <Check
                      className={cn(
                        "ml-2 h-4 w-4",
                        account.selected ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {truncateText(account.email, 22)}
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
