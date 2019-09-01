import { factory } from "./variable";
import { withClass } from "../utils";

const Variable = factory("p");

export const Small = withClass("small-text")(Variable);
export const Regular = withClass("regular-text")(Variable);
export const Huge = withClass("huge-text")(Variable);
