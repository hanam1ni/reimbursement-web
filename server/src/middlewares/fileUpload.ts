import multer from "multer";

const upload = multer({ dest: "temp/uploads/" });

export const fileUpload = (name: string, fileLimit: number) =>
  upload.array(name, fileLimit);
