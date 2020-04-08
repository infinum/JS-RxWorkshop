export function mockApi<T>(url: string, response: T): void {
  jasmine.Ajax.stubRequest(url).andReturn({
    status: 200,
    responseText: JSON.stringify(response),
  });
}
