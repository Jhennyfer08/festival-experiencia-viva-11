class APi {
    constructor(uri = "http://localhost:3000") {
        this.uri = uri;
    }

    async request(url, options = {}){
        const response = await fetch(this.uri + url, {
            headers: {"Content-Type": "application/json"},
            ...options
        });

        const data = await response.json();
        return data;
    }

    async get(url){
        return this.request(url);
    }

    async post(url, body){
        return this.request(url, {
            method: "POST",
            body: JSON.stringify(body)
        });
    }

    async put(url, body){
        return this.request(url, {
            method: "PUT",
            body: JSON.stringify(body)
        });
    }

    async delete(url){
        return this.request(url, {
            method: "DELETE",
        });
    }
}

export const api = new APi();