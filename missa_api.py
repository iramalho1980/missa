#!/usr/bin/env python3
"""
API Flask para gerenciar missas montadas
Fornece endpoints para salvar, carregar, listar e excluir missas
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Permitir CORS para todas as rotas

# Configuração do banco de dados
DATABASE = 'missas.db'

def init_db():
    """Inicializa o banco de dados com as tabelas necessárias"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Tabela para armazenar as missas
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS missas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL UNIQUE,
            conteudo TEXT NOT NULL,
            data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            data_modificacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Tabela para histórico de modificações
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS historico_missas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            missa_id INTEGER,
            nome TEXT NOT NULL,
            conteudo TEXT NOT NULL,
            data_modificacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (missa_id) REFERENCES missas (id)
        )
    ''')
    
    conn.commit()
    conn.close()

def get_db_connection():
    """Retorna uma conexão com o banco de dados"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/missas', methods=['GET'])
def listar_missas():
    """Lista todas as missas salvas"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, nome, data_criacao, data_modificacao 
            FROM missas 
            ORDER BY data_modificacao DESC
        ''')
        
        missas = []
        for row in cursor.fetchall():
            missas.append({
                'id': row['id'],
                'nome': row['nome'],
                'data_criacao': row['data_criacao'],
                'data_modificacao': row['data_modificacao']
            })
        
        conn.close()
        return jsonify({'success': True, 'missas': missas})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/missas', methods=['POST'])
def salvar_missa():
    """Salva uma nova missa ou atualiza uma existente"""
    try:
        data = request.get_json()
        nome = data.get('nome')
        conteudo = data.get('conteudo')
        
        if not nome or not conteudo:
            return jsonify({'success': False, 'error': 'Nome e conteúdo são obrigatórios'}), 400
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Verificar se já existe uma missa com esse nome
        cursor.execute('SELECT id, conteudo FROM missas WHERE nome = ?', (nome,))
        existing = cursor.fetchone()
        
        if existing:
            # Atualizar missa existente
            missa_id = existing['id']
            
            # Salvar no histórico antes de atualizar
            cursor.execute('''
                INSERT INTO historico_missas (missa_id, nome, conteudo)
                VALUES (?, ?, ?)
            ''', (missa_id, nome, existing['conteudo']))
            
            # Atualizar a missa
            cursor.execute('''
                UPDATE missas 
                SET conteudo = ?, data_modificacao = CURRENT_TIMESTAMP 
                WHERE id = ?
            ''', (json.dumps(conteudo), missa_id))
            
            message = 'Missa atualizada com sucesso'
        else:
            # Criar nova missa
            cursor.execute('''
                INSERT INTO missas (nome, conteudo) 
                VALUES (?, ?)
            ''', (nome, json.dumps(conteudo)))
            
            message = 'Missa salva com sucesso'
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': message})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/missas/<int:missa_id>', methods=['GET'])
def obter_missa(missa_id):
    """Obtém uma missa específica pelo ID"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, nome, conteudo, data_criacao, data_modificacao 
            FROM missas 
            WHERE id = ?
        ''', (missa_id,))
        
        row = cursor.fetchone()
        if not row:
            return jsonify({'success': False, 'error': 'Missa não encontrada'}), 404
        
        missa = {
            'id': row['id'],
            'nome': row['nome'],
            'conteudo': json.loads(row['conteudo']),
            'data_criacao': row['data_criacao'],
            'data_modificacao': row['data_modificacao']
        }
        
        conn.close()
        return jsonify({'success': True, 'missa': missa})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/missas/nome/<nome>', methods=['GET'])
def obter_missa_por_nome(nome):
    """Obtém uma missa específica pelo nome"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, nome, conteudo, data_criacao, data_modificacao 
            FROM missas 
            WHERE nome = ?
        ''', (nome,))
        
        row = cursor.fetchone()
        if not row:
            return jsonify({'success': False, 'error': 'Missa não encontrada'}), 404
        
        missa = {
            'id': row['id'],
            'nome': row['nome'],
            'conteudo': json.loads(row['conteudo']),
            'data_criacao': row['data_criacao'],
            'data_modificacao': row['data_modificacao']
        }
        
        conn.close()
        return jsonify({'success': True, 'missa': missa})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/missas/<int:missa_id>', methods=['DELETE'])
def excluir_missa(missa_id):
    """Exclui uma missa específica"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Verificar se a missa existe
        cursor.execute('SELECT nome FROM missas WHERE id = ?', (missa_id,))
        if not cursor.fetchone():
            return jsonify({'success': False, 'error': 'Missa não encontrada'}), 404
        
        # Excluir histórico relacionado
        cursor.execute('DELETE FROM historico_missas WHERE missa_id = ?', (missa_id,))
        
        # Excluir a missa
        cursor.execute('DELETE FROM missas WHERE id = ?', (missa_id,))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Missa excluída com sucesso'})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/missas/nome/<nome>', methods=['DELETE'])
def excluir_missa_por_nome(nome):
    """Exclui uma missa específica pelo nome"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Verificar se a missa existe e obter o ID
        cursor.execute('SELECT id FROM missas WHERE nome = ?', (nome,))
        row = cursor.fetchone()
        if not row:
            return jsonify({'success': False, 'error': 'Missa não encontrada'}), 404
        
        missa_id = row['id']
        
        # Excluir histórico relacionado
        cursor.execute('DELETE FROM historico_missas WHERE missa_id = ?', (missa_id,))
        
        # Excluir a missa
        cursor.execute('DELETE FROM missas WHERE id = ?', (missa_id,))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Missa excluída com sucesso'})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/missas/<int:missa_id>/historico', methods=['GET'])
def obter_historico_missa(missa_id):
    """Obtém o histórico de modificações de uma missa"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, nome, conteudo, data_modificacao 
            FROM historico_missas 
            WHERE missa_id = ? 
            ORDER BY data_modificacao DESC
        ''', (missa_id,))
        
        historico = []
        for row in cursor.fetchall():
            historico.append({
                'id': row['id'],
                'nome': row['nome'],
                'conteudo': json.loads(row['conteudo']),
                'data_modificacao': row['data_modificacao']
            })
        
        conn.close()
        return jsonify({'success': True, 'historico': historico})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/backup', methods=['GET'])
