from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://admin:1234@localhost/your_database'
db = SQLAlchemy(app)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)

@app.route('/todos', methods=['GET', 'POST'])
def todos():
    if request.method == 'GET':
        todos = Todo.query.all()
        todos_list = [{'id': todo.id, 'content': todo.content} for todo in todos]
        return jsonify({'todos': todos_list})
    elif request.method == 'POST':
        data = request.get_json()
        new_todo = Todo(content=data['content'])
        db.session.add(new_todo)
        db.session.commit()
        return jsonify({'message': 'Todo added successfully'})

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)

