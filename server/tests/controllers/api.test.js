const api = require("../../controllers/api");

test('adds 1 + 2 to equal 3', async () => {
    expect(await api.sum(1, 2)).toBe(3);
});
  
  