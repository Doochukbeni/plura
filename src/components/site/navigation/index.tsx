import { buttonVariants } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "../../global/ModeToggle";

type Props = {
  user?: null | User;
};

const Navigation = ({ user }: Props) => {
  console.log(user);

  return (
    <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-10">
      <aside className="flex items-center gap-2">
        <Image
          src="/assets/plura-logo.svg"
          alt="plura logo"
          height={40}
          width={40}
        />
        <span className="text-xl font-bold">Plura.</span>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
          <Link href="#">Pricing</Link>
          <Link href="#">About</Link>
          <Link href="#">Documentation</Link>
          <Link href="#">Features</Link>
        </ul>
      </nav>
      <aside className="flex  gap-2 items-center">
        {!user && (
          <Link href="/agency" className={buttonVariants()}>
            Login
          </Link>
        )}

        <UserButton />
        <ModeToggle />
      </aside>
    </div>
  );
};

export default Navigation;
