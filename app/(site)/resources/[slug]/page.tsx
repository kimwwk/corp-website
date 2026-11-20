import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ResourcePostPage } from "@/components/templates/resource-post";
import { getResource, resourcePath, resources } from "@/content/resources";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Static export: every post is generated at build time; any other slug is a
// 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getResource(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: resourcePath(post.slug),
    type: "article",
    publishedTime: post.date,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getResource(slug);
  if (!post) notFound();
  return <ResourcePostPage post={post} />;
}
