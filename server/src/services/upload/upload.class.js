import fs from "fs";
import { pipeline } from "stream/promises";
import { Readable } from "stream";
import path from "path";

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class UploadService {
  constructor(options, app) {
    this.options = options;
    this.app = app;
  }
  
  async create(stream, params) {
    // Convert Web ReadableStream to Node stream
    const nodeStream = Readable.fromWeb(stream);

    const contentTypeHeader =
      params?.headers?.["content-type"] ||
      params?.headers?.["Content-Type"] ||
      "application/octet-stream";
    const mimetype = String(contentTypeHeader).split(";")[0].trim().toLowerCase();

    const extensionByMimeType = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/gif": "gif",
      "image/webp": "webp",
      "application/pdf": "pdf",
      "text/plain": "txt",
      "application/json": "json",
    };
    const ext = extensionByMimeType[mimetype] || "bin";

    const uploadsDir = path.resolve(process.cwd(), "public", "uploads");
    await fs.promises.mkdir(uploadsDir, { recursive: true });

    const filename = `upload-${Date.now()}.${ext}`;
    const filePath = path.join(uploadsDir, filename);
    const writeStream = fs.createWriteStream(filePath);

    await pipeline(nodeStream, writeStream);

    return {
      uploaded: true,
      mimetype,
      filename,
      path: filePath,
      url: `/uploads/${filename}`,
    };
  }
}

export const getOptions = (app) => {
  return {};
};
