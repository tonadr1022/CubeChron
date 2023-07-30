import React, { FormEvent } from "react";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ThemeSwitch from "@/components/ThemeSwitch";

export default function Login() {
  const session = useSession();
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   if (session?.status === "authenticated") {
  //     router.push("/");
  //   }
  // });
  const loginUser = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error(callback.error);
      }
      if (callback?.ok && !callback?.error) {
        // toast.success("Logged in successfully!");
        router.push("/");
      }
    });
  };

  return (
    <>
      <ThemeSwitch />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-10 w-auto"
            src="/pwa-512x512.png"
            alt="CubeChron Logo"
            width={300}
            height={300}
          />
          <h2 className="mt-10 text-center font-bold leading-9 tracking-tight  text-2xl">
            Sign in to CubeChron
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col text-center">
          <form className="form-control space-y-6" onSubmit={loginUser}>
            <div>
              <label htmlFor="email" className="label text-sm text-start">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  required
                  placeholder="name@email.com"
                  className="input input-bordered input-primary w-full rounded-md "
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="label text-sm text-start">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="input input-bordered input-primary w-full rounded-md"
                />
              </div>
            </div>
            <div>
              <button type="submit" className="btn btn-primary px-6">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
