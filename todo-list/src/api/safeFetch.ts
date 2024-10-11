export async function safeFetch<T>(url: string, options: RequestInit): Promise<T> {
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error ${response.status}: ${errorMessage}`);
      }
  
      const data: T = await response.json();
      return data;
    } catch (error) {
      console.error("safeFetch error:", error);
      throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  