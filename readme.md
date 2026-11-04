# Festival Experiência Viva

O Festival Experiência VIVA é um evento anual realizado com o apoio financeiro da Instituição VIVA, que acredita no poder transformador da arte, da cultura e da educação. Com uma programação gratuita e acessível a toda a comunidade, o festival proporciona momentos de aprendizado, entretenimento e conexão, valorizando a diversidade cultural e ampliando o acesso ao conhecimento.

Mais do que um evento, o Experiência VIVA é um convite para descobrir, aprender, criar e se conectar com novas possibilidades.

Seja livre, seja VIVA!

## Tecnologias Utilizadas

- **Banco de Dados**: MySql, MySQL Workbench, Mysql2
- **Backend**: Javascript, Node.js, Express, Cors e Bcrypt 
- **Frontend**: Javascript, HTML, CSS (Nesting)

## Configuração Backend

**1. Instaláveis**
-   MySQL Workbench e Server
-   VsCode
-   Postman
-   Node.js
-   Git

---

**2. Bibliotecas**
- Mysql2
- Express
- Cors
- Bcrypt 

---

**3. Extensões**
- Live Server
- Prettier
- Auto Rename Tag
- Material Icon Theme 
- Lunar Pink Theme
---

- Instale os pacotes de depêndencias do package.json:
```powershell
    npm install
```
```json
    "dependencies": {
        "bcrypt": "^6.0.0",
        "cors": "^2.8.6",
        "express": "^5.3.0",
        "mysql2": "^3.24.6"
    }
```

- Rode o arquivo sql do banco no seu MySQL Workbench:

- Configure o arquivo .env:
```json
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD= sua senha
    DB_NAME=festival
```

### Como executar
- Posicione seu cursor em **/backend** e execute o comando de iniciar o projeto no terminal:
```powershell
    npm start
```

## Banco de Dados
### Participants

campo | tipo | descrição | restrição
------|------|-----------|----------
id  | int | identificador primário do participante
name  | string | nome do participante
email  | string | email do participante | unique
password  | string |senha do participante
admin  | bool | identificador de administrador do participante
---

### Activities

campo | tipo | descrição | restrição
------|------|-----------|----------
id  | int | identificador primário da atividade
name  | string | nome da atividade
description  | string | descrição da atividade | 
image  | string | imagem ilustrativa da atividade
position  | string | localização da atividade | 
capacity  | int |capacidade máxima de vagas da atividade | check(capacity > 0)
date  | date | data da atividade | 
time  | time |horário de início da atividade |
---


### Inscriptions

campo | tipo | descrição | restrição
------|------|-----------|----------
id  | int | identificador primário do participante |
id_activity  | int | identificador estrangeiro da atividade | unique 
id_participant  | int | identificador estrangeiro do participante | unique