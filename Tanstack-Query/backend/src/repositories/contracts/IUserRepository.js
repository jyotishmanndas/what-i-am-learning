class IUserRepository {
    async createUser(userData) {
        throw new Error("Method not implemented")
    };

    async findUserByEmail(email) {
        throw new Error("Method not implemented")
    };

    async findUserById(id) {
        throw new Error("Method not implemented")
    }

    async saveRefreshToken(userId, token) {
        throw new Error("Method not implemented")
    };

    async removeRefreshToken(userId) {
        throw new Error("Method not implemented")
    };

    async saveResetPasswordToken(userId, token) {
        throw new Error("Method not implemented")
    };

    async findResetPasswordToken(userId, token) {
        throw new Error("Method not implemented")
    };

    async updatePassword(userId, password) {
        throw new Error("Method not implemented")
    };
}

export default IUserRepository;