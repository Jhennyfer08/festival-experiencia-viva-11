export class Validation {
    constructor(composition) {
        this.composition = composition;
    }

    errorMessage(status, message) {
        let error = new Error(message);
        error.status = status;
        throw error;
    }

    async verifyId() {
        const result = await this.composition.findById()

        if (result.length === 0) {
            this.errorMessage(404, "Registro não encontrado.");
        }
    }

    async verifyCapacity() {
        const result = await this.composition.findCapacity();

        if (result[0].quantity >= result[0].capacity) {
            this.errorMessage(409, "A capacidade máxima de vagas dessa atividade já foi atingida.");
        }
    }

    async verifyCreated() {
        const result = await this.composition.findCreated();

        if (result.length !== 0) {
            this.errorMessage(409, "Esse usuário já está inscrito nessa atividade.");
        }
    }
}