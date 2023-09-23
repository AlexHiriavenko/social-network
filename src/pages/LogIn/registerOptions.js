const dayOfBirth = [];

for (let i = 1; i <= 31; i++) {
  dayOfBirth.push(i.toString());
}
const yearOfBirth = [];
for (let i = 0; i <= 100; i++) {
  yearOfBirth.push((i + 1920).toString());
}

const mounthOfBirst = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12"
];
export { dayOfBirth, yearOfBirth, mounthOfBirst };
