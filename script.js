const db = require("./database");

// Teste de consulta
db.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Erro ao executar consulta:", err);
  } else {
    console.log("Hora atual no banco de dados:", res.rows[0]);
  }
  db.end(); // Fecha a conexão
});
