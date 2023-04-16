# Tech Blog

## Description

This application is a CMS-style blog site built for developers to publish their blog posts and comment on other developers' posts. It follows the MVC paradigm in its architectural structure, uses Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## Table of Contents [TOC]

 -Installation
 -Usage
 -Contributing

## Installation

1. Clone the repository to your local machine.

git clone https://github.com/your_username/tech-blog.git

2. Navigate to the project directory and install the necessary dependencies.

cd tech-blog
npm install

3. Create a .env file in the root of the project and add your MySQL username and password.

DB_NAME='tech_blog_db'
DB_USER='your_mysql_username'
DB_PW='your_mysql_password'

4. Create the database and tables by running the following commands in MySQL.

DROP DATABASE IF EXISTS tech_blog_db;
CREATE DATABASE tech_blog_db;
USE tech_blog_db;

npm run seed

## Usage

1. Start the server.

npm start

2. Open your browser and navigate to http://localhost:3001.

3. Sign up for a new account or log in with an existing account.

4. Create, update, or delete blog posts on the dashboard page.

5. View existing blog posts and leave comments on the homepage.

6. Log out of the site when finished.

## Contributing

Contributions are welcome! Please open an issue or pull request with any suggestions or bug fixes.