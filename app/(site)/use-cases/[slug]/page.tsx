import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { UseCasePage } from "@/components/templates/use-case-page";
import { getUseCase, pathForUseCase, useCases } from "@/content/use-cases";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Static export: every use-case page is generated at build time; any other
// slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return useCases.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getUseCase(slug);
  if (!useCase) return {};
  return pageMetadata({
    title: useCase.title,
    description: useCase.description,
    path: pathForUseCase(useCase.slug),
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const useCase = getUseCase(slug);
  if (!useCase) notFound();
  return <UseCasePage useCase={useCase} />;
}
