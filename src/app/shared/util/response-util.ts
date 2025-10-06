import { CommonResponse } from '../model/common-response.dto';

export function successResponse(
  element: string,
  action: string,
): CommonResponse {
  return {
    response: action,
    details: [`${action} ${element.toLowerCase()} exitosamente.`],
  };
}
