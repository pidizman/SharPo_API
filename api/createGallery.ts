import { Request, Response } from "express";
import { prisma } from "../db";
import { checkGalleryName } from "../utility";

export const createGallery = async (req: Request, res: Response) => {
  const galleryName: string = req.body.name;
  const galleryDescription: string = req.body.description; 
  const id = req.body.id;

  try {
    await checkGalleryName(galleryName, id);
  } catch (e: any) {
    res.status(404);
    return res.json({
     data: null,
     err: e.message 
    });
  }

  await prisma.user.update({
    where: { id: id },
    data: {
      posts: {
        create: [
          {
            name: galleryName,
            description: galleryDescription
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
