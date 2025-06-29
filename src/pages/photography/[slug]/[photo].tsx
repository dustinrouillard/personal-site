import { RequestContext } from "next/dist/server/base-server";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import exifr from "exifr";

import { BiAperture, BiCamera, BiChevronLeft } from "react-icons/bi";
import { BsClock, BsInstagram } from "react-icons/bs";

import Layout from "../../_layout";
import { Album, Photo } from "../../../types/gallery";
import { getPhotoAlbum } from "../../../utils/core";

interface Props {
  album: Album;
  photo: Photo;
}

const formatNumber = (num: number) =>
  Number.isInteger(num)
    ? num.toString()
    : parseFloat(num.toFixed(3)).toString();

export default function AlbumPhotoPage(props: Props) {
  const router = useRouter();

  const [exif, setExif] = useState(null);

  useEffect(() => {
    async function fetchExif() {
      const imageUrl = `https://cdn.dstn.to/gallery/albums/${props.album.slug}/${props.photo.name}`;
      try {
        const data = await exifr.parse(imageUrl);
        setExif(data);
      } catch (e) {
        console.error("Failed to parse EXIF:", e);
      }
    }

    fetchExif();
  }, [props.album, props.photo]);

  return (
    <Layout active_page="album_photo" page_class="space-y-10">
      <div className="flex flex-col">
        <div
          className="mb-4 flex space-x-1 items-center opacity-60 hover:opacity-100 cursor-pointer"
          onClick={() => router.push(`/photography/${props.album.slug}`)}
        >
          <BiChevronLeft size={28} />
          <p className="text-lg font-bold">Back to Album</p>
        </div>

        <h1 className="text-2xl font-bold">{props.album.name}</h1>
        <h2 className="text-xl">{props.photo.name}</h2>
      </div>

      <div className="flex h-screen justify-between rounded-lg bg-neutral-300 dark:bg-neutral-800 p-2 gap-2">
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <img
            src={`https://cdn.dstn.to/gallery/albums/${props.album.slug}/${props.photo.name}`}
            className="absolute inset-0 h-full w-full object-cover object-center blur-lg opacity-40"
            alt={props.photo.name}
          />

          <div className="flex h-full w-full items-center justify-center relative z-10 p-2">
            <img
              src={`https://cdn.dstn.to/gallery/albums/${props.album.slug}/${props.photo.name}`}
              className="object-contain rounded-lg shadow-md max-h-full max-w-full"
              alt={props.photo.name}
            />
          </div>
        </div>
        <div className="bg-neutral-200 dark:bg-neutral-700 rounded-md p-3 text-nowrap">
          {props.photo.instagram ? (
            <a
              href={props.photo.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex space-x-2 items-center mb-2 hover:opacity-60 cursor-pointer">
                <BsInstagram size={20} />
                <p className="font-bold">View on Instagram</p>
              </div>
            </a>
          ) : (
            <></>
          )}

          <div>
            {exif ? (
              <div>
                <h2 className="text-nowrap font-bold text-lg mb-2">
                  Exif Data
                </h2>
                <div className="text-nowrap space-y-4">
                  <div>
                    <div className="flex flex-row items-center space-x-2">
                      <BiCamera size={20} />
                      <p className="">
                        {exif?.Make} {exif?.Model?.replace(exif?.Make, "")}
                      </p>
                    </div>
                    <div className="flex flex-col justify-center space-x-2">
                      {exif?.LensModel && (
                        <p className="text-gray-400">{exif.LensModel}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row items-center space-x-2">
                    <BsClock size={20} />
                    {exif?.CreateDate && (
                      <p className="">
                        {(exif.CreateDate as Date).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-row space-x-2">
                    <BiAperture size={20} />
                    <div className="flex flex-wrap gap-y-2 w-full">
                      {exif?.FNumber && (
                        <div className="w-32">
                          <p className="opacity-65">Aperture</p>
                          <p className="">ƒ/{exif?.FNumber.toFixed(1)}</p>
                        </div>
                      )}

                      {exif?.ExposureTime && (
                        <div className="w-32">
                          <p className="opacity-65">Shutter</p>
                          <p className="">
                            1/{Math.round(1 / exif.ExposureTime)}
                          </p>
                        </div>
                      )}

                      {exif?.ISO && (
                        <div className="w-32">
                          <p className="opacity-65">ISO</p>
                          <p className="">{exif.ISO}</p>
                        </div>
                      )}

                      {exif?.FocalLength && (
                        <div>
                          <p className="opacity-65">Focal Length</p>
                          <p className="">
                            {formatNumber(exif?.FocalLength)}mm{" "}
                            {exif?.FocalLengthIn35mmFormat && (
                              <span className="text-sm block">
                                {exif?.FocalLengthIn35mmFormat}mm (full frame
                                equivalent)
                              </span>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-nowrap p-2">Loading exif data...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(props: RequestContext) {
  const slug = props.query.slug;
  const photoName = props.query.photo as string;
  const album = await getPhotoAlbum(slug as string);
  const photo = album.items.find((item) => item.name == photoName);

  return {
    props: { album, photo },
  };
}
