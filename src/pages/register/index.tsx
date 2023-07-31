import { FormEvent, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const registerUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.password !== data.passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    axios
      .post("/api/register", data)
      .then(() => router.push("/login"))
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex min-h-full flex-1 flex-col items-center  px-6 pt-6 lg:px-8">
        <div className="prose max-w-sm">
          <Image
            className="mx-auto h-16 w-auto m-0"
            src="/pwa-512x512.png"
            alt="CubeChron Logo"
            width={30}
            height={30}
          />
          <h2 className="my-2">Register</h2>
        </div>
        <div className="flex flex-col text-center mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-2" onSubmit={registerUser}>
            <div>
              <label
                htmlFor="name"
                className="label block text-sm text-start pb-0">
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
              <label
                htmlFor="email"
                className="label block text-sm text-start pb-0">
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
                  className="input input-bordered input-primary block w-full rounded-md"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="label text-sm text-start pb-0">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="input input-bordered input-primary w-full rounded-md"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="passwordConfirm"
                className="label text-sm text-start pb-0">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="passwordConfirm"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={data.passwordConfirm}
                  onChange={(e) =>
                    setData({ ...data, passwordConfirm: e.target.value })
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
            <div>
              Have an Account?{" "}
              <Link className="link" href={"/login"}>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
