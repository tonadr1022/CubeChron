import {
  BaseEnum,
  InputFieldMap,
  InputFieldRef,
  InputRef,
  InputType,
  SchemaTypes,
} from "@pothos/core";
import { PrismaModelTypes } from "@pothos/plugin-prisma";

export type FilterListOps = "every" | "some" | "none";
export type ScalarListOps =
  | "has"
  | "hasEvery"
  | "hasSome"
  | "equals"
  | "isEmpty";
export type IntUpdateOps = keyof IntFieldUpdateOperationsInput;

export interface FilterShape<T> {
  equals?: T;
  in?: T[];
  notIn?: T[];
  lt?: T;
  lte?: T;
  gt?: T;
  gte?: T;
  not?: FilterShape<T>;
  contains?: T;
  startsWith?: T;
  endsWith?: T;
  is?: T;
  isNot?: T;
  search?: T;
  mode?: "default" | "insensitive";
}

export interface ScalarListFilterShape<T> {
  has?: T;
  hasEvery?: T[];
  hasSome?: T[];
  equals?: T[];
  isEmpty?: boolean;
}

export interface IntFieldUpdateOperationsInput {
  set?: number;
  increment?: number;
  decrement?: number;
  multiply?: number;
  divide?: number;
}

export type FilterOps = keyof FilterShape<unknown>;

export type TypesForRelation<
  Types extends SchemaTypes,
  Model extends PrismaModelTypes,
  Relation extends keyof Model["Relations"]
> = Model["Relations"][Relation]["Name"] extends infer Name
  ? Name extends keyof Types["PrismaTypes"]
    ? Types["PrismaTypes"][Name] & PrismaModelTypes
    : never
  : never;
export type Enumerable<T> = T | T[];

export type PrismaOrderByFields<
  Types extends SchemaTypes,
  Model extends PrismaModelTypes
> = {
  [K in keyof Model["OrderBy"] as K extends Model["ListRelations"]
    ? never
    : K]?: K extends Model["RelationName"]
    ?
        | InputRef<TypesForRelation<Types, Model, K>["OrderBy"]>
        | (() => PothosSchemaTypes.InputFieldOptions<
            Types,
            InputRef<TypesForRelation<Types, Model, K>["OrderBy"]>
          >)
    :
        | boolean
        | (() => Omit<PothosSchemaTypes.InputFieldOptions<Types>, "type">);
};

export interface PrismaOrderByOptions<
  Types extends SchemaTypes,
  Model extends PrismaModelTypes
> extends Omit<
    PothosSchemaTypes.InputObjectTypeOptions<Types, InputFieldMap>,
    "fields"
  > {
  name?: string;
  fields:
    | PrismaOrderByFields<Types, Model>
    | (() => PrismaOrderByFields<Types, Model>);
}

export interface PrismaWhereOptions<
  Types extends SchemaTypes,
  Model extends PrismaModelTypes,
  Fields
> extends Omit<
    PothosSchemaTypes.InputObjectTypeOptions<Types, InputFieldMap>,
    "fields"
  > {
  name?: string;
  fields: Fields &
    (
      | PrismaWhereFields<Types, Model>
      | ((
          t: PothosSchemaTypes.InputFieldBuilder<Types, "InputObject">
        ) => PrismaWhereFields<Types, Model>)
    );
}

export type PrismaWhereFields<
  Types extends SchemaTypes,
  Model extends PrismaModelTypes
> = {
  [K in keyof Model["Where"]]?: K extends "AND" | "OR"
    ?
        | boolean
        | Omit<
            PothosSchemaTypes.InputFieldOptions<
              Types,
              InputRef<Model["Where"][]>
            >,
            "type"
          >
    : K extends "NOT"
    ?
        | boolean
        | Omit<
            PothosSchemaTypes.InputFieldOptions<
              Types,
              InputRef<Model["Where"]>
            >,
            "type"
          >
    : PrismaWhereFieldType<Types, Model, K>;
};

export interface PrismaWhereUniqueOptions<
  Types extends SchemaTypes,
  Model extends PrismaModelTypes,
  Fields
