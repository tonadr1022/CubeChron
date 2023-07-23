import { createYoga } from "graphql-yoga";
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { DateTimeResolver } from "graphql-scalars";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import prisma from "@/lib/prisma";
import { initContextCache } from "@pothos/core";
import { NextApiRequest } from "next";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import PrismaUtils from "@pothos/plugin-prisma-utils";
import { PrismaCrudGenerator } from "@/graphql/generator";
import { printSchema } from "graphql";
import { writeFileSync } from "fs";
import { resolve } from "path";

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    DateTime: {
      Output: Date;
      Input: Date;
    };
  };
}>({
  plugins: [PrismaPlugin, PrismaUtils],

  prisma: {
    client: prisma,
  },
});
const generator = new PrismaCrudGenerator(builder);
builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name", { nullable: true }),
    password: t.exposeString("password", { nullable: true }),
    email: t.exposeString("email", { nullable: true }),
    // emailVerified: t.expose("emailVerified", {
    //   type: "DateTime",
    //   nullable: true,
    // }),
    image: t.exposeString("image", { nullable: true }),
    createdAt: t.expose("createdAt", {
      type: "DateTime",
      nullable: true,
    }),
    updatedAt: t.expose("updatedAt", {
      type: "DateTime",
      nullable: true,
    }),
    cubeSessions: t.relation("cubeSessions"),
    setting: t.relation("setting"),
    solves: t.relation("solves"),
  }),
});
builder.prismaObject("Setting", {
  fields: (t) => ({
    id: t.exposeID("id"),
    createdAt: t.expose("createdAt", {
      type: "DateTime",
      nullable: true,
    }),
    updatedAt: t.expose("updatedAt", {
      type: "DateTime",
      nullable: true,
    }),
    userId: t.exposeString("userId", { nullable: true }),
    focusMode: t.exposeBoolean("focusMode", { nullable: true }),
    cubeType: t.exposeString("cubeType", { nullable: true }),
    cubeSessionId: t.exposeString("cubeSessionId", { nullable: true }),
    user: t.relation("user"),
  }),
});
builder.prismaObject("CubeSession", {
  fields: (t) => ({
    id: t.exposeID("id"),
    createdAt: t.expose("createdAt", {
      type: "DateTime",
      nullable: true,
    }),
    updatedAt: t.expose("updatedAt", {
      type: "DateTime",
      nullable: true,
    }),
    name: t.exposeString("name", { nullable: true }),

    userId: t.exposeString("userId", { nullable: true }),
    user: t.relation("user"),
    notes: t.exposeString("notes", { nullable: true }),
    solves: t.relation("solves"),
  }),
});

builder.prismaObject("Solve", {
  fields: (t) => ({
    id: t.exposeID("id"),
    createdAt: t.expose("createdAt", {
      type: "DateTime",
      nullable: true,
    }),
    cubeSessionId: t.exposeString("cubeSessionId", { nullable: true }),
    scramble: t.exposeString("scramble", { nullable: true }),
    cubeType: t.exposeString("cubeType", { nullable: true }),
    notes: t.exposeString("notes", { nullable: true }),
    dnf: t.exposeBoolean("dnf", { nullable: true }),
    plusTwo: t.exposeBoolean("plusTwo", { nullable: true }),
    duration: t.exposeFloat("duration", { nullable: true }),
    userId: t.exposeString("userId", { nullable: true }),
    cubeSession: t.relation("cubeSession"),
    user: t.relation("user"),
  }),
});

builder.addScalarType("DateTime", DateTimeResolver, {});
builder.queryType({});
// builder.mutationType({});

const CubeSessionInput = builder.inputType("CubeSessionInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    userId: t.string({ required: true }),
    notes: t.string(),
  }),
});

const SolveInput = builder.inputType("SolveInput", {
  fields: (t) => ({
    cubeSessionId: t.string(),
    scramble: t.string(),
    cubeType: t.string(),
    notes: t.string(),
    dnf: t.boolean(),
    plusTwo: t.boolean(),
    duration: t.float(),
    userId: t.string(),
  }),
});

