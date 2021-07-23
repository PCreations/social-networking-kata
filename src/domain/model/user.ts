export const createUser = ({ name }: { name: string }) => Object.freeze({
  name
});

export type User = ReturnType<typeof createUser>