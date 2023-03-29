/* eslint-disable prettier/prettier */
export const MSG = function (
  message: string,
  data: any = null,
  other: any = null,
  status: any,
) {
  return {
    message,
    data,
    other,
    status,
  };
};
