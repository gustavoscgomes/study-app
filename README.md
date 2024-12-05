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
├── components/           # Componentes reutilizáveis
├── contexts/             # Context API (Auth, Cartões)
├── screens/              # Telas principais do app
├── config/               # Configuração do Firebase
├── App.js                # Arquivo principal do aplicativo
