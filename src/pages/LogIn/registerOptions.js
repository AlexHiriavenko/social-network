const dayOfBirth = [];

for (let i = 1; i <= 31; i++) {
  dayOfBirth.push(i.toString());
}
const yearOfBirth = [];
for (let i = 0; i <= 100; i++) {
  yearOfBirth.push((i + 1920).toString());
}

const mounthOfBirst = [
  "янв",
  "фев",
  "март",
  "апр",
  "мая",
  "июн",
  "июл",
  "авг",
  "сент",
  "нояб",
  "дек",
];
export { dayOfBirth, yearOfBirth, mounthOfBirst };
