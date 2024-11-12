"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      <div className="flex items-center gap-10">
        <Image
          src="/logo.svg"
          alt="Finance AI"
          width={173}
          height={39}
          className={
            pathname === "/transactions"
              ? "font-bold text-primary underline"
              : "text-primary-foreground"
          }
        />
        <Link
          href="/"
          className={
            pathname === "/"
              ? "font-bold text-primary underline"
              : "text-primary-foreground"
          }
        >
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className={
            pathname === "/transactions"
              ? "font-bold text-primary underline"
              : "text-primary-foreground"
          }
        >
          Transactions
        </Link>
        <Link href="/subscription">Assinatura</Link>
      </div>
      <UserButton showName />
    </nav>
  );
};

export default Navbar;