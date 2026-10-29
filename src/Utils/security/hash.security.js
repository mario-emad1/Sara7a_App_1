import { SALT_ROUNDS } from "../../../Config/config.service.js";
import { hashEnum } from "../enums/security.enum.js";
import * as bcryptService from "bcrypt";
import * as argonService from "argon2";
import { BadRequestException } from "../Response/error.response.js";

export const generateHash = async ({
    plainText,
    saltRounds = Number(SALT_ROUNDS),
    algorithm = hashEnum.Bcrypt,
}) => {
    let hashResult = "";
    switch (algorithm) {
        case hashEnum.Bcrypt:
            hashResult = await bcryptService.hash(plainText, saltRounds);
            break;
        case hashEnum.Argon2:
            hashResult = await argonService.hash(plainText);
            break;
        default:
            throw BadRequestException("Unsupported Hashing Algorithm");
    }
    return hashResult;
};

export const compareHash = async ({
    plainText,
    cipherText,
    algorithm = hashEnum.Bcrypt,
}) => {
    let match = false;
    switch(algorithm){
        case hashEnum.Bcrypt:
            match = await bcryptService.compare(plainText,cipherText);
            break;
        case hashEnum.Argon2:
            match = await argonService.verify(cipherText,plainText);
            break;
        default:
            throw BadRequestException("Unsupported Hashing Algorithm");
    }
    return match;
};
