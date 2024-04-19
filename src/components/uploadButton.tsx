/* eslint-disable @typescript-eslint/prefer-optional-chain */
"use client";

import { useState } from "react";
// import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
// import { Button } from "./ui/button";
import Dropzone from "react-dropzone";
import { Cloud, File, Loader2 } from "lucide-react";
import { Progress } from "./ui/progress";
import { useUploadThing } from "@/lib/uploadThing";
// import { useToast } from "./ui/use-toast";
// import { useRouter } from "next/navigation";
// import { db } from "@/server/db";

export const UploadDropzone = ({ lessonId }: { lessonId: string }) => {
  // const router = useRouter();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  // const { toast } = useToast();
  const { startUpload } = useUploadThing("imageUploader", {
    headers: { lessonId },
    onUploadBegin: () => {
      setIsUploading(true);
    },
    onClientUploadComplete: () => {
      setIsUploading(false);
    },
    onUploadProgress(p) {
      if (p === 100) setUploadProgress(100);
    },
    onUploadError: () => {
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

        // handle file uploading

        await startUpload(acceptedFiles);

        // if (!res[0]) {
        //   console.log("something went wrong please try again ");
        //   return;
        // }

        // const key = fileResponse?.key;

        // if (!key)
        //   return toast({
        //     title: "Something went wrong",
        //     description: "Please try again later",
        //     variant: "destructive",
        //   });

        // console.log(res[0].key);
        clearInterval(progressInterval);

        // setUploadProgress(100);

        // startPolling({ key });
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
                <p className=" text-xs text-zinc-500">PDF (up to 4MB)</p>
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
// const UploadButton = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   return (
//     <Dialog
//       open={isOpen}
//       onOpenChange={(v) => {
//         if (!v) setIsOpen(v);
//       }}
//     >
//       {" "}
//       <DialogTrigger onClick={() => setIsOpen(true)} asChild>
//         <Button> Upload pdf</Button>
//       </DialogTrigger>
//       <DialogContent>
//         <UploadDropzone />
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default UploadButton;
