import bcrypt from "bcrypt";

class Hash {
  static async createHash(plainTextPassword) {
    return await bcrypt.hash(plainTextPassword, 13);
  }

  static async compare(plainTextPassword, hashedPassword) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
}

export default Hash;
