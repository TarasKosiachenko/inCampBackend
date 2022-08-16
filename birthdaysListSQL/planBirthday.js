function planBirthdays(list, monthes) {
    const neededMonthesIndexes = Array.from(Array(monthes + 1).keys()).map((month) => new Date().getMonth() + (month + 1));
    const neededPeopleByMonthes = list.filter(({ due_date }) =>
      neededMonthesIndexes.includes(due_date.getMonth() + 1)
    );
  
    const grouped = new Map();
  
    neededPeopleByMonthes.forEach((person) => {
      const monthName = person.due_date.toLocaleString("default", {
        month: "long",
      });
      const peopleInThatMonth = grouped.get(monthName);
      if (peopleInThatMonth) {
        grouped.set(
          monthName,
          [...peopleInThatMonth, person].sort(
            (a, b) => a.due_date.getDate() - b.due_date.getDate()
          )
        );
      } else {
        grouped.set(monthName, [person]);
      }
    });
  
    for (const month of grouped.keys()) {
      console.log(month);
      grouped.get(month).forEach((person) => {
        console.log(
          `(${person.due_date.getDate()}) - ${person.name} (${person.age} years)`
        );
      });
    }
  }

  module.exports = planBirthdays