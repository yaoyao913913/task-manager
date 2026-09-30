// ===== 1. 資料：使用陣列 tasks 保存所有任務 =====
// 每個任務是一個物件：{ id, text, completed }
let tasks = [
  { id: 1, text: "完成 Web App 實作", completed: false },
  { id: 2, text: "完成 JavaScript 練習", completed: false },
  { id: 3, text: "完成課程作業", completed: true },
];
let currentFilter = "all"; // 目前篩選：all / active / completed

// ===== 2. 取得 DOM 元素 =====
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const errorMsg = document.getElementById("error-msg");
const list = document.getElementById("task-list");
const emptyMsg = document.getElementById("empty-msg");
const stats = document.getElementById("stats");
const filterBtns = document.querySelectorAll(".filter-btn");

// ===== 3. 新增任務 =====
function addTask(text) {
  const trimmed = text.trim();
  if (trimmed === "") {                 // 空白任務：不新增，顯示提示
    errorMsg.textContent = "⚠ 請輸入任務名稱";
    input.classList.add("invalid");
    return false;
  }
  tasks.push({ id: Date.now(), text: trimmed, completed: false });
  errorMsg.textContent = "";
  input.classList.remove("invalid");
  render();                             // 資料改變後更新畫面
  return true;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();                   // 阻止表單重新整理頁面
  if (addTask(input.value)) input.value = "";
  input.focus();
});

// ===== 4. 完成／取消完成 =====
function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) task.completed = !task.completed;
  render();
}

// ===== 5. 刪除任務 =====
function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  render();
}

// ===== 6. 篩選 =====
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    filterBtns.forEach((b) => b.classList.toggle("active", b === btn));
    render();
  });
});

function getFilteredTasks() {
  if (currentFilter === "active") return tasks.filter((t) => !t.completed);
  if (currentFilter === "completed") return tasks.filter((t) => t.completed);
  return tasks;
}

// ===== 7. 更新畫面：依照 tasks 陣列重新產生清單與統計 =====
function render() {
  list.innerHTML = "";
  const visible = getFilteredTasks();

  visible.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "task-" + task.id;
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const label = document.createElement("label");
    label.className = "task-text";
    label.htmlFor = checkbox.id;
    label.textContent = task.text;      // 使用 textContent 防止 XSS

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "btn delete-btn";
    delBtn.textContent = "刪除";
    delBtn.addEventListener("click", () => deleteTask(task.id));

    li.append(checkbox, label, delBtn);
    list.appendChild(li);
  });

  emptyMsg.hidden = visible.length > 0;
  renderStats();
}

// ===== 8. 統計資訊 =====
function renderStats() {
  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;
  const active = total - done;
  stats.innerHTML =
    `<span>共 <b class="num">${total}</b> 項</span>` +
    `<span>未完成 <b class="num">${active}</b> 項</span>` +
    `<span>已完成 <b class="num">${done}</b> 項</span>`;
}

input.addEventListener("input", () => {
  if (input.value.trim()) { errorMsg.textContent = ""; input.classList.remove("invalid"); }
});

render(); // 頁面載入時先顯示一次
