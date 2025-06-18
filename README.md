#Instruções de Instalação e Execução

##📋 Requisitos

- PHP 8.0+
- Composer 2.0+
- Docker (para uso com Laravel Sail)

##🛠 Configuração do Ambiente de Desenvolvimento

#1. Instale as dependências do Composer:
```bash
   composer install
```

2. Configure o ambiente:
```bash
   cp .env.example .env
   php artisan key:generate
```

3. Inicie os containers:
```bash
   ./vendor/bin/sail up -d
```
4. Execute as migrações:
```bash
   ./vendor/bin/sail artisan migrate
```
6. Instale as dependências do frontend:
```bash
   ./vendor/bin/sail pnpm install
```
7. Inicie o servidor de desenvolvimento:
```bash
   ./vendor/bin/sail pnpm run dev
```
🌐 Acessando a Aplicação

A aplicação estará disponível em:
http://localhost


MODELO RELACIONAL - SISTEMA DE CLIENTES

TABELA clientes
-----------------
- id: INT (PK, AUTO_INCREMENT)
- nome: VARCHAR(100) NOT NULL
- email: VARCHAR(100) NOT NULL UNIQUE
- telefone: VARCHAR(20) NOT NULL
- foto: VARCHAR(255)
- created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- updated_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

RELACIONAMENTOS:
----------------
- Não há tabelas relacionadas neste modelo básico

SQL DE CRIAÇÃO:
---------------
CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DESCRIÇÃO DOS CAMPOS:
---------------------
id         - Identificador único automático
nome       - Nome completo do cliente (obrigatório)
email      - E-mail do cliente (único e obrigatório)
telefone   - Número de telefone (obrigatório)
foto       - Caminho do arquivo de imagem no servidor
created_at - Data/hora de criação do registro
updated_at - Data/hora da última atualização

ÍNDICES:
--------
- Chave primária: id
- Índice único: email

ARQUIVOS RELACIONADOS:
----------------------
- models/Cliente.php: Classe de modelo que interage com esta tabela
- config/config.php: Configurações de conexão com o banco

  ╔══════════════════════════════════════════════╗
  ║                🛡️ ATENÇÃO 🛡️                ║
  ╠══════════════════════════════════════════════╣
  ║ Este projeto não inclui sistema de autentica-║
  ║ ção por focar nos conceitos básicos de MVC.  ║
  ║                                              ║
  ║ Para uso em produção, recomenda-se:          ║
  ║ • Tela de login com JWT                      ║
  ║ • Middlewares de autenticação                ║
  ║ • Criptografia de dados sensíveis           ║
  ╚══════════════════════════════════════════════╝