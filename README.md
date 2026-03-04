# SAC - Sistema Administrativo Congregação
## Regional Itapevi

O **SAC** (Sistema Administrativo Congregação) é uma plataforma moderna e intuitiva desenvolvida para facilitar a gestão administrativa da **Regional Itapevi**. O sistema oferece ferramentas robustas para controle de membros, ministério, atendimentos e gestões específicas de diversos setores.

## 🚀 Funcionalidades Principais

- **Autenticação Segura**: Gerenciamento de acesso via Supabase Auth.
- **Controle de Acessos (RBAC)**: Diferentes níveis de acesso para Administradores (Managers) e Membros de setores.
- **Módulos Setoriais**:
  - **D.A.R.P.E**: Gestão de dados e relatórios específicos.
  - **E.B.I**: Controle de atividades educacionais/infantis.
  - **G.E.M**: Gestão de musicalização e métodos.
  - **D.E.P.A.C**: Controle de atendimentos, batismos e membros.
- **Interface Premium**: Layout baseado no Inspinia Admin Theme, responsivo e com notificações elegantes via SweetAlert2.
- **PWA (Progressive Web App)**: Instalável em dispositivos móveis para acesso rápido.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: AngularJS (v1.x)
- **Estilização**: Bootstrap 3 + CSS3 Customizado
- **Backend / Banco de Dados**: [Supabase](https://supabase.com/) (PostgreSQL + Auth)
- **Ícones**: FontAwesome 4.7 & 6.0
- **Notificações**: SweetAlert2
- **Traduções**: Angular Translate

## 📦 Como Rodar o Projeto

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. **Rodar localmente:**
   Pode ser utilizado qualquer servidor estático. Exemplo com `http-server`:
   ```bash
   npx http-server .
   ```

3. **Configuração do Supabase:**
   Certifique-se de que as chaves de API em `js/services/auth.service.js` e `js/config.js` estão configuradas corretamente para o seu ambiente.

## 📝 Licença

Este projeto é de uso restrito da Regional Itapevi. Todos os direitos reservados.

---
Desenvolvido com ❤️ para a Regional Itapevi.
