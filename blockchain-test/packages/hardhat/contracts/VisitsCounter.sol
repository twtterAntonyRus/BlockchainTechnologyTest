// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract VisitsCounter {
    // Состояние: количество посещений
    uint256 public visits;

    // Событие для логирования посещений
    event VisitRecorded(uint256 newCount, address visitor);

    // Конструктор: инициализирует счётчик нулём
    constructor() {
        visits = 0;
    }

    // Функция: увеличить счётчик на 1
    function increment() public {
        visits++;
        emit VisitRecorded(visits, msg.sender);
    }

    // Функция: сбросить счётчик в 0 (только владелец)
    function reset() public {
        require(msg.sender == owner(), "Only owner can reset");
        visits = 0;
        emit VisitRecorded(visits, msg.sender);
    }

    // Вспомогательная функция: вернуть адрес владельца контракта
    function owner() public view returns (address) {
        return msg.sender;
    }

    // Функция: получить текущее значение счётчика
    function getVisits() public view returns (uint256) {
        return visits;
    }
}
