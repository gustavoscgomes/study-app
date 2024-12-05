# 📚 Study App

O **Study App** é um aplicativo para gerenciamento de cartões de estudo, permitindo que os usuários organizem suas tarefas e estudos com categorias, status e datas de término. Ele utiliza Firebase Authentication para autenticação e Firestore para armazenamento dos cartões.

---

## 🚀 Tecnologias Utilizadas

- **React Native**: Estrutura principal para construção do aplicativo.
- **Expo**: Ferramenta para desenvolvimento de aplicações React Native.
- **Firebase**:
  - **Authentication**: Gerencia login e autenticação.
  - **Firestore**: Banco de dados NoSQL para armazenar os cartões de estudo.
- **React Navigation**: Navegação entre telas.
- **DateTimePicker**: Seleção de datas e horários.
- **React Native Vector Icons**: Ícones personalizáveis.

---

## 🛠️ Funcionalidades

- **Autenticação de Usuário**:
  - Login e registro usando Firebase Authentication.
- **Gestão de Cartões de Estudo**:
  - Criar, visualizar, editar e excluir cartões.
  - Categorizar cartões por status (Backlog, Em Progresso, Concluído).
  - Definir datas de término.
- **Armazenamento na Nuvem**:
  - Sincronização de dados no Firestore.
  - Dados associados ao usuário autenticado.
- **UI Responsiva**:
  - Design simples e funcional para dispositivos móveis.

---

## 📦 Estrutura do Projeto

```plaintext
src/
├── config/               # Configuração do Firebase
├── contexts/             # Context API (Auth, Cartões)
├── screens/              # Telas principais do app
```
---

## ⚙️ Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://expo.dev/)
- [Android Studio](https://developer.android.com/studio) ou um dispositivo físico Android
- [Firebase](https://firebase.google.com/)

---

## 🔧 Configuração do Firebase

1. Crie um projeto no [Firebase](https://console.firebase.google.com/).
2. Ative os serviços **Authentication** e **Firestore**.
3. Configure as [Regras do Firestore](https://firebase.google.com/docs/firestore/security/get-started):
   ```json
   rules_version = '2';

   service cloud.firestore {
     match /databases/{database}/documents {
       match /cartoes/{document} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```
4. **Crie o arquivo `.env` na raiz do projeto e adicione as credenciais**:
   ```env
   FIREBASE_API_KEY=SEU_API_KEY
   FIREBASE_AUTH_DOMAIN=SEU_AUTH_DOMAIN
   FIREBASE_PROJECT_ID=SEU_PROJECT_ID
   FIREBASE_STORAGE_BUCKET=SEU_STORAGE_BUCKET
   FIREBASE_MESSAGING_SENDER_ID=SEU_MESSAGING_SENDER_ID
   FIREBASE_APP_ID=SEU_APP_ID
   ```
---

## 🚀 Como Rodar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/study-app.git
   cd study-app
2. **Instale as dependências**:
   ```bash
   npm install
3. **Inicie o aplicativo**:
   ```bash
   npm start
