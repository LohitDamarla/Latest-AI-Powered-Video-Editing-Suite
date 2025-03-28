from flask import Flask, jsonify, request, abort # type: ignore

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Simple in-memory store for tasks
tasks = [
    {
        "id": 1,
        "title": "Updated task",
        "description": "Milk, eggs, bread",
        "done": False
    }
]

# Helper function to find a task by ID
def find_task(task_id):
    return next((task for task in tasks if task['id'] == task_id), None)


@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify({'tasks': tasks})

@app.route('/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task = find_task(task_id)
    if task is None:
        abort(404)
    return jsonify({'task': task})

@app.route('/tasks', methods=['POST'])
def create_task():
    if not request.json or 'title' not in request.json:
        abort(400)
    task = {
        'id': max(task['id'] for task in tasks) + 1 if tasks else 1,
        'title': request.json['title'],
        'description': request.json.get('description', ""),
        'done': False
    }
    tasks.append(task)
    return jsonify({'task': task}), 201

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = find_task(task_id)
    if task is None:
        abort(404)
    if not request.json:
        abort(400)
    task['title'] = request.json.get('title', task['title'])
    task['description'] = request.json.get('description', task['description'])
    task['done'] = request.json.get('done', task['done'])
    return jsonify({'task': task})

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = find_task(task_id)
    if task is None:
        abort(404)
    tasks.remove(task)
    return jsonify({'result': True})

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad request'}), 400

if __name__ == '__main__':
    app.run(debug=True)