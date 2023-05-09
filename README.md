## Description

This project is a RESTful API built with NestJS using clean architecture and clean code principles. The API allows you to manage users, send emails, and interact with user avatars.

The API has been designed with a modular architecture that follows the principles of clean architecture. The different layers of the application are decoupled and independent of each other. The use cases and business logic are located in the domain layer, which is independent of the infrastructure layer and can be easily tested.

In addition to the use of clean architecture, the codebase follows clean code principles to ensure that the code is easy to understand, maintain, and extend. The code is structured in a way that promotes readability and modularity. The naming conventions used in the codebase are consistent and follow industry best practices.

Overall, the use of clean architecture and clean code principles in this project ensures that the codebase is scalable, maintainable, and easy to extend.

## Prerequisites

- Docker and Docker Compose
- Node.js Stable

## Installation

```bash
$ yarn install
```

### Configuring Nodemailer with Gmail
**Important!** Before you can use the code, you need to fill in the required environment variables in a .env file. Here's how you can do it:

1. Update `.env.dev` and `.env.test` files in the root directory of your project.
2. Open the `.env.dev` and `.env.test` files in a text editor.
3. Set the value of `SMTP_HOST` to "smtp.gmail.com"
4. Set the value of `SMTP_USER` to your Gmail email address.
5. Set the value of `SMTP_PASS` to your Gmail **App Password**.

If you don't have an **App Password**, please follow the steps below to generate one and use that as the value for `SMTP_PASS`:

  1. Open your Gmail account and go to "Settings" (gear icon on the top-right corner).
  2. Click on "See all settings".
  3. Click on the "Accounts and Import" tab.
  4. Under the "Change account settings" section, click on "Google Account settings".
  5. Click on the "Security" tab.
  6. Under the "Signing in to Google" section, click on "App passwords".
  7. Select the app and device where you want to use the app password and click on "Generate".
  8. Follow the instructions to enter the app password in your email client or application.
  9. Once you've generated the app password, copy it and paste it as the value for `SMTP_PASS` in your `.env` file.

> **Note:**  To use this code, you need to set the required environment variables in both `.env.dev` and `.env.test` files located in the root directory of your project. Please note that these files should be kept confidential as they may contain sensitive information such as passwords and API keys.

That's it! You should now be able to run the sample code and send emails using Nodemailer with your Gmail account.

## Pre-start

```bash
# Run MongoDb and RabbitMq
$ yarn rmq:dev:up && yarn db:dev:up
```

## Running the app

The command `yarn start:dev` will run a pre start stript to run Mongo Database and Rabbit MQ service.

```bash
# watch mode
$ yarn start:dev
```


## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## API Endpoints and Features Screenshots
I have taken screenshots of the API endpoints being accessed using a REST client software to provide an overview of the four features described in the project structure. These screenshots can be found in the `screenshots` directory.


## Swagger
You can access the api swagger at endpoint `api/docs`

## Stay in touch

- Author - [Rafael Guimarães](https://github.com/rafaelfigueredog)


