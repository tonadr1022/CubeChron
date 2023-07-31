import { FormEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/router";
import ThemeSwitch from "@/components/ThemeSwitch";

export default function Register() {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/api/register", data)
      .then(() => router.push("/login"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="prose max-w-sm">
          <Image
            className="mx-auto h-10 w-auto"
            src="/pwa-512x512.png"
            alt="CubeChron Logo"
            width={300}
            height={300}
          />
          <h2>Register for an account</h2>
        </div>
        <div className="flex flex-col text-center mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={registerUser}>
            <div>
              <label htmlFor="name" className="label block text-sm text-start">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  required
                  placeholder="Joe Smith"
                  className="input input-bordered input-primary block w-full rounded-md "
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="label block text-sm text-start">
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
                  className="input input-bordered input-primary block w-full rounded-md "
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
            <div></div>
            <div>
              <button type="submit" className="btn btn-primary px-6">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
