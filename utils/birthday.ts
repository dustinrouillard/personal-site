const BIRTHDAY = new Date("07/15/1999");

export function getAge(): number {
  const today = new Date();

  let age = today.getFullYear() - BIRTHDAY.getFullYear();
  const month = today.getMonth() - BIRTHDAY.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < BIRTHDAY.getDate())) age--;

  return age;
}
