
create database company;

use company;

create table department(
id int not null auto_increment,
name varchar(30) not null,
primary key (id)
);

create table role(
id int not null auto_increment,
title varchar(30) not null,
salary decimal not null,
department_id int,
foreign key (department_id) references department(id),
primary key (id)
);

create table employee(
id int not null auto_increment,
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id int,
manager_id int,
foreign  key (role_id) references role(id),
foreign key (manager_id) references employee(id),
primary key (id)
);
