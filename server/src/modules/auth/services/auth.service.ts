import bcrypt from 'bcrypt';
import { ApiError } from '../../../utils/ApiError.js';
import HTTP_STATUS from '../../../constants/http-status.js';
import { findUserByEmail, createUser, findByUsername, findUserById, findUserByIdentifier, deleteSession, deleteAllUserSession} from '../auth.repository.js';
import type { loginInput, RegisterInput } from '../auth.validataion.js';
import { toUserResponseDto } from '../dto/user-response.dto.js';
import { issueAuthTokens } from './token.service.js';
import { verifyRefreshToken } from '../../../utils/jwt.js';

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

    //create user
    const user = await createUser({
        ...data,
        password: hashedPassword,
    });

   const tokens = await issueAuthTokens( user._id.toString())

    return {
        user:toUserResponseDto(user),
        ...tokens,
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

    const tokens = await issueAuthTokens( user._id.toString())

    return {
        user: toUserResponseDto(user),
        ...tokens
    }
}

//logout
export async function logoutService(refreshToken : string){
    const decoded = verifyRefreshToken(refreshToken);

    await deleteSession(decoded.sessionId);
}

// logout from all devices

export async function logoutAllService( userId: string){
    await deleteAllUserSession(userId);
}