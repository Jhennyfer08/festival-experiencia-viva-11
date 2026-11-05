import { database } from "../../config/database.js";

export class Participants {
    constructor(params = {}) {
        this.id = params.id ?? null,
            this.name = params.name ?? null,
            this.email = params.email ?? null,
            this.password = params.password ?? null
    }

    async findAll() {
        const result = await database.executeQueryFile("./sql/participants/findAll.sql");
        return result;
    }

    async findById() {
        const params = [this.id];
        const result = await database.executeQueryFile("./sql/participants/findById.sql", params);
        return result;
    }

    async create() {
        const params = [
            this.name,
            this.email,
            this.password
        ];
        const result = await database.executeQueryFile("./sql/participants/create.sql", params);
        this.id = result.insertId;
        return result;
    }

    async login() {
        const params = [this.email];
        const result = await database.executeQueryFile("./sql/participants/login.sql", params);
        return result;
    }

    async update() {
        const params = [
            this.name,
            this.email,
            this.password,
            this.id
        ];
        const result = await database.executeQueryFile("./sql/participants/update.sql", params);
        return result;
    }

    async delete() {
        const params = [this.id];
        const result = await database.executeQueryFile("./sql/participants/delete.sql", params);
        return result;
    }
}