export const selectedId = (state = null, action) => {
  switch (action.type) {
    case "UPDATE":
      return action.payload;

    default:
      return state;
  }
};
