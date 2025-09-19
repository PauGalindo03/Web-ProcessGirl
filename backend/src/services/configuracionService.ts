// backend/src/services/configuracionService.ts
import ConfiguracionModel from "../models/Configuracion.js"
import type { Configuracion as ConfiguracionPlano } from "../../../packages/types/configuracion.js"
import {
  getDefaultBackendConfiguration,
  isValidHexColor,
} from "../utils/configuracionDefaults.js" // donde tengas tu getDefaultBackendConfiguration

export class ConfiguracionService {
  // Obtener configuración actual (merge con defaults)
  async getConfiguracion(): Promise<ConfiguracionPlano> {
    const dbConfig = await ConfiguracionModel.findOne().lean<ConfiguracionPlano>().exec()
    const defaultConfig = getDefaultBackendConfiguration()

    if (!dbConfig) {
      return {
        ...defaultConfig,
        _id: "", // si quieres devolver un id vacío cuando no hay doc
      }
    }

    // Merge de colores
    const colores = { ...defaultConfig.colores }
    if (dbConfig.colores) {
      for (const key in defaultConfig.colores) {
        const colorKey = key as keyof ConfiguracionPlano["colores"]
        const dbColorValue = dbConfig.colores[colorKey]
        colores[colorKey] = isValidHexColor(dbColorValue)
          ? dbColorValue!
          : defaultConfig.colores[colorKey]
      }
    }

    // Merge de páginas activas
    const defaultPagesMap = new Map(defaultConfig.paginasActivas.map((p) => [p.key, p]))
    const dbPagesMap = new Map((dbConfig.paginasActivas ?? []).map((p) => [p.key, p]))

    const paginasActivas = Array.from(defaultPagesMap.values()).map((defaultPage) => {
      const dbPage = dbPagesMap.get(defaultPage.key)
      const activo: boolean = dbPage?.activo ?? defaultPage.activo ?? true
      return { ...defaultPage, activo }
    })

    return {
      ...defaultConfig,
      ...dbConfig,
      colores,
      paginasActivas,
    }
  }

  // Actualizar o crear configuración
  async updateConfiguracion(newConfig: ConfiguracionPlano): Promise<ConfiguracionPlano> {
    const updatedConfig = await ConfiguracionModel.findOneAndUpdate({}, newConfig, {
      new: true,
      upsert: true,
      runValidators: true,
    }).lean<ConfiguracionPlano>()

    // Si por alguna razón no devuelve nada, devolvemos defaults
    return updatedConfig ?? { ...getDefaultBackendConfiguration(), _id: "" }
  }
}

export default new ConfiguracionService()