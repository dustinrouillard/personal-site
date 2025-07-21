import Link from "next/link";
import Layout from "../pages/_layout";

export default function NotFound() {
  return (
    <Layout page_class="h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-xl">Resource/page not found</p>
      </div>
    </Layout>
  );
}
