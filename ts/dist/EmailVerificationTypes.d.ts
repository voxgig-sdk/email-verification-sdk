export interface Verify {
    credits_remaining: number;
    credits_used: number;
    email: string;
    message: string;
    result: string;
    upgrade_url?: string;
    valid: boolean;
}
export interface VerifyLoadMatch {
    email: string;
    key: string;
}
