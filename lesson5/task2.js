const averageGrade = 89;

switch (true) {
  case averageGrade < 0:
    console.log("Оцінка менше 0");
    break;
  case averageGrade < 60:
    console.log("Незадовільно");
    break;
  case averageGrade <= 70:
    console.log("Задовільно");
    break;
  case averageGrade <= 80:
    console.log("Добре");
    break;
  case averageGrade <= 90:
    console.log("Дуже добре");
    break;
  case averageGrade <= 100:
    console.log("Відмінно");
    break;
  default:
    console.log("Невірні дані");
}