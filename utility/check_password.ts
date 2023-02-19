import { verify } from "argon2";

export const checkPassword = async (hash_password: string | undefined, nohash_pasword: string) => {
  if (hash_password === undefined) {
    throw new Error("User not found!");
  }
  
  if(!(await verify(hash_password, nohash_pasword))) throw new Error("Password is wrong!");
  else return null;
;}
