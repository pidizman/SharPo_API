import { hash } from "argon2";
import { Request, Response } from "express";
import { prisma } from "../db";
import { createToken } from "../utility";

export const Register = async (req: Request, res: Response) => {
  const email: string = req.body.email;
  const password: string = await hash(req.body.password);
  
  const checkEmail = await prisma.user.findFirst({
    where: { email: email },
    select: { email: true }
  });
  //console.log(checkEmail);
  
  try {
    if (checkEmail !== null){
      throw new Error("Email is already used");
    }
  } catch (e: any) {
    res.status(404);
    return res.json({
     data: null,
     err: e.message
    });
  };

  const obj = createToken(email);
  await prisma.user.create({
    data: {
      email: email,
      password: password,
      signingKey: Buffer.from(obj.signingKey),
      token: obj.token
    }
  });

  const id = await prisma.user.findFirst({
    where: {
      email: email
    },
    select: {
      id: true
    }
  });

  res.status(200);
  return res.json({
    data: "Registred!",
    token: obj.token,
    id: id?.id
  });
};
//register
