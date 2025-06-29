"use client";

import NextImage, { ImageLoaderProps, ImageProps } from "next/image";

const imageProxyLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://proxy.t.pics/${width},q${quality || 75}/${src}`;
};

export const ImageThumbnail = (props: ImageProps) => {
  return <NextImage loader={imageProxyLoader} {...props} />;
};
