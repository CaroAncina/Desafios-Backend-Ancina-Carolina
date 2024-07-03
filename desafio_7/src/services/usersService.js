import userModel from '../dao/models/usersModel.js';

export default class UserService {
    static async getUserByEmail(email) {
        return userModel.findOne({ email });
    }

    static async createUser(userData) {
        return userModel.create(userData);
    }

    static async updateUser(id, userData) {
        return userModel.findByIdAndUpdate(id, userData, { new: true });
    }

    static async deleteUser(id) {
        return userModel.findByIdAndDelete(id);
    }
}
