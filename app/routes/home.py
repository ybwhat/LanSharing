# app/routes/home.py
from flask import jsonify, render_template, request
from app import app

global_str = "Hello World!"

@app.route('/')
def home():
    return render_template('home.html')


@app.route('/strGet')
def str_get():
    return jsonify(global_str) # 将字典转换为JSON格式并返回


@app.route('/strSave', methods=['POST'])
def str_save():
    global global_str
    data = request.get_json()
    global_str = data.get('content')
    return jsonify({'status': 'success'})