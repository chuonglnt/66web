const scryptAsync = require("scrypt-async");
// Cấu hình từ Firebase Auth
const hashConfig = {
  algorithm: "SCRYPT",
  base64_signer_key:
    "crO0iR4LBMHUlTYtJKBS46oTVffWsVwL5KLORINTFIgq4XJRc1PE/T6f62WsLhDi1teBaIkzuJWqeY/4Pq/cTw==",
  base64_salt_separator: "Bw==",
  rounds: 8,
  mem_cost: 14,
};

export default async function hashPassword(password: string) {
  return new Promise((resolve, reject) => {
    const { base64_signer_key, base64_salt_separator, rounds, mem_cost } =
      hashConfig;

    const salt = Buffer.from(base64_signer_key, "base64");
    const N = 2 ** mem_cost; // scrypt parameter N

    scryptAsync(
      password,
      salt,
      {
        N: N,
        r: rounds,
        p: 1, // parallelization parameter set to 1
        dkLen: 32, // length of the derived key
        encoding: "base64",
      },
      (derivedKey: any) => {
        resolve(derivedKey);
      }
    );
  });
}
