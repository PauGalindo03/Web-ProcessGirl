// lib/serverModels.ts
import { fallbackConfiguracion } from "@/fallbacks/fallConfiguracion";
import { fallbackContactos } from "@/fallbacks/fallContacto";
import * as configuracionService from "@/services/configuracionService";
import * as contactoService from "@/services/contactoService";

export async function getServerConfiguracion() {
  try {
    const config = await configuracionService.getConfiguracion();
    return config ?? fallbackConfiguracion;
  } catch (err) {
    console.warn("Fallo en SSR, usando fallback", err);
    return fallbackConfiguracion;
  }
}


export async function getServerContactos() {
  try {
    const contactos = await contactoService.getAllContactos();
    return contactos?.length ? contactos : fallbackContactos;
  } catch (err) {
    console.warn("Fallo en SSR, usando fallback de contactos",err);
    return fallbackContactos;
  }
}
