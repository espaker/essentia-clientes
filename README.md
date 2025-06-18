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

2. Inicie os containers:
```bash
   ./vendor/bin/sail up -d
```
3. Execute as migrações:
```bash
   ./vendor/bin/sail artisan migrate
```
4. Instale as dependências do frontend:
```bash
   ./vendor/bin/sail npm install
```
5. Inicie o servidor de desenvolvimento:
```bash
   ./vendor/bin/sail npm run dev
```
🌐 Acessando a Aplicação

A aplicação estará disponível em:
http://localhost
