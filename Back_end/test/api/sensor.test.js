import axios from 'axios';

const hostname = "localhost:3000";
const apiUrl = `http://${hostname}/api/sensor`;

describe('Tes API sensor [chip]', () => {
  it('should return a 200 status code and expected data structure', async () => {
    try {
      const response = await axios.get(apiUrl);

      // Check the status code
      expect(response.status).toBe(200);

      // Check the response message
      expect(response.data).toHaveProperty('message');
      expect(typeof response.data.message).toBe('string');
      expect(response.data.message).toBe('success');

      // Check the pagination data
      expect(response.data).toHaveProperty('pagination');
      expect(response.data.pagination).toHaveProperty('totalPages');
      expect(typeof response.data.pagination.totalPages).toBe('number');
      expect(response.data.pagination).toHaveProperty('currentPage');
      expect(typeof response.data.pagination.currentPage).toBe('number');

      // Check the main data
      expect(response.data).toHaveProperty('data');
      expect(response.data.data).toHaveProperty('count');
      expect(typeof response.data.data.count).toBe('number');
      expect(response.data.data).toHaveProperty('rows');
      expect(Array.isArray(response.data.data.rows)).toBe(true);

      // Check the structure of the first row if it exists
      if (response.data.data.rows.length > 0) {
        const row = response.data.data.rows[0];
        expect(row).toHaveProperty('id');
        expect(typeof row.id).toBe('number');
        expect(row).toHaveProperty('nama_sensor');
        expect(typeof row.nama_sensor).toBe('string');
        expect(row).toHaveProperty('createdAt');
        expect(typeof row.createdAt).toBe('string');
        expect(row).toHaveProperty('updatedAt');
        expect(typeof row.updatedAt).toBe('string');
      }

    } catch (error) {
      // Handle error
      console.error('API call failed', error);
      throw error;
    }
  });
});