const otpStore = new Map<string, { code: string; expiresAt: Date }>();

export function setOtp(email: string, code: string) {
    otpStore.set(email, { code, expiresAt: new Date(Date.now() + 2 * 60 * 1000) })
};

export function getOtp(email: string) {
    const record = otpStore.get(email);
    if (!record) return null;

    // auto-expire
    if (record.expiresAt < new Date()) {
        otpStore.delete(email);
        return null;
    }
    return record.code;
}

export function deleteOtp(email: string) {
    otpStore.delete(email);
}