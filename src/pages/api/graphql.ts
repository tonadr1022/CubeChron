import { createYoga } from "graphql-yoga";
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { DateTimeResolver } from "graphql-scalars";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import prisma from "@/lib/prisma";
import { initContextCache } from "@pothos/core";
import { NextApiRequest, NextApiResponse } from "next";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import PrismaUtils from "@pothos/plugin-prisma-utils";
import { PrismaCrudGenerator } from "@/graphql/generator";
import { printSchema } from "graphql";
import { writeFileSync } from "fs";
import { resolve } from "path";
import { decode } from "next-auth/jwt";

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    DateTime: {
      Output: Date;
      Input: Date;
    };
  };
  Context: {
    id: string;
  };
}>({
  plugins: [PrismaPlugin, PrismaUtils],

  prisma: {
    client: prisma,
  },
});

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
    barView: t.exposeString("barView", { nullable: true }),
    cubeType: t.exposeString("cubeType", { nullable: true }),
    cubeDisplayDimension: t.exposeString("cubeDisplayDimension", {
      nullable: true,
    }),
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
    cubeType: t.exposeString("cubeType", { nullable: true }),
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
    duration: t.exposeFloat("duration"),
    userId: t.exposeString("userId", { nullable: true }),
    cubeSession: t.relation("cubeSession"),
    user: t.relation("user"),
  }),
});

builder.addScalarType("DateTime", DateTimeResolver, {});

builder.queryType({
  fields: (t) => ({
    solves: t.prismaField({
      type: ["Solve"],
      resolve: async (query, _parent, _args, ctx) => {
        console.log("ctx", ctx.id);
        const solves = await prisma.solve.findMany({
          ...query,
          where: { userId: ctx.id },
        });
        console.log("solves69", solves);
        return solves;
      },
    }),
    cubeSessions: t.prismaField({
      type: ["CubeSession"],
      resolve: async (query, _parent, _args, ctx) => {
        const cubeSessions = await prisma.cubeSession.findMany({
          ...query,
          where: { userId: ctx?.id },
        });
        console.log(ctx.id);
        console.log(cubeSessions);
        return cubeSessions;
      },
    }),
    setting: t.prismaField({
      type: "Setting",
      resolve: async (query, root, args, ctx, info) => {
        const setting = await prisma.setting.findFirstOrThrow({
          ...query,
          where: { userId: ctx?.id },
        });
        if (!setting) {
          throw new Error("Setting not found");
        }
        return setting;
      },
    }),
    solve: t.prismaField({
      type: "Solve",
      args: { id: t.arg.id() },
      resolve: async (query, root, args, ctx, info) =>
        prisma.solve.findUniqueOrThrow({
          ...query,
          where: { id: args.id as string },
        }),
    }),
  }),
});

export const CreateCubeSessionInput = builder.inputType("CubeSessionInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    cubeType: t.string({ required: true }),
    notes: t.string({ required: true }),
  }),
});

export const CubeSessionUpdateInput = builder.inputType(
  "CubeSessionUpdateInput",
  {
    fields: (t) => ({
      id: t.string({ required: true }),
      cubeType: t.string(),
      name: t.string(),
      notes: t.string(),
    }),
  }
);

export const UpdateSettingInput = builder.inputType("UpdateSettingInput", {
  fields: (t) => ({
    id: t.string({ required: true }),
    userId: t.string(),
    focusMode: t.boolean(),
    barView: t.string(),
    cubeType: t.string(),
    cubeDisplayDimension: t.string(),
    cubeSessionId: t.string(),
  }),
});

export const CreateSolveInput = builder.inputType("CreateSolveInput", {
  fields: (t) => ({
    id: t.string({ required: true }),
    cubeSessionId: t.string({ required: true }),
    scramble: t.string({ required: true }),
    cubeType: t.string({ required: true }),
    notes: t.string(),
    dnf: t.boolean(),
    plusTwo: t.boolean(),
    duration: t.float({ required: true }),
  }),
});

export const UpdateSolveInput = builder.inputType("UpdateSolveInput", {
  fields: (t) => ({
    id: t.string(),
    cubeSessionId: t.string(),
    scramble: t.string(),
    cubeType: t.string(),
    notes: t.string(),
    dnf: t.boolean(),
    plusTwo: t.boolean(),
    duration: t.float(),
  }),
});

builder.mutationType({
  fields: (t) => ({
    createSolve: t.prismaField({
      type: "Solve",
      args: {
        input: t.arg({ type: CreateSolveInput, required: true }),
      },
      resolve: (query, _, args, ctx) =>
        prisma.solve.create({
          ...query,
          data: {
            userId: ctx?.id,
            ...args.input,
          },
        }),
    }),
    updateSolve: t.prismaField({
      type: "Solve",
      args: {
        id: t.arg.string({ required: true }),
        input: t.arg({ type: UpdateSolveInput }),
      },
      resolve: (query, __, args, ctx) => {
        const id = args.id;
        const { ...data } = args.input;
        // Filter out any undefined fields from the input object
        const updateData = Object.fromEntries(
          Object.entries(data).filter(([_, value]) => value !== undefined)
        );

        return prisma.solve.update({
          ...query,
          where: { id: id },
          data: { userId: ctx?.id, ...updateData },
        });
      },
    }),

    deleteSolve: t.prismaField({
      type: "Solve",
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (query, __, args) =>
        prisma.solve.delete({ ...query, where: { id: args.id } }),
    }),
    createCubeSession: t.prismaField({
      type: "CubeSession",
      args: {
        input: t.arg({ type: CreateCubeSessionInput, required: true }),
      },
      resolve: (query, _, args, ctx) =>
        prisma.cubeSession.create({
          ...query,
          data: {
            userId: ctx?.id,
            ...args.input,
          },
        }),
    }),
    updateCubeSession: t.prismaField({
      type: "CubeSession",
      args: {
        input: t.arg({ type: CubeSessionUpdateInput, required: true }),
      },
      resolve: (query, __, args, ctx) => {
        const cubeSessionId = args.input.id;
        const { id, ...data } = args.input;
        const updateData = Object.fromEntries(
          Object.entries(data).filter(([_, value]) => value !== undefined)
        );
        return prisma.cubeSession.update({
          ...query,
          where: { id: cubeSessionId },
          data: { userId: ctx?.id, ...updateData },
        });
      },
    }),
    deleteCubeSession: t.prismaField({
      type: "CubeSession",
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (query, __, args) =>
        prisma.cubeSession.delete({ ...query, where: { id: args.id } }),
    }),
    updateSetting: t.prismaField({
      type: "Setting",
      args: {
        input: t.arg({ type: UpdateSettingInput, required: true }),
      },
      resolve: async (query, __, args, ctx) => {
        const { id, ...data } = args.input;
        const updateData = Object.fromEntries(
          Object.entries(data).filter(([_, value]) => value !== undefined)
        );
        const setting = await prisma.setting.update({
          ...query,
          where: { id: id },
          data: { ...updateData },
        });
        return setting;
      },
    }),
  }),
});

const schema = builder.toSchema();
writeFileSync(resolve(__dirname, "../schema.graphql"), printSchema(schema));

export default createYoga<{ req: NextApiRequest; res: NextApiRequestCookies }>({
  context: async (ctx) => {
    const sessionToken = ctx.req.cookies["next-auth.session-token"];
    const decoded = await decode({
      token: sessionToken,
      secret: process.env.NEXTAUTH_SECRET!,
    });
    return { id: decoded?.id };
  },
  schema,
  graphqlEndpoint: "/api/graphql",
});

export const config = {
  api: {
    bodyParser: false,
  },
};
