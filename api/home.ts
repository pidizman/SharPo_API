import { Request, Response } from "express";
import { checkToken, loadGalleries } from "../utility";

export const Home = async (req: Request, res: Response) => {
  const token: string = req.body.token;
  const id: number = req.body.id;

  try {
   await checkToken(id, token);
  } catch (e: any) {
    res.status(404);
    return res.json({
      data: null,
      err: e.message
    });
  };

  const galleries = await loadGalleries(id);
  return res.json({
    data: "His galleries!",
    galleries: galleries
  });
};
