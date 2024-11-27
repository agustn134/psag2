export default{
    database:{

        host: 'database-psag.c58swme6copi.us-east-2.rds.amazonaws.com', // Dirección de tu RDS
    user: 'admin',                                                  // Usuario de la base de datos
    password: 'PsicoAguila2024',                                    // Contraseña de la base de datos
    database: 'PSAG_6',                                             // Nombre correcto de la base de datos
    port: 3306                                                      // Puerto predeterminado de MySQL


        // host: 'database-psag.c58swme6copi.us-east-2.rds.amazonaws.com',
        // user: 'admin',
        // password: 'PsicoAguila2024',
        // database: 'database-psag'
        // host: 'sql3.freesqldatabase.com',
        // user: 'sql3746356',
        // password: 'Eb42zTrQXh',
        // database: 'sql3746356',
        // port: 3306 // Opcional si ya es el puerto predeterminado
    },
    jwtSecret: '1234567890'

}

// export default {
//     database: {
//       host: process.env.DB_HOST || 'database-psag.c58swme6copi.us-east-2.rds.amazonaws.com',
//       user: process.env.DB_USER || 'admin',
//       password: process.env.DB_PASSWORD || 'PsicoAguila2024',
//       database: process.env.DB_NAME || 'PSAG_6',
//       port: parseInt(process.env.DB_PORT || '3306', 10),
//     },
//     jwtSecret: process.env.JWT_SECRET || '1234567890',
//   };
  