def fazer_backup():
    """Faz backup de todas as missas em formato JSON"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT nome, conteudo, data_criacao, data_modificacao 
            FROM missas 
            ORDER BY nome
        ''')
        
        backup_data = []
        for row in cursor.fetchall():
            backup_data.append({
                'nome': row['nome'],
                'conteudo': json.loads(row['conteudo']),
                'data_criacao': row['data_criacao'],
                'data_modificacao': row['data_modificacao']
            })
        
        conn.close()
        
        return jsonify({
            'success': True, 
            'backup': backup_data,
            'data_backup': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/restore', methods=['POST'])
def restaurar_backup():
    """Restaura missas a partir de um backup JSON"""
    try:
        data = request.get_json()
        backup_data = data.get('backup')
        
        if not backup_data:
            return jsonify({'success': False, 'error': 'Dados de backup não fornecidos'}), 400
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        restored_count = 0
        for missa_data in backup_data:
            nome = missa_data.get('nome')
            conteudo = missa_data.get('conteudo')
            
            if nome and conteudo:
                # Verificar se já existe
                cursor.execute('SELECT id FROM missas WHERE nome = ?', (nome,))
                if not cursor.fetchone():
                    cursor.execute('''
                        INSERT INTO missas (nome, conteudo) 
                        VALUES (?, ?)
                    ''', (nome, json.dumps(conteudo)))
                    restored_count += 1
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True, 
            'message': f'{restored_count} missas restauradas com sucesso'
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/status', methods=['GET'])
def status():
    """Retorna o status da API e estatísticas do banco"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Contar missas
        cursor.execute('SELECT COUNT(*) as total FROM missas')
        total_missas = cursor.fetchone()['total']
        
        # Contar registros de histórico
        cursor.execute('SELECT COUNT(*) as total FROM historico_missas')
        total_historico = cursor.fetchone()['total']
        
        conn.close()
        
        return jsonify({
            'success': True,
            'status': 'API funcionando',
            'estatisticas': {
                'total_missas': total_missas,
                'total_historico': total_historico,
                'database_file': DATABASE
            }
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({'success': False, 'error': 'Endpoint não encontrado'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'success': False, 'error': 'Erro interno do servidor'}), 500

if __name__ == '__main__':
    # Inicializar o banco de dados
    init_db()
    
    # Executar a aplicação
    app.run(host='0.0.0.0', port=5000, debug=True)

