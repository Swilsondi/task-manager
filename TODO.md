# 📝 Task Manager Project: TODO & Improvement Plan

## ✅ What’s Done

- **Modern UI/UX:**  
  - Responsive, visually appealing layout with clear navigation and branding.
  - Three-column board for Active, Completed, and Deleted tasks.
  - Task entry section with styled input and add button.
  - Google Fonts and CSS variables for consistent design.

- **Basic Functionality:**  
  - Add tasks to the active list.
  - Tasks are stored in an array (`newToDo`).
  - Tasks persist between reloads using `localStorage`.
  - Tasks render dynamically in the Active column.
  - Event listeners for adding tasks via button and Enter key.

- **Code Organization:**  
  - Modular functions for adding, saving, and loading tasks.
  - Initial documentation and project structure in place.

## 🟡 What’s In Progress / Needs Improvement

- **Task Rendering:**  
  - Tasks are currently rendered as plain text.  
  - Checkboxes for marking tasks as completed are not yet functional.
  - No UI for deleting or restoring tasks.

- **Task State Management:**  
  - Only a single array (`newToDo`) for all tasks.
  - No separation between active, completed, and deleted tasks in logic or storage.

- **UI Feedback & Accessibility:**  
  - No visual feedback for completed or deleted tasks.
  - No ARIA labels or accessibility enhancements for task actions.

- **Code Quality:**  
  - Some redundant or unused code (e.g., `addTaskUi` vs. `renderTasks`).
  - Event handlers could be streamlined.
  - Task duplication and empty task prevention could be improved.

## 🔜 What’s Left To Do

### Core Features
- [ ] **Implement checkboxes** for active tasks to mark as completed.
- [ ] **Move completed tasks** to the Completed column and persist in localStorage.
- [ ] **Add delete buttons** for tasks (move to Deleted column, not permanent removal).
- [ ] **Restore or permanently delete** tasks from the Deleted column.
- [ ] **Refactor state management** to use separate arrays for active, completed, and deleted tasks.

### UI/UX Improvements
- [ ] **Improve task item layout:** Add action buttons (complete, delete, restore) with icons.
- [ ] **Add empty state messages** for each column.
- [ ] **Add confirmation for permanent deletes.**
- [ ] **Enhance accessibility:** Keyboard navigation, ARIA roles, and labels.
- [ ] **Add notifications or toasts** for actions (task added, completed, deleted, restored).

### Code & Documentation
- [ ] **Refactor rendering logic** to use a single `renderTasks()` function for all columns.
- [ ] **Improve modularity**: Separate logic for task actions.
- [ ] **Expand documentation**: Usage instructions, contribution guidelines, and code comments.
- [ ] **Write unit tests** for core logic (optional, for advanced practice).

### Stretch Goals (Optional)
- [ ] **Drag-and-drop** to reorder or move tasks between columns.
- [ ] **Task editing** (inline or modal).
- [ ] **Due dates, priorities, or tags.**
- [ ] **Theme switcher (dark/light mode).**
- [ ] **Export/import tasks as JSON.**

---

## 📌 Next Steps

1. Refactor your data model to support separate arrays for active, completed, and deleted tasks.
2. Update your rendering and event logic to handle checkboxes, completion, and deletion.
3. Polish the UI for better feedback and accessibility.
4. Continue documenting your progress and decisions.

---

**Keep your logic modular and your UI clean—this will make adding features much easier!**