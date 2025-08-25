let showMsg = true;

function showDetails(name: string, age: number, salary: number): string {
  if (showMsg) {
    return `name: ${name}, age: ${age}, salary: ${salary}`;
  }
}
console.log(showDetails("John", 30, 50000));
