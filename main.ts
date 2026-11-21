// news-image-20261121 — front-page publisher.
//
// The entry is a single pre-rendered front page, entry.png, stored next to
// this file. This program proves the image fits the bounty gate (a real PNG,
// no side over 1024 px, no more than 1 MiB) and then places an exact copy at
// /output/entry.png for the grader to read.
//
// This commit is the frame entry: it carries the kit starter image so the
// entry is locked in early on the morning of 21 November 2026. The final
// poster, built from the full day's news of Saturday 21 November 2026, will
// replace entry.png the next morning before the deadline.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PNG_SIGNATURE = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);
const SIDE_LIMIT = 1024;
const BYTE_LIMIT = 1024 * 1024;

type PageSize = { width: number; height: number };

function hasIendTrailer(image: Buffer): boolean {
  if (image.length < 12) return false;
  const tail = image.subarray(image.length - 12);
  return tail.readUInt32BE(0) === 0 && tail.toString("latin1", 4, 8) === "IEND";
}

function pageSize(image: Buffer): PageSize {
  const signatureOk = image
    .subarray(0, PNG_SIGNATURE.length)
    .equals(PNG_SIGNATURE);
  if (!signatureOk) {
    throw new Error("entry.png does not start with the PNG signature");
  }
  const chunkTag = image.toString("latin1", 12, 16);
  if (chunkTag !== "IHDR") {
    throw new Error("entry.png is missing its IHDR chunk");
  }
  return { width: image.readUInt32BE(16), height: image.readUInt32BE(20) };
}

function publish(): void {
  const root = dirname(fileURLToPath(import.meta.url));
  const sourcePath = join(root, "entry.png");
  if (!existsSync(sourcePath)) {
    throw new Error("entry.png is missing from the repo root");
  }
  const image = readFileSync(sourcePath);
  if (image.length > BYTE_LIMIT) {
    throw new Error(`entry.png is ${image.length} bytes, past the 1 MiB limit`);
  }
  const { width, height } = pageSize(image);
  if (!hasIendTrailer(image)) {
    throw new Error("entry.png is truncated: no IEND trailer at the end");
  }
  if (width > SIDE_LIMIT || height > SIDE_LIMIT) {
    throw new Error(`front page is ${width} by ${height}, past the 1024 limit`);
  }
  const destination = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(destination, { recursive: true });
  const targetPath = join(destination, "entry.png");
  writeFileSync(targetPath, image);
  const roundTrip = readFileSync(targetPath);
  if (!roundTrip.equals(image)) {
    throw new Error("the published copy differs from entry.png");
  }
  console.log(
    `front page published: ${width}x${height}, ${image.length} bytes -> ${targetPath}`,
  );
}

publish();
