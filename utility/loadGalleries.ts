import { prisma } from "../db";

export const loadGalleries = async (id: number) => {
  const x = await prisma.post.findMany({
    where: { authorId: id }
  });

  return x;
};
