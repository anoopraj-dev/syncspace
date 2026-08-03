import bcrypt from 'bcrypt';
import { ApiError } from '../../utils/ApiError.js';
import HTTP_STATUS from '../../constants/http-status.js';
import { findUserByEmail, createUser, findByUsername, findUserById, findUserByIdentifier } from './auth.repository.js';
import type { loginInput, RegisterInput } from './auth.validataion.js';
import { generateAccessToken,generateRefreshToken } from '../../utils/jwt.js';
import { toUserResponseDto } from './dto/user-response.dto.js';

//signup
export async function signupService(data:RegisterInput){
    //existing email
    const existingEmail = await findUserByEmail(data.email);

    if(existingEmail){
        throw new ApiError(
            HTTP_STATUS.CONFLICT,
            'Email already exists'
        )
    }

    // existing username
    const existingUsername = await findByUsername(data.username);

    if(existingUsername) {
        throw new ApiError(
            HTTP_STATUS.CONFLICT,
            'Username is already chosen'
        )
    }

    // hash password
    const hashedPassword = await bcrypt.hash(data.password,10);

    const user = await createUser({
        ...data,
        password: hashedPassword,
    })

    //generate tokens
    const accessToken = generateAccessToken( user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString())

    return {
        user:toUserResponseDto(user),
        accessToken,
        refreshToken,
    }

}

// current user
export async function getCurrentUserService( userId: string){
    const user = await findUserById(userId);

    if(!user){
        throw new ApiError( HTTP_STATUS.NOT_FOUND, 'User not found')
    }

    return toUserResponseDto(user);
}

//login
export async function loginService(data: loginInput){
    const user = await findUserByIdentifier(data.identifier);

    if(!user) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid credentials');
    }

    //compare passwords

    const isPasswordValid = await bcrypt.compare( data.password, user.password);

    if(!isPasswordValid){
        throw new ApiError( HTTP_STATUS.UNAUTHORIZED, 'Invalid credentials')
    }

    //generate tokens
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    return {
        user: toUserResponseDto(user),
        accessToken,
        refreshToken
    }
}