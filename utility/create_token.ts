import secureRandom from "secure-random";
import { create } from "njwt";

export const createToken = (email: string) => {
  const signingKey = secureRandom(256, {type: "Buffer"});
  const token = create(email, signingKey).compact();

  const obj = {
    signingKey: signingKey,
    token: token
  };
  return obj;
};