> extends Omit<
    PothosSchemaTypes.InputObjectTypeOptions<Types, InputFieldMap>,
    "fields"
  > {
  name?: string;
  fields: (
    | PrismaWhereUniqueFields<Types, Model>
    | ((
        t: PothosSchemaTypes.InputFieldBuilder<Types, "InputObject">
      ) => PrismaWhereUniqueFields<Types, Model>)
  ) &
    Fields;
}

export interface PrismaIntAtomicUpdateOptions<
  Types extends SchemaTypes,
  Ops extends IntUpdateOps
> extends Omit<PothosSchemaTypes.InputObjectTypeOptions<Types, {}>, "fields"> {
  name?: string;
  ops?: Ops[];
}

export type PrismaWhereUniqueFields<
  Types extends SchemaTypes,
  Model extends PrismaModelTypes
> = {
  [K in keyof Model["WhereUnique"]]?: PrismaWhereUniqueFieldType<
    Types,
    Model,
    K
  >;
};

export type PrismaWhereFieldType<
  Types extends SchemaTypes,
  Model extends PrismaModelTypes,
  K extends keyof Model["Where"]
> = K extends Model["RelationName"]
  ? InputRef<Model["Where"][K]> | InputFieldRef<Model["Where"][K]>
  :
      | InputWithShape<Types, Model["Where"][K]>
      | InputRef<Model["Where"][K]>
      | InputFieldRef<Model["Where"][K] | null | undefined>;

export type PrismaWhereUniqueFieldType<
  Types extends SchemaTypes,
  Model extends PrismaModelTypes,
  K extends keyof Model["WhereUnique"]
> =
  | InputWithShape<Types, Model["Shape"][K]>
  | InputRef<Model["WhereUnique"][K]>
  | InputFieldRef<Model["WhereUnique"][K] | null | undefined>;

type InputWithShape<Types extends SchemaTypes, T> =
  | InputRef<T>
  | InputFieldRef<T | null | undefined>
  | (BaseEnum & Record<string, T>)
  | (new (...args: any[]) => T)
  | (keyof Types["inputShapes"] extends infer U
      ? U extends string
        ? Types["inputShapes"][U & keyof Types["inputShapes"]] extends T
          ? U
          : never
        : never
      : never);

export type OpsOptions<
  Types extends SchemaTypes,
  Type extends InputType<Types>,
  Ops extends string
> =
  | readonly Ops[]
  | Record<Ops, Omit<PothosSchemaTypes.InputFieldOptions<Types, Type>, "type">>;

export interface PrismaFilterOptions<
  Types extends SchemaTypes,
  Type extends InputType<Types>,
  Ops extends OpsOptions<Types, Type, FilterOps>
> extends Omit<
    PothosSchemaTypes.InputObjectTypeOptions<Types, InputFieldMap>,
    "fields"
  > {
  name?: string;
  ops: Ops;
}

export interface PrismaListFilterOptions<
  Types extends SchemaTypes,
  Type extends InputType<Types>,
  Ops extends OpsOptions<Types, Type, FilterListOps>
> extends Omit<
    PothosSchemaTypes.InputObjectTypeOptions<Types, InputFieldMap>,
    "fields"
  > {
  name?: string;
  ops: Ops;
}

export interface PrismaScalarListFilterOptions<
  Types extends SchemaTypes,
  Type extends InputType<Types>,
  Ops extends OpsOptions<Types, Type, ScalarListOps>
> extends Omit<
    PothosSchemaTypes.InputObjectTypeOptions<Types, InputFieldMap>,
    "fields"
  > {
  name?: string;
  ops: Ops;
}

export interface PrismaCreateOptions<
  Types extends SchemaTypes,
  Model extends PrismaModelTypes,
  Fields
> extends Omit<
    PothosSchemaTypes.InputObjectTypeOptions<Types, InputFieldMap>,
    "fields"
  > {
  name?: string;
  fields: Fields &
    (
      | PrismaCreateFields<Types, Model>
      | ((
          t: PothosSchemaTypes.InputFieldBuilder<Types, "InputObject">
        ) => PrismaCreateFields<Types, Model>)
    );
}

