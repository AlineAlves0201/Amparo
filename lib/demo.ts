import { z } from "zod";
export const categories = [
  {
    id: "phone",
    name: "Celular e aplicativos",
    description: "Aprenda a usar seu celular com tranquilidade.",
    icon: "Smartphone",
    price: 6900,
    duration: 60,
    sensitive: false,
  },
  {
    id: "bills",
    name: "Contas e Pix",
    description: "Entenda boletos e códigos Pix com segurança.",
    icon: "QrCode",
    price: 5900,
    duration: 45,
    sensitive: true,
  },
  {
    id: "health",
    name: "Consultas médicas",
    description: "Ajuda para marcar seus próximos cuidados.",
    icon: "HeartPulse",
    price: 4900,
    duration: 45,
    sensitive: false,
  },
  {
    id: "tv",
    name: "TV e streaming",
    description: "Seus filmes e programas, sem complicação.",
    icon: "Tv",
    price: 7900,
    duration: 60,
    sensitive: false,
  },
  {
    id: "wifi",
    name: "Wi-Fi e internet",
    description: "Uma mãozinha para ficar conectado.",
    icon: "Wifi",
    price: 7900,
    duration: 60,
    sensitive: false,
  },
  {
    id: "government",
    name: "Serviços do governo",
    description: "Orientação para acessar serviços digitais.",
    icon: "Landmark",
    price: 6900,
    duration: 60,
    sensitive: true,
  },
  {
    id: "documents",
    name: "Formulários e documentos",
    description: "Apoio para preencher e organizar.",
    icon: "FileText",
    price: 5900,
    duration: 45,
    sensitive: false,
  },
  {
    id: "other",
    name: "Outra ajuda digital",
    description: "Conte com apoio para outras tarefas.",
    icon: "HandHeart",
    price: 6900,
    duration: 60,
    sensitive: false,
  },
] as const;
export type Category = (typeof categories)[number];
export const requestSchema = z.object({
  categoryId: z.enum([
    "phone",
    "bills",
    "health",
    "tv",
    "wifi",
    "government",
    "documents",
    "other",
  ]),
  address: z
    .string()
    .trim()
    .min(10, "Informe um endereço com pelo menos 10 caracteres.")
    .max(200),
  safetyConsent: z.boolean(),
});
export const money = (cents: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    cents / 100,
  );
export type ServiceState =
  "assigned" | "on_the_way" | "arrived" | "in_progress" | "completed";
export const transitions: Record<ServiceState, ServiceState | null> = {
  assigned: "on_the_way",
  on_the_way: "arrived",
  arrived: "in_progress",
  in_progress: "completed",
  completed: null,
};
export const assistants = [
  { id: "ana", name: "Ana Martins", average: 4.9, count: 82 },
  { id: "bruno", name: "Bruno Lima", average: 5, count: 3 },
  { id: "carla", name: "Carla Souza", average: 4.8, count: 54 },
];
export function adjustedRating(average: number, count: number) {
  return (average * count + 4.5 * 20) / (count + 20);
}
// Demonstration only. Production selection must execute in a PostgreSQL transaction.
export function selectDemoAssistant(excluded: string[] = []) {
  return (
    assistants
      .filter((a) => !excluded.includes(a.id))
      .sort(
        (a, b) =>
          adjustedRating(b.average, b.count) -
            adjustedRating(a.average, a.count) || a.id.localeCompare(b.id),
      )[0] ?? null
  );
}
