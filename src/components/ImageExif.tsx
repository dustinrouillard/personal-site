"use server";

import exifr from "exifr";
import { memo } from "react";
import { BiAperture, BiCamera } from "react-icons/bi";
import { BsClock } from "react-icons/bs";

const formatNumber = (num: number) =>
  Number.isInteger(num)
    ? num.toString()
    : parseFloat(num.toFixed(3)).toString();

async function ExifData({ url }: { url: string }) {
  const exif = await exifr.parse(url);

  return (
    <div>
      <h2 className="text-nowrap font-bold text-lg mb-2">Exif Data</h2>
      <div className="text-nowrap space-y-4">
        <div>
          <div className="flex flex-row items-center space-x-2">
            <BiCamera size={20} />
            <p className="">
              {exif.Make} {exif.Model?.replace(exif.Make, "")}
            </p>
          </div>
          <div className="flex flex-col justify-center space-x-2">
            {exif.LensModel && (
              <p className="text-gray-400">{exif.LensModel}</p>
            )}
          </div>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <BsClock size={20} />
          {exif.CreateDate && (
            <p className="">{(exif.CreateDate as Date).toLocaleString()}</p>
          )}
        </div>
        <div className="flex flex-row space-x-2">
          <BiAperture size={20} />
          <div className="flex flex-wrap gap-y-2 w-full">
            {exif.FNumber && (
              <div className="w-32">
                <p className="opacity-65">Aperture</p>
                <p className="">ƒ/{exif.FNumber.toFixed(1)}</p>
              </div>
            )}

            {exif.ExposureTime && (
              <div className="w-32">
                <p className="opacity-65">Shutter</p>
                <p className="">1/{Math.round(1 / exif.ExposureTime)}</p>
              </div>
            )}

            {exif.ISO && (
              <div className="w-32">
                <p className="opacity-65">ISO</p>
                <p className="">{exif.ISO}</p>
              </div>
            )}

            {exif.FocalLength && (
              <div>
                <p className="opacity-65">Focal Length</p>
                <p className="">
                  {formatNumber(exif.FocalLength)}mm{" "}
                  {exif.FocalLengthIn35mmFormat && (
                    <span className="text-sm block">
                      {exif.FocalLengthIn35mmFormat}mm (full frame equivalent)
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const ImageExif = memo(ExifData);