builder.mutationField("createCubeSession", (t) =>
  t.prismaField({
    type: "CubeSession",
    args: {
      userId: t.arg.string(),
      name: t.arg.string(),
      notes: t.arg.string(),
    },
    resolve: async (query, root, args, ctx, info) => {
      const cubeSession = await prisma.cubeSession.create({
        data: {
          name: args.name as string,
          notes: args.notes,
          userId: args.userId as string,
        },
      });
      return cubeSession;
    },
  })
);
builder.mutationField("updateCubeSession", (t) =>
  t.prismaField({
    type: "CubeSession",
    args: {
      id: t.arg.id(),
      name: t.arg.string(),
      notes: t.arg.string(),
    },
    resolve: async (query, root, args, ctx, info) => {
      const cubeSession = await prisma.cubeSession.update({
        where: {
          id: args.id as string,
        },
        data: {
          name: args.name as string,
          notes: args.notes,
        },
      });
      return cubeSession;
    },
  })
);

builder.mutationField("deleteCubeSession", (t) =>
  t.prismaField({
    type: "CubeSession",
    args: {
      id: t.arg.id(),
    },
    resolve: async (query, root, args, ctx, info) => {
      const cubeSession = await prisma.cubeSession.delete({
        where: {
          id: args.id as string,
        },
      });
      return cubeSession;
    },
  })
);

builder.mutationType({
  fields: (t) => ({
    createSolve: t.prismaField({
      type: "Solve",
      args: {
        input: t.arg({
          type: generator.getCreateInput("Solve"),
          required: true,
        }),
      },
      resolve: (query, _, args) =>
        prisma.solve.create({
          ...query,
          data: {
            ...args.input,
          },
        }),
    }),
  }),
});
// builder.mutationField("createSolve", (t) =>
//   t.prismaField({
//     type: "Solve",
//     args: {
//       cubeSessionId: t.arg.string(),
//       scramble: t.arg.string(),
//       cubeType: t.arg.string(),
//       notes: t.arg.string(),
//       dnf: t.arg.boolean(),
//       plusTwo: t.arg.boolean(),
//       duration: t.arg.float(),
//       userId: t.arg.string(),
//     },
//     resolve: async (query, root, args, ctx, info) => {
//       const solve = await prisma.solve.create({
//         data: {
//           cubeSessionId: args.cubeSessionId as string,
//           scramble: args.scramble,
//           cubeType: args.cubeType as string,
//           notes: args.notes,
//           dnf: args.dnf,
//           plusTwo: args.plusTwo,
//           duration: args.duration as number,
//           userId: args.userId as string,
//         },
//       });
//       return solve;
//     },
//   })
// );
builder.mutationField("updateSolve", (t) =>
  t.prismaField({
    type: "Solve",
    args: {
      id: t.arg.id(),
      cubeSessionId: t.arg.string(),
      scramble: t.arg.string(),
      cubeType: t.arg.string(),
      notes: t.arg.string(),
      dnf: t.arg.boolean(),
      plusTwo: t.arg.boolean(),
      duration: t.arg.float(),
      userId: t.arg.string(),
    },
    resolve: async (query, root, args, ctx, info) => {
      const solve = await prisma.solve.update({
        where: {
          id: args.id as string,
        },
        data: {
          cubeSessionId: args.cubeSessionId as string,
          scramble: args.scramble,
          cubeType: args.cubeType as string,
          notes: args.notes,
          dnf: args.dnf,
          plusTwo: args.plusTwo,
          duration: args.duration as number,
          userId: args.userId,
        },
      });
      return solve;
    },
  })
);
// delete solve
builder.mutationField("deleteSolve", (t) =>
  t.prismaField({
    type: "Solve",
    args: {
      id: t.arg.id(),
    },
    resolve: async (query, root, args, ctx, info) => {
      const solve = await prisma.solve.delete({
        where: {
          id: args.id as string,
        },
      });
      return solve;
    },
  })
);

builder.mutationField("updateUser", (t) =>
  t.prismaField({
    type: "User",
    args: {
      id: t.arg.id(),
      name: t.arg.string(),
      email: t.arg.string(),
      password: t.arg.string(),
    },
    resolve: async (query, root, args, ctx, info) => {
      const user = await prisma.user.update({
        where: {
          id: args.id as string,
        },
        data: {
          name: args.name,
          email: args.email,
          password: args.password,
        },
      });
      return user;
    },
  })
);

builder.mutationField("deleteUser", (t) =>
  t.prismaField({
    type: "User",
    args: {
      id: t.arg.id(),
    },
    resolve: async (query, root, args, ctx, info) => {
      const user = await prisma.user.delete({
        where: {
          id: args.id as string,
        },
      });
      return user;
    },
  })
);
builder.mutationType;

