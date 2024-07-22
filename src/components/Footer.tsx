import Image from "next/image";
// import ThemeToggle from "@/components/Theme/ThemeToggle";
// import { useRouter } from "next/router";

export default function Footer() {
  // const router = useRouter();
  return (
    <div className="flex flex-row justify-center w-screen h-16 items-center border-t-[1.5px] custom-border-color gap-4">
      Copyrights Reserved by <p className="font-bold">

      </p>
      {/* <Image
        className="hover:cursor-pointer"
        src="/LankaWikiShortBlackLogo.png"
        alt="Logo"
        width={50}
        height={40}
        onClick={() => router.push("/")}
      /> */}
    </div>
  );
}
