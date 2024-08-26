#!/usr/bin/env node

import { Command } from "commander";
import { init } from "./actions/init.js";

const program = new Command();

program
  .name("codeville")
  .description(
    "A CLI tool to initialize a new app with Next.js, Tailwind CSS, choice of ORM, and backend API"
  )
  .version("0.1.0");

program
  .command("init")
  .description("Initialize a new Codeville project")
  .action(init);

program.parse(process.argv);
