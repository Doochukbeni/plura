"use client";

import {
  AgencySidebarOption,
  SubAccount,
  SubAccountSidebarOption,
} from "@prisma/client";
import React, { useEffect, useMemo, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  ChevronsUpDown,
  CompassIcon,
  Menu,
  PlusCircleIcon,
} from "lucide-react";
import clsx from "clsx";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Compass from "../icons/compass";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import Link from "next/link";

type MenuOptionsType = {
  defaultOpen?: boolean;
  subAccount: SubAccount[];
  sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[];
  sidebarLogo: string;
  details: any;
  user: any;
  id: string;
};

const MenuOptions = ({
  details,
  id,
  sidebarLogo,
  sidebarOpt,
  subAccount,
  user,
  defaultOpen,
}: MenuOptionsType) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;
  return (
    <Sheet modal={false} {...openState}>
      <SheetTrigger
        asChild
        className="absolute left-4 top-4 z-[100] md:hidden flex"
      >
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent
        showX={!defaultOpen}
        side="left"
        className={clsx(
          "bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6",
          {
            "hidden md:inline-block z-0 w-[300px] ": defaultOpen,
            "inline-block md:hidden z-[100] w-full": !defaultOpen,
          }
        )}
      >
        <AspectRatio ratio={16 / 5}>
          <Image
            src={sidebarLogo}
            alt="Sidebar Logo"
            fill
            className="rounded-md object-contain"
          />
        </AspectRatio>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="w-full my-4 flex items-center justify-between"
              variant="ghost"
            >
              <div className="flex items-center text-left gap-2">
                <CompassIcon />
                <div className="flex flex-col">
                  {details.name}
                  <span className="text-muted-foreground">
                    {details.address}
                  </span>
                </div>
              </div>
              <div>
                <ChevronsUpDown size={16} className="text-muted-foreground" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 h-80 mt-4 z-[200]">
            <Command className="rounded-lg">
              <CommandInput placeholder="Search Account ..." />
              <CommandList className="pb-16">
                <CommandEmpty>No results found</CommandEmpty>

                {user?.role === "AGENCY_OWNER" ||
                  (user?.role === "AGENCY_ADMIN" && user?.agency && (
                    <CommandGroup heading="Agency">
                      <CommandItem className="!bg-transparent my-2 text-primary border-[1px] border-border p-2 rounded-md hover:!bg-muted cursor-pointer transition-all">
                        {defaultOpen ? (
                          <Link
                            href={`/agency/${user?.agency?.id}`}
                            className="flex gap-4 w-full h-full"
                          >
                            <div className="relative w-16">
                              <Image
                                src={user.agency.agencyLogo}
                                alt="Agency logo"
                                fill
                                className="object-contain rounded-md"
                              />
                            </div>
                            <div className="flex flex-col flex-1">
                              {user?.agency?.name}
                              <span className="text-muted-foreground">
                                {user?.agency?.address}
                              </span>
                            </div>
                          </Link>
                        ) : (
                          <SheetClose asChild>
                            <Link
                              href={`/agency/${user?.agency?.id}`}
                              className="flex gap-4 w-full h-full"
                            >
                              <div className="relative w-16">
                                <Image
                                  src={user.agency.agencyLogo}
                                  alt="Agency logo"
                                  fill
                                  className="object-contain rounded-md"
                                />
                              </div>
                              <div className="flex flex-col flex-1">
                                {user?.agency?.name}
                                <span className="text-muted-foreground">
                                  {user?.agency?.address}
                                </span>
                              </div>
                            </Link>
                          </SheetClose>
                        )}
                      </CommandItem>
                    </CommandGroup>
                  ))}

                <CommandGroup heading="Accounts">
                  {!!subAccount
                    ? subAccount.map((subaccount) => (
                        <CommandItem key={subaccount.id}>
                          {defaultOpen ? (
                            <Link
                              href={`/subaccount/${subaccount?.id}`}
                              className="flex gap-4 w-full h-full"
                            >
                              <div className="relative w-16">
                                <Image
                                  src={subaccount?.subAccountLogo}
                                  alt="subaccount logo"
                                  fill
                                  className="object-contain rounded-md"
                                />
                              </div>
                              <div className="flex flex-col flex-1">
                                {subaccount?.name}
                                <span className="text-muted-foreground">
                                  {subaccount?.address}
                                </span>
                              </div>
                            </Link>
                          ) : (
                            <SheetClose asChild>
                              <Link
                                href={`/subaccount/${subaccount?.id}`}
                                className="flex gap-4 w-full h-full"
                              >
                                <div className="relative w-16">
                                  <Image
                                    src={subaccount?.subAccountLogo}
                                    alt="subaccount logo"
                                    fill
                                    className="object-contain rounded-md"
                                  />
                                </div>
                                <div className="flex flex-col flex-1">
                                  {subaccount?.name}
                                  <span className="text-muted-foreground">
                                    {subaccount?.address}
                                  </span>
                                </div>
                              </Link>
                            </SheetClose>
                          )}
                        </CommandItem>
                      ))
                    : "No account found"}
                </CommandGroup>
              </CommandList>

              {(user?.role === "AGENCY_OWNER" ||
                user?.role === "AGENCY_ADMIN") && (
                <Button className="w-full flex gap-2">
                  <PlusCircleIcon size={15} />
                  Create Sub-Account
                </Button>
              )}
            </Command>
          </PopoverContent>
        </Popover>
      </SheetContent>
    </Sheet>
  );
};

export default MenuOptions;
