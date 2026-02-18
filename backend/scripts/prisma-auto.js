import { execSync } from "child_process";

const name = "auto_" + new Date().toISOString().replace(/[-:.TZ]/g, "");

console.log("Migration:", name);

execSync(`npx prisma migrate dev --name ${name}`, { stdio: "inherit" });
execSync(`npx prisma generate`, { stdio: "inherit" });