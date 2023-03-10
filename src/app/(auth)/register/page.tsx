"use client";

import { auth } from "@/config/firebaseConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
import { HiExclamation, HiMail, HiOutlineLockClosed, HiUser } from "react-icons/hi";
import React from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useUploadFile } from "@/services/fileManager";
import { FirebaseError } from "firebase/app";
import i18n from "@/i18n";

export default function Page() {
  const router = useRouter();

  const FILE_SIZE = 1600 * 1024; // 160 KB
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png",
  ];

  const schema = yup
    .object({
      email: yup.string().email().required(),
      username: yup.string().required(),
      password: yup.string().min(6).required(),
      image: yup
        .mixed<FileList>()
        .test("fileSize", "File too large", (value: any) => {
          return (
            value.length === 0 ||
            value.length >= 1 &&
            value[0].size <= FILE_SIZE
          );
        })
        .test(
          "fileFormat",
          "Unsupported Format",
          (value: any) =>
            value.length === 0 ||
            value.length >= 1 &&
            SUPPORTED_FORMATS.includes(value[0].type)
        )

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



  // const register = async (
  //   username: string,
  //   password: string,
  //   displayName: string,
  //   picture: File | null
  // ): Promise<void> => {
  //   const user = await useSignUp(username, password);
  //   const pictureUrl = picture
  //     ? await attachPictureProfile(user, picture)
  //     : defaultPhotoUrl;
  //   await updateProfile(user, {
  //     displayName: displayName,
  //     photoURL: pictureUrl,
  //   });
  // };


  async function onSubmit(data: FormData) {

    const picture = (data.image && data.image?.length > 0) ? data.image[0] : null;

    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, {
          displayName: data.username,
        });
        return user;
      });

      const pictureUrl = picture ? await useUploadFile(picture, user.uid + "/pictureProfile/") : null;

      await updateProfile(user, {
        photoURL: pictureUrl,
      });

      router.push("/login");
    } catch (error: any) {
      const { code, message } = error;

      const translatedMessage = code.startsWith('auth/') ? i18n.t(`errorMessages.${code}`) : message;

      setError("root.serverError", {
        message: translatedMessage,
      });
    }

  }



  // try {
  //   const user = await signup(data.email, data.password);

  //   const pictureUrl = picture
  //     ? await useUploadFile(picture, user.uid + "/pictureProfile/")
  //     : defaultPhotoUrl;
  //   await updateProfile(user, {
  //     displayName: data.username,
  //     photoURL: pictureUrl,
  //   });
  //   router.push("/login");
  // } catch (err: any) {
  //   setError("root.serverError", {
  //     message: err.message ?? "Unknown error",
  //   });

  // // Create user
  // const user = await signup(data.email, data.password);

  // // Upload picture and get picture url
  // const pictureUrl = picture
  //   ? await useUploadFile(picture, user + "pictureProfile/")
  //   : defaultPhotoUrl;

  // // Finally update profile (displayName and photoURL)
  // await updateProfile(user, {
  //   displayName: data.username,
  //   photoURL: pictureUrl,
  // });

  // await signUp(data.email, data.password, data.username, picture).then(
  //   () => {
  //     router.push("/");
  //   }
  // ).catch((err) => {
  //   setError("root.serverError", {
  //     message: err.message,
  //   });
  // });



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
              icon={HiUser}
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
      </Card>
    </div>
  );
}
