const EXAMPLE_TEXT = `Старший братец ПОНЕДЕЛЬНИК –
работяга, не бездельник.
Он неделю открывает
всех трудиться зазывает.

ВТОРНИК следует за братом
у него идей богато.

А потом СРЕДА-сестрица,
не пристало ей лениться.

Брат ЧЕТВЕРГ и так, и сяк,
он мечтательный чудак.

ПЯТНИЦА-сестра сумела
побыстрей закончить дело.

Предпоследний брат СУББОТА
не выходит на работу.

В гости ходит ВОСКРЕСЕНЬЕ,
очень любит угощенье
`;

const ENG_LOCALES = {
  ПОНЕДЕЛЬНИК: "MONDAY",
  ВТОРНИК: "TUESDAY",
  СРЕДА: "WEDNESDAY",
  ЧЕТВЕРГ: "THURSDAY",
  ПЯТНИЦА: "FRIDAY",
  СУББОТА: "SATURDAY",
  ВОСКРЕСЕНЬЕ: "SUNDAY",
};

const translate = (text) => {
  for (let key in ENG_LOCALES) {
    text = text.replace(new RegExp(key, "ig"), ENG_LOCALES[key]);
  }

  return text;
};

const result = translate(EXAMPLE_TEXT);
console.log("result: ", result);
