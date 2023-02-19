import { prisma } from "../db"

export const checkGalleryName = async (name: string, id: number) => {
  const posts = await prisma.post.findMany({
    where: {
      name: name,
      authorId: id
    }
  });

  if(posts.length > 0) throw new Error("Gallery with this name is alredy exist!");
  if(posts.length === 0) return null;
};
