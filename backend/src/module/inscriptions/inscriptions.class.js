import { database } from "../../config/database.js";

export class Inscriptions {
    constructor(params = {}) {
        this.id = params.id ?? null,
            this.id_activity = params.id_activity ?? null,
            this.id_participant = params.id_participant ?? null
    }

    async findAll() {
        const result = await database.executeQueryFile("./sql/inscriptions/findAll.sql");
        return result;
    }

    async findById() {
        const params = [this.id];
        const result = await database.executeQueryFile("./sql/inscriptions/findById.sql", params);
        return result;
    }

    async findCreated() {
        const params = [this.id_activity, this.id_participant]
        const result = await database.executeQueryFile("./sql/inscriptions/findCreated.sql", params);
        return result;
    }

    async findCapacity() {
        const params = [this.id_activity]
        const result = await database.executeQueryFile("./sql/activities/findById.sql", params);
        return result;
    }

    async create() {
        const params = [
            this.id_activity,
            this.id_participant
        ];
        const result = await database.executeQueryFile("./sql/inscriptions/create.sql", params);
        this.id = result.insertId;
        return result;
    }

    async update() {
        const params = [
            this.id_activity,
            this.id_participant,
            this.id
        ];
        const result = await database.executeQueryFile("./sql/inscriptions/update.sql", params);
        return result;
    }

    async delete() {
        const params = [this.id];
        const result = await database.executeQueryFile("./sql/inscriptions/delete.sql", params);
        return result;
    }
}