document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('task-input').addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    if (taskInput.value.trim() !== '') {
        const taskText = document.createTextNode(taskInput.value.trim());
        const deleteButton = document.createElement('span');
        deleteButton.className = 'delete-btn';
        deleteButton.appendChild(document.createTextNode('Delete'));
        deleteButton.addEventListener('click', function () {
            confirmDeletion(taskItem);
        });

        const taskItem = document.createElement('li');
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);

        taskInput.value = '';
    }
}

function confirmDeletion(taskItem) {
    const isConfirmed = window.confirm('Are you sure you want to delete this task?');

    if (isConfirmed) {
        const taskList = document.getElementById('task-list');
        taskList.removeChild(taskItem);
    }
}
