# My Task Manager — Web App 個人課堂實作

## ① Web App（公開網站，免登入）

| 版本 | 網址 |
|---|---|
| 首頁 | https://yaoyao913.github.io/task-manager/ |
| JavaScript 版（完整功能） | https://yaoyao913.github.io/task-manager/vanilla/ |
| React 版 | https://yaoyao913.github.io/task-manager/react/ |

## ② 程式碼（公開 repository，免登入）

Repository：https://github.com/yaoyao913/task-manager

| 內容 | 檔案 |
|---|---|
| HTML | [vanilla/index.html](vanilla/index.html) |
| CSS | [vanilla/style.css](vanilla/style.css) |
| JavaScript | [vanilla/script.js](vanilla/script.js) |
| React | [react/index.html](react/index.html) |

---

## ③ 查核點證據

### 第一階段：HTML 結構

**1-1 基本結構**：標題、輸入欄、新增按鈕、任務清單、篩選區、統計資訊（重新整理後仍存在）

![1-1](screenshots/01_full_desktop.png)
![1-1 重新整理後](screenshots/01b_after_reload.png)

**1-2 語意化 HTML**：使用 `header`、`main`、`section`、`form`、`label`、`button`、`ul / li`、`footer`

最重要的區域是以 ★★★ 標示的「新增任務」區：
- `section` 標示這是一個獨立的功能區
- `label for` 和 `input id` 綁定，點文字就能聚焦輸入框，螢幕閱讀器也能讀出欄位名稱
- `form` 搭配 `button type="submit"`，按 Enter 也能新增任務

![1-2](screenshots/09a_code_semantic_html.png)

### 第二階段：CSS 與 RWD

**2-1 基本版面**

![2-1](screenshots/01_full_desktop.png)

**2-2 RWD**：電腦版如上；手機版寬度 375px（小於 480px）

| 手機版 | 手機版篩選 |
|---|---|
| ![2-2](screenshots/02_mobile_375px.png) | ![2-2 篩選](screenshots/02b_mobile_filter_active.png) |

**2-3 Hover / Focus**

| 互動前 | 滑鼠移到「新增」（按鈕變深色） | 輸入框 Focus（外框光暈） |
|---|---|---|
| ![](screenshots/03a_hover_before.png) | ![](screenshots/03b_hover_after.png) | ![](screenshots/03c_focus_after.png) |

### 第三階段：JavaScript 功能

**3-1 新增任務**

| 新增前 | 新增後 |
|---|---|
| ![](screenshots/04a_add_before.png) | ![](screenshots/04b_add_after.png) |

輸入空白時不會新增，並顯示提示：

![3-1 空白](screenshots/05_empty_task.png)

**3-2 完成／取消完成**

| 未完成 | 已完成 | 取消完成 |
|---|---|---|
| ![](screenshots/06a_toggle_before.png) | ![](screenshots/06b_toggle_completed.png) | ![](screenshots/06c_toggle_undo.png) |

**3-3 刪除任務**

| 刪除前 | 刪除後 |
|---|---|
| ![](screenshots/07a_delete_before.png) | ![](screenshots/07b_delete_after.png) |

**3-4 任務篩選**

| 全部 | 未完成 | 已完成 |
|---|---|---|
| ![](screenshots/08a_filter_all.png) | ![](screenshots/08b_filter_active.png) | ![](screenshots/08c_filter_completed.png) |

**3-5 統計資訊**：新增任務後，由「共 3 項／未完成 2 項／已完成 1 項」變成「共 4 項／未完成 3 項／已完成 1 項」

| 操作前 | 操作後 |
|---|---|
| ![](screenshots/04a_add_before.png) | ![](screenshots/04b_add_after.png) |

### 第四階段：JavaScript 程式驗證

1. **使用哪一個變數保存任務？**
   `script.js` 第 3 行的陣列 `tasks`，每個元素的格式是 `{ id, text, completed }`。
2. **哪一段程式負責新增？**
   - 第 20–32 行 `addTask(text)`：先用 `trim()` 檢查是否空白，空白就顯示提示並停止；否則用 `tasks.push()` 加入任務。
   - 第 34–38 行的 `form` submit 事件會呼叫 `addTask()`。
3. **哪一段程式負責更新畫面？**
   第 68–100 行 `render()`：清空清單，依目前篩選重新建立每個 `<li>`，再呼叫 `renderStats()` 更新統計。新增、完成、刪除、篩選後都會呼叫 `render()`。

![保存與新增](screenshots/09b_code_js_add.png)
![更新畫面](screenshots/09c_code_js_render.png)

### 第五階段：React

**5-1 框架啟動**

![5-1](screenshots/10a_react_running.png)

**5-2 資料與畫面連動**：使用 `useState` 保存任務，`setTasks()` 後畫面立即更新

| 新增前 | 新增後 |
|---|---|
| ![](screenshots/10b_react_add_before.png) | ![](screenshots/10c_react_add_after.png) |

**5-3 完成任務**

| 操作前 | 操作後 |
|---|---|
| ![](screenshots/10c_react_add_after.png) | ![](screenshots/10d_react_toggle_after.png) |

**5-4 刪除任務**

| 刪除前 | 刪除後 |
|---|---|
| ![](screenshots/10e_react_delete_before.png) | ![](screenshots/10f_react_delete_after.png) |

---

## ④ Unit Test Table

測試環境：Chromium，桌機 1280×900、手機 375×800

| Test Case | 測試內容 | 預期結果 | 實際結果 | Pass/Fail |
|---|---|---|---|---|
| TC01 | 新增正常任務 | 任務出現 | 輸入「完成期末專題」後按新增，任務出現在清單 | PASS |
| TC02 | 新增空白任務 | 不應新增 | 只輸入空白就按新增，清單數量不變，並顯示「⚠ 請輸入任務名稱」 | PASS |
| TC03 | 完成任務 | 狀態改變 | 勾選後出現打勾，文字加上刪除線 | PASS |
| TC04 | 取消完成 | 恢復未完成 | 再點一次取消勾選，恢復一般樣式 | PASS |
| TC05 | 刪除任務 | 任務消失 | 刪除「完成 Web App 實作」後，任務從畫面消失 | PASS |
| TC06 | 篩選未完成 | 只顯示未完成 | 只顯示 2 項未完成任務 | PASS |
| TC07 | 篩選已完成 | 只顯示已完成 | 只顯示 1 項已完成任務 | PASS |
| TC08 | 統計數字 | 數字正確更新 | 新增後由「共 3／未完成 2」變成「共 4／未完成 3」 | PASS |
| TC09 | 手機尺寸 | 不超出畫面 | 375px 寬度下沒有水平捲軸，超長任務名稱會自動換行 | PASS |
| TC10 | React | 功能正常 | React 版的新增、完成、取消、刪除都正常，Console 沒有錯誤 | PASS |

### 測試證據

**TC05**
- 測試：刪除「完成 Web App 實作」
- 預期：任務消失
- 實際：任務消失，統計數字同步減少
- 結果：**PASS**

| 刪除前 | 刪除後 |
|---|---|
| ![](screenshots/07a_delete_before.png) | ![](screenshots/07b_delete_after.png) |

**TC02**
- 測試：只輸入空白後按新增
- 預期：不應新增
- 實際：清單數量不變，並顯示「⚠ 請輸入任務名稱」
- 結果：**PASS**

![TC02](screenshots/05_empty_task.png)
