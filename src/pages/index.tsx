import Image from "next/image";
import { Inter } from "next/font/google";
import Login from "@/components/login-btn";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.status !== "authenticated") {
      router.push("/auth/login");
    }
  });
  return (
    <main>
      <div>
        <Login />
      </div>
    </main>
  );
}
