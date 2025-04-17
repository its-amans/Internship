        document.addEventListener('DOMContentLoaded', function() {
            const taskInput = document.getElementById('taskInput');
            const addTaskBtn = document.getElementById('addTaskBtn');
            const taskList = document.getElementById('taskList');
            const filterButtons = document.querySelectorAll('.filter-btn');
            const taskCount = document.getElementById('taskCount');
            
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            
            // Render tasks
            function renderTasks(filter = 'all') {
                taskList.innerHTML = '';
                
                let filteredTasks = tasks;
                if (filter === 'active') {
                    filteredTasks = tasks.filter(task => !task.completed);
                } else if (filter === 'completed') {
                    filteredTasks = tasks.filter(task => task.completed);
                }
                
                if (filteredTasks.length === 0) {
                    taskList.innerHTML = '<li style="text-align: center; color: #666;">No tasks found</li>';
                } else {
                    filteredTasks.forEach((task, index) => {
                        const li = document.createElement('li');
                        li.className = 'task-item';
                        li.innerHTML = `
                            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-id="${index}">
                            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                            <button class="delete-btn" data-id="${index}">Delete</button>
                        `;
                        taskList.appendChild(li);
                    });
                }
                
                updateTaskCount();
            }
            
            // Add new task
            function addTask() {
                const text = taskInput.value.trim();
                if (text) {
                    tasks.push({ text, completed: false });
                    saveTasks();
                    taskInput.value = '';
                    renderTasks(getCurrentFilter());
                }
            }
            
            // Toggle task completion
            function toggleTask(index) {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks(getCurrentFilter());
            }
            
            // Delete task
            function deleteTask(index) {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks(getCurrentFilter());
            }
            
            // Save tasks to localStorage
            function saveTasks() {
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
            
            // Update task count
            function updateTaskCount() {
                const activeTasks = tasks.filter(task => !task.completed).length;
                taskCount.textContent = activeTasks;
            }
            
            // Get current filter
            function getCurrentFilter() {
                const activeFilter = document.querySelector('.filter-btn.active');
                return activeFilter ? activeFilter.dataset.filter : 'all';
            }
            
            // Event listeners
            addTaskBtn.addEventListener('click', addTask);
            
            taskInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addTask();
                }
            });
            
            taskList.addEventListener('click', function(e) {
                if (e.target.classList.contains('task-checkbox')) {
                    const index = e.target.dataset.id;
                    toggleTask(index);
                } else if (e.target.classList.contains('delete-btn')) {
                    const index = e.target.dataset.id;
                    deleteTask(index);
                }
            });
            
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    renderTasks(this.dataset.filter);
                });
            });
            
            // Initial render
            renderTasks();
        });