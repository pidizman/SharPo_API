import { prisma } from "../db";

export const checkToken = async (id: number, token: string) => {
  const tokenFromDb = await prisma.user.findFirst({
    where: { id: id },
    select: { token: true }
  });
  console.log(tokenFromDb);

  if(tokenFromDb === null) throw new Error("User with this email doesn't exist");

  if(token !== tokenFromDb.token) throw new Error("Wrong token!");
  else return null;
};