export type NonListShape<T> = T extends (infer S)[] ? S : T;
export type NonListInputWithShape<
  Types extends SchemaTypes,
  T
> = InputWithShape<Types, NonListShape<T>>;

export type PrismaCreateFields<
  Types extends SchemaTypes,
  Model extends PrismaModelTypes
> = {
  [K in keyof Model["Create"]]?: NonListInputWithShape<
    Types,
    Model["Shape"][K]
  >;
};

export interface PrismaCreateOneRelationOptions<
  Types extends SchemaTypes,
  Relation extends Model["RelationName"],
  Model extends PrismaModelTypes
> extends Omit<
    PothosSchemaTypes.InputObjectTypeOptions<Types, InputFieldMap>,
    "fields"
  > {
  name?: string;
  fields:
    | PrismaCreateOneRelationFields<Types, Relation, Model>
    | ((
        t: PothosSchemaTypes.InputFieldBuilder<Types, "InputObject">
      ) => PrismaCreateOneRelationFields<Types, Relation, Model>);
}

export interface PrismaCreateOneRelationFields<
  Types extends SchemaTypes,
  Relation extends Model["RelationName"],
  Model extends PrismaModelTypes
> {
  create?: InputWithShape<
    Types,
    Model["Create"][Relation & keyof Model["Create"]] & {
      create?: unknown;
    } extends {
      create?: infer T;
    }
      ? T
      : never
  >;
  connect?: InputWithShape<
    Types,
    Model["Create"][Relation & keyof Model["Create"]] & {
      connect?: unknown;
    } extends {
      connect?: infer T;
    }
      ? T
      : never
  >;
}

export interface PrismaCreateManyRelationOptions<
  Types extends SchemaTypes,
  Relation extends Model["RelationName"],
  Model extends PrismaModelTypes
> extends Omit<
    PothosSchemaTypes.InputObjectTypeOptions<Types, InputFieldMap>,
    "fields"
  > {
  name?: string;
  fields:
    | PrismaCreateManyRelationFields<Types, Relation, Model>
    | ((
        t: PothosSchemaTypes.InputFieldBuilder<Types, "InputObject">
      ) => PrismaCreateManyRelationFields<Types, Relation, Model>);
}

export interface PrismaCreateManyRelationFields<
  Types extends SchemaTypes,
  Relation extends Model["RelationName"],
  Model extends PrismaModelTypes
> {
  create?: InputWithShape<
    Types,
    Model["Create"][Relation & keyof Model["Create"]] & {
      create?: unknown;
    } extends {
      create?: infer T;
    }
      ? T
      : never
  >;
  connect?: InputWithShape<
    Types,
    Model["Create"][Relation & keyof Model["Create"]] & {
      connect?: unknown;
    } extends {
      connect?: infer T;
    }
      ? T
      : never
  >;
}

export interface PrismaUpdateOptions<
  Types extends SchemaTypes,
  Model extends PrismaModelTypes,
  Fields
> extends Omit<
    PothosSchemaTypes.InputObjectTypeOptions<Types, InputFieldMap>,
    "fields"
  > {
  name?: string;
  fields: Fields &
    (
      | PrismaUpdateFields<Types, Model>
      | ((
          t: PothosSchemaTypes.InputFieldBuilder<Types, "InputObject">
        ) => PrismaUpdateFields<Types, Model>)
    );
}

export type PrismaUpdateFields<
  Types extends SchemaTypes,
  Model extends PrismaModelTypes
> = {
  [K in keyof Model["Update"]]?: NonListInputWithShape<
    Types,
    Model["Update"][K]
  >;
};

export interface PrismaUpdateOneRelationOptions<
  Types extends SchemaTypes,
  Relation extends Model["RelationName"],
  Model extends PrismaModelTypes
> extends Omit<
    PothosSchemaTypes.InputObjectTypeOptions<Types, InputFieldMap>,
    "fields"
  > {
  name?: string;
  fields:
    | PrismaUpdateOneRelationFields<Types, Relation, Model>
    | ((
        t: PothosSchemaTypes.InputFieldBuilder<Types, "InputObject">
      ) => PrismaUpdateOneRelationFields<Types, Relation, Model>);
}

