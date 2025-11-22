export default function EventDetail({ params }: { params: { slug: string } }) {
  return (
    <article className="prose dark:prose-invert">
      <h1>Event: {params.slug}</h1>
      <p>Detail event (konten menyusul, integrasi API BE).</p>
    </article>
  );
}
