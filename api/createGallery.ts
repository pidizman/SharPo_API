import { Request, Response } from "express";
import { prisma } from "../db";
import { checkGalleryName } from "../utility";

interface Data {
  name: string;
  description: string;
  id: number;
}

export const createGallery = async (req: Request, res: Response) => {
  // const galleryName: string = req.body.name;
  // const galleryDescription: string = req.body.description; 
  // const id = req.body.id;

  const data: Data = req.body;

  try {
    await checkGalleryName(data.name, data.id);
  } catch (e: any) {
    res.status(404);
    return res.json({
     data: null,
     err: e.message 
    });
  }

  await prisma.user.update({
    where: { id: data.id },
    data: {
      posts: {
        create: [
          {
            name: data.name,
            description: data.description
          }
       ]
      } 
    }
  });

  res.status(200);
  return res.json({
    data: "Gallery been created!"
  });
};
