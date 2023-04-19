import { Request, Response } from "express";
import { prisma } from "../db";
import { checkPassword, createToken } from "../utility";

interface Data {
  email: string;
  password: string;
};

export const Login = async (req: Request, res: Response) => {
  // const email: string = req.body.email;
  // const password: string = req.body.password;

  const data: Data = req.body;

  const getHashPassword = await prisma.user.findFirst({
    where: {
      email: data.email 
    },
    select: { 
      id: true,
      password: true
    }
  });
  const hashPassword: string | undefined = getHashPassword?.password;

  try {
    await checkPassword(hashPassword, data.password); 
  } catch (e: any) {
    res.status(404);
    return res.json({
      data: null,
      err: e.message
    });
  };
  
  const obj = createToken(data.email); 
  await prisma.user.updateMany({
    where: { email:  data.email },
    data: {
      signingKey: Buffer.from(obj.signingKey),
      token: obj.token
    }
  });

  res.status(200);
  return res.json({
    data: "Logined!",
    token: obj.token,
    id: getHashPassword?.id
  });
};
