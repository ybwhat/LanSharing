var url = window.location.href;


var quill = new Quill('#content', {
  theme: 'snow'
});

//刷新发送
document.getElementById('send').addEventListener('touchstart', onBlur,true);
document.getElementById('refresh').addEventListener('touchstart', refresh,true);
document.getElementById('send').addEventListener('click', onBlur);
document.getElementById('refresh').addEventListener('click', refresh);

//复制粘贴
document.getElementById('copy').addEventListener('touchstart', copy,true);
document.getElementById('del').addEventListener('touchstart', del,true);
document.getElementById('copy').addEventListener('click', copy);
document.getElementById('del').addEventListener('click', del,true);

function onBlur() {
  var content = quill.getText();
  // 发送 POST 请求
  var xhr = new XMLHttpRequest();
  xhr.open("POST",url+ "/strSave");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  var data = JSON.stringify({ "content" : content });
  xhr.send(data);

  // 接收响应信息
  xhr.onload = function() {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
    } else {
      // 处理其他HTTP状态码
      console.log("HTTP状态码：" + xhr.status);
    }
  };

  // 处理请求失败的情况
  xhr.onerror = function() {
    console.log("请求失败");
  };
}

function refresh() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url+ "/strGet");

  xhr.onload = function() {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      quill.setText(response);
    } else {
      console.log("HTTP状态码：" + xhr.status);
    }
  };

  xhr.onerror = function() {
    console.log("请求失败");
  };

  xhr.send();
}
document.addEventListener("DOMContentLoaded", function() {
  refresh();
});

function copy() {
  var text = quill.getText();
  if (navigator.clipboard) {
      // clipboard api 复制
      navigator.clipboard.writeText(text);
  } else {
    var textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    // 隐藏此输入框
    textarea.style.position = 'fixed';
    textarea.style.clip = 'rect(0 0 0 0)';
    textarea.style.top = '10px';
    // 赋值
    textarea.value = text;
    // 选中
    textarea.select();
    // 复制
    document.execCommand('copy', true);
    // 移除输入框
    document.body.removeChild(textarea);
  }
}

function del() {
  quill.setText('');
}