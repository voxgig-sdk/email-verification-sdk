import { EmailVerificationEntityBase } from '../EmailVerificationEntityBase';
import type { EmailVerificationSDK } from '../EmailVerificationSDK';
import type { Control } from '../types';
import type { Verify, VerifyLoadMatch } from '../EmailVerificationTypes';
declare class VerifyEntity extends EmailVerificationEntityBase<Verify> {
    constructor(client: EmailVerificationSDK, entopts: any);
    make(this: VerifyEntity): VerifyEntity;
    load(this: any, reqmatch?: VerifyLoadMatch, ctrl?: Control): Promise<VerifyEntity>;
}
export { VerifyEntity };
