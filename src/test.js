const program = require('commander');
program
    .name("moyuboost")
    .version("0.0.1", "-v, --version")
    .description("moyu_boost cli")

program.command("csharp")
    .argument("tablename", "find table to generate dto file")
    .option("-d, --dto <filename>", "make c# dto")
    .action((tablename, option) => {
        console.log(tablename);
        console.log(option.dto);
    })

program.parse()
