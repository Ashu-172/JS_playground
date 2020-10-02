const mysql = require("mysql2/promise");

connect();

async function connect() {
  try {
    const conn = await mysql.createConnection({
      host: "192.168.43.69",
      port: 3306,
      user: "ashutosh",
      password: "Ashutosh@1",
      database: "testdb",
    });

    await conn.beginTransaction();

    const resultDelete = await conn.query(
      "delete from employees where name = ?",
      ["Ashwini Mishra"]
    );
    console.log(resultDelete[0].affectedRows);

    const resultInsert = await conn.query(
      "insert into employees (id,name,ssn) values ( ?, ?, ?)",
      [6, "Ashwini", "116"]
    );
    console.log(resultInsert[0].affectedRows);

    const result = await conn.query("select * from employees");
    console.table(result[0]);

    const resultUpdate = await conn.query(
      "update employees set name = ? where name = ?",
      ["Ashwini Mishra", "Ashwini"]
    );
    console.log(resultUpdate[0].affectedRows);

    await conn.commit();

    const [row, schema] = await conn.query("select * from employees");
    console.table(row);

    const ssn = "116";
    const emp = await conn.query(`select * from employees where ssn = ?`, [
      ssn,
    ]);
    console.table(emp[0]);
  } catch (ex) {
    console.error(ex);
  }
}
