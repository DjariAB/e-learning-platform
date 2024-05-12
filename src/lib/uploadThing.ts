import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter, ourFileRouter } from "@/app/api/uploadthing/core";

export const { useUploadThing,uploadFiles } = generateReactHelpers<OurFileRouter>();


export type uploadRoutesType=keyof typeof ourFileRouter