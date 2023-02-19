import Express, { Request, Response } from "express";
import body_parser from "body-parser";
import { 
  createGallery, 
  Home, 
  Login, 
  Register 
} from "./api";

const app = Express();
const PORT = 1234;
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.post("/login/", Login);
app.post("/register/", Register);
app.post("/home/", Home);
app.post("/createGallery/", createGallery);

app.listen(PORT, () => {
  return console.log(`http://localhost:${PORT}`);
});
