const program = require('commander');
const shell = require('shelljs');
program
    .name("daily_boot")
    .version("0.0.1", "-v, --version")
    .description("每天启动项目")

program.command("gateway")
    .description("启动gateway")
    .action(() => {
        shell.exec(`start D:\\Git\\git-bash.exe -c "echo start gateway ;bash"`, { async: true });
    })

program.command("consul")
    .description("启动consul")
    .action(() => {
        shell.exec(`start D:\\Git\\git-bash.exe -c "echo start consul ;bash"`, { async: true });
    })
program.command("web")
    .description("启动web")
    .action(() => {
        shell.exec(`start D:\\Git\\git-bash.exe -c "echo start web ;bash"`, { async: true });
    })
program.command("api")
    .description("启动api")
    .action(() => {
        shell.exec(`start D:\\Git\\git-bash.exe -c "echo start api ;bash"`, { async: true });
    })

program.command("redis")
    .description("启动redis")
    .action(() => {
        shell.exec(`start D:\\Git\\git-bash.exe -c "echo start gateway ;bash"`, { async: true });
    })

program.command("all")
    .description("启动所有")
    .action(() => {
        shell.exec(`start D:\\Git\\git-bash.exe -c "echo start gateway ;bash"`, { async: true });
        shell.exec(`start D:\\Git\\git-bash.exe -c "echo start consoul ;bash"`, { async: true });
        shell.exec(`start D:\\Git\\git-bash.exe -c "echo start redis ;bash"`, { async: true });
        shell.exec(`start D:\\Git\\git-bash.exe -c "echo start api ;bash"`, { async: true });
        shell.exec(`start D:\\Git\\git-bash.exe -c "echo start web ;bash"`, { async: true });
    })

program.parse()
