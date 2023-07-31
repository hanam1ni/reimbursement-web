import ExpenseClaimAttachment from "@/entities/ExpenseClaimAttachment";
import { entityManager } from "@/lib/db";
import { client } from "@/services/s3/client";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";
import { v4 as uuid } from "uuid";

export const generateAttachmentUrl = async (
  attachment: ExpenseClaimAttachment
) => {
  try {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: attachment.url,
      ResponseContentDisposition: `attachment; filename ="${attachment.name}"`,
    };

    const url = await getSignedUrl(client, new GetObjectCommand(params), {
      expiresIn: 60,
    });
    return url;
  } catch (error) {
    throw error;
  }
};

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
        throw error;
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
