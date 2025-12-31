
# 📦 CRUD de Produtos - ReactJS

Uma aplicação web moderna e intuitiva para o gerenciamento de inventário, desenvolvida com **ReactJS**. O projeto permite realizar todas as operações fundamentais de um sistema de cadastro (Criar, Ler, Atualizar e Deletar produtos) com uma interface ágil e responsiva.

## 🚀 Funcionalidades

* **Listagem de Produtos:** Visualização clara de todos os itens cadastrados.
* **Cadastro de Itens:** Formulário validado para adição de novos produtos (nome, preço, categoria, etc).
* **Edição Dinâmica:** Atualize informações de produtos existentes em tempo real.
* **Remoção de Itens:** Exclusão rápida de registros do sistema.
* **Busca/Filtro:** (Se implementado) Encontre produtos específicos por nome ou categoria.

## 🛠️ Tecnologias Utilizadas

* **ReactJS**: Biblioteca principal para a construção da UI.
* **JavaScript (ES6+)**: Lógica da aplicação.
* **CSS3 / Styled Components**: (Ajuste conforme sua escolha) Estilização personalizada.
* **React Hooks**: Uso de `useState` e `useEffect` para gerenciamento de estado e ciclo de vida.
* **Context API / Axios**: (Ajuste conforme sua escolha) Para gerenciamento de estado global ou consumo de API.

## 📁 Estrutura do Projeto

O código está organizado para facilitar a manutenção e escalabilidade:

plaintext
crud-produtos-reactjs/
├── src/
│   ├── components/   # Componentes reutilizáveis (Botões, Inputs, Cards)
│   ├── pages/        # Telas principais da aplicação
│   ├── services/     # Configuração de chamadas de API (se houver)
│   ├── styles/       # Estilos globais e temas
│   └── App.js        # Componente raiz e gerenciamento de rotas
└── public/           # Arquivos estáticos

## 🔧 Como rodar o projeto
Clone o repositório:

Bash

git clone [https://github.com/mvdevelop/crud-produtos-reactjs.git](https://github.com/mvdevelop/crud-produtos-reactjs.git)
cd crud-produtos-reactjs
Instale as dependências:

Bash

npm install
Inicie o servidor de desenvolvimento:

Bash

npm start
Acesse: http://localhost:3000

## 👨‍💻 Autor
Desenvolvido por mvdevelop.

GitHub: @mvdevelop

## 📄 Licença
Este projeto está sob a licença MIT.
