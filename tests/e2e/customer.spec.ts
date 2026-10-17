import { test, expect } from "@playwright/test";
test("customer completes a fictional immediate request", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await page.screenshot({
    path: testInfo.outputPath("desktop.png"),
    fullPage: true,
  });
  await page.getByRole("button", { name: /Celular e aplicativos/ }).click();
  await page.getByRole("button", { name: "Revisar atendimento" }).click();
  await expect(page.getByText("Valor total simulado")).toBeVisible();
  await page
    .getByRole("button", { name: "Confirmar pedido demonstrativo" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Sua assistente foi encontrada!" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Simular próxima etapa" }).click();
  await page.getByRole("button", { name: "Simular próxima etapa" }).click();
  await page
    .getByLabel("Simular código informado pela assistente")
    .fill("4826");
  await page
    .getByRole("button", { name: "Confirmar chegada e iniciar" })
    .click();
  await page.getByRole("button", { name: "Confirmar conclusão" }).click();
  await page.getByRole("button", { name: "Avaliar atendimento" }).click();
  await page.getByRole("button", { name: "5 estrelas", exact: true }).click();
  await page
    .getByRole("button", { name: "Enviar avaliação demonstrativa" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Obrigada pela confiança, Helena." }),
  ).toBeVisible();
});
test("sensitive service requires explicit safety acknowledgment", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Contas e Pix/ }).click();
  await page.getByRole("button", { name: "Revisar atendimento" }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Confirme que você leu" }),
  ).toContainText("Confirme que você leu");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Revisar atendimento" }).click();
  await expect(
    page.getByRole("heading", { name: "Tudo certo para pedir ajuda?" }),
  ).toBeVisible();
});
test("mobile catalog fits the viewport and opens a request", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.screenshot({
    path: testInfo.outputPath("mobile.png"),
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: /Celular e aplicativos/ }).click();
  await expect(page.getByLabel("Onde será o atendimento?")).toBeVisible();
});
