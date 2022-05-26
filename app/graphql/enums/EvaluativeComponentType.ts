import { registerEnumType } from "type-graphql";

export enum EvaluativeComponentType {
    ASIGNATURE = "ASIGNATURE",
    AREA = "AREA",
}

registerEnumType(EvaluativeComponentType, {
    name: "EvaluativeComponentType", // this one is mandatory
    description: "The EvaluativeComponentType Register", // this one is optional
});