export interface PrismaUpdateOneRelationFields<
  Types extends SchemaTypes,
  Relation extends Model["RelationName"],
  Model extends PrismaModelTypes
> {
  create?: InputWithShape<
    Types,
    Model["Update"][Relation & keyof Model["Update"]] & {
      create?: unknown;
    } extends {
      create?: infer T;
    }
      ? T
      : never
  >;
  update?: InputWithShape<
    Types,
    Model["Update"][Relation & keyof Model["Update"]] & {
      update?: unknown;
    } extends {
      update?: infer T;
    }
      ? T
      : never
  >;
  connect?: InputWithShape<
    Types,
    Model["Update"][Relation & keyof Model["Update"]] & {
      connect?: unknown;
    } extends {
      connect?: infer T;
    }
      ? T
      : never
  >;
  delete?: InputWithShape<Types, boolean>;
  disconnect?: InputWithShape<Types, boolean>;
}

export interface PrismaUpdateManyRelationOptions<
  Types extends SchemaTypes,
  Relation extends Model["RelationName"],
  Model extends PrismaModelTypes
> extends Omit<
    PothosSchemaTypes.InputObjectTypeOptions<Types, InputFieldMap>,
    "fields"
  > {
  name?: string;
  fields:
    | PrismaUpdateManyRelationFields<Types, Relation, Model>
    | ((
        t: PothosSchemaTypes.InputFieldBuilder<Types, "InputObject">
      ) => PrismaUpdateManyRelationFields<Types, Relation, Model>);
}

export interface PrismaUpdateManyRelationFields<
  Types extends SchemaTypes,
  Relation extends Model["RelationName"],
  Model extends PrismaModelTypes
> {
  create?: InputWithShape<
    Types,
    Model["Update"][Relation & keyof Model["Update"]] & {
      create?: unknown;
    } extends {
      create?: infer T;
    }
      ? T
      : never
  >;
  set?: InputWithShape<
    Types,
    Model["Update"][Relation & keyof Model["Update"]] & {
      set?: unknown;
    } extends {
      set?: infer T;
    }
      ? T
      : never
  >;
  disconnect?: InputWithShape<
    Types,
    Model["Update"][Relation & keyof Model["Update"]] & {
      disconnect?: unknown;
    } extends {
      disconnect?: infer T;
    }
      ? T
      : never
  >;
  delete?: InputWithShape<
    Types,
    Model["Update"][Relation & keyof Model["Update"]] & {
      delete?: unknown;
    } extends {
      delete?: infer T;
    }
      ? T
      : never
  >;
  connect?: InputWithShape<
    Types,
    Model["Update"][Relation & keyof Model["Update"]] & {
      connect?: unknown;
    } extends {
      connect?: infer T;
    }
      ? T
      : never
  >;
  update?: Model["Update"][Relation & keyof Model["Update"]] & {
    update?: { data: unknown; where: unknown };
  } extends {
    update?: {
      data: infer D;
      where: infer W;
    };
  }
    ? {
        name?: string;
        data: InputWithShape<Types, D>;
        where: InputWithShape<Types, W>;
      }
    : never;
  updateMany?: Model["Update"][Relation & keyof Model["Update"]] & {
    updateMany?: { data: unknown; where: unknown };
  } extends {
    updateMany?: {
      data: infer D;
      where: infer W;
    };
  }
    ? {
        name?: string;
        data: InputWithShape<Types, D>;
        where: InputWithShape<Types, W>;
      }
    : never;

  deleteMany?: InputWithShape<
    Types,
    Model["Update"][Relation & keyof Model["Update"]] & {
      deleteMany?: unknown;
    } extends {
      deleteMany?: infer T;
    }
      ? T
      : never
  >;
}

export type FieldKeys<T> = T extends (...args: any[]) => infer R
  ? keyof R
  : keyof T;

export type PickFields<T, Fields> = Pick<T, keyof T & FieldKeys<Fields>>;
