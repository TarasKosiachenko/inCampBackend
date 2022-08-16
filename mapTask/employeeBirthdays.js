function planBirthdays(list, monthes) {
  const neededMonthesIndexes = Array.from(Array(monthes + 1).keys()).map((month) => new Date().getMonth() + (month + 1));
  const neededPeopleByMonthes = list.filter(({ birthday }) =>
    neededMonthesIndexes.includes(birthday.getMonth() + 1)
  );

  const grouped = new Map();

  neededPeopleByMonthes.forEach((person) => {
    const monthName = person.birthday.toLocaleString("default", {
      month: "long",
    });
    const peopleInThatMonth = grouped.get(monthName);
    if (peopleInThatMonth) {
      grouped.set(
        monthName,
        [...peopleInThatMonth, person].sort(
          (a, b) => a.birthday.getDate() - b.birthday.getDate()
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
        `(${person.birthday.getDate()}) - ${person.name} (${person.age} years)`
      );
    });
  }
}

planBirthdays(
  [
    {
      name: "Oleg Sherbuk",
      age: 25,
      birthday: new Date("1997-08-20"),
    },
    {
      name: "Igor Krunec",
      age: 21,
      birthday: new Date("2001-08-07"),
    },
    {
      name: "Max Molot",
      age: 22,
      birthday: new Date("2000-09-11"),
    },
    {
      name: "Rus Grohotov",
      age: 30,
      birthday: new Date("1992-10-31"),
    },
  ], 2);
