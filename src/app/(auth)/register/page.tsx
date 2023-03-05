"use client";

import { auth } from "@/lib/firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Label,
  TextInput,
  Card,
  Toast,
  FileInput,
} from "flowbite-react";
import { HiExclamation, HiMail, HiOutlineLockClosed } from "react-icons/hi";
import React from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const FILE_SIZE = 1600 * 1024; // 160 KB
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];

  const schema = yup
    .object({
      email: yup.string().email().required(),
      username: yup.string().required(),
      password: yup.string().min(6).required(),
      image: yup
        .mixed()
        .test("fileSize", "File too large", (value: any) => {
          console.log("value", value);
          console.log(value.length == 0);
          return (
            value.length == 0 ||
            (value instanceof FileList &&
              value.length >= 1 &&
              value[0].size <= FILE_SIZE)
          );
        })
        .optional()
        .test(
          "fileFormat",
          "Unsupported Format",
          (value: any) =>
            value.length == 0 ||
            (value instanceof FileList &&
              value.length >= 1 &&
              SUPPORTED_FORMATS.includes(value[0].type))
        )
        .optional()
        .default(null),
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
    console.log("data", data);
    // const status = await signIn("credentials", {
    //   redirect: false,
    //   username: data.email,
    //   password: data.password,
    //   callbackUrl: "/",
    // });
    // if (status?.ok) {
    //   router.push("/");
    // } else {
    //   setError("root.serverError", {
    //     message: status?.error ?? "Something went wrong",
    //   });
    // }
  }

  // const signUp = async () => {
  //   // const { user } = await createUserWithEmailAndPassword(
  //   //   auth,
  //   //   email,
  //   //   password
  //   // );

  //   await updateProfile(user, {
  //     displayName: "John Doe",
  //     photoURL: "https://example.com/john-doe.png",
  //   });
  // };
  // console.log("auth");

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

          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="username1"
                value="Your username"
                color={errors.username ? "failure" : ""}
              />
            </div>
            <TextInput
              id="username1"
              type="text"
              required={true}
              color={errors.username ? "failure" : ""}
              icon={HiOutlineLockClosed}
              placeholder="John Doe"
              {...register("username")}
              helperText={
                errors.username && (
                  <React.Fragment>
                    <span className="font-medium">Oops!</span>{" "}
                    {errors.username?.message}
                  </React.Fragment>
                )
              }
            />
          </div>

          <div id="fileUpload">
            <div className="mb-2 block">
              <Label
                htmlFor="file"
                value="Upload file"
                color={errors.image ? "failure" : ""}
              />
            </div>
            <FileInput
              helperText={
                errors.image && (
                  <React.Fragment>
                    <span className="font-medium">Oops!</span>{" "}
                    {errors.image?.message}
                  </React.Fragment>
                )
              }
              id="file"
              color={errors.image ? "failure" : ""}
              {...register("image")}
            />
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              A profile picture is useful to confirm your are logged into your
              account
            </p>
          </div>

          <Button type="submit">Sign In with credentials</Button>
        </form>

        <p className="text-center text-gray-400 ">
          Already have an account ?{" "}
          <Link href={"/login"} className="text-blue-700">
            Sign Up
          </Link>
        </p>

        <div className="my-2 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
            OR
          </p>
        </div>
      </Card>
    </div>
  );
}
