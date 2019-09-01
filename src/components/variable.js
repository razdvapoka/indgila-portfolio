export const factory = as => ({ as: Comp = as, ...rest }) => <Comp {...rest} />;

const Variable = factory("div");

export default Variable;
