import { Todo } from "./Todo";

describe('Todo Model', () => {
    it('should have properties: id, title, completed, description, deadline', () => {
      const todo: Todo = {
        id: 1,
        title: 'Test Todo',
        completed: false,
        description: 'This is a test todo',
        deadline: '2023-12-31',
      };
  
      expect(todo).toHaveProperty('id');
      expect(todo).toHaveProperty('title');
      expect(todo).toHaveProperty('completed');
      expect(todo).toHaveProperty('description');
      expect(todo).toHaveProperty('deadline');
    })
});