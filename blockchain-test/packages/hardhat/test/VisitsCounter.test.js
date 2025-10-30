// Импорты
import { expect } from "chai";
import { ethers } from "hardhat";

// Группа тестов для контракта VisitsCounter
describe("VisitsCounter", function () {
  let VisitsCounter;
  let visitsCounter;
  let owner;
  let addr1; // Дополнительный аккаунт для тестов доступа

  // Подготовка перед каждым тестом
  beforeEach(async function () {
    // Получаем список аккаунтов из Hardhat Network
    [owner, addr1] = await ethers.getSigners();

    // Получаем фабрику контракта
    VisitsCounter = await ethers.getContractFactory("VisitsCounter");

    // Деплоим контракт
    visitsCounter = await VisitsCounter.deploy();
    await visitsCounter.waitForDeployment();
  });

  // Тест 1: Начальное значение счётчика
  it("Should start with 0 visits", async function () {
    const count = await visitsCounter.getVisits();
    expect(count).to.equal(0);
  });

  // Тест 2: Увеличение счётчика на 1
  it("Should increment visits by 1", async function () {
    await visitsCounter.increment();
    const count = await visitsCounter.getVisits();
    expect(count).to.equal(1);
  });

  // Тест 3: Эмиссия события VisitRecorded
  it("Should emit VisitRecorded event on increment", async function () {
    const tx = await visitsCounter.increment();
    const receipt = await tx.wait();

    // Проверяем, что событие было эмитировано
    expect(receipt.logs.length).to.be.greaterThan(0);

    // Находим событие VisitRecorded
    const event = receipt.logs.find(log => log.fragment?.name === "VisitRecorded");
    expect(event).to.exist();

    // Расшифровываем параметры события
    const decoded = visitsCounter.interface.parseLog(event);
    expect(decoded.args.newCount).to.equal(1);
    expect(decoded.args.visitor).to.equal(owner.address);
  });

  // Тест 4: Сброс счётчика владельцем
  it("Should allow owner to reset the counter", async function () {
    // Увеличиваем счётчик
    await visitsCounter.increment();

    // Сбрасываем счётчик
    await visitsCounter.reset();

    const count = await visitsCounter.getVisits();
    expect(count).to.equal(0);
  });

  // Тест 5: Запрет сброса не‑владельцем
  it("Should reject non-owner from resetting", async function () {
    // Пытаемся сбросить счётчик с другого аккаунта
    await expect(visitsCounter.connect(addr1).reset()).to.be.rejectedWithCustomError(
      visitsCounter,
      "Only owner can reset",
    );
  });

  // Тест 6: Проверка функции owner()
  it("Should return correct owner address", async function () {
    const contractOwner = await visitsCounter.owner();
    expect(contractOwner).to.equal(owner.address);
  });
});
