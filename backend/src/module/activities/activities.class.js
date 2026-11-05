import { database } from "../../config/database.js";

export class Activities {
    constructor(params = {}) {
        this.id = params.id ?? null,
            this.name = params.name ?? null,
            this.description = params.description ?? null,
            this.image = params.image ?? null,
            this.position = params.position ?? null,
            this.capacity = params.capacity ?? null,
            this.date = params.date ?? null,
            this.time = params.time ?? null
    }

    async findAll() {
        const result = await database.executeQueryFile("./sql/activities/findAll.sql");
        return result;
    }

    async findById() {
        const params = [this.id];
        const result = await database.executeQueryFile("./sql/activities/findById.sql", params);
        return result;
    }

    async findInscripted() {
        const result = await database.executeQueryFile("./sql/activities/findInscripted.sql");
        return result;
    }

    async create() {
        const params = [
            this.name,
            this.description,
            this.image,
            this.position,
            this.capacity,
            this.date,
            this.time
        ];
        const result = await database.executeQueryFile("./sql/activities/create.sql", params);
        this.id = result.insertId;
        return result;
    }

    async login() {
        const params = [this.email];
        const result = await database.executeQueryFile("./sql/activities/login.sql", params);
        return result;
    }

    async update() {
        const params = [
            this.name,
            this.description,
            this.image,
            this.position,
            this.capacity,
            this.date,
            this.time,
            this.id
        ];
        const result = await database.executeQueryFile("./sql/activities/update.sql", params);
        return result;
    }

    async delete() {
        const params = [this.id];
        const result = await database.executeQueryFile("./sql/activities/delete.sql", params);
        return result;
    }
}