import { RequestContext } from "next/dist/server/base-server";

import Layout from "../../_layout";
import { Album } from "../../../types/gallery";
import { getPhotoAlbum } from "../../../utils/core";
import { AlbumPhoto } from "../../../components/AlbumPhoto";
import { MdLocationPin } from "react-icons/md";
import { BiChevronLeft } from "react-icons/bi";
import { useRouter } from "next/router";

interface Props {
  album: Album;
}

export default function PhotographyAlbum(props: Props) {
  const router = useRouter();

  return (
    <Layout active_page="gallery_album" page_class="space-y-10">
      <div className="flex flex-col">
        <div
          className="mb-4 flex space-x-1 items-center opacity-60 hover:opacity-100 cursor-pointer"
          onClick={() => router.push("/photography")}
        >
          <BiChevronLeft size={28} />
          <p className="text-lg font-bold">Back to Albums</p>
        </div>

        <h1 className="text-2xl font-bold">{props.album.name}</h1>
        {props.album.location ? (
          <div className="flex flex-row items-center space-x-1">
            <MdLocationPin />
            <p className="text-sm opacity-60">{props.album.location}</p>
          </div>
        ) : (
          <></>
        )}

        {props.album.description ? (
          <p className="mt-4">{props.album.description}</p>
        ) : (
          <></>
        )}
      </div>

      <div>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 xl:grid-flow-row overflow-scroll p-2 rounded-lg bg-neutral-300 dark:bg-neutral-800 max-h-full gap-4">
          {props.album.items.map((item) => (
            <AlbumPhoto album={props.album} photo={item} key={item.name} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(props: RequestContext) {
  const slug = props.query.slug;
  const album = await getPhotoAlbum(slug as string);

  return {
    props: { album },
  };
}
