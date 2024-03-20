# app/routes/home.py
from flask import jsonify, render_template, request
from app import app

@app.route('/')
def home():
    return render_template('home.html')

global_str = None

@app.route('/strGet')
def str_get():
     # 添加这行来声明 global_str 是一个全局变量
    global global_str 
    if global_str is None:
        with open('app/static/str.txt', 'r', encoding='utf-8') as f:
            global_str = f.read()
    # 将global_str转换为JSON格式并返回
    return jsonify({'status': 'success', 'data': global_str})


@app.route('/strSave', methods=['POST'])
def str_save():
    global global_str
    data = request.get_json()
    str = data.get('content')
    print(len(str))
    if len(str) < 8192:
        with open('app/static/str.txt', 'w', encoding='utf-8') as f:
            f.write(str)
        global_str = str
        return jsonify({'status': 'success', 'data': global_str})
    else:
        print('fail')
        return jsonify({'status': 'error', 'message': '提供的字符串太长 (最大长度: 8192'})

# # webRTC
# @socketio.on('sdp', namespace='/webrtc')
# def webrtc_message(message):
#     emit('sdp', message, broadcast=True)

# @socketio.on('ice_candidate', namespace='/webrtc')
# def webrtc_ice_candidate(candidate):
#     emit('ice_candidate', candidate, broadcast=True)