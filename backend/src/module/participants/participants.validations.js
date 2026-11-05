export class Validation {
    constructor(composition) {
       this.composition = composition; 
    }

    errorMessage(status, message){
        let error = new Error(message);
        error.status = status;
        throw error;
    }

    async verifyId(){
        const result = await this.composition.findById()

        if (result.length === 0) {
            this.errorMessage(404, "Registro não encontrado.")
        }
    }
}