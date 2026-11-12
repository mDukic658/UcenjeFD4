import { z } from 'zod'

export const ShemaSmjer = z.object({
  naziv: z.string()
    .trim()
    .min(1, "Naziv je obavezan i ne smije sadržavati samo razmake!")
    .min(3, "Naziv smjera mora imati najmanje 3 znaka!")
    .max(50, "Naziv smjera može imati najviše 50 znakova!"),

  trajanje: z.coerce.number({
    error: "Trajanje mora biti broj!",
  })
    .min(1, "Trajanje mora biti između 1 i 500 sati!")
    .max(500, "Trajanje mora biti između 1 i 500 sati!"),

  cijena: z.coerce.number({
    error: "Cijena mora biti broj!",
  })
    .min(0, "Cijena ne može biti negativan broj!"),

  datumPokretanja: z.coerce.date({
    error: (issue) => {
      if (issue.input === undefined || issue.input === null || issue.input === "") {
        return "Datum je obavezan!";
      }
      if (issue.code === "invalid_date" || issue.code === "invalid_type") {
        return "Molimo unesite ispravan format datuma!";
      }
      return undefined; 
    }
  })
    .refine((odabraniDatum) => {
      const danas = new Date();
      danas.setHours(0, 0, 0, 0);
      return odabraniDatum >= danas;
    }, "Datum pokretanja ne može biti u prošlosti!")
})