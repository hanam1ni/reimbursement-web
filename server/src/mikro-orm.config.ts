import { Options } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

export default {
  entities: ["./src/entities"],
  type: "postgresql",
  clientUrl:
    process.env.DATABASE_URL ||
    "postgres://postgres:postgres@localhost:5432/reimbursement-web-db",
  migrations: {
    pathTs: "src/migrations",
  },
  metadataProvider: TsMorphMetadataProvider,
} as Options;
