// src/utils/lifeExpectancyCalculator.js

export function calculateLifeExpectancy(profile) {
  if (!profile || !profile.age) return null;

  const age = Number(profile.age);
  const gender = profile.gender || "";

  // Base aproximada para Colombia ~2025-2026
  let baseLE = gender === "Femenino" ? 80 : 73;
  if (!gender || gender === "Prefiero no decirlo") baseLE = 76.5;

  let adjustment = 0;

  // Actividad física
  if (profile.activityDays === "5+") adjustment += 6;
  else if (profile.activityDays === "3-4") adjustment += 4;
  else if (profile.activityDays === "1-2") adjustment += 2;
  else if (profile.activityDays === "0") adjustment -= 5;

  if (profile.activityDuration === ">60") adjustment += 2;
  else if (profile.activityDuration === "<30") adjustment -= 3;

  // Sueño
  if (profile.sleepHours === "7-8" || profile.sleepHours === ">8") adjustment += 3;
  else if (profile.sleepHours === "<6") adjustment -= 5;

  if (profile.sleepQuality === "Muy buena" || profile.sleepQuality === "Buena") adjustment += 2;
  else if (profile.sleepQuality === "Mala") adjustment -= 4;

  // Alimentación
  if (profile.diet === "Diario" || profile.diet === "Casi diario") adjustment += 4;
  else if (profile.diet === "Nunca") adjustment -= 3;

  // Alcohol y tabaco
  if (profile.alcohol === "Frecuente") adjustment -= 7;
  else if (profile.alcohol === "Ocasional") adjustment -= 2;

  if (profile.smoking === "Si") adjustment -= 12;
  else if (profile.smoking === "Ocasional") adjustment -= 6;

  // Estrés y apoyo
  if (profile.stress === "Bajo") adjustment += 3;
  else if (profile.stress === "Alto") adjustment -= 5;

  if (profile.support === "Si") adjustment += 3;
  else if (profile.support === "No") adjustment -= 4;

  // Salud general
  if (profile.chronicCondition === "Si") adjustment -= 8;
  if (profile.healthStatus === "Muy bueno" || profile.healthStatus === "Bueno") adjustment += 5;
  else if (profile.healthStatus === "Malo") adjustment -= 6;

  // Educación
  if (["Universitario", "Posgrado"].includes(profile.education)) adjustment += 4;
  else if (profile.education === "Sin estudios") adjustment -= 3;

  // Resultado final
  const estimatedLE = Math.max(age + 5, Math.round(baseLE + adjustment));

  return {
    estimatedYears: estimatedLE,
    remainingYears: estimatedLE - age,
    base: baseLE,
    totalAdjustment: adjustment
  };
}