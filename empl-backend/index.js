console.time("Запуск");

const main = {
    app: require('polka')(),
    db: require("./db")()
}

main.db