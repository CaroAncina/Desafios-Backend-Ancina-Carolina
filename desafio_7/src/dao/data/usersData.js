let users = [];

export default class UserMemoryDAO {
    static findAll() {
        return users;
    }

    static findById(id) {
        return users.find(user => user.id === id);
    }

    static create(user) {
        users.push(user);
        return user;
    }

    static update(id, updatedUser) {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...updatedUser };
            return users[index];
        }
        return null;
    }

    static delete(id) {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            return users.splice(index, 1)[0];
        }
        return null;
    }
}
