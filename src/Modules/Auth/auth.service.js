import * as dbService from "../../DB/database.repository.js";
import userModel from "../../DB/Models/user.model.js";
import { hashEnum } from "../../Utils/enums/security.enum.js";
import {
    ConflictException,
    NotFoundException,
    UnauthorizedException,
} from "../../Utils/Response/error.response.js";
import successResponse from "../../Utils/Response/success.response.js";
import { decrypt, encrypt } from "../../Utils/security/encryption.security.js";
import {
    compareHash,
    generateHash,
} from "../../Utils/security/hash.security.js";

export const signup = async (req, res) => {
    const { username, email, password, phone } = req.body;
    const user = await dbService.findOne({
        model: userModel,
        filter: { email },
    });
    // if user exists
    if (user) throw ConflictException({ message: "User is already exists" });
    // Hashing Password
    const hashedPassword = await generateHash({
        plainText: password,
        algorithm: hashEnum.Bcrypt,
    });
    // Encrypt phone number
    const encryptedPhone = encrypt(phone)
    // Create new User
    const newUser = await dbService.create({
        model: userModel,
        data: [{ username, email, password: hashedPassword, phone:encryptedPhone }],
    });
    successResponse({
        res,
        statusCode: 201,
        message: "User Created Successfully",
        data: newUser,
    });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await dbService.findOne({
        model: userModel,
        filter: { email },
    });
    if (!user) throw NotFoundException({ message: "User not Found" });
    // Checking the entered password if === the hashed password in DB "hashing algorithm must equal the algorithm has been used in hashing"
    const isMatch = await compareHash({
        plainText: password,
        cipherText: user.password,
        algorithm: hashEnum.Bcrypt,
    });
    if (!isMatch) throw UnauthorizedException({ message: "Invalid Password" });
    
    if(user.phone) user.phone = decrypt(user.phone)
    successResponse({
        res,
        statusCode: 201,
        message: "User Logged in successfully",
        data:{user}
    });
};