builder.mutationField("updateSetting", (t) =>
  t.prismaField({
    type: "Setting",
    args: {
      id: t.arg.id(),
      userId: t.arg.string(),
      focusMode: t.arg.boolean(),
      cubeType: t.arg.string(),
      cubeSessionId: t.arg.string(),
    },
    resolve: async (query, root, args, ctx, info) => {
      const setting = await prisma.setting.update({
        where: {
          id: args.id as string,
        },
        data: {
          userId: args.userId as string,
          id: args.id as string,
          focusMode: args.focusMode as boolean,
          cubeType: args.cubeType as string,
          cubeSessionId: args.cubeSessionId as string,
        },
      });
      return setting;
    },
  })
);

// builder.queryField("cubeSession", (t) =>
//   t.prismaField({
//     type: "CubeSession",
//     args: {
//       id: t.arg.id(),
//     },
//     resolve: async (query, root, args, ctx, info) => {
//       const cubeSession = await prisma.cubeSession.findUniqueOrThrow({
//         where: {
//           id: args.id as string,
//         },
//         include: {
//           solves: true,
//         },
//       });
//       return cubeSession;
//     },
//   })
// );

// model User {
//   id            String        @id @default(cuid())
//   name          String?
//   password      String?
//   email         String?       @unique
//   emailVerified DateTime?
//   image         String?
//   createdAt     DateTime      @default(now())
//   updatedAt     DateTime      @updatedAt
//   accounts      Account[]
//   sessions      Session[]
//   cubeSessions  CubeSession[]
//   setting       Setting?
//   solves        Solve[]
// }

// user cube sessions

builder.queryField("userCubeSessions", (t) =>
  t.prismaField({
    type: ["CubeSession"],
    args: {
      userId: t.arg.string(),
    },
    resolve: async (query, root, args, ctx, info) => {
      const cubeSessions = await prisma.cubeSession.findMany({
        where: {
          userId: args.userId as string,
        },
      });
      return cubeSessions;
    },
  })
);
builder.queryField("solves", (t) =>
  t.prismaField({
    type: ["Solve"],
    args: {
      userId: t.arg.string(),
    },
    resolve: async (query, root, args, ctx, info) => {
      const solves = await prisma.solve.findMany({
        where: {
          userId: args.userId as string,
        },
      });
      return solves;
    },
  })
);

// // user solves
// builder.queryField("userSolves", (t) =>
//   t.prismaField({
//     type: ["Solve"], // 1. Update the type to an array of 'Solve'
//     args: {
//       id: t.arg.string(),
//     },
//     resolve: async (query, root, args, ctx, info) => {
//       const user = await prisma.user.findUniqueOrThrow({
//         where: {
//           id: args.id as string,
//         },
//         include: {
//           solves: true, // Automatically include related 'solves'
//         },
//       });

//       return user.solves; // 2. Return the related 'solves'
//     },
//   })
// );

// user setting
builder.queryField("setting", (t) =>
  t.prismaField({
    type: "Setting",
    args: {
      userId: t.arg.string(),
    },
    resolve: async (query, root, args, ctx, info) => {
      const setting = await prisma.setting.findUniqueOrThrow({
        where: {
          userId: args.userId as string,
        },
      });
      return setting;
    },
  })
);

// solve by id
builder.queryField("solve", (t) =>
  t.prismaField({
    type: "Solve",
    args: {
      id: t.arg.id(),
    },
    resolve: async (query, root, args, ctx, info) => {
      const solve = await prisma.solve.findUniqueOrThrow({
        where: {
          id: args.id as string,
        },
      });
      return solve;
    },
  })
);

// cube session solves
builder.queryField("cubeSessionSolves", (t) =>
  t.prismaField({
    type: ["Solve"],
    args: {
      id: t.arg.string(),
    },
    resolve: async (query, root, args, ctx, info) => {
      const cubeSession = await prisma.cubeSession.findUniqueOrThrow({
        where: {
          id: args.id as string,
        },
        include: {
          solves: true,
        },
      });
      return cubeSession.solves;
    },
  })
);

// const server = createYoga({
//   schema: builder.toSchema(),
//   context: (req) => {
//     req.request.headers.get("x-user-id");
//     return {
//       ...req,
//       prisma,
//     };
//   },
// });
const schema = builder.toSchema();

writeFileSync(resolve(__dirname, "../schema.graphql"), printSchema(schema));

export default createYoga<{
  req: NextApiRequest;
  res: NextApiRequestCookies;
}>({
  schema,
  graphqlEndpoint: "/api/graphql",
});

export const config = {
  api: {
    bodyParser: false,
  },
};
