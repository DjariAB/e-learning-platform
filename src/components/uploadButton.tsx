/* eslint-disable @typescript-eslint/prefer-optional-chain */
"use client";

import { useState } from "react";
// import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
// import { Button } from "./ui/button";
import Dropzone from "react-dropzone";
import { Cloud, File, Loader2 } from "lucide-react";
import { Progress } from "./ui/progress";
import { useUploadThing } from "@/lib/uploadThing";
import { revalidatePath } from "next/cache";
import { useToast } from "./ui/use-toast";
// import { useRouter } from "next/navigation";

export const UploadDropzone = ({ lessonId }: { lessonId: string }) => {
  // const router = useRouter();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { toast } = useToast();
  const { startUpload } = useUploadThing("contentUploader", {
    headers: { lessonId },
    onUploadBegin: () => {
      setIsUploading(true);
    },
    onClientUploadComplete: () => {
      setIsUploading(false);
      toast({ title: "File uploaded successfully" });
      revalidatePath(`/dashboard/${lessonId}`);
    },
    onUploadProgress(p) {
      if (p === 100) setUploadProgress(100);
    },
    onUploadError: (e) => {
      // toast({
      //   title: "Error while uploading the file",
      //   variant: "destructive",
      // });
      console.log(
        " your are in here and this is the cause of the error ",
        e.cause,
      );

      setIsError(true);
    },
  });
  // const {} = await uploadFiles("imageUploader");

  // const { mutate: startPolling } = trpc.getFile.useMutation({
  //   onSuccess: (file) => {
  //     router.push(`/dashboard/${file.id}`);
  //   },

  //   retry: true,
  //   retryDelay: 500,
  // });

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 250);
    return interval;
  };
  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFiles) => {
        const progressInterval = startSimulatedProgress();
        await startUpload(acceptedFiles);

        // if (!res[0]) {
        //   console.log("something went wrong please try again ");
        //   return;
        // }
        // const key = fileResponse?.key;
        clearInterval(progressInterval);
      }}
      disabled={isUploading}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className=" m-4 h-64 rounded-md border border-dashed border-gray-300 "
        >
          <div className=" flex h-full w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className=" flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-md bg-gray-50 hover:bg-gray-100"
            >
              <div className=" flex flex-col items-center justify-center pb-6 pt-5 ">
                <Cloud className=" mb-2 h-6 w-6 text-zinc-500" />

                <p className=" mb-2 text-sm text-zinc-700 ">
                  <span className=" font-semibold "> Click to upload </span>
                  or drag and drop
                </p>
                <p className=" text-xs text-zinc-500">MD file (up to 4MB)</p>
              </div>
              {acceptedFiles && acceptedFiles[0] ? (
                <div className=" flex max-w-xs items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-white outline outline-[-1px] outline-zinc-200 ">
                  <div className=" grid h-full place-items-center px-3 py-2 ">
                    <File className=" h-4 w-4 text-blue-500" />
                  </div>
                  <div className=" h-full truncate px-3 py-2 text-sm">
                    {acceptedFiles[0].name}
                  </div>{" "}
                </div>
              ) : null}

              {isUploading ? (
                <div className=" mx-auto mt-4 w-full max-w-xs">
                  <Progress
                    // indicatorColor={
                    //   uploadProgress === 100 ? "bg-green-500" : ""
                    // }
                    value={uploadProgress}
                    className=" h-1 w-full bg-zinc-200"
                  />
                  {uploadProgress === 100 ? (
                    <div className="flex items-center justify-center gap-1 pt-2 text-center text-sm text-zinc-700">
                      <Loader2 className=" h-3 w-3 animate-spin" />
                      Redirecting...
                    </div>
                  ) : null}
                </div>
              ) : null}

              <input
                type="file"
                id="dropzone-file"
                className="hidden"
                {...getInputProps}
              />
            </label>{" "}
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export const UploadImageDropZones = ({ courseId }: { courseId: string }) => {
  // const router = useRouter();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { toast } = useToast();
  const { startUpload } = useUploadThing("courseImageUploader", {
    headers: { courseId },
    onUploadBegin: () => {
      setIsUploading(true);
    },
    onClientUploadComplete: () => {
      setIsUploading(false);
      toast({ title: "File uploaded successfully" });
    },
    onUploadProgress(p) {
      if (p === 100) setUploadProgress(100);
    },
    onUploadError: (e) => {
      console.log(
        "this is the cause ",
        e.cause,
        "  and this is the message",
        e.message,
      );
      toast({
        title: "Error while uploading the file",
        variant: "destructive",
      });

      setIsError(true);
    },
  });
  // const {} = await uploadFiles("imageUploader");

  // const { mutate: startPolling } = trpc.getFile.useMutation({
  //   onSuccess: (file) => {
  //     router.push(`/dashboard/${file.id}`);
  //   },

  //   retry: true,
  //   retryDelay: 500,
  // });

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 250);
    return interval;
  };
  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFiles) => {
        const progressInterval = startSimulatedProgress();
        await startUpload(acceptedFiles);

        // if (!res[0]) {
        //   console.log("something went wrong please try again ");
        //   return;
        // }
        // const key = fileResponse?.key;
        clearInterval(progressInterval);
      }}
      disabled={isUploading}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className=" m-4 h-64 rounded-md border border-dashed border-gray-300 "
        >
          <div className=" flex h-full w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className=" flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-md bg-gray-50 hover:bg-gray-100"
            >
              <div className=" flex flex-col items-center justify-center pb-6 pt-5 ">
                <Cloud className=" mb-2 h-6 w-6 text-zinc-500" />

                <p className=" mb-2 text-sm text-zinc-700 ">
                  <span className=" font-semibold "> Click to upload </span>
                  or drag and drop
                </p>
                <p className=" text-xs text-zinc-500">Image (up to 4MB)</p>
              </div>
              {acceptedFiles && acceptedFiles[0] ? (
                <div className=" flex max-w-xs items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-white outline outline-[-1px] outline-zinc-200 ">
                  <div className=" grid h-full place-items-center px-3 py-2 ">
                    <File className=" h-4 w-4 text-blue-500" />
                  </div>
                  <div className=" h-full truncate px-3 py-2 text-sm">
                    {acceptedFiles[0].name}
                  </div>{" "}
                </div>
              ) : null}

              {isUploading ? (
                <div className=" mx-auto mt-4 w-full max-w-xs">
                  <Progress
                    // indicatorColor={
                    //   uploadProgress === 100 ? "bg-green-500" : ""
                    // }
                    value={uploadProgress}
                    className=" h-1 w-full bg-zinc-200"
                  />
                  {uploadProgress === 100 ? (
                    <div className="flex items-center justify-center gap-1 pt-2 text-center text-sm text-zinc-700">
                      Uploaded successfully
                    </div>
                  ) : null}
                </div>
              ) : null}

              <input
                type="file"
                id="dropzone-file"
                className="hidden"
                {...getInputProps}
              />
            </label>{" "}
          </div>
        </div>
      )}
    </Dropzone>
  );
};
