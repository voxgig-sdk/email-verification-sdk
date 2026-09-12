import { Context } from './Context';
declare class EmailVerificationError extends Error {
    isEmailVerificationError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { EmailVerificationError };
