# 使用官方 Python 运行时作为父镜像
FROM python:3.11.4-slim

# 设置工作目录
WORKDIR /app

# 将当前目录内容复制到容器的 /app 目录中
ADD . /app

# 安装项目需要的包
RUN pip install --no-cache-dir -r requirements.txt

# 设置环境变量
ENV NAME World

# 对外暴露端口
EXPOSE 5000

# 运行 app.py 时，容器启动
CMD ["python", "run.py"]