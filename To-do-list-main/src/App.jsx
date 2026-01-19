import React, { useRef, useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskIdCounter, setTaskIdCounter] = useState(1);
  const [theme, setTheme] = useState("violet"); // violet, coral, mint, sunset
  const [filter, setFilter] = useState("all"); // all, active, completed
  const inputRef = useRef(null);

  const themes = {
    violet: {
      primary: "from-[#8B5CF6] to-[#EC4899]",
      secondary: "bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]",
      accent: "bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]",
      card: "bg-gradient-to-br from-[#1E1B4B]/80 to-[#4C1D95]/80",
      text: "text-violet-50",
      button: "bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] hover:from-[#7C3AED] hover:to-[#DB2777]",
      border: "border-violet-400/30",
      checkbox: "accent-violet-500",
      completed: "text-pink-300/70",
    },
    coral: {
      primary: "from-[#F97316] to-[#F43F5E]",
      secondary: "bg-gradient-to-r from-[#F97316] to-[#F43F5E]",
      accent: "bg-gradient-to-r from-[#F97316] to-[#F43F5E]",
      card: "bg-gradient-to-br from-[#7C2D12]/80 to-[#9F1239]/80",
      text: "text-orange-50",
      button: "bg-gradient-to-r from-[#F97316] to-[#F43F5E] hover:from-[#EA580C] hover:to-[#E11D48]",
      border: "border-orange-400/30",
      checkbox: "accent-orange-500",
      completed: "text-orange-300/70",
    },
    mint: {
      primary: "from-[#10B981] to-[#0EA5E9]",
      secondary: "bg-gradient-to-r from-[#10B981] to-[#0EA5E9]",
      accent: "bg-gradient-to-r from-[#10B981] to-[#0EA5E9]",
      card: "bg-gradient-to-br from-[#064E3B]/80 to-[#075985]/80",
      text: "text-emerald-50",
      button: "bg-gradient-to-r from-[#10B981] to-[#0EA5E9] hover:from-[#059669] hover:to-[#0284C7]",
      border: "border-emerald-400/30",
      checkbox: "accent-emerald-500",
      completed: "text-cyan-300/70",
    },
    sunset: {
      primary: "from-[#F59E0B] to-[#DC2626]",
      secondary: "bg-gradient-to-r from-[#F59E0B] to-[#DC2626]",
      accent: "bg-gradient-to-r from-[#F59E0B] to-[#DC2626]",
      card: "bg-gradient-to-br from-[#78350F]/80 to-[#7F1D1D]/80",
      text: "text-amber-50",
      button: "bg-gradient-to-r from-[#F59E0B] to-[#DC2626] hover:from-[#D97706] hover:to-[#B91C1C]",
      border: "border-amber-400/30",
      checkbox: "accent-amber-500",
      completed: "text-red-300/70",
    },
    galaxy: {
      primary: "from-[#6366F1] to-[#8B5CF6] to-[#EC4899]",
      secondary: "bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899]",
      accent: "bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899]",
      card: "bg-gradient-to-br from-[#1E1B4B]/90 via-[#4C1D95]/80 to-[#831843]/90",
      text: "text-indigo-50",
      button: "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#7C3AED]",
      border: "border-purple-400/40",
      checkbox: "accent-purple-500",
      completed: "text-rose-300/70",
    }
  };

  const currentTheme = themes[theme];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function handleAdd() {
    const taskText = inputRef.current.value.trim();
    
    if (!taskText) {
      alert("Task cannot be empty!");
      return;
    }

    const newTask = {
      id: taskIdCounter,
      text: taskText,
      completed: false,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      priority: "medium" // low, medium, high
    };

    setTasks([newTask, ...tasks]); // New tasks appear at top
    setTaskIdCounter(taskIdCounter + 1);
    inputRef.current.value = "";
    inputRef.current.focus();
  }

  function handleDelete(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function handleUpdate(id) {
    const taskToUpdate = tasks.find(task => task.id === id);
    const updatedText = prompt("Update your task:", taskToUpdate.text);
    
    if (updatedText !== null && updatedText.trim() !== "") {
      const newTasks = tasks.map(task =>
        task.id === id ? { ...task, text: updatedText.trim() } : task
      );
      setTasks(newTasks);
    }
  }

  function handleToggleComplete(id) {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handleAdd();
    }
  }

  function clearCompleted() {
    setTasks(tasks.filter(task => !task.completed));
  }

  function clearAll() {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      setTasks([]);
    }
  }

  function setPriority(id, priority) {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, priority } : task
    );
    setTasks(newTasks);
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const activeCount = tasks.length - completedCount;

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "high": return "border-l-4 border-red-500";
      case "medium": return "border-l-4 border-yellow-500";
      case "low": return "border-l-4 border-green-500";
      default: return "border-l-4 border-gray-500";
    }
  };

  return (
    <div className={`w-full min-h-screen m-0 bg-gradient-to-br ${currentTheme.primary} ${currentTheme.text} p-4 md:p-8`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-2 tracking-tight">
              TaskFlow
            </h1>
            <p className="text-xl opacity-80">Organize your day, boost productivity</p>
          </div>
          
          {/* Theme Selector */}
          <div className="flex gap-2 mt-4 md:mt-0">
            {Object.keys(themes).map((themeName) => (
              <button
                key={themeName}
                onClick={() => setTheme(themeName)}
                className={`w-8 h-8 rounded-full border-2 ${
                  theme === themeName ? 'border-white scale-110' : 'border-white/30'
                } bg-gradient-to-r ${themes[themeName].primary}`}
                title={themeName.charAt(0).toUpperCase() + themeName.slice(1)}
              />
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className={`${currentTheme.card} backdrop-blur-sm p-6 rounded-2xl border ${currentTheme.border} shadow-xl`}>
            <p className="text-4xl font-bold">{tasks.length}</p>
            <p className="text-sm opacity-80">Total Tasks</p>
          </div>
          <div className={`${currentTheme.card} backdrop-blur-sm p-6 rounded-2xl border ${currentTheme.border} shadow-xl`}>
            <p className="text-4xl font-bold">{activeCount}</p>
            <p className="text-sm opacity-80">Active</p>
          </div>
          <div className={`${currentTheme.card} backdrop-blur-sm p-6 rounded-2xl border ${currentTheme.border} shadow-xl`}>
            <p className="text-4xl font-bold">{completedCount}</p>
            <p className="text-sm opacity-80">Completed</p>
          </div>
        </div>

        {/* Input Section */}
        <div className={`${currentTheme.card} backdrop-blur-sm p-6 rounded-2xl border ${currentTheme.border} shadow-xl mb-10`}>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="✏️ What needs to be done?"
              ref={inputRef}
              onKeyPress={handleKeyPress}
              className="flex-grow p-4 rounded-xl bg-white/10 border-2 border-white/20 
                         placeholder-white/50 focus:outline-none focus:border-white/50 
                         text-lg transition-all duration-300"
            />
            <button
              className={`px-8 py-4 ${currentTheme.button} rounded-xl font-bold text-lg 
                         active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl`}
              onClick={handleAdd}
            >
              ➕ Add Task
            </button>
          </div>
          <p className="text-sm opacity-70 mt-3 flex items-center gap-2">
            <span className="text-lg">💡</span> Press Enter to add quickly
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === "all" 
                ? `${currentTheme.button} text-white` 
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            All ({tasks.length})
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === "active" 
                ? `${currentTheme.button} text-white` 
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === "completed" 
                ? `${currentTheme.button} text-white` 
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Completed ({completedCount})
          </button>
          {completedCount > 0 && (
            <button
              onClick={clearCompleted}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-lg transition-all ml-auto"
            >
              🗑️ Clear Completed
            </button>
          )}
        </div>

        {/* Tasks List */}
        {filteredTasks.length > 0 ? (
          <div className="space-y-4">
            {filteredTasks.map(task => (
              <div
                key={task.id}
                className={`${currentTheme.card} backdrop-blur-sm p-5 rounded-2xl border ${currentTheme.border} 
                          shadow-lg hover:shadow-xl transition-all duration-300 ${getPriorityColor(task.priority)}`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task.id)}
                        className={`w-6 h-6 cursor-pointer mt-1 ${currentTheme.checkbox}`}
                      />
                      <div>
                        <span
                          className={`text-xl font-medium ${task.completed 
                            ? `line-through ${currentTheme.completed}` 
                            : 'text-white'
                          }`}
                        >
                          {task.text}
                        </span>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm opacity-70">
                            🕒 {task.createdAt}
                          </span>
                          <div className="flex gap-2">
                            {["low", "medium", "high"].map(priority => (
                              <button
                                key={priority}
                                onClick={() => setPriority(task.id, priority)}
                                className={`px-2 py-1 text-xs rounded ${
                                  task.priority === priority
                                    ? priority === "high" 
                                      ? "bg-red-500" 
                                      : priority === "medium" 
                                      ? "bg-yellow-500" 
                                      : "bg-green-500"
                                    : "bg-white/10 hover:bg-white/20"
                                }`}
                              >
                                {priority}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleUpdate(task.id)}
                      className={`px-4 py-2 ${currentTheme.button} rounded-lg transition-all font-medium`}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-lg transition-all font-medium"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`${currentTheme.card} backdrop-blur-sm p-12 rounded-2xl border ${currentTheme.border} text-center`}>
            <div className="text-7xl mb-4">✨</div>
            <h2 className="text-3xl font-bold mb-3">All Clear!</h2>
            <p className="text-lg opacity-80">
              {filter === "completed" 
                ? "No completed tasks yet" 
                : filter === "active" 
                ? "No active tasks - add some above!" 
                : "No tasks yet - start by adding one above!"}
            </p>
          </div>
        )}

        {/* Clear All Button */}
        {tasks.length > 0 && (
          <div className="mt-10 pt-6 border-t border-white/20 flex justify-between items-center">
            <p className="opacity-80">
              {completedCount} of {tasks.length} tasks completed
              {activeCount > 0 && ` • ${activeCount} remaining`}
            </p>
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-gradient-to-r from-red-700 to-rose-800 hover:from-red-800 hover:to-rose-900 rounded-lg transition-all font-medium"
            >
              Clear All Tasks
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center opacity-60 text-sm">
          <p>Made with ❤️ • {tasks.length} tasks managed today</p>
          <p className="mt-1">Double-click tasks to edit • Use priority tags to organize</p>
        </div>
      </div>
    </div>
  );
}

export default App;