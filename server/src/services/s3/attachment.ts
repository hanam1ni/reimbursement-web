import ExpenseClaimAttachment from "@/entities/ExpenseClaimAttachment";
import { entityManager } from "@/lib/db";
import { client } from "@/services/s3/client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import { v4 as uuid } from "uuid";

export const uploadExpenseClaimAttachments = async (
  attachments: ExpenseClaimAttachment[]
) => {
  return await Promise.all(
    attachments.map(async (attachment) => {
      try {
        const objectKey = `ExpenseClaimAttachment/${
          attachment.expenseClaim.id
        }/${uuid()}-${attachment.name}`;
        const localPath = attachment.localPath as string;

        const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: objectKey,
          Body: fs.readFileSync(localPath),
        };

        await client.send(new PutObjectCommand(params));

        cleanupFileUpload(localPath);

        attachment.processedAt = new Date();
        attachment.url = objectKey;
        attachment.localPath = null;
        await entityManager.flush();
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
      }
    })
  );
};

const cleanupFileUpload = async (path: string) => {
  const resultHandler = (err: NodeJS.ErrnoException | null, path: string) => {
    if (err) {
      console.error(`[ERROR]: Failed to remove ${path}`, err);
    }
  };

  fs.unlink(path, (err) => resultHandler(err, path));
};
