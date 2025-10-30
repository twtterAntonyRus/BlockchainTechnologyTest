# BlockchainTechnologyTest

Тестовый проект для работы с технологиями блокчейн

## Задача

Храним счетчик (посещений, подсчетов, голосов и прочие варианты)

В контракте описаны:

- `visits` — публичное хранилище счётчика (тип `uint256`).

- `event VisitRecorded` — событие, которое эмитится при каждом изменении счётчика.

- `increment()` — увеличивает счётчик и логирует событие.

- `reset()` — сбрасывает счётчик, но только если вызывающий — владелец (проверка через `msg.sender`).

- `getVisits()` — «view»-функция, возвращает текущее значение без траты газа.

- `owner()` — возвращает адрес отправителя транзакции (в данном простом примере владелец — тот, кто вызвал контракт впервые).

## Инициализация (создание приложения)

 npx create-eth@latest

## Запуск локального окружения

```cmd
cd blockchain-technology

yarn install

# Запуск сети для разработки
yarn chain
```

В отдельном терминальном окне запускаем

```cmd
yarn deploy
```

И в дополнительном (третьем) терминальном окне

```cmd
# Запуск фронтенд части
yarn start
```



Исправление ошибок:

npm install --save-dev hardhat --legacy-peer-deps

npx hardhat

Основная ошибка при вызове 

yarn deploy

Ошибка:

```textile
Downloading compiler 0.8.20
Error HH502: Couldn't download compiler version list. Please check your internet connection and try again.
```

- скачал list.js отсюда binaries.soliditylang.org/windows-amd64/list.json](https://binaries.soliditylang.org/windows-amd64/list.json)

- Но сам 0.8.20 отсюда не скачивается [Release Version 0.8.20 · argotorg/solidity](https://github.com/argotorg/solidity/releases/tag/v0.8.20)

- Обновляю зависимость

- ~~npm update solc~~

- Обновил номер версии в файле hardhat.config.ts 
