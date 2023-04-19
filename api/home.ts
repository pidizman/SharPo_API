import { Request, Response } from "express";
import { checkToken, loadGalleries } from "../utility";

interface Data {
  id: number;
};

export const Home = async (req: Request, res: Response) => {
  const data: Data = req.body;

  const galleries = await loadGalleries(data.id);
  return res.json({
    data: "His galleries!",
    galleries: galleries
  });
};
