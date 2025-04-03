from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuração do banco de dados no Render
DB_URL = "postgresql://postgres1:JvMXTa38azfA1f8Du8To2n7TR7VToKA0@dpg-cvmt4sc9c44c73bkq1ug-a.oregon-postgres.render.com/campanha_phishing"

def conectar_db():
    """Cria uma conexão segura com o banco de dados"""
    try:
        conn = psycopg2.connect(DB_URL, sslmode="require")
        return conn
    except Exception as e:
        print(f"Erro na conexão com o banco: {e}")
        return None  # Retorna None se a conexão falhar

@app.route("/registra_clique", methods=["POST"])
def registra_clique():
    data = request.json
    hash_key = data.get("key")

    if not hash_key:
        return jsonify({"erro": "Key não fornecida"}), 400

    conn = conectar_db()
    if not conn:
        return jsonify({"erro": "Erro ao conectar ao banco de dados"}), 500

    try:
        cur = conn.cursor()

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
        print(f"Erro ao registrar clique: {e}")
        return jsonify({"erro": "Erro interno no servidor"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)  # Debug ativado para mais detalhes
