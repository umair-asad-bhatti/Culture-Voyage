import { z } from 'zod'
import { FirebaseErrors } from "../constants/FirebaseErrors.js";

const ZodLoginSchema = z.object({
    email: z.string().email({ message: 'Please provide a valid email' }),
    password: z.string().min(8, { message: "Password must contains atleast 8 characters" })
})

const ZodSignupSchema = z.object({
    email: z.string().email(),
    password: z.string().refine((password) => {
        // At least one uppercase letter
        const hasUpperCase = /[A-Z]/.test(password);

        // At least one lowercase letter
        const hasLowerCase = /[a-z]/.test(password);

        // At least one special character (non-alphanumeric)
        const hasSpecialCharacter = /[^a-zA-Z0-9]/.test(password);

        // No spaces
        const hasNoSpaces = !/\s/.test(password);

        // At least one number
        const hasNumber = /\d/.test(password);

        return hasUpperCase && hasLowerCase && hasSpecialCharacter && hasNoSpaces && hasNumber;
    }, {
        message: 'Invalid password format. It must contain at least one uppercase letter, one lowercase letter, one special character, no spaces, and at least one number.',
    })
})
export const formatDate = (inputDate) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const month = months[inputDate.getMonth()];
    const day = inputDate.getDate();
    const year = inputDate.getFullYear();
    const hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();
    const seconds = inputDate.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const timezoneOffset = inputDate.getTimezoneOffset() / -60; // Convert minutes to hours

    const formattedTimestamp = `${month} ${day}, ${year} at ${hours}:${minutes}:${seconds} ${ampm} UTC${timezoneOffset >= 0 ? '+' : ''}${timezoneOffset}`;
    return formattedTimestamp;
};
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    } else {
        return text;
    }
}
function calculateTimeElapsed(createdAt) {
    // Parse the provided time string
    const createdDate = new Date(createdAt.replace(/UTC[+-]\d+/, 'UTC'));

    // Get the current time
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const timeDifference = currentDate - createdDate;

    // Calculate elapsed time in milliseconds
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Return the elapsed time
    return {
        seconds,
        minutes,
        hours,
        days
    };
}
const FireBaseErrorHandler = (errorCode) => {
    switch (errorCode) {
        case "auth/user-not-found":
            return FirebaseErrors.userDoesNotExist
        case "auth/USER_NOT_FOUND":
            return FirebaseErrors.userDoesNotExist
        case "auth/wrong-password":
            return FirebaseErrors.incorrectPassword
        case "auth/WRONG_PASSWORD":
            return FirebaseErrors.incorrectPassword
        case "auth/user-disabled":
            return FirebaseErrors.userDisabled
        case "auth/USER_DISABLED":
            return FirebaseErrors.userDisabled
        case "auth/invalid-email":
            return FirebaseErrors.invalidEmail
        case "auth/INVALID_EMAIL":
            return FirebaseErrors.invalidEmail
        case "auth/email-already-in-use":
            return FirebaseErrors.emailAlreadyExists
        case "auth/EMAIL_ALREADY_IN_USE":
            return FirebaseErrors.emailAlreadyExists
        case 'auth/weak-password':
            return FirebaseErrors.weakPassword
        case 'auth/WEAK_PASSWORD':
            return FirebaseErrors.weakPassword
        case 'auth/operation-not-allowed':
            return FirebaseErrors.operationNotSupport
        case 'auth/OPERATION_NOT_ALLOWED':
            return FirebaseErrors.operationNotSupport
        case 'auth/auth/user-not-found':
            return FirebaseErrors.userDoesNotExist
        case 'auth/AUTH/USER_NOT_FOUND':
            return FirebaseErrors.userDoesNotExist
        case 'auth/auth/invalid-email':
            return FirebaseErrors.invalidEmail
        case 'auth/AUTH/INVALID_EMAIL':
            return FirebaseErrors.invalidEmail
        case 'auth/account-exists-with-different-credential':
            return FirebaseErrors.accountWithDifferentCredentials
        case 'auth/ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL':
            return FirebaseErrors.accountWithDifferentCredentials
        case 'auth/invalid-credential':
            return FirebaseErrors.invalidCredentials
        case 'auth/INVALID_LOGIN_CREDENTIALS':
            return FirebaseErrors.invalidCredentials
        case 'auth/invalid-verification-code':
            return FirebaseErrors.invalidVerificationCode
        case 'auth/INVALID_VERIFICATION_CODE':
            return FirebaseErrors.invalidVerificationCode
        case 'auth/invalid-verification-id':
            return FirebaseErrors.invalidVerificationId
        case 'auth/INVALID_VERIFICATION_ID':
            return FirebaseErrors.invalidVerificationId
        case 'auth/too-many-requests':
            return FirebaseErrors.tooManyRequests
        case 'auth/TOO_MANY_REQUESTS':
            return FirebaseErrors.tooManyRequests
        case 'auth/network-request-failed':
            return FirebaseErrors.networkError


    }
}
export { ZodLoginSchema, ZodSignupSchema, FireBaseErrorHandler, truncateText, calculateTimeElapsed }