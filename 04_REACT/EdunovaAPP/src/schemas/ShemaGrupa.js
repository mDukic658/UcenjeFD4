import { z } from 'zod'

export const ShemaGrupa = z.object({
  naziv: z.string()
    .min(1, 'Naziv je obavezan')
    .min(3, 'Naziv mora imati barem 3 znaka')
    .max(50, 'Naziv može imati najviše 50 znakova'),
  smjer: z.string()
    .min(1, 'Obavezno odabir smjera'),
  polaznici: z.array(z.object())
    .min(1, 'Minimalno jedan polaznik'),
});