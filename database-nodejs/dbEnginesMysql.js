const mysql = require("mysql2/promise")

//connectMYISAM();
connectINNODB();

async function connectMYISAM(){
    try{
        const conn = await mysql.createConnection({
            "host" : "192.168.43.69",
            "port" : 3306,
            "user" : "ashutosh",
            "password" : "Ashutosh@1",
            "database" : "engine_demo"
        });

        await conn.beginTransaction();

        await conn.query("insert into employees_myisam (name) values (?)",["Ashwini"]);

        //if we add breakpoint on next line and check the data in the table from some other session, 
        //we'll able to see newly added data without commit because myIsam does not support transactions
        await conn.commit();
        await conn.close();
    }
    catch(ex){
        console.error(ex);
    }
}


async function connectINNODB(){
    try{
        const conn = await mysql.createConnection({
            "host" : "192.168.43.69",
            "port" : 3306,
            "user" : "ashutosh",
            "password" : "Ashutosh@1",
            "database" : "engine_demo"
        });

        await conn.beginTransaction();

        const resultInsert =  await conn.query("insert into employees_innodb (name) values (?)",["Mishra"]);

        //console.log(resultInsert[0].affectedRows);
        await conn.commit();
        await conn.close();
    }
    catch(ex){
        console.error(ex);
    }   
}