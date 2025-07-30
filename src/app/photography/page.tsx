import Layout from "../../pages/_layout";
import { GalleryAlbum } from "../../components/GalleryAlbum";
import { getPhotoAlbums } from "../../utils/core";
import { CreateAlbumButton } from "../../components/CreateAlbumButton";

export default async function Photography() {
  const albums = await getPhotoAlbums();

  return (
    <Layout active_page="photography" page_class="space-y-10">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Photo Gallery</h1>
          <p className="">
            I'm very much an amateur at this photography thing, but I love
            sharing my photos regardless.
          </p>
        </div>

        <CreateAlbumButton />
      </div>

      <div>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 xl:grid-flow-row overflow-scroll p-2 rounded-lg bg-neutral-300 dark:bg-neutral-800 max-h-full gap-4">
          {albums.map((album) => (
            <GalleryAlbum album={album} key={album.slug} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
