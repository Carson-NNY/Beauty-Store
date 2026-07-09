import { BookPageContent } from "@/components/customer/book-page-content";

export const metadata = {
  title: "Book",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams?: Promise<{ service?: string }>;
}) {
  const params = await searchParams;
  const todayIso = formatDateIso(new Date());

  return <BookPageContent initialServiceId={params?.service} startDateIso={todayIso} />;
}

function formatDateIso(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
