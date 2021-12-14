CREATE TABLE `mall_management_system`.`persons` (
  `P_id` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Age` int NOT NULL,
  `Gender` varchar(45) NOT NULL,
  `C_No` varchar(45) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Email_ID` varchar(255) NOT NULL
  `Password` varchar(45) NOT NULL
  `Role` varchar(255) NOT NULL
  ADD PRIMARY KEY (`P_id`);
);

 INSERT INTO persons (P_id, Name, Age, Gender, C_No, Email_ID, Password, Address, Role) VALUES 
 (1, "Sonu Kr Shah", 21, "Male"	"1231231231","ABC street"	, "admin@admin.com", "admin", "admin"),
 (2, "Sonu", 20, "Male", "9999999999",	"Hello street",	"sonu@sonu.com",	"admin",	"admin"),
 (5, "Sally Kelly", 30, "Female", "2121212121","sally@sally.com","sally","Sally street", "MM");

CREATE TABLE `mall_management_system`.`mall` (
  `Mall_id` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `C_No` varchar(45) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Email_ID` varchar(45) NOT NULL
  `Description` varchar(255) NOT NULL
  ADD PRIMARY KEY (`Mall_id`);
);

CREATE TABLE `mall_management_system`.`shops` (
  `Shop_id` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `C_No` varchar(45) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Email_ID` varchar(255) NOT NULL,
  `Mall_id` varchar(45) NOT NULL
  ADD PRIMARY KEY (`Shop_id`);
);

