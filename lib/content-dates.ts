/** Use the real revision date, even when an older article was edited. */
export function contentDate(post: { date: string; updated?: string }): Date {
  return new Date(`${post.updated ?? post.date}T00:00:00Z`);
}

export function latestContentDate(posts: { date: string; updated?: string }[]): Date | undefined {
  const timestamps = posts.map((post) => contentDate(post).getTime()).filter(Number.isFinite);
  return timestamps.length ? new Date(Math.max(...timestamps)) : undefined;
}
