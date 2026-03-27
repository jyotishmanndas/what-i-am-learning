class IUserRepository {
    async createUser(userData) {
        throw new Error("Method not implemented")
    };

    async findUserByEmail(email){
        throw new Error("Method not implemented")
    };

    async saveRefreshToken(userId, token) {
        throw new Error("Method not implemented")
    };
}

export default IUserRepository;