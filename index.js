#!/usr/bin/env node
const fs = require('fs');

const logFile = (path) => {
  try {
    if (fs.existsSync(`${path}`)) {
      const readerStream = fs.createReadStream(path);
      readerStream
        .setEncoding('UTF8')
        .on('data', (data) => {
          const stat = JSON.parse(data);
          const percentWins = Math.round((100 / stat.game) * stat.win);
          console.log(
            `Игр всего: ${stat.win}\nПобед: ${stat.win}\nПоражений: ${stat.loses}\nПроцент побед : ${percentWins}`
          );
        })
        .on('error', (error) => {
          throw error;
        });
    } else {
      console.log('Файл не найден');
    }
  } catch (err) {
    console.error(err);
  }
};

logFile(process.argv[2]);
