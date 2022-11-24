const program = require("commander");
program
    .name("moyuboost")
    .version("0.0.1", "-v, --version")
    .description(" mo yu toolbox 工作用摸鱼工具箱");

program
    .command("generate")
    .description("generate file")
    .option("-f, --file <filename...>", "info file")
    .action((option) => {
        console.log("ref file:", option.file);
    });

program
    .command("init-dto")
    .description("create generate info file from target table")
    .option("-t, --template <template>", "template")
    .option("-s, --scheme <scheme...>", "table")
    .action((option) => {
        console.log("template:", option.template);
        console.log("scheme:", option.scheme);
    });

program
    .command("init-common")
    .description("create generate info file by template")
    .option("-t, --tempalte <template...>", "template file")
    .action((option) => {
        console.log("template:", option.template);
    });

program.parse();
