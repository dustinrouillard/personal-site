import { RequestContext } from "next/dist/server/base-server";

import Layout from "../_layout";
import { GalleryAlbum } from "../../components/GalleryAlbum";
import { Album } from "../../types/gallery";
import { getPhotoAlbums } from "../../utils/core";

interface Props {
  albums: Album[];
}

export default function Photography(props: Props) {
  return (
    <Layout active_page="photography" page_class="space-y-10">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Photo Gallery</h1>
        <p className="">
          I'm very much an amateur at this photography thing, but I love sharing
          my photos regardless.
        </p>
      </div>

      <div>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 xl:grid-flow-row overflow-scroll p-2 rounded-lg bg-neutral-300 dark:bg-neutral-800 max-h-full gap-4">
          {props.albums.map((album) => (
            <GalleryAlbum album={album} key={album.slug} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(props: RequestContext) {
  const albums = await getPhotoAlbums();

  return {
    props: { albums },
  };
}
