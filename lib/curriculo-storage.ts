"use client";

import { Curriculo, STORAGE_KEY, curriculosMock } from "@/lib/curriculos";

export function getCurriculos(): Curriculo[] {
  if (typeof window === "undefined") {
    return curriculosMock;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(curriculosMock));
    return curriculosMock;
  }

  try {
    return JSON.parse(raw) as Curriculo[];
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(curriculosMock));
    return curriculosMock;
  }
}

export function saveCurriculo(curriculo: Curriculo) {
  const curriculos = getCurriculos();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([curriculo, ...curriculos]));
}

export function findCurriculo(id: string) {
  return getCurriculos().find((curriculo) => curriculo.id === id);
}
