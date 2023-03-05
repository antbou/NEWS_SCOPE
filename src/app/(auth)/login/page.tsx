"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Label, TextInput, Card, Toast } from "flowbite-react";
import { HiExclamation, HiMail, HiOutlineLockClosed } from "react-icons/hi";
import React from "react";

export default function Page() {
  const router = useRouter();

  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  type FormData = yup.InferType<typeof schema>;

  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data: FormData) {
    const status = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
      callbackUrl: "/",
    });

    if (status?.ok) {
      router.push("/");
    } else {
      setError("root.serverError", {
        message: status?.error ?? "Something went wrong",
      });
    }
  }

  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: process.env.NEXT_PUBLIC_HOME_URL });
  }

  async function handleGithubSignin() {
    signIn("github", { callbackUrl: process.env.NEXT_PUBLIC_HOME_URL });
  }

  return (
    <div className="flex">
      <Card className="w-auto md:w-96 mt-5">
        {errors.root && (
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
              <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              <p className="text-gray-900 dark:text-gray-100">
                {errors.root.serverError?.message}
              </p>
            </div>
            <Toast.Toggle />
          </Toast>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="email1"
                value="Your email"
                color={errors.email ? "failure" : ""}
              />
            </div>
            <TextInput
              id="email1"
              type="text"
              placeholder="example@email.com"
              required={true}
              icon={HiMail}
              helperText={
                errors.email && (
                  <React.Fragment>
                    <span className="font-medium">Oops!</span>{" "}
                    {errors.email?.message}
                  </React.Fragment>
                )
              }
              color={errors.email ? "failure" : ""}
              {...register("email")}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password1"
                value="Your password"
                color={errors.password ? "failure" : ""}
              />
            </div>
            <TextInput
              id="password1"
              type="password"
              required={true}
              color={errors.password ? "failure" : ""}
              icon={HiOutlineLockClosed}
              placeholder="********"
              {...register("password")}
              helperText={
                errors.password && (
                  <React.Fragment>
                    <span className="font-medium">Oops!</span>{" "}
                    {errors.password?.message}
                  </React.Fragment>
                )
              }
            />
          </div>

          <Button type="submit">Sign In with credentials</Button>
        </form>

        <p className="text-center text-gray-400 ">
          Don't have an account yet?{" "}
          <Link href={"/register"} className="text-blue-700">
            Sign Up
          </Link>
        </p>

        <div className="my-2 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
            OR
          </p>
        </div>

        <Button
          size="xl"
          className="w-full"
          onClick={handleGoogleSignin}
          color="light"
        >
          Sign In with Google
          <Image
            src={"/google.svg"}
            width="20"
            height={20}
            alt={"Google logo"}
            className="ml-2 h-5 w-5"
          ></Image>
        </Button>
        <Button
          size="xl"
          className="w-full"
          onClick={handleGithubSignin}
          color="light"
        >
          Sign In with Github
          <Image
            src={"/github.svg"}
            width="20"
            height={20}
            alt={"Google logo"}
            className="ml-2 h-5 w-5"
          ></Image>
        </Button>
      </Card>
    </div>
  );
}
