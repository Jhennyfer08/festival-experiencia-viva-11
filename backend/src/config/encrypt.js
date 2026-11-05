import bcrypt from "bcrypt";

export class Encrypt {
    async encrypt(password) {
        const result = await bcrypt.hash(password, 10);
        return result;
    }

    async compare(password, encryptedPassword) {
        return await bcrypt.compare(password, encryptedPassword);
    }
}

export const encrypt = new Encrypt();
