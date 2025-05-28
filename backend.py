from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas as rotas

# Configuração do banco de dados
DB_URL = "postgresql://cliques_dwqh_user:F1gSTRIHqZus712E6Vd91hlprQXagIdn@dpg-d0r405qdbo4c73a0ok9g-a.oregon-postgres.render.com/cliques_dwqh"

def conectar_db():
    return psycopg2.connect(DB_URL)

@app.route("/registra_clique", methods=["POST"])
def registra_clique():
    data = request.json
    hash_key = data.get("key")

    if not hash_key:
        return jsonify({"erro": "Key não fornecida"}), 400

    try:
        conn = conectar_db()
        cur = conn.cursor()

        # Atualiza apenas se o data_clique ainda for NULL (primeiro clique)
        cur.execute("""
            UPDATE cliques_email 
            SET data_clique = %s 
            WHERE hash = %s AND data_clique IS NULL
            RETURNING email;
        """, (datetime.now(), hash_key))

        resultado = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()

        if resultado:
            return jsonify({"mensagem": "Clique registrado com sucesso", "email": resultado[0]}), 200
        else:
            return jsonify({"erro": "Hash não encontrado ou clique já registrado"}), 400

    except Exception as e:
        return jsonify({"erro": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
