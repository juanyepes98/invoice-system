CREATE DATABASE [InvoiceSystem];

USE [InvoiceSystem];

CREATE TABLE [Product]
(
[id] INT IDENTITY(1,1),
[name] VARCHAR (60) NOT NULL,
[short_description] VARCHAR(120) NOT NULL,
[unit_price] DECIMAL(10,2) NOT NULL,
[taxes] DECIMAL(10,2) NOT NULL,
[created_at] DATETIME NOT NULL,

CONSTRAINT PK_Product PRIMARY KEY (id),
);

CREATE TABLE [Client]
(
[id] INT IDENTITY(1,1),
[card_id] INT NOT NULL,
[name] VARCHAR (60) NOT NULL,
[address] VARCHAR(60) NOT NULL,
[phone_number] VARCHAR(15) NOT NULL,
[created_at] DATETIME NOT NULL,

CONSTRAINT PK_Client PRIMARY KEY (id),
);

CREATE TABLE [Invoice]
(
[id] INT IDENTITY(1,1),
[client_id] INT NOT NULL,
[subtotal_amount] DECIMAL(10,2) NULL,
[total_amount] DECIMAL(10,2) NULL,
[delivery] DECIMAL(10,2) NULL,
[included_taxes] DECIMAL(10,2) NULL,
[created_at] DATETIME NOT NULL,

CONSTRAINT PK_Invoice PRIMARY KEY (id),
CONSTRAINT FK_Invoice_Client FOREIGN KEY (client_id) REFERENCES [Client](id)
);

CREATE TABLE [InvoiceHasProduct]
(
[invoice_id] INT NOT NULL,
[product_id] INT NOT NULL,
[quantity] INT NOT NULL DEFAULT 0,
CONSTRAINT PK_InvoiceProduct PRIMARY KEY ([invoice_id], [product_id]),
CONSTRAINT FK_InvoiceProduct_Invoice FOREIGN KEY (invoice_id) REFERENCES [Invoice](id),
CONSTRAINT FK_InvoiceProduct_Product FOREIGN KEY (product_id) REFERENCES [Product](id)
)

INSERT INTO [Product] (name, short_description, unit_price, taxes, created_at) VALUES ('T-Shirt', 'T-Shirt color blue', 20, 2, '2021-02-21 09:28:00');
INSERT INTO [Product] (name, short_description, unit_price, taxes, created_at) VALUES ('T-Shirt', 'T-Shirt color white', 20, 2, '2021-02-21 09:28:00');
INSERT INTO [Product] (name, short_description, unit_price, taxes, created_at) VALUES ('T-Shirt', 'T-Shirt color black', 20, 2, '2021-02-21 09:28:00');