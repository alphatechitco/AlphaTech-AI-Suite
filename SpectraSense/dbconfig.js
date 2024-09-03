// AlphaTech - LinkedList Module
// This module implements a database connection to be used by other files....
// Developed by AlphaTech 

const mysql=require('mysql') // Use mysql2 if required

const connection=mysql.createConnection({
    host: 'localhost', // localhost if running a local database
    user: 'root', // Root 
    password: '',
    database: '' //Use Database Name 
});

connection.connect((err)=>{
    if(err){
        console.error('Error connecting to the database:', err)
        return;
    } else {
        console.log('Connected to the mySQl Databse.')
    }
})

module.exports=connection;