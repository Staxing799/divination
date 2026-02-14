import { ApiError } from './errors';

export async function readJson(request) {
  try {
    return await request.json();
  } catch {
    throw new ApiError(400, 'error.server.invalid_json');
  }
}
