# Simple React APP without Redux

In this code I will show you how to create a simple CRUD application using MySQL and NODE JS.

## Database setup

```sql
create database `todo_dev`;
use `todo_dev`;
CREATE TABLE `tbl_todo` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(32),
    `completed` TINYINT
);
```

## Installation instructions

Remember to run `npm install` in the root of the project directory to install the **modules**.
