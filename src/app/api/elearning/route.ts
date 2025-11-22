export async function GET() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/elearning?status=PUBLISHED`,
    );
    if (!res.ok) {
      console.error(`Backend fetch failed: ${res.status} ${res.statusText}`);
      throw new Error(
        `Failed to fetch from backend: ${res.status} ${res.statusText}`,
      );
    }
    const backendData = await res.json();
    if (!backendData.success) {
      throw new Error("Backend returned unsuccessful response");
    }
    let courses = [];
    if (backendData.data && Array.isArray(backendData.data)) {
      courses = backendData.data;
    } else if (
      backendData.data &&
      backendData.data.items &&
      Array.isArray(backendData.data.items)
    ) {
      courses = backendData.data.items;
    } else if (backendData.data) {
      courses = [backendData.data];
    } else {
      courses = [];
    }
    const data = {
      items: courses.map((course: any) => ({
        ...course,
        category: course.category || "Digital Marketing",
        poster: course.poster || { url: null },
        packages: course.packages || [],
      })),
    };
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching e-learning data:", error);
    return Response.json({ items: [] }, { status: 500 });
  }
}
