import mysql from 'promise-mysql';
import keys from './keys';

const pool = mysql.createPool(keys.database);

async function connectToDatabase() {
    pool.getConnection()
	.then(connection =>{
		pool.releaseConnection(connection);
		console.log('Base de Datos Conectada...');
}); 

}

connectToDatabase();

export default pool